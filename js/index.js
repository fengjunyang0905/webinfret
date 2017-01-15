/**
 * Created by sbreu on 4-1-2017.
 */
$(function () {

    var api_index_root = "http://group1.ga:8080/SampleApp/";
    var api_php_root = "http://group1.ga/api/"; //tweet_cluster
    var api_cluster_root = "http://group1.ga:8081/"; //tweet_cluster

    //api urls for clusters, articles and tweet searches
    //var api_urls = new Array("getArticles","getTweets");
    var api_urls = new Array("tweet_cluster.php", "getArticlesId", "getTweetsNotRaw");

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

    $('input[type=radio][name=SearchWhat]').change(function () {
        searchTweets();
    });

    var isLoading = false;//variable used to block loading request if we're already loading

    function showLoad() {
        isLoading = true;
        $("#searchResults").append('<li class="list-group-item" id="loading"><i class="fa fa-spinner fa-spin"></i> Loading</li></ul>');
    }

    function hideLoad() {
        isLoading = false;
        $("#loading").remove();
    }

    function appendCluster(data) {
        //adds a cluster
        data = data[0];
        var tweets = "";


        //article info ophalen
        $.ajax({
            dataype: "json",
            url: api_index_root + "getArticlesId?id=" + encodeURIComponent(data["article"]),
            success: function (article) {
                var articleLink = '<a href="' + article[0]['link'] + '" target="_blank">' + article[0]['title'] + '</a>';

                $("#searchResults").append('<li class="list-group-item">' +
                    'Article: ' + articleLink + '<br>' +
                    'Rumor ratio: ' + data["rumor_ration"] + '<br>' +
                    'Url: <a href="' + data["url"] + '" target="_blank">' + data["url"] + '</a><br>' +
                    'Tweets: <div style="margin: 0 0 0 50px" id="cluster_' + data["article"] + '">Loading</div>');

                $("#searchResults").append('</li>');
            },
            async: false
        });


        for (var tweet in data["tweets"]) {
            //IDF sum:  data["tweets"][tweet]["attributes"][0]["value"]
            $.getJSON(api_index_root + "getTweetsId?id=" + encodeURIComponent(data["tweets"][tweet]["tweet"]), function (tweet) {
                if (tweet.length > 0) {
                    //skip empty results
                    if ($('#cluster_' + data["article"]).html() == "Loading") {
                        $('#cluster_' + data["article"]).html("");
                    }
                    //todo: decent layout
                    tweet = tweet[0];
                    var link = "https://twitter.com/statuses/" + tweet["tweetID"].substring(1);

                    $('#cluster_' + data["article"]).append(
                        '<b>Tweet:</b> <a href="' + link + '" target="_blank">' + tweet["fullText"] + "</a><br>"
                    );
                }
            });
        }
    }

    function appendArticle(title, published_date, description, link) {
        //adds an article to the seach results
        $("#searchResults").append('<li class="list-group-item">' +
            '<a href="' + link + '" target="_blank" style="font-weight: bold;">' + title + '</a><br>' +
            '<div style="font-size: 11px;">Published on: <span style="color: #1c4acc">' + published_date + '</span></div>' +
            '<div style="width: 900px;">' + description + '</div>' +
            '<a href="' + link + '" target="_blank" style="color: #43a016; font-size: 11px;">' + link + '</a></li>');
    }

    function appendTweet(timestamp, text, tweetID) {
        timestamp = Math.floor(timestamp / 1000);//to enforce 3 zeros at the end
        var date = new Date(timestamp * 1000);//timestamp
        var dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        tweetID = tweetID.substring(1);//remove the t from the tweetID
        var link = "https://twitter.com/statuses/" + tweetID;
        if ($.isNumeric(timestamp) && $.isNumeric(tweetID)) {
            //only proceed if both timestamp or tweetID are numberic, otherwise data is flawed (this happens sometimes)
            $("#searchResults").append('<li class="list-group-item">' +
                '<div style="font-size: 11px;">Tweeted on: <span style="color: #1c4acc">' + dateString + '</span></div>' +
                '<div style="width: 900px;">' + text + '</div>' +
                '<a href="' + link + '" target="_blank" style="color: #43a016; font-size: 11px;">' + link + '</a></li>' +
                //JSON.stringify(data) +
                '</li>');
        }
    }

    var curSearch, curQuery, curStartingPoint, hasMore;


    function getArticleOrAppendCluster(article) {
        return function (data) {
            //$.getJSON(api_php_root + "tweet_cluster.php?id=" + encodeURIComponent(article['id']), function (data) {
            if (data.data.length == 0) {
                console.log("No cluster found for article " + article['id'] + ' try: r666892219 (iraq rejects turkish role in mosul battle as forces advance toward city) (https://www.washingtonpost.com/news/checkpoint/wp/2016/10/22/iraq-rejects-turkish-role-in-mosul-battle-as-forces-advance-toward-city)');
                $.getJSON(api_index_root + "getArticlesId?id=" + encodeURIComponent(article['id']) + "&startingPoint=0", function (data) {
                    data = data[0];
                    appendArticle(data["title"], data["published_date"], data["description"], data["link"]);
                });
            } else {
                appendCluster(data.data);
            }
        };
    }

//user is "finished typing," do something
    function searchTweets() {
        hasMore = true;
        curQuery = $input.val();
        curStartingPoint = 0;

        if ($input.val() != "") {

            //clear list and show loading icon
            $("#searchResults").html("");
            isLoading = true;
            showLoad();

            if ($('input[name=SearchWhat]:checked').val() == "clusters") {
                // cluster search

                $.getJSON(api_index_root + "getArticles?query=" + encodeURIComponent($input.val()) + "&startingPoint=0", function (data) {
                    //data received
                    hideLoad();
                    var index;
                    for (index = 0; index < data.length; ++index) {
                        var article = data[index];
                        $.getJSON(api_cluster_root + "tweet_cluster/?article=" + encodeURIComponent(article['id']), getArticleOrAppendCluster(article));
                    }
                });
            } else if ($('input[name=SearchWhat]:checked').val() == "articles") {
                //article search
                $.getJSON(api_index_root + "getArticles?query=" + encodeURIComponent($input.val()) + "&startingPoint=0", function (response) {
                    //data received
                    hideLoad();
                    response.forEach(function (data) {
                        appendArticle(data["title"], data["published_date"], data["description"], data["link"]);
                    });
                });
            } else if ($('input[name=SearchWhat]:checked').val() == "tweets") {
                //tweet search
                //curSearch = api_urls[2];

                $.getJSON(api_index_root + "getTweetsNotRaw?query=" + encodeURIComponent($input.val()) + "&startingPoint=0", function (response) {
                    //data received
                    hideLoad();
                    response.forEach(function (data) {
                        appendTweet(data["timestamp"], data["fullText"], data["tweetID"], null);
                    });
                });
            }
        } else {
            $("#searchResults").html('<li class="list-group-item">Please enter a search query to get results.</li>');
        }
    }

//load more search results if needed
    $("#searchResultsDiv").scroll(function () {
        if ($("#searchResults").height() - $("#searchResultsDiv").scrollTop() < 1000 && hasMore && !isLoading) {//only load more if there are more and we're not loading anything at this moment.
            showLoad();
            curStartingPoint++;

            $.getJSON(api_index_root + curSearch + "?query=" + encodeURIComponent($input.val()) + "&startingPoint=" + curStartingPoint, function (data) {
                hideLoad();

                if (Object.keys(data).length == 0) {
                    //done with all results
                    hasMore = false;
                }

                if (curSearch.indexOf("cluster") != -1) {
                    //load clusters
                    data = data['results'];
                    for (var cluster in data) {
                        appendCluster(data[cluster]);
                    }

                } else if (curSearch.indexOf("article") != -1) {
                    //load article results
                    for (var result in data) {
                        appendArticle(data[result]["title"], data[result]["published_date"], data[result]["description"], data[result]["link"]);
                    }
                } else {
                    //load tweet results
                    for (var tweet in data) {
                        appendTweet(data[tweet]["timestamp"], data[tweet]["fullText"], data[tweet]["tweetID"]);
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
        xaxis: {
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

    $.getJSON(api_cluster_root + "tweet_count_day/?start=10-10-2016&end=15-11-2016", function (data) {
        var nrtweets = [];
        for (var point in data) {
            nrtweets.push([point, data[point]]);
        }

        $("#number-of-tweets").length && $.plot($("#number-of-tweets"), [{data: nrtweets}], numberOfTweetsOptions);
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
        colors: ["#1ccc88", "#b4b4b4", "#e33244"],
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

    $.getJSON(api_php_root + "rumorRatio.php", function (data) {
        var rumorRatio = [];
        for (var point in data) {
            rumorRatio.push({label: point, data: data[point]});
        }
        $("#rumor-ratio").length && $.plot($("#rumor-ratio"), rumorRatio, rumorRatioOptions);
    });

//amount of articles chart

    var rawdata = [["January", 10], ["February", 8], ["March", 4], ["April", 13], ["May", 17], ["June", 9]];

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

    $.getJSON(api_php_root + "articlesAmount.php", function (data) {
        var amounts = [];
        for (var point in data) {
            amounts.push([point, data[point]]);
        }
        $.plot("#articles-amount", [amounts], ArticlesAmountOptions);
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
        colors: ["#1ccacc", "#1ccc88", "#e33244", "#fcc633", "#cc1cca"],
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

    $.getJSON(api_php_root + "articlesRatio.php", function (data) {
        var rumorRatio = [];
        for (var point in data) {
            rumorRatio.push({label: point, data: data[point]});
        }
        $("#articles-ratio").length && $.plot($("#articles-ratio"), rumorRatio, articlesRatioOptions);
    });
});