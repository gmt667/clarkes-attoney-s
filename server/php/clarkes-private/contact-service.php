<?php
declare(strict_types=1);

// Keep this directory outside public_html. The React build never reads it.
function clarkes_contact(string $method, string $raw, array $config, callable $deliver, callable $allow, bool $transportReady = true): array
{
    $unavailable = ['ok' => false, 'error' => 'Online enquiries are unavailable. Please email or call the firm.'];
    $ready = !empty($config['api_key']) && !empty($config['from']) && $transportReady;
    if ($method === 'GET') return [$ready ? 200 : 503, $ready ? ['ok' => true, 'message' => 'Enquiry delivery is configured.'] : $unavailable];
    if ($method !== 'POST') return [405, ['ok' => false, 'error' => 'Use the website enquiry form.']];
    if (strlen($raw) > 32768) return [413, ['ok' => false, 'error' => 'Your enquiry is too long. Please shorten it.']];
    try { $body = json_decode($raw, true, 16, JSON_THROW_ON_ERROR); }
    catch (JsonException $error) { return [400, ['ok' => false, 'error' => 'Please check the enquiry form.']]; }
    if (!is_array($body)) return [400, ['ok' => false, 'error' => 'Please check the enquiry form.']];
    $fields = ['name' => [2, 120], 'email' => [3, 180], 'phone' => [7, 40], 'subject' => [3, 160], 'legalService' => [2, 160], 'message' => [20, 4000]];
    $values = [];
    $errors = [];
    foreach ($fields as $field => [$min, $max]) {
        $value = is_string($body[$field] ?? null) ? trim($body[$field]) : '';
        $length = preg_match_all('/./us', $value);
        if ($length === false || $length < $min || $length > $max) $errors[$field] = ['Please complete this field within the permitted length.'];
        $values[$field] = $value;
    }
    if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = ['Please enter a valid email address.'];
    if ($errors) return [400, ['ok' => false, 'error' => 'Please check the highlighted fields.', 'details' => $errors]];
    if (!empty($body['company'])) return [400, ['ok' => false, 'error' => 'Your enquiry could not be accepted.']];
    if (isset($body['startedAt']) && (!is_numeric($body['startedAt']) || microtime(true) * 1000 - (float) $body['startedAt'] < 1000)) {
        return [400, ['ok' => false, 'error' => 'Please take a moment to review your enquiry and try again.']];
    }
    if (!$ready) return [503, $unavailable];
    try {
        if (!$allow()) return [429, ['ok' => false, 'error' => 'Too many enquiries. Please try again later or call the firm.']];
        $text = "New Clarkes Attorneys website enquiry\n\n";
        foreach ($values as $field => $value) $text .= "$field: $value\n\n";
        $message = [
            'from' => $config['from'],
            'to' => ['info@clarkesattorneys.mw', 'geoffrey@clarkesattorneys.mw'],
            'reply_to' => $values['email'],
            'subject' => '[Website Enquiry] ' . $values['subject'],
            'text' => $text,
        ];
        if (!$deliver($message)) return [502, ['ok' => false, 'error' => 'We could not confirm delivery. Please email or call the firm before trying again.']];
        return [200, ['ok' => true, 'message' => 'Your enquiry has been accepted for delivery to Clarkes Attorneys.']];
    } catch (Throwable $error) {
        error_log('Clarkes enquiry service failed.');
        return [503, $unavailable];
    }
}

function clarkes_rate_limit(string $file, string $ip, ?int $time = null): bool
{
    $now = $time ?? time();
    $handle = fopen($file, 'c+');
    if ($handle === false) throw new RuntimeException('Rate limit storage unavailable');
    try {
        if (!flock($handle, LOCK_EX)) throw new RuntimeException('Rate limit lock unavailable');
        $raw = stream_get_contents($handle);
        $entries = $raw === '' ? [] : json_decode($raw, true, 16, JSON_THROW_ON_ERROR);
        if (!is_array($entries)) throw new RuntimeException('Invalid rate limit storage');
        foreach ($entries as $key => $entry) if ($entry['reset'] <= $now) unset($entries[$key]);
        $key = hash('sha256', $ip);
        $entry = $entries[$key] ?? ['count' => 0, 'reset' => $now + 900];
        $allowed = $entry['count'] < 5 && (isset($entries[$key]) || count($entries) < 2048);
        if ($allowed) { $entry['count']++; $entries[$key] = $entry; }
        $encoded = json_encode($entries, JSON_THROW_ON_ERROR);
        rewind($handle);
        if (!ftruncate($handle, 0) || fwrite($handle, $encoded) !== strlen($encoded) || !fflush($handle)) throw new RuntimeException('Rate limit write failed');
        return $allowed;
    } finally { flock($handle, LOCK_UN); fclose($handle); }
}

function clarkes_deliver(array $message, string $key): bool
{
    $handle = curl_init('https://api.resend.com/emails');
    if ($handle === false) return false;
    try {
        curl_setopt_array($handle, [
            CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $key, 'Content-Type: application/json'],
            CURLOPT_POSTFIELDS => json_encode($message, JSON_THROW_ON_ERROR),
            CURLOPT_CONNECTTIMEOUT => 5, CURLOPT_TIMEOUT => 12,
            CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
        ]);
        $raw = curl_exec($handle);
        $status = curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
        if ($raw === false || $status < 200 || $status >= 300) return false;
        $result = json_decode($raw, true);
        return is_array($result) && is_string($result['id'] ?? null) && $result['id'] !== '';
    } finally { curl_close($handle); }
}
