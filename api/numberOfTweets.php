<?php
/**
 * Created by PhpStorm.
 * User: sbreu
 * Date: 3-1-2017
 * Time: 15:16
 */
header('Access-Control-Allow-Origin: *');
echo file_get_contents("http://group1.ga:8081/tweet_count_day/?start=10-10-2016&end=15-11-2016");