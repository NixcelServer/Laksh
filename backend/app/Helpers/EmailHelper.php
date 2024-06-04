<?php

namespace App\Helpers;
use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Illuminate\Support\Facades\Config;
use App\Models\EmailSetting;
use Dompdf\Dompdf;
use Smalot\PdfParser\Parser;





class EmailHelper{

   

    



    public static function sendEmail($emails=null,$companyDetails,$post=null)
{

     // Create a new PHPMailer instance
     $mail = new PHPMailer(true); // Enable exceptions

     // Set SMTP server settings
     $mail->isSMTP();
     $mail->Host = 'smtp.gmail.com'; // Change this to your SMTP host
     $mail->Port = '587'; // Change this to your SMTP port
     $mail->SMTPAuth = true;
     $mail->Username = 'jagtapsaurabh74@gmail.com'; // Change this to your SMTP username
     $mail->Password = 'isnvhwsotwkmdswm'; // Change this to your SMTP password

    //used to send mail to the admin when user uploads an advertisement image
    if($post === null){
        $adminEmail = 'harshal.mandale@nixcelsoft.com';
        $mail->setFrom($mail->Username, 'Laksh');
        $mail->addAddress($adminEmail);

        $subject = "New Advertisement Image Posted";
    $message = "A new advertisement image has been posted by:\n\n";
   
    $message .= "Company Name: " . $companyDetails->c_name . "\n";
    $message .= "Please do check. " ;

    $mail->Subject = $subject;
    $mail->Body = $message;
  //  $message .= "Email: " . $company->c_email . "\n";
    // $message .= "Contact No: " . $company->contact_no . "\n";

    $mail->isHTML(false); // Set email format to plain text
    $mail->Body = $message;

    $mail->send();
    }

    //used when a user posts a requirement
    if($post !== null){
    // Fetch admin email from configuration or database
    $adminEmail = 'donotreply@laksh.com'; // Change this to your actual admin email address
    
         // Set sender and recipient
    $mail->setFrom($mail->Username, 'Laksh');
    $mail->addAddress($adminEmail);
    foreach ($emails as $email) {
        $mail->addBCC($email);
    }

    $subject = "New Requirement Posted";
    $message = "A new requirement has been posted:\n\n";
    $message .= "Product Name: " . $post->prod_name . "\n";
    $message .= "Company Name: " . $companyDetails->c_name . "\n";

    $mail->Subject = $subject;
    $mail->Body = $message;
  //  $message .= "Email: " . $company->c_email . "\n";
    // $message .= "Contact No: " . $company->contact_no . "\n";

    $mail->isHTML(false); // Set email format to plain text
    $mail->Body = $message;

    $mail->send();
    }

    
   

    // You can also fetch SMTP settings from a database if needed

   

    return response()->json(['message' => 'Admin Email sent successfully'], 200);
}

   
}    

?>