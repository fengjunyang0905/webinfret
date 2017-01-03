<?php
/**
 * Created by PhpStorm.
 * User: sbreu
 * Date: 3-1-2017
 * Time: 15:16
 */

$return = array(
    "Jan 2016" => rand(1,1000),
    "Feb 2016" => rand(1,1000),
    "Mar 2016" => rand(1,1000),
    "Apr 2016" => rand(1,1000),
    "May 2016" => rand(1,1000),
    "Jun 2016" => rand(1,1000),
    "Jul 2016" => rand(1,1000),
    "Aug 2016" => rand(1,1000),
    "Sep 2016" => rand(1,1000),
    "Oct 2016" => rand(1,1000),
    "Nov 2016" => rand(1,1000),
    "Dec 2016" => rand(1,1000));

echo json_encode($return);