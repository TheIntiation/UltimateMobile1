//myApp.onPageInit('main', function (page) {
//    $$(".highcharts-credits").html('');
//     $$(".navbar").css("display", "block");
//     $$(".toolbar").css("display", "block");
//    var mySwiper = myApp.swiper('.swiper-container', {
//    pagination:'.swiper-pagination'
//  });
    
   
//    Highcharts.chart('container6', {
//        chart: {
//            type: 'pie',
//            options3d: {
//                enabled: true,
//                alpha: 45,
//                beta: 0
//            },
//            backgroundColor: 'transparent'
//        },
//        title: {
//            text: ''
//        },
//        tooltip: {
//            pointFormat: ''
//        },
//        plotOptions: {
//            pie: {
//                allowPointSelect: true,

//                depth: 35,
//                dataLabels: {
//                    enabled: true,
//                    color: 'white',
//                    distance: -40,
//                    formatter: function () {
//                        if (this.percentage != 0) return Math.round(this.percentage) + '';

//                    }
//                },
//                showInLegend: true
//            }
//        },
//        series: [{
//            type: 'pie',
//            name: 'Browser share',

//            data: [
//                ['Submitted', 45.0],
//                ['Approved', 26.8],
//                 ['Returened', 16],
//                {
//                    name: 'Rejected',
//                    y: 22,
//                    sliced: true,
//                    selected: true
//                }
//            ]
//        }]

//    });

//    Highcharts.chart('containerddd8', {
//        chart: {
//            type: 'column'
//          , backgroundColor: 'transparent'
//        },
//        title: {
//            text: ''
//        },
//        subtitle: {
//            text: ''
//        },
//        xAxis: {
//            categories: [
//                'GateWay0',
//                'GateWay1',
//                'GateWay2',
//                'GateWay3',
//                'GateWay4',
//                'GateWay5'
//            ],
//            crosshair: true
//        },
//        yAxis: {
//            min: 0,
//            title: {
//                text: ''
//            }
//        },
//        tooltip: {
//            headerFormat: '',
//            pointFormat: '' +
//                '',
//            shared: true,
//            useHTML: true
//        },
//        plotOptions: {
//            column: {
//                pointPadding: 0.2,
//                borderWidth: 0
//            }
//        },
//        series: [{
//            name: 'Achive',
//            data: [400, 120, 130, 50, 150, 200]

//        }, {
//            name: 'Planed',
//            data: [300, 100, 140, 100, 250, 200]

//        }]

//    });

//    Highcharts.chart('container7', {
//        chart: {
//            type: 'bar'
//            , backgroundColor: 'transparent'
//        },
//        title: {
//            text: ''
//        },
//        subtitle: {
//            text: ''
//        },
//        xAxis: {
//            categories: ['Returned', 'Rejected', 'Draft', 'Submitted', 'Approved'],
//            title: {
//                text: null
//            }
//        },
//        yAxis: {
//            min: 0,
//            title: {
//                text: '',
//                align: 'high'
//            },
//            labels: {
//                overflow: 'justify'
//            }
//        },
//        tooltip: {
//            valueSuffix: ' '
//        },
//        plotOptions: {
//            bar: {
//                dataLabels: {
//                    enabled: true
//                }
//            },
//            legend: {
//                enabled: false
//            },
//        },

//        credits: {
//            enabled: false
//        },
//        series: [{
//            showInLegend: false,
//            data: [10, 30, 50, 110, 110]
//        }]

//    });

//    Highcharts.chart('container8', {

//        chart: {
//            type: 'pie',
//            options3d: {
//                enabled: true,
//                alpha: 45,
//                beta: 0
//            }
//                   , backgroundColor: 'transparent'
//        },
//        title: {
//            text: ''
//        },
//        tooltip: {
//            pointFormat: ''
//        },
//        plotOptions: {
//            pie: {
//                allowPointSelect: true,

//                depth: 35,
//                dataLabels: {
//                    enabled: true,
//                    format: '{y}'
//                }, dataLabels: {
//                    distance: -50,
//                    color: 'black'
//                }
//            }
//        },
//        series: [{
//            type: 'pie',
//            name: '',
//            data: [
//                ['Submitted', 50],
//                ['Approved', 60],
//                {
//                    name: 'Draft',
//                    y: 125,
//                    sliced: true,
//                    selected: true
//                }
//            ]
//        }]
//    });

//    Highcharts.chart('container9', {

//        chart: {
//            type: 'column'
//                   , backgroundColor: 'transparent'
//        },
//        title: {
//            text: ''
//        },
//        xAxis: {
//            categories: ['A+ Electric Inc.', 'No Company Assigned', 'JFK Finishes']
//        },
//        yAxis: {
//            min: 0,
//            title: {
//                text: ''
//            },
//            stackLabels: {
//                enabled: true,
//                style: {
//                    fontWeight: 'bold',
//                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
//                }
//            }
//        },
//        legend: {
//            align: 'right',
//            x: -30,
//            verticalAlign: 'top',
//            y: 10,
//            floating: true,
//            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
//            borderColor: '#CCC',
//            borderWidth: 1,
//            shadow: false
//        },
//        tooltip: {
//            headerFormat: '<b>{point.x}</b><br/>',
//            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
//        },
//        plotOptions: {
//            column: {
//                stacking: 'normal',
//                dataLabels: {
//                    enabled: true,
//                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
//                }
//            }
//        },
//        series: [{
//            name: 'Close',
//            data: [5, 3, 4]
//        }, {
//            name: 'Draft',
//            data: [2, 2, 3]
//        }, {
//            name: 'Submitted',
//            data: [3, 4, 4]
//        }]
//    });

//    Highcharts.chart('container10', {


//        chart: {
//            type: 'pie',
//            options3d: {
//                enabled: true,
//                alpha: 45,
//                beta: 0
//            }
//                   , backgroundColor: 'transparent'
//        },
//        title: {
//            text: ''
//        },
//        tooltip: {
//            pointFormat: ''
//        },
//        plotOptions: {
//            pie: {
//                allowPointSelect: true,

//                depth: 35,
//                dataLabels: {
//                    enabled: false
//                },
//                showInLegend: true
//            }
//        },
//        series: [{
//            type: 'pie',
//            name: 'Browser share',
//            data: [
//                ['Submitted', 45.0],
//                ['Approved', 26.8],
//                 ['Returened', 26.8],
//                {
//                    name: 'Rejected',
//                    y: 12.8,
//                    sliced: true,
//                    selected: true
//                }
//            ]
//        }]

//    });

//    Highcharts.theme = {
//        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
//           '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
//        chart: {
//            backgroundColor: {
//                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
//                stops: [
//                   [0, '#2a2a2b'],
//                   [1, '#3e3e40']
//                ]
//            },
//            style: {
//                fontFamily: '\'Unica One\', sans-serif'
//            },
//            plotBorderColor: '#606063'
//        },
//        title: {
//            style: {
//                color: '#E0E0E3',
//                textTransform: 'uppercase',
//                fontSize: '20px'
//            }
//        },
//        subtitle: {
//            style: {
//                color: '#E0E0E3',
//                textTransform: 'uppercase'
//            }
//        },
//        xAxis: {
//            gridLineColor: '#707073',
//            labels: {
//                style: {
//                    color: '#E0E0E3'
//                }
//            },
//            lineColor: '#707073',
//            minorGridLineColor: '#505053',
//            tickColor: '#707073',
//            title: {
//                style: {
//                    color: '#A0A0A3'

//                }
//            }
//        },
//        yAxis: {
//            gridLineColor: '#707073',
//            labels: {
//                style: {
//                    color: '#E0E0E3'
//                }
//            },
//            lineColor: '#707073',
//            minorGridLineColor: '#505053',
//            tickColor: '#707073',
//            tickWidth: 1,
//            title: {
//                style: {
//                    color: '#A0A0A3'
//                }
//            }
//        },
//        tooltip: {
//            backgroundColor: 'rgba(0, 0, 0, 0.85)',
//            style: {
//                color: '#F0F0F0'
//            }
//        },
//        plotOptions: {
//            series: {
//                dataLabels: {
//                    color: '#B0B0B3'
//                },
//                marker: {
//                    lineColor: '#333'
//                }
//            },
//            boxplot: {
//                fillColor: '#505053'
//            },
//            candlestick: {
//                lineColor: 'white'
//            },
//            errorbar: {
//                color: 'white'
//            }
//        },
//        legend: {
//            itemStyle: {
//                color: '#E0E0E3'
//            },
//            itemHoverStyle: {
//                color: '#FFF'
//            },
//            itemHiddenStyle: {
//                color: '#606063'
//            }
//        },
//        credits: {
//            style: {
//                color: '#666'
//            }
//        },
//        labels: {
//            style: {
//                color: '#707073'
//            }
//        },

//        drilldown: {
//            activeAxisLabelStyle: {
//                color: '#F0F0F3'
//            },
//            activeDataLabelStyle: {
//                color: '#F0F0F3'
//            }
//        },

//        navigation: {
//            buttonOptions: {
//                symbolStroke: '#DDDDDD',
//                theme: {
//                    fill: '#505053'
//                }
//            }
//        },

//        // scroll charts
//        rangeSelector: {
//            buttonTheme: {
//                fill: '#505053',
//                stroke: '#000000',
//                style: {
//                    color: '#CCC'
//                },
//                states: {
//                    hover: {
//                        fill: '#707073',
//                        stroke: '#000000',
//                        style: {
//                            color: 'white'
//                        }
//                    },
//                    select: {
//                        fill: '#000003',
//                        stroke: '#000000',
//                        style: {
//                            color: 'white'
//                        }
//                    }
//                }
//            },
//            inputBoxBorderColor: '#505053',
//            inputStyle: {
//                backgroundColor: '#333',
//                color: 'silver'
//            },
//            labelStyle: {
//                color: 'silver'
//            }
//        },

//        navigator: {
//            handles: {
//                backgroundColor: '#666',
//                borderColor: '#AAA'
//            },
//            outlineColor: '#CCC',
//            maskFill: 'rgba(255,255,255,0.1)',
//            series: {
//                color: '#7798BF',
//                lineColor: '#A6C7ED'
//            },
//            xAxis: {
//                gridLineColor: '#505053'
//            }
//        },

//        scrollbar: {
//            barBackgroundColor: '#808083',
//            barBorderColor: '#808083',
//            buttonArrowColor: '#CCC',
//            buttonBackgroundColor: '#606063',
//            buttonBorderColor: '#606063',
//            rifleColor: '#FFF',
//            trackBackgroundColor: '#404043',
//            trackBorderColor: '#404043'
//        },

//        // special colors for some of the
//        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
//        background2: '#505053',
//        dataLabelsColor: '#B0B0B3',
//        textColor: '#C0C0C0',
//        contrastTextColor: '#F0F0F3',
//        maskColor: 'rgba(255,255,255,0.3)'
//    };

//    // Apply the theme
//    // Highcharts.setOptions(Highcharts.theme);

//    Highcharts.chart('container', {

//        title: {
//            text: 'Curve'
//              , backgroundColor: 'transparent'
//        },

//        subtitle: {
//            text: ''
//        },

//        yAxis: {
//            title: {
//                text: ''
//            }
//        },
//        legend: {
//            layout: 'vertical',
//            align: 'right',
//            verticalAlign: 'middle'
//        },

//        plotOptions: {
//            series: {
//                pointStart: 30
//            }
//        },

//        series: [{
//            name: 'Cost',
//            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
//        }, {
//            name: 'Revenue',
//            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
//        }, {
//            name: 'Actual Cost',
//            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
//        }]

//    });

//    var chart = Highcharts.chart('container2', {

//        title: {
//            text: 'Cost Summary'
//        },

//        subtitle: {
//            text: ''
//        },

//        xAxis: {
//            categories: ['Buget', 'Cost', 'Variants', 'Cost to Date', 'Forcast', 'Forcast Variance']
//        },

//        series: [{
//            type: 'column',
//            colorByPoint: true,
//            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
//            showInLegend: false
//        }]

//    });

//    var chart = Highcharts.chart('container3', {

//        title: {
//            text: 'Gateways'
//        },

//        subtitle: {
//            text: ''
//        },

//        xAxis: {
//            categories: ['Gateway 0', 'Gateway 1', 'Gateway 2', 'Gateway 3', 'Gateway 4', 'Gateway 5']
//        },

//        series: [{
//            type: 'column',
//            colorByPoint: true,
//            data: [99, 99, 90.4, 50, 70, 80.0],
//            showInLegend: false
//        }]

//    });
    
//});
 
