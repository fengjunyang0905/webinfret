<?php
/**
 * Created by PhpStorm.
 * User: sbreu
 * Date: 4-1-2017
 * Time: 04:33
 */
header('Access-Control-Allow-Origin: *');
$return = array(
    "Yes" => 10,
    "Unsure" => 30,
    "No" => 60);

echo json_encode($return);