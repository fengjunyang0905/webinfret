/**
 * Created by sbreu on 4-1-2017.
 */
$(function(){

    var api_root = "api/";
    //api urls for clusters, articles and tweet searches
    //var api_urls = new Array("getArticles","getTweets");
    var api_urls = new Array("tweet_cluster.php","articlesearch.php","tweetsearch.php");

    //Tweet search

    //countdown for auto search
    var typingTimer;                //timer identifier
    var doneTypingInterval = 500;  //time in ms
    var $input = $('#tweetsearcher');

    //on keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(searchTweets, doneTypingInterval);
    });

    //on keydown, clear the countdown
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    $('input[type=radio][name=SearchWhat]').change(function() {
        searchTweets();
    });

    var isLoading = false;//variable used to block loading request if we're already loading

    function showLoad(){
        isLoading = true;
        $("#searchResults").append('<li class="list-group-item" id="loading"><i class="fa fa-spinner fa-spin"></i> Loading</li></ul>');
    }

    function hideLoad(){
        isLoading = false;
        $( "#loading" ).remove();
    }

    function appendCluster(data){
        //adds a cluster
        $("#searchResults").append('<li class="list-group-item">' + JSON.stringify(data) + '</li>');

    }

    function appendArticle(title, published_date, description, link){
        //adds an article to the seach results
        $("#searchResults").append('<li class="list-group-item">' +
            '<a href="' + link + '" target="_blank" style="font-weight: bold;">' + title + '</a><br>' +
            '<div style="font-size: 11px;">Published on: <span style="color: #1c4acc">' + published_date + '</span></div>' +
            '<div style="width: 900px;">' + description + '</div>' +
            '<a href="' + link + '" target="_blank" style="color: #43a016; font-size: 11px;">' + link + '</a></li>');
    }

    function appendTweet(tweet,timestamp,userid,text,tweetID,data){
        timestamp = Math.floor(timestamp / 1000);//to enforce 3 zeros at the end
        var date = new Date(timestamp * 1000);//timestamp
        var dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        tweetID = tweetID.substring(1);//remove the t from the tweetID
        var link = "https://twitter.com/statuses/" + tweetID;
        if($.isNumeric(timestamp) && $.isNumeric(tweetID)){
            //only proceed if both timestamp or tweetID are numberic, otherwise data is flawed (this happens sometimes)
            $("#searchResults").append('<li class="list-group-item">' +
                '<div style="font-size: 11px;">Tweeted on: <span style="color: #1c4acc">' + dateString + '</span></div>' +
                '<div style="width: 900px;">' + userid + ': ' +  text + '</div>' +
                '<a href="' + link + '" target="_blank" style="color: #43a016; font-size: 11px;">' + link + '</a></li>' +
                //JSON.stringify(data) +
                '</li>');
        }
    }

    var curSearch, curQuery, curStartingPoint, hasMore;

    //user is "finished typing," do something
    function searchTweets () {
        hasMore = true;
        curQuery = $input.val();
        curStartingPoint = 0;

        if($input.val() != ""){

            //clear list and show loading icon
            $("#searchResults").html("");
            isLoading = true;
            showLoad();

            if($('input[name=SearchWhat]:checked').val() == "clusters") {
                //article search
                curSearch = api_urls[0];
                $.getJSON(api_root + curSearch + "?query=" +  encodeURIComponent($input.val()) + "&startingPoint=0", function( data ) {
                    //data received
                    hideLoad();
                    data = data['results'];
                    for (var cluster in data) {
                        appendCluster(data[cluster]);
                    }
                });
            }else if($('input[name=SearchWhat]:checked').val() == "articles") {
                //article search
                curSearch = api_urls[1];
                $.getJSON(api_root + curSearch + "?query=" +  encodeURIComponent($input.val()) + "&startingPoint=0", function( data ) {
                    //data received
                    hideLoad();
                    for (var result in data) {
                        appendArticle(data[result]["title"],data[result]["published_date"],data[result]["description"],data[result]["link"]);
                    }
                });
            }else if($('input[name=SearchWhat]:checked').val() == "tweets") {
                //tweet search
                curSearch = api_urls[2];

                $.getJSON(api_root + curSearch + "?query=" +  encodeURIComponent($input.val()) + "&startingPoint=0", function( data ) {
                    //data receieved
                    hideLoad();
                    for(var tweet in data){
                        appendTweet(tweet,data[tweet]["timestamp"],data[tweet]["userID"],data[tweet]["fullText"],data[tweet]["tweetID"],data[tweet]);
                    }
                });
            }
        }else{
            $("#searchResults").html('<li class="list-group-item">Please enter a search query to get results.</li>');
        }
    }

    //load more search results if needed
    $( "#searchResultsDiv" ).scroll(function() {
        if($( "#searchResults" ).height()  - $( "#searchResultsDiv" ).scrollTop()  < 1000 && hasMore && !isLoading){//only load more if there are more and we're not loading anything at this moment.
            showLoad();
            curStartingPoint++;

            $.getJSON(api_root + curSearch + "?query=" +  encodeURIComponent($input.val()) + "&startingPoint=" + curStartingPoint, function( data ) {
                hideLoad();

                if(Object.keys(data).length == 0){
                    //done with all results
                    hasMore = false;
                }

                if(curSearch.indexOf("article") != -1){
                    //load article results
                    for (var result in data) {
                        appendArticle(data[result]["title"],data[result]["published_date"],data[result]["description"],data[result]["link"]);
                    }
                }else {
                    //load tweet results
                    for(var tweet in data){
                        appendTweet(tweet,data[tweet]["timestamp"],data[tweet]["userID"],data[tweet]["fullText"],data[tweet]["tweetID"],data[tweet]);
                    }
                }
            });
        }
    });

    //graph: number of tweets
    var numberOfTweetsOptions = {
        series: {
            lines: {
                show: true,
                lineWidth: 1,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.3
                    }, {
                        opacity: 0.3
                    }]
                }
            },
            points: {
                radius: 3,
                show: true
            },
            shadowSize: 2
        },
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#f0f0f0",
            borderWidth: 1,
            color: '#f0f0f0'
        },
        colors: ["#1bb399"],
        xaxis:{
            mode: "categories"
        },
        yaxis: {
            ticks: 5
        },
        tooltip: true,
        tooltipOpts: {
            content: "Number of tweets in %x: %y",
            defaultTheme: false,
            shifts: {
                x: 0,
                y: 20
            }
        }
    };

    //$.getJSON(api_root + "api/tweet_count_week/?start=2016%2040&end=2016%2041", function( data ) {
    $.getJSON(api_root + "numberOfTweets.php", function( data ) {
        var nrtweets = [];
        for(var point in data){
            nrtweets.push([point,data[point]]);
        }

        $("#number-of-tweets").length && $.plot($("#number-of-tweets"), [{ data: nrtweets}], numberOfTweetsOptions );
    });

    //rumor ratio chart

    var rumorRatioOptions = {
        series: {
            pie: {
                innerRadius: 0.4,
                show: true,
                stroke: {
                    width: 0
                },
                label: {
                    show: true,
                    threshold: 0.05
                },
                grow: {
                    active: true,
                    steps: 50
                }
            }
        },
        colors: ["#1ccc88","#b4b4b4","#e33244"],
        grid: {
            hoverable: true,
            clickable: false
        },
        tooltip: true,
        tooltipOpts: {
            defaultTheme: false,
            content: "%s: %p.0%",
            shifts: {
                x: 0,
                y: 20
            }
        }
    };

    $.getJSON(api_root + "rumorRatio.php", function( data ) {
        var rumorRatio = [];
        for(var point in data){
            rumorRatio.push({label: point, data: data[point]});
        }
        $("#rumor-ratio").length && $.plot($("#rumor-ratio"), rumorRatio, rumorRatioOptions  );
    });

    //amount of articles chart

    var rawdata = [ ["January", 10], ["February", 8], ["March", 4], ["April", 13], ["May", 17], ["June", 9] ];

    var ArticlesAmountOptions = {
        series: {
            bars: {
                show: true,
                barWidth: 0.6,
                align: "center",
                lineWidth: 1
            },
            fill: true,
            fillColor: {
                colors: [{
                    opacity: 0.3
                }, {
                    opacity: 0.3
                }]
            }
        },
        xaxis: {
            mode: "categories",
            tickLength: 0
        },
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#f0f0f0",
            borderWidth: 1,
            color: '#f0f0f0'
        },
        colors: ["#fcc633"],
        tooltip: true,
        tooltipOpts: {
            defaultTheme: false,
            content: "%x: %y articles",
            shifts: {
                x: 0,
                y: 20
            }
        }
    };

    $.getJSON(api_root + "articlesAmount.php", function( data ) {
        var amounts = [];
        for(var point in data){
            amounts.push([point, data[point]]);
        }
        $.plot("#articles-amount", [ amounts ], ArticlesAmountOptions);
    });

    //articles ratio chart

    var articlesRatioOptions = {
        series: {
            pie: {
                innerRadius: 0.4,
                show: true,
                stroke: {
                    width: 0
                },
                label: {
                    show: true,
                    threshold: 0.05
                },
                grow: {
                    active: true,
                    steps: 50
                }
            }
        },
        grid: {
            hoverable: true,
            clickable: false
        },
        colors: ["#1ccacc","#1ccc88","#e33244","#fcc633","#cc1cca"],
        tooltip: true,
        tooltipOpts: {
            defaultTheme: false,
            content: "%s: %p.0%",
            shifts: {
                x: 0,
                y: 20
            }
        }
    };

    $.getJSON(api_root + "articlesRatio.php", function( data ) {
        var rumorRatio = [];
        for(var point in data){
            rumorRatio.push({label: point, data: data[point]});
        }
        $("#articles-ratio").length && $.plot($("#articles-ratio"), rumorRatio, articlesRatioOptions  );
    });

});