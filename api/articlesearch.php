<?php
//looks for articles
sleep(1);

if($_GET["startingPoint"] > 10){
    echo "[]";
}else{
    include("articlesExample.json");
}

