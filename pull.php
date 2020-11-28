<?php
chdir('/var/www/html/overlays');
$output = shell_exec('git pull origin master');
echo $output;
