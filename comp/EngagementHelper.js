import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { messageCountList, channels } from './jsonContent';

const engagementHelper = {
    engagementMessageOverTimeChartOptions: () => {
        const channelsWithDataForMoreThanOneDate = channels.filter((channel) => {
            const channelId = channel.id;
            const messageDates = messageCountList.filter((message) => message.channelId === channelId);
            return messageDates.length > 1;
        });

        const chartData = messageCountList
            .filter((message) => channelsWithDataForMoreThanOneDate.some((channel) => channel.id === message.channelId))
            .map((item) => ({
                x: new Date(item.timeBucket).getTime(),
                y: parseInt(item.count),
            }));

        const options = {
            title: {
                text: "",
            },
            xAxis: {
                type: "datetime",
                tickInterval: 24 * 3600 * 1000,
                title: {
                    text: "",
                },
                labels: {
                    style: {
                        color: "#6c757d",
                    },
                },
                plotLines: [],
            },
            yAxis: {
                type: "linear",
                tickInterval: 1,
                title: {
                    text: "  ",
                    style: {
                        color: "#6c757d",
                    },
                },
                labels: {
                    style: {
                        color: "#6c757d",
                    },
                    formatter: function () {
                        return this.value + " -";
                    },
                },
                gridLineColor: "#22222c",
                gridLineWidth: 2,
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            mouseOver: function () {
                                var chart = this.series.chart,
                                    xAxis = chart.xAxis[0],
                                    plotLineId = 'plotLine-' + this.index;

                                xAxis.removePlotLine(plotLineId);

                                xAxis.addPlotLine({
                                    id: plotLineId,
                                    value: this.x,
                                    color: '#6c757d',
                                    width: 0.5,
                                    zIndex: 5
                                });
                            },
                            mouseOut: function () {
                                var chart = this.series.chart,
                                    xAxis = chart.xAxis[0],
                                    plotLineId = 'plotLine-' + this.index;
                                xAxis.removePlotLine(plotLineId);
                            }
                        }
                    }
                }
            },
            series: [
                {
                    name: "general",
                    type: "spline",
                    data: chartData,
                    dataLabels: {
                        enabled: true,
                        style: {
                            textOutline: false,
                        },
                    },
                    color: "#0b7677",
                },
            ],
            tooltip: {
                formatter: function () {
                    return `<b>general</b><br/>${this.y}<p> messages on </p>${Highcharts.dateFormat("%e %b", this.x)}`;
                },
                backgroundColor: "black",
                borderColor: "#0b7677",
                borderWidth: 1,
                opacity: 0.5,
                style: {
                    color: "#ffffff",
                },
                shared: false,
            },
            chart: {
                backgroundColor: "#22222c",
                margin: [30, 50, 100, 80],
            },
        };

        return options;
    },

    getChannelsData: () => channels,
    getMessageCountList: () => messageCountList,
};

export default engagementHelper;