/**
 * Created by sbreu on 4-1-2017.
 */
$(function(){

    var api_root = "api/";

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

    //user is "finished typing," do something
    function searchTweets () {
        if($input.val() != ""){
            $("#searchResults").html('<li class="list-group-item"><i class="fa fa-spinner fa-spin"></i> Loading</li></ul>');

            $.getJSON(api_root + "search.php?search=" +  $('input[name=SearchWhat]:checked').val() + "&query=" + encodeURIComponent($input.val()), function( data ) {
                $("#searchResults").html("");
                $("#searchResults").append('<li class="list-group-item">Number of results: ' + data.length + ' (Query: ' + $('input[name=SearchWhat]:checked').val() + ')</li>');
                if($('input[name=SearchWhat]:checked').val() == "articles"){
                    for(var result in data){
                        $("#searchResults").append('<li class="list-group-item">' +
                            '<b>' + data[result]["title"] + '</b><br>' +
                            data[result]["description"] + '<br>' +
                            '<a href="' + data[result]["link"] + '" target="_blank">' + data[result]["link"] + '</a></li>');
                    }

                }else{
                    for(var tweet in data){
                        $("#searchResults").append('<li class="list-group-item">' + tweet + ': User: ' + data[tweet]["userid"] + ', text: ' + data[tweet]["text"] + '</li>');
                    }
                }
                //$("#searchResults").append("<div>" + JSON.stringify(data) + "</div>");
            });

        }else{
            $("#searchResults").html('<li class="list-group-item">Please enter a search query to get results.</li>');
        }

    }

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