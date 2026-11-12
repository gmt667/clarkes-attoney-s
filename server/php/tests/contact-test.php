<?php
declare(strict_types=1);
require dirname(__DIR__) . '/clarkes-private/contact-service.php';
$passed = 0;
function check(bool $condition, string $label): void {
    global $passed;
    if (!$condition) throw new RuntimeException('FAIL: ' . $label);
    $passed++; echo 'PASS: ' . $label . PHP_EOL;
}
$valid = ['name' => 'Test Client', 'email' => 'client@example.com', 'phone' => '+265999000000', 'subject' => 'Test enquiry', 'legalService' => 'Litigation', 'message' => 'This is a synthetic enquiry for testing only.', 'company' => '', 'startedAt' => '0'];
$config = ['api_key' => 'test-only', 'from' => 'Tests <test@example.com>'];
$sent = [];
$send = static function (array $message) use (&$sent): bool { $sent[] = $message; return true; };
$allow = static fn(): bool => true;
$raw = json_encode($valid);
check(clarkes_contact('GET', '', [], $send, $allow)[0] === 503, 'unconfigured GET returns JSON failure');
check(clarkes_contact('GET', '', $config, $send, $allow)[0] === 200, 'configured availability');
check(clarkes_contact('GET', '', $config, $send, $allow, false)[0] === 503, 'missing transport disables service');
check(clarkes_contact('DELETE', '', $config, $send, $allow)[0] === 405, 'method rejection');
check(clarkes_contact('POST', '{broken', $config, $send, $allow)[0] === 400, 'invalid JSON rejection');
check(clarkes_contact('POST', json_encode(['email' => 'bad']), $config, $send, $allow)[1]['details']['email'] !== [], 'field validation');
check(clarkes_contact('POST', str_repeat('a', 32769), $config, $send, $allow)[0] === 413, 'body size limit');
check(clarkes_contact('POST', json_encode(array_replace($valid, ['company' => 'spam'])), $config, $send, $allow)[0] === 400, 'honeypot rejection');
check(clarkes_contact('POST', json_encode(array_replace($valid, ['startedAt' => (string)(microtime(true) * 1000)])), $config, $send, $allow)[0] === 400, 'fast submission rejection');
check(clarkes_contact('POST', $raw, [], $send, $allow)[0] === 503 && count($sent) === 0, 'missing configuration never sends');
check(clarkes_contact('POST', $raw, $config, $send, static fn(): bool => false)[0] === 429, 'rate limit refusal');
check(clarkes_contact('POST', $raw, $config, static fn(): bool => false, $allow)[0] === 502, 'provider failure never reports success');
check(clarkes_contact('POST', $raw, $config, $send, $allow)[1]['ok'] === true, 'synthetic successful submission');
check($sent[0]['to'] === ['info@clarkesattorneys.mw', 'geoffrey@clarkesattorneys.mw'] && $sent[0]['reply_to'] === 'client@example.com', 'both recipients and reply address');
$file = tempnam(sys_get_temp_dir(), 'clarkes-test-');
try {
    for ($i = 0; $i < 5; $i++) check(clarkes_rate_limit($file, '192.0.2.1', 1000), 'allowed rate attempt ' . ($i + 1));
    check(!clarkes_rate_limit($file, '192.0.2.1', 1001), 'sixth attempt refused');
    check(clarkes_rate_limit($file, '192.0.2.2', 1001), 'separate peer allowed');
    check(clarkes_rate_limit($file, '192.0.2.1', 1901), 'window expiry');
} finally { unlink($file); }
echo "$passed checks passed. No email sent.\n";
