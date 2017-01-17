<?php
/**
 * Created by PhpStorm.
 * User: sbreu
 * Date: 4-1-2017
 * Time: 04:33
 */
header('Access-Control-Allow-Origin: *');
$return = array(
    "Facts" => 2.555860446883575,
    "Indicisive" => 19.137593100744805,
    "Rumors" => 78.30654645237162);

echo json_encode($return);