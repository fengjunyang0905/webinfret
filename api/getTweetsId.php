<?php
/**
 * Created by PhpStorm.
 * User: sbreu
 * Date: 14-1-2017
 * Time: 11:49
 */
header('Access-Control-Allow-Origin: *');

//fix as javascript can't access external domains, but PHP can
echo file_get_contents("http://group1.ga:8080/SampleApp/getTweetsId?id=" . $_GET['id']);