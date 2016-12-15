<?php
/**
 * Script to run for the frontend
 *
 * statistics
 *
 * User: Dennis
 * Date: 5-12-2016
 * Time: 15:19
 */

ini_set( 'error_reporting', 0 ); // disable errors
date_default_timezone_set( 'Europe/Amsterdam' );
header( 'Content-type:application/json;charset=utf-8' ); // specifiy that it returns JSON
header( 'Access-Control-Allow-Origin:*' ); // specifiy that it returns to all domains

// dummy function, should be replaced by operational code, or endpoint should be replaced
function dummy_get_random_tweets( $N ) {
    $a      = [
        "red",
        "green",
        "blue",
        "yellow",
        "brown",
        "Who",
        "Needs",
        "Sundance",
        "When",
        "You’ve",
        "Got",
        "Crowdfunding",
        "?",
        '#',
        '"',
        "'",
        'Hello'
    ];
    $i      = 0;
    $tweets = [];
    while ( $i ++ <= $N ) {
        $random_keys = array_rand( $a, 3 );
        $tweets[]    = [
            'title'       => $a[ $random_keys[0] ] . ' ' . $a[ $random_keys[1] ] . ' ' . $a[ $random_keys[2] ],
            'text'        => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis pellentesque metus. Suspendisse at porta odio. Duis vitae enim nec erat pretium eleifend eu sit amet orci. Integer in erat eu risus varius dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer interdum, massa eu dapibus laoreet, orci diam condimentum sapien, vel tincidunt diam leo feugiat velit. Maecenas sed orci in ex vulputate egestas. Aenean non ullamcorper lacus, vitae cursus nibh. Aliquam hendrerit feugiat elit, ac posuere erat sollicitudin ac. Nam porta, ex et eleifend posuere, nibh lectus cursus libero, dapibus ultricies sem eros in nulla. Sed ultricies eleifend lorem. Fusce a efficitur metus. Sed facilisis dolor libero, vitae condimentum neque aliquam eget. Aenean lobortis tellus et libero volutpat tristique.',
            'date'        => date( 'c', strtotime( '-' . rand( 0, 400 ) . ' seconds' ) ),
            'author_name' => $a[ array_rand( $a ) ],
            'author_link' => 'http://www.w3schools.com/php/default.asp',
            'attribute_1' => rand( 0, 1000 ),
            'attribute_2' => rand( - 1000, 1000 ),
            'attribute_3' => rand( 5, 1000 )
        ];
    }

    return $tweets;
}

if ( ! isset( $_GET['call'] ) ) {
    http_response_code( 400 );
    echo json_encode( [ 'message' => 'no GET parameter named `call` found' ] );
} else if ( $_GET['call'] == 'statistics' ) {
    echo json_encode( [
        'rumor_percentage' => [
            'true_rumor_percentage'  => 30,
            'false_rumor_percentage' => 40,
            'other_rumor_percentage' => 30,
        ],
        'rumor_counts'     => [
            'tweet_true_rumor'  => 125230,
            'tweet_false_rumor' => intval( 125230 / 30 * 40 ), // pick 40% as integer
            'tweet_other_rumor' => 125230,
            'tweets'            => intval( 125230 / 30 * 100 ),
            'articles'          => 153,
        ],
        'tweet_histogram'  => [
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 0, date( "Y" ) ) ), 'freq' => 40 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 1, date( "Y" ) ) ), 'freq' => 50 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 2, date( "Y" ) ) ), 'freq' => 4 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 3, date( "Y" ) ) ), 'freq' => 99 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 4, date( "Y" ) ) ), 'freq' => 78 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 5, date( "Y" ) ) ), 'freq' => 43 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 6, date( "Y" ) ) ), 'freq' => 65 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 7, date( "Y" ) ) ), 'freq' => 56 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 8, date( "Y" ) ) ), 'freq' => 11 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 9, date( "Y" ) ) ), 'freq' => 0 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 10, date( "Y" ) ) ), 'freq' => 48 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 11, date( "Y" ) ) ), 'freq' => 99 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 12, date( "Y" ) ) ), 'freq' => 65 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 13, date( "Y" ) ) ), 'freq' => 99 ],
            [ 'date' => date( 'c', mktime( 0, 0, 0, date( "m" ), date( "d" ) - 14, date( "Y" ) ) ), 'freq' => 89 ]
        ],
        'rumor_histogram' => [// 30
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-0, date("Y"))), 'freq_true' => 40, 'freq_false' => 41, 'freq_other' => 3],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-1, date("Y"))), 'freq_true' => 44, 'freq_false' => 42, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-2, date("Y"))), 'freq_true' => 47, 'freq_false' => 45, 'freq_other' => 53],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-3, date("Y"))), 'freq_true' => 48, 'freq_false' => 46, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-4, date("Y"))), 'freq_true' => 41, 'freq_false' => 48, 'freq_other' => 33],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-5, date("Y"))), 'freq_true' => 47, 'freq_false' => 49, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-6, date("Y"))), 'freq_true' => 48, 'freq_false' => 40, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-7, date("Y"))), 'freq_true' => 49, 'freq_false' => 44, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-8, date("Y"))), 'freq_true' => 50, 'freq_false' => 47, 'freq_other' => 23],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-9, date("Y"))), 'freq_true' => 79, 'freq_false' => 50, 'freq_other' => 13],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-10, date("Y"))), 'freq_true' => 50, 'freq_false' => 41, 'freq_other' => 3],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-11, date("Y"))), 'freq_true' => 54, 'freq_false' => 42, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-12, date("Y"))), 'freq_true' => 57, 'freq_false' => 45, 'freq_other' => 53],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-13, date("Y"))), 'freq_true' => 58, 'freq_false' => 46, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-14, date("Y"))), 'freq_true' => 51, 'freq_false' => 48, 'freq_other' => 33],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-15, date("Y"))), 'freq_true' => 57, 'freq_false' => 49, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-16, date("Y"))), 'freq_true' => 58, 'freq_false' => 40, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-17, date("Y"))), 'freq_true' => 59, 'freq_false' => 44, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-18, date("Y"))), 'freq_true' => 50, 'freq_false' => 47, 'freq_other' => 23],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-19, date("Y"))), 'freq_true' => 79, 'freq_false' => 50, 'freq_other' => 13],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-20, date("Y"))), 'freq_true' => 80, 'freq_false' => 41, 'freq_other' => 3],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-21, date("Y"))), 'freq_true' => 84, 'freq_false' => 42, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-22, date("Y"))), 'freq_true' => 87, 'freq_false' => 45, 'freq_other' => 53],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-23, date("Y"))), 'freq_true' => 88, 'freq_false' => 46, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-24, date("Y"))), 'freq_true' => 81, 'freq_false' => 48, 'freq_other' => 33],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-25, date("Y"))), 'freq_true' => 87, 'freq_false' => 49, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-26, date("Y"))), 'freq_true' => 88, 'freq_false' => 40, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-27, date("Y"))), 'freq_true' => 9, 'freq_false' => 44, 'freq_other' => 43],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-28, date("Y"))), 'freq_true' => 0, 'freq_false' => 47, 'freq_other' => 23],
            ['date' => date('c', mktime(0, 0, 0, date("m"), date("d")-29, date("Y"))), 'freq_true' => 2, 'freq_false' => 50, 'freq_other' => 13],
        ]
    ] );
} else if ( $_GET['call'] == 'latest' ) {
    echo json_encode( dummy_get_random_tweets( 10 ) );
} else if ( $_GET['call'] == 'tweets' ) {
    echo json_encode( dummy_get_random_tweets( 50 ) );
} else if ( $_GET['call'] == 'query' ) {
    if ( ! isset( $_GET['query'] ) ) {
        http_response_code( 400 );
        echo json_encode( [ 'message' => 'no GET parameter named `query` found' ] );
    } else {
        echo json_encode( [ 'result' => dummy_get_random_tweets( 20 ), 'query' => $_GET['query'] ] );
    }
} else {
    http_response_code( 400 );
    echo json_encode( [ 'message' => "no API endpoint exists for {$_GET['call']}" ] );
}
