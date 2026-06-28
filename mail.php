<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://dermech-etc.com');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$name    = strip_tags(trim($_POST['name'] ?? ''));
$company = strip_tags(trim($_POST['company'] ?? ''));
$email   = strip_tags(trim($_POST['email'] ?? ''));
$service = strip_tags(trim($_POST['service'] ?? ''));
$subject = strip_tags(trim($_POST['subject'] ?? 'New inquiry from dermech-etc.com'));
$message = strip_tags(trim($_POST['message'] ?? ''));

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name, email and message are required']);
    exit;
}

$to = 'info@dermech-etc.com';

$headers  = "From: info@dermech-etc.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$body  = "New inquiry from dermech-etc.com\n";
$body .= "================================\n\n";
$body .= "Name:    " . $name    . "\n";
$body .= "Company: " . $company . "\n";
$body .= "Email:   " . $email   . "\n";
$body .= "Service: " . $service . "\n";
$body .= "Subject: " . $subject . "\n\n";
$body .= "Message:\n" . $message . "\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    // Confirmation to customer
    $headers2  = "From: DerMech Solution <info@dermech-etc.com>\r\n";
    $headers2 .= "Reply-To: info@dermech-etc.com\r\n";
    $headers2 .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $subject2 = "Your inquiry has been received — DerMech Solution";

    $body2  = "Dear " . $name . ",\n\n";
    $body2 .= "Thank you for reaching out to DerMech Solution.\n";
    $body2 .= "We have received your inquiry and will respond within 24 business hours.\n\n";
    $body2 .= "─────────────────────────────────\n";
    $body2 .= "YOUR INQUIRY SUMMARY\n";
    $body2 .= "─────────────────────────────────\n";
    $body2 .= "Subject: " . $subject . "\n";
    $body2 .= "Service: " . $service . "\n\n";
    $body2 .= "Message:\n" . $message . "\n";
    $body2 .= "─────────────────────────────────\n\n";
    $body2 .= "If you have urgent questions, contact us directly:\n";
    $body2 .= "info@dermech-etc.com\n\n";
    $body2 .= "Best regards,\n";
    $body2 .= "DerMech Solution | 德機智造\n";
    $body2 .= "Engineering Beyond Boundaries\n";
    $body2 .= "https://dermech-etc.com\n";

    mail($email, $subject2, $body2, $headers2);

    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>
