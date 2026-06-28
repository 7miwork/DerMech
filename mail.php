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

// Load PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// ── 1. Email to DerMech ──────────────────────────────────────
try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@dermech-etc.com';
    $mail->Password   = 'DEIN_EMAIL_PASSWORT';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('info@dermech-etc.com', 'DerMech Solution');
    $mail->addAddress('info@dermech-etc.com', 'DerMech Solution');
    $mail->addReplyTo($email, $name);

    $mail->Subject = $subject;
    $mail->Body    =
        "New inquiry from dermech-etc.com\n" .
        "================================\n\n" .
        "Name:    " . $name    . "\n" .
        "Company: " . $company . "\n" .
        "Email:   " . $email   . "\n" .
        "Service: " . $service . "\n" .
        "Subject: " . $subject . "\n\n" .
        "Message:\n" . $message . "\n";

    $mail->send();

    // ── 2. Confirmation to customer ──────────────────────────
    $mail2 = new PHPMailer(true);
    $mail2->isSMTP();
    $mail2->Host       = 'smtp.hostinger.com';
    $mail2->SMTPAuth   = true;
    $mail2->Username   = 'info@dermech-etc.com';
    $mail2->Password   = 'JtMl$2027';
    $mail2->SMTPSecure = 'ssl';
    $mail2->Port       = 465;
    $mail2->CharSet    = 'UTF-8';

    $mail2->setFrom('info@dermech-etc.com', 'DerMech Solution');
    $mail2->addAddress($email, $name);
    $mail2->addReplyTo('info@dermech-etc.com', 'DerMech Solution');

    $mail2->Subject = 'Your inquiry has been received — DerMech Solution';
    $mail2->Body    =
        "Dear " . $name . ",\n\n" .
        "Thank you for reaching out to DerMech Solution.\n" .
        "We have received your inquiry and will respond within 24 business hours.\n\n" .
        "─────────────────────────────────\n" .
        "YOUR INQUIRY SUMMARY\n" .
        "─────────────────────────────────\n" .
        "Subject: " . $subject . "\n" .
        "Service: " . $service . "\n\n" .
        "Message:\n" . $message . "\n" .
        "─────────────────────────────────\n\n" .
        "If you have urgent questions, contact us directly:\n" .
        "info@dermech-etc.com\n\n" .
        "Best regards,\n" .
        "DerMech Solution | 德機智造\n" .
        "Engineering Beyond Boundaries\n" .
        "https://dermech-etc.com\n";

    $mail2->send();

    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mailer error: ' . $e->getMessage()]);
}
?>