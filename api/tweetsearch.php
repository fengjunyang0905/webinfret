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
echo file_get_contents("http://group1.ga:8080/SampleApp/getTweetsNotRaw?query=" . $_GET['query'] . "&startingPoint=" . $_GET['startingPoint']);