import * as echarts from 'echarts';

function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += +data[i - j][1];
        }
        result.push(sum / dayCount);
    }
    return result;
}

export function render_Kline(chartDom, rawData, stock_name) {
    let myChart = echarts.init(chartDom);
    const dates = rawData.map(function (item) {
        return item[0];
    });
    let k_data = rawData.map(function (item) {
        return [+item[1], +item[2], +item[3], +item[4]];
    });
    let option = {
        title:{
            text: `Stock: ${stock_name}`,
        },
        legend: {
            data:  ['Daily K', 'MA10', 'MA50'],
            inactiveColor: '#777'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                    color: '#376df4',
                    width: 2,
                    opacity: 1
                }
            }
        },
        xAxis: {
            type: 'category',
            data: dates,
            axisLine: {lineStyle: {color: '#8392A5'}}
        },
        yAxis: [
            {name:'Price',
            position: 'left',
            scale: true,
            axisLine: {lineStyle: {color: '#8392A5'}},
            splitLine: {show: true}
            },
        ],
        grid: {
            bottom: 80
        },
        dataZoom: [
            {
                textStyle: {
                    color: '#8392A5'
                },
                show: true,
                handleIcon:
                    'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                dataBackground: {
                    areaStyle: {
                        color: '#8392A5'
                    },
                    lineStyle: {
                        opacity: 0.8,
                        color: '#8392A5'
                    }
                },
                brushSelect: true
            },
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'candlestick',
                name: 'Day',
                data: k_data,
                itemStyle: {
                    color: '#f80101',
                    color0: '#05f516',
                    borderColor: '#FD1050',
                    borderColor0: '#05f516'
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10, k_data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },
            {
                name: 'MA50',
                type: 'line',
                data: calculateMA(50, k_data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },

        ]
    };
    myChart.setOption(option);
}
//
export function render_assetline(chartDom, rawData) {//rawData:key: algo_name, value: [date, net_asset]
    let myChart = echarts.init(chartDom);
    console.log('raw_data from render_func: ', rawData)
    const getDateList = (rawData) => rawData.map(function (item) {
        return item[0]; // or 1 ?
    });
    let algo_list = Object.keys(rawData);
    let date_list=[];
    if (algo_list.length != 0) {
        date_list = getDateList(rawData[algo_list[0]]);
    }

    let assetline_series_list =[]
    for (let key of algo_list) {
        let assetline_series = {
            name: key,
            type: 'line',
            data: rawData[key].map(function (item) { // data point List
                return item[1];
            }),
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 1
            }
        };
        assetline_series_list.push(assetline_series);
    }
    let option = {
        legend: {
            data: algo_list,
            inactiveColor: '#777'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                    color: '#376df4',
                    width: 2,
                    opacity: 1
                }
            }
        },
        xAxis: {
            name:'Date',
            type: 'category',
            data: date_list,
            axisLine: {lineStyle: {color: '#8392A5'}}
        },
        yAxis: [
            {
                name:'Net asset',
                position: 'left',
                scale: true,
                axisLine: {lineStyle: {color: '#8392A5'}},
                splitLine: {show: true}
            },
        ],
        grid: {
            bottom: 80
        },
        dataZoom: [
            {
                textStyle: {
                    color: '#8392A5'
                },
                show: false,
                handleIcon:
                    'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                dataBackground: {
                    areaStyle: {
                        color: '#8392A5'
                    },
                    lineStyle: {
                        opacity: 0.8,
                        color: '#8392A5'
                    }
                },
                brushSelect: true
            },
            {
                type: 'inside'
            }
        ],
        series: assetline_series_list
    };
    myChart.setOption(option);
}
