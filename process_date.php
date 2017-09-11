<?php
$access_log = 'calendario/access_log.txt';
// write into the log file
$myfile = fopen($access_log, "a") or die("Unable to open file!");
$access_data =  $_POST['access1'].$_SERVER['REMOTE_ADDR'].$_POST['access3']."\n";
fwrite($myfile, "\n". $access_data);
fclose($myfile);

echo 'access_log modificado'.$access_data;
?>
