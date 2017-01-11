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
include("tweetsexample.json");
die();

$return = array(
    array("userid" => 1001, "text" => "tweet 1 content", "rumor" => "No", "certaintity" => 0.67, "articles" => array("http://www.washingtontimes.com/news/2016/oct/17/the-russian-enigma-and-the-us-election/")),
    array("userid" => 1002, "text" => "tweet 2 content", "rumor" => "Yes", "certaintity" => 0.89, "articles" => array("http://www.washingtontimes.com/news/2016/oct/21/brian-babin-defends-donald-trump-a-lady-needs-to-b/","http://www.wsj.com/articles/denial-of-service-web-attack-affects-amazon-twitter-others-1477056080")),
    array("userid" => 1003, "text" => "tweet 3 content, input data: " . $_GET["query"], "rumor" => "Unsure", "certaintity" => 0.12, "articles" => array()),
    array("userid" => 1004, "text" => print_r($_GET,true), "rumor" => "Unsure", "certaintity" => 0.12, "articles" => array())
);

echo json_encode($return);
