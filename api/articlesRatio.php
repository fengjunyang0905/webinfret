<?php
/**
 * Created by PhpStorm.
 * User: sbreu
 * Date: 4-1-2017
 * Time: 04:33
 */
header('Access-Control-Allow-Origin: *');

//note: data is correct, choose to do this hardcoded because querying takes too long (multiple minutes)
$latimes = 19303;
$wash_post = 57727;
$wash_times = 20386;
$wsj = 47205;
$huffpost = 51018;
$sum = $latimes + $wash_post + $wash_times + $wsj + $huffpost;


$return = array(
    "Washington Post" => ($wash_post / $sum * 100),
    "LA Times " => ($latimes / $sum * 100),
    "Washington Times" => ($wash_times / $sum * 100),
    "Huffington Post" => ($huffpost / $sum * 100),
    "Wall Street Journal" => ($wsj / $sum * 100)
);

echo json_encode($return);