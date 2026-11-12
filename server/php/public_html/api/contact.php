<?php
declare(strict_types=1);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Allow: GET, POST');

$private = dirname(__DIR__, 2) . '/clarkes-private';
try {
    if (!is_file($private . '/contact-service.php')) throw new RuntimeException('Missing private service');
    require $private . '/contact-service.php';
    $config = is_file($private . '/contact-config.php') ? require $private . '/contact-config.php' : [];
    if (!is_array($config)) throw new RuntimeException('Invalid configuration');
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($method === 'POST' && !str_starts_with(strtolower($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json')) {
        $status = 415;
        $payload = ['ok' => false, 'error' => 'Please submit enquiries through the website form.'];
    } else {
      // Trust the actual network peer, not client-supplied forwarding headers.
      [$status, $payload] = clarkes_contact(
        $method,
        file_get_contents('php://input', false, null, 0, 32769) ?: '',
        $config,
        static fn(array $message): bool => clarkes_deliver($message, $config['api_key']),
        static fn(): bool => clarkes_rate_limit($private . '/rate-limits.json', $_SERVER['REMOTE_ADDR'] ?? 'unknown'),
        function_exists('curl_init') && is_writable($private)
      );
    }
} catch (Throwable $error) {
    $status = 503;
    $payload = ['ok' => false, 'error' => 'Online enquiries are unavailable. Please email or call the firm.'];
}
http_response_code($status);
echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
