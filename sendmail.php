<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/Exception.php';

$mail = new PHPMailer(true);
$mail->CharSet("UTF-8");
$mail->setLanguage('ru', './PHPMailer/language/phpmailer.lang-ru.php');
$mail->isHTML(true);

// от куда отправить 
$mail->setFrom('form@gmail.com', 'Mailer');
// куда отправить 
$mail->addAddress('alibotros@gmail.com', "Rom");
// Тема письма
 $mail->Subject = 'Хочу заказать услугу';


 $trade = "Роздріб"
 if($_POST['retail'] == 'wholesale') {
    $trade = "Оптом"
 }
 //Тело письма
 if (trimm(!empty($_POST['name']))) {
   $body.= '<p><strong>Имя:</strong> '.$_POST['name'].'</p>'
 }
 if (trimm(!empty($_POST['email']))) {
   $body.= '<p><strong>E-mail:</strong> '.$_POST['email'].'</p>'
 }
 if (trimm(!empty($_POST['tel']))) {
   $body.= '<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>'
 }
 if (trimm(!empty($_POST['trade']))) {
   $body.= '<p><strong>Вид закупки:</strong> '.$trade.'</p>'
 }
 if (trimm(!empty($_POST['regions']))) {
   $body.= '<p><strong>Регион:</strong> '.$_POST['regions'].'</p>'
 }
 if (trimm(!empty($_POST['message']))) {
   $body.= '<p><strong>Коментарии:</strong> '.$_POST['message'].'</p>'
 }
 
//  Прикрепить файл

if (!empty($_FILES['image']['tmp_name'])) {
    // Путь загрузки файла
   $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
    //  загрузим файл
    if (copy($_FILES['image']['tmp_name'], $filePath)) {
         $filePath =  $filePath;
         $body.= '<p><strong>FOTO:</strong></p>'
         $mail->addAttachment($fileAttach)
    }
}

$mail->Body = $body;

// Отправляем
if (!$mail->send()) {
   $message = 'Ошибка'
}else {
    $message = 'Письмо отправлено'
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>