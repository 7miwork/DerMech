<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://dermech-etc.com');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$subject = strip_tags(trim($_POST['subject'] ?? 'New inquiry from dermech-etc.com'));
$message = strip_tags(trim($_POST['message'] ?? ''));

if (empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Message is required']);
    exit;
}

$to = 'info@dermech-etc.com';
$headers = "From: noreply@dermech-etc.com\r\n";
$headers .= "Reply-To: info@dermech-etc.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$body = "New inquiry from dermech-etc.com\n";
$body .= "================================\n\n";
$body .= "Subject: " . $subject . "\n\n";
$body .= "Message:\n" . $message . "\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>
