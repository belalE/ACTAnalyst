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

// Drilldown graphs for question types

// TODO: Setup Tab View to hold graph below
// https://www.w3schools.com/howto/howto_js_tabs.asp

function getData(stats, section) {
  var arr = [];
  var drilldown = [];
  const data = stats[section];
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const types = data[key];
    // Add general topic to data arr
    var num = 0;
    var drillDownData = [];
    for (let type of types) {
      drillDownData.push([type.questionType.name, type.value]);
      num += type.value;
    }
    arr.push({
      name: key,
      y: num,
      drilldown: key,
    });
    //   Add specific types to drill down data arr

    drilldown.push({
      name: key,
      id: key,
      data: drillDownData,
    });
  }
  return { arr, drilldown };
}
// https://www.highcharts.com/demo/column-drilldown
Highcharts.chart("qTypeBarEng", {
  chart: {
    type: "column",
  },
  title: {
    text: "English Mistakes by Question Type",
  },
  subtitle: {
    text: "Distribution of the mistakes by the question type, within each section",
  },
  accessibility: {
    announceNewData: {
      enabled: true,
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    title: {
      text: "Total number of mistakes",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: "{point.y:.1f}",
      },
    },
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.1f}</b> mistakes<br/>',
  },

  series: [
    {
      name: "General Topics",
      colorByPoint: true,
      data: getData(summedQTypes, 0).arr,
    },
  ],
  drilldown: {
    series: getData(summedQTypes, 0).drilldown,
  },
});
Highcharts.chart("qTypeBarMath", {
  chart: {
    type: "column",
  },
  title: {
    text: "Math Mistakes by Question Type",
  },
  subtitle: {
    text: "Distribution of the mistakes by the question type, within each section",
  },
  accessibility: {
    announceNewData: {
      enabled: true,
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    title: {
      text: "Total number of mistakes",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: "{point.y:.1f}",
      },
    },
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.1f}</b> mistakes<br/>',
  },

  series: [
    {
      name: "General Topics",
      colorByPoint: true,
      data: getData(summedQTypes, 1).arr,
    },
  ],
  drilldown: {
    series: getData(summedQTypes, 1).drilldown,
  },
});
Highcharts.chart("qTypeBarRead", {
  chart: {
    type: "column",
  },
  title: {
    text: "Reading Mistakes by Question Type",
  },
  subtitle: {
    text: "Distribution of the mistakes by the question type, within each section",
  },
  accessibility: {
    announceNewData: {
      enabled: true,
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    title: {
      text: "Total number of mistakes",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: "{point.y:.1f}",
      },
    },
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.1f}</b> mistakes<br/>',
  },

  series: [
    {
      name: "General Topics",
      colorByPoint: true,
      data: getData(summedQTypes, 2).arr,
    },
  ],
  drilldown: {
    series: getData(summedQTypes, 2).drilldown,
  },
});
Highcharts.chart("qTypeBarSci", {
  chart: {
    type: "column",
  },
  title: {
    text: "Science Mistakes by Question Type",
  },
  subtitle: {
    text: "Distribution of the mistakes by the question type, within each section",
  },
  accessibility: {
    announceNewData: {
      enabled: true,
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    title: {
      text: "Total number of mistakes",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      borderWidth: 0,
      dataLabels: {
        enabled: true,
        format: "{point.y:.1f}",
      },
    },
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.1f}</b> mistakes<br/>',
  },

  series: [
    {
      name: "General Topics",
      colorByPoint: true,
      data: getData(summedQTypes, 3).arr,
    },
  ],
  drilldown: {
    series: getData(summedQTypes, 3).drilldown,
  },
});
