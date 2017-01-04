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
            grow: {
                active: true,
                steps: 50
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

    $.getJSON(api_root + "numberoftweets.php", function( data ) {
        var nrtweets = [];
        for(var point in data){
            nrtweets.push([point,data[point]]);
        }

        $("#number-of-tweets").length && $.plot($("#number-of-tweets"), [{ data: nrtweets}], numberOfTweetsOptions );
    });

    //rumor ratio chart

    var da = [
            {
                label: "iPhone5S",
                data: 40
            },
            {
                label: "iPad Mini",
                data: 10
            },
            {
                label: "iPad Mini Retina",
                data: 20
            },
            {
                label: "iPhone4S",
                data: 12
            },
            {
                label: "iPad Air",
                data: 18
            }
        ],
        da1 = [],
        series = Math.floor(Math.random() * 4) + 3;

    for (var i = 0; i < series; i++) {
        da1[i] = {
            label: "Series" + (i + 1),
            data: Math.floor(Math.random() * 100) + 1
        }
    }

    $("#rumor-ratio").length && $.plot($("#rumor-ratio"), da, {
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

            }
        },
        colors: ["#65b5c2","#4da7c1","#3993bb","#2e7bad","#23649e"],
        grid: {
            hoverable: true,
            clickable: false
        }
    });
});