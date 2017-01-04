/**
 * Created by sbreu on 4-1-2017.
 */
$(function(){

    var api_root = "http://localhost/web-inf-retrieval-frontend/api/";

    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

    //articles chart
    //checkout: http://www.jqueryflottutorial.com/how-to-make-jquery-flot-horizontal-bar-chart.html

    var d1_1 = [
        [10, 120],
        [20, 70],
        [30, 100],
        [40, 60]
    ];

    var d1_2 = [
        [10, 80],
        [20, 60],
        [30, 30],
        [40, 35]
    ];

    var d1_3 = [
        [10, 80],
        [20, 40],
        [30, 30],
        [40, 20]
    ];

    var data1 = [
        {
            label: "Product 1",
            data: d1_1,
            bars: {
                show: true,
                fill: true,
                lineWidth: 1,
                order: 1,
                fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.9}] }
            },
            color: "#6783b7"
        },
        {
            label: "Product 2",
            data: d1_2,
            bars: {
                show: true,
                fill: true,
                lineWidth: 1,
                order: 2,
                fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.9}] }
            },
            color: "#4fcdb7"
        },
        {
            label: "Product 3",
            data: d1_3,
            bars: {
                show: true,
                fill: true,
                lineWidth: 1,
                order: 3,
                fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.9}] }
            },
            color: "#8dd168"
        }
    ];

    $("#articles").length && $.plot($("#articles"), data1, {
        xaxis: {

        },
        yaxis: {

        },
        grid: {
            hoverable: true,
            clickable: false,
            borderWidth: 0
        },
        legend: {
            labelBoxBorderColor: "none",
            position: "left"
        },
        series: {
            shadowSize: 1
        },
        tooltip: true,
        tooltipOpts: {
            defaultTheme: false,
            shifts: {
                x: 0,
                y: 20
            }
        }
    });

});