<?php
//looks for articles
header('Access-Control-Allow-Origin: *');

//in case Adrian fixes his code, remove the current code and replace with:
echo file_get_contents("http://group1.ga:8080/SampleApp/getArticles?query=" . $_GET['query'] . "&startingPoint=" . $_GET['startingPoint']);
