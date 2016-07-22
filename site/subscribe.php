<?php
if ( isset($_POST['email']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ) {
      
      $e_mail = $_POST['email'] . "," . "\n";
	  file_put_contents('subscribers-list.txt', $e_mail, FILE_APPEND | LOCK_EX);
}
?>