<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    $input = $_POST;
}

$firstName = trim($input['firstName'] ?? $input['First-Name'] ?? '');
$lastName = trim($input['lastName'] ?? $input['Last-Name'] ?? '');
$name = trim($input['name'] ?? trim("$firstName $lastName"));
$phone = trim($input['phone'] ?? $input['Phone'] ?? '');
$email = trim($input['email'] ?? $input['Email'] ?? '');
$subject = trim($input['subject'] ?? 'DelphX Website Inquiry');
$message = trim($input['message'] ?? $input['Your-Message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

$to = 'info@delphx.com';
$email_subject = "Contact Form: $subject";
$email_body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: DelphX Website <noreply@delphx.com>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Thank you! Your submission has been received!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
