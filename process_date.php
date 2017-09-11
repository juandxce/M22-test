<?php
$access_log = "calendario/acces_log.txt";
$access_data = $_POST['access1'].$_SERVER['REMOTE_ADDR'].$_POST['access2']."\n";
file_put_contents($file,$access_data, FILE_APPEND);

echo 'access_log modificado'.$access_data;
?>
