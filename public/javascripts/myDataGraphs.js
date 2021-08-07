Highcharts.chart("scoreChart", {
  chart: {
    zoomType: "xy",
  },
  title: "Scaled Score",
  subtitle: "/36",
  xAxis: {
    type: "datetime",
    categories: trendData.dateArr,
  },
  yAxis: {
    title: {
      text: "Score / 36",
      style: {
        color: Highcharts.getOptions().colors[0],
      },
    },
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
  },
  series: [
    {
      name: "English",
      data: trendData.englishArr,
    },
    {
      name: "Math",
      data: trendData.mathArr,
    },
    {
      name: "Reading",
      data: trendData.readingArr,
    },
    {
      name: "Science",
      data: trendData.scienceArr,
    },
  ],
});
