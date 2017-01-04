<?php
/**
 * Created by PhpStorm.
 * User: sbreu
 * Date: 4-1-2017
 * Time: 13:16
 *
Look for tweet
results:
- nr of results found
- tweets:
    - content
    - Rumor y/n/unknown
    - Certaintity
    - Related articles (0/1/2)
 */
sleep(1);
$return = array(
    array("text" => "tweet 1 content", "rumor" => "No", "certaintity" => 0.67, "articles" => 1),
    array("text" => "tweet 2 content", "rumor" => "Yes", "certaintity" => 0.89, "articles" => 2),
    array("text" => "tweet 3 content, input data: " . $_GET["query"], "rumor" => "Unsure", "certaintity" => 0.12, "articles" => 1)
);

//$return = array("still","left","to","do",$_GET["query"]);
echo json_encode($return);