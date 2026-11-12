<?php
// Local test router only; Apache uses public_html/api/.htaccess in production.
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($path === '/api/contact' || $path === '/api/contact.php') {
    require dirname(__DIR__) . '/public_html/api/contact.php';
    return true;
}
http_response_code(404);
echo 'Not found';
