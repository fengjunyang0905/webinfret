<?php
//looks for articles

//in case Adrian fixes his code, remove the current code and replace with: echo file_get_contents("group1.ga:8080/SampleApp/getArticles?query=" . $_GET['query'] . "&startingPoint=" . $_GET['startingPoint']);

sleep(1);

if($_GET["startingPoint"] > 10){
    echo "[]";
}else{
    include("articlesExample.json");
}

