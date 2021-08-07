// Chart for Scaled Scores
Highcharts.chart("scoreChart", {
  chart: {
    zoomType: "xy",
  },
  title: {
    text: "Scaled Score",
  },
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

// Chart for Scaled Scores
Highcharts.chart("rawChart", {
  chart: {
    zoomType: "xy",
  },
  title: {
    text: "Number of Mistakes",
  },
  subtitle: "",
  xAxis: {
    type: "datetime",
    categories: mistakeData.dateArr,
  },
  yAxis: {
    title: {
      text: "# of Mistakes",
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
      data: mistakeData.englishArr,
    },
    {
      name: "Math",
      data: mistakeData.mathArr,
    },
    {
      name: "Reading",
      data: mistakeData.readingArr,
    },
    {
      name: "Science",
      data: mistakeData.scienceArr,
    },
  ],
});
