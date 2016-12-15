$(function(){

  // 
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var d1 = [];
  for (var i = 0; i <= 11; i += 1) {
    d1.push([i, parseInt((Math.floor(Math.random() * (1 + 20 - 10))) + 10)]);
  }

  $("#flot-1ine").length && $.plot($("#flot-1ine"), [{
          data: d1
      }], 
      {
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
            //min: chartMinDate,
            //max: chartMaxDate
        },
        yaxis: {
          ticks: 5
        },
        tooltip: true,
        tooltipOpts: {
          content: "chart: %x.1 is %y.4",
          defaultTheme: false,
          shifts: {
            x: 0,
            y: 20
          }
        }
      }
  );


    //var th = [];
    //var d2 = [];

    //here we generate data for chart
   // for (var i = 0; i < 30; i++) {
        //th.push([new Date(Date.today().add(i).days()).getTime(), randNum() + i + i + 10]);
        //    d2.push([new Date(Date.today().add(i).days()).getTime(), randNum()]);
    //}

    //var chartMinDate = th[0][0]; //first day
    //var chartMaxDate = th[20][0]; //last day

  var d0 = [
    [0,0],[1,0],[2,1],[3,2],[4,15],[5,5],[6,12],[7,10],[8,55],[9,13],[10,25],[11,10],[12,12],[13,6],[14,2],[15,0],[16,0]
  ];
  var d00 = [
    [0,0],[1,0],[2,1],[3,0],[4,1],[5,0],[6,2],[7,0],[8,3],[9,1],[10,0],[11,1],[12,0],[13,2],[14,1],[15,0],[16,0]
  ];
  $("#flot-sp1ine").length && $.plot($("#flot-sp1ine"), [
          d0, d00
      ],
      {
        series: {
            lines: {
                show: false
            },
            splines: {
              show: true,
              tension: 0.4,
              lineWidth: 1,
              fill: 0.4
            },
            points: {
                radius: 0,
                show: true
            },
            shadowSize: 2
        },
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#d9dee9",
            borderWidth: 1,
            color: '#d9dee9'
        },
        colors: ["#19b39b", "#644688"],
        xaxis:{
        },
        yaxis: {
          ticks: 4
        },
        tooltip: true,
        tooltipOpts: {
          content: "chart: %x.1 is %y.4",
          defaultTheme: false,
          shifts: {
            x: 0,
            y: 20
          }
        }
      }
  );
  
  var d2 = [];
  for (var i = 0; i <= 6; i += 1) {
    d2.push([i, parseInt((Math.floor(Math.random() * (1 + 30 - 10))) + 10)]);
  }
  var d3 = [];
  for (var i = 0; i <= 6; i += 1) {
    d3.push([i, parseInt((Math.floor(Math.random() * (1 + 30 - 10))) + 10)]);
  }
  $("#flot-chart").length && $.plot($("#flot-chart"), [{
          data: d2,
          label: "Unique Visits"
      }, {
          data: d3,
          label: "Page Views"
      }], 
      {
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
                show: true
            },
            shadowSize: 2
        },
        grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#f0f0f0",
            borderWidth: 0
        },
        colors: ["#1bb399","#177bbb"],
        xaxis: {
            ticks: 15,
            tickDecimals: 0
        },
        yaxis: {
            ticks: 10,
            tickDecimals: 0
        },
        tooltip: true,
        tooltipOpts: {
          content: "'%s' of %x.1 is %y.4",
          defaultTheme: false,
          shifts: {
            x: 0,
            y: 20
          }
        }
      }
  );


  // live update
  var data = [],
  totalPoints = 300;

  function getRandomData() {

    if (data.length > 0)
      data = data.slice(1);

    // Do a random walk

    while (data.length < totalPoints) {

      var prev = data.length > 0 ? data[data.length - 1] : 50,
        y = prev + Math.random() * 10 - 5;

      if (y < 0) {
        y = 0;
      } else if (y > 100) {
        y = 100;
      }

      data.push(y);
    }

    // Zip the generated y values with the x values

    var res = [];
    for (var i = 0; i < data.length; ++i) {
      res.push([i, data[i]])
    }

    return res;
  }

  var updateInterval = 30, live;
  $("#flot-live").length && ( live = $.plot("#flot-live", [ getRandomData() ], {
    series: {
      lines: {
          show: true,
          lineWidth: 1,
          fill: true,
          fillColor: {
              colors: [{
                  opacity: 0.2
              }, {
                  opacity: 0.1
              }]
          }
      },
      shadowSize: 2
    },
    colors: ["#cccccc"],
    yaxis: {
      min: 0,
      max: 100
    },
    xaxis: {
      show: false
    },
    grid: {
        tickColor: "#f0f0f0",
        borderWidth: 0
    },
  }) ) && update();

  function update() {

    live.setData([getRandomData()]);

    // Since the axes don't change, we don't need to call plot.setupGrid()

    live.draw();
    setTimeout(update, updateInterval);
  };

  // bar
/*  var d1_1 = [
    [10, 120],
    [20, 70],
    [30, 100],
    [40, 60],
      [50,100],
      [60,100],
      [70,100],
      [80,100],
      [90,100],
      [100,100],
      [110, 120],
      [120, 70],
      [130, 100],
      [140, 60],
      [150,100],
      [160,100],
      [170,100],
      [180,100],
      [190,100],
      [200,100]
  ];

  var d1_2 = [
    [10, 80],
    [20, 60],
    [30, 30],
    [40, 35],
      [50,100],
      [60,100],
      [70,100],
      [80,100],
      [90,100],
      [100,100],
      [110, 120],
      [120, 70],
      [130, 100],
      [140, 60],
      [150,100],
      [160,100],
      [170,100],
      [180,100],
      [190,100],
      [200,100]
  ];

  var d1_3 = [
    [10, 80],
    [20, 40],
    [30, 30],
    [40, 20],
      [50,100],
      [60,100],
      [70,100],
      [80,100],
      [90,100],
      [100,100],
      [110, 120],
      [120, 70],
      [130, 100],
      [140, 60],
      [150,100],
      [160,100],
      [170,100],
      [180,100],
      [190,100],
      [200,100]
  ];*/

    /*var d1_1 = [
        ["2016/11/17", "120"],
        ["2016/11/18", "120"],
        ["2016/11/19", "70"],
        ["2016/11/20", "70"],
        ["2016/11/21", "100"],
        ["2016/11/22", "60"],
        ["2016/11/23", "60"],
        ["2016/11/24", "60"],
        ["2016/11/25","100"],
        ["2016/11/26","100"],
        ["2016/11/2","100"],
        ["2016/11/27","100"],
        ["2016/11/29","100"],
        ["2016/12/01","100"],
        ["2016/12/","100"],
        ["20161210","100"]
    ];

    var d1_2 = [
        ["20161201", "80"],
        ["20161202", "60"],
        ["20161203", "30"],
        ["20161204", "35"],
        ["20161205","100"],
        ["20161206","100"],
        ["20161207","100"],
        ["20161208","100"],
        ["20161209","100"],
        ["20161210","100"]
    ];

    var d1_3 = [
        ["20161201", "80"],
        ["20161202", "40"],
        ["20161203", "30"],
        ["20161204", "20"],
        ["20161205","100"],
        ["20161206","100"],
        ["20161207","100"],
        ["20161208","100"],
        ["20161209","100"],
        ["20161210","100"]
    ];
*/

    randNum = function() {
        return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
    };

    var d1_1 = [];
    var d1_2 = [];
    var d1_3 = [];
    //var d2 = [];

    //here we generate data for chart
    for (var i = 0; i < 20; i++) {
        d1_1.push([new Date(Date.today().add(i).days()).getTime(), randNum() + i + i + 10]);
        d1_2.push([new Date(Date.today().add(i).days()).getTime(), randNum() + i + i + 10]);
        d1_3.push([new Date(Date.today().add(i).days()).getTime(), randNum() + i + i + 10]);
    }
    var tickSize = [1, "day"];
    var tformat = "%d/%m/%y";

  var data1 = [
    {
        label: "Amount of Rumor",
        data: d1_1,
        bars: {
            show: true,
            fill: true,
            lineWidth: 7,
            order: 1,
            fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.9}] }
        },
        color: "#6783b7"
    },
    {
        label: "Amount of Not Rumor",
        data: d1_2,
        bars: {
            show: true,
            fill: true,
            lineWidth: 7,
            order: 2,
            fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.9}] }
        },
        color: "#4fcdb7"
    },
    {
        label: "Amount of Impossible Rumor",
        data: d1_3,
        bars: {
            show: true,
            fill: true,
            lineWidth: 7,
            order: 3,
            fillColor: { colors: [{ opacity: 0.5 }, { opacity: 0.9}] }
        },
        color: "#8dd168"
    }
  ];

  $("#flot-bar").length && $.plot($("#flot-bar"), data1, {
      xaxis: {
          mode: "time",
          minTickSize: tickSize,
          timeformat: tformat
      },
      yaxis: {
          
      },
      grid: {
          hoverable: true,
          clickable: false,
          borderWidth: 1
      },
      legend: {
          labelBoxBorderColor: "none",
          position: "left"
      },
      series: {
          shadowSize: 0
      },
      tooltip: true,
      tooltipOpts: {

      },
      xDateFormat: "%d/%m"
  });

  $("#flot-bar-h").length && $.plot($("#flot-bar-h"), data2, {
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
  });

  // pie

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

  $("#flot-pie-donut").length && $.plot($("#flot-pie-donut"), da, {
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
    },
    tooltip: true,
    tooltipOpts: {
      content: "%s: %p.0%"
    }
  });

  $("#flot-pie").length && $.plot($("#flot-pie"), da, {
    series: {
      pie: {
        combine: {
              color: "#999",
              threshold: 0.05
            },
        show: true
      }
    },    
    colors: ["#65b5c2","#4da7c1","#3993bb","#2e7bad","#23649e"],
    legend: {
      show: false
    },
    grid: {
        hoverable: true,
        clickable: false
    },
    tooltip: true,
    tooltipOpts: {
      content: "%s: %p.0%"
    }
  });

});