// Chart for Scaled Scores
Highcharts.chart("scoreChart", {
  chart: {
    zoomType: "xy",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
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
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
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
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
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
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
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
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
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
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
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

// Chart for Tags English

Highcharts.chart("tagGraphEng", {
  chart: {
    zoomType: "xy",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "Question Tags",
  },
  subtitle: "Question tags count for each test",
  xAxis: {
    type: "datetime",
    categories: tagsData.dates,
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
      name: "Skips",
      data: tagsData.english.skips,
    },
    {
      name: "Guesses",
      data: tagsData.english.guesses,
    },
    {
      name: "No Time",
      data: tagsData.english.times,
    },
    {
      name: "Revisions",
      data: tagsData.english.revises,
    },
  ],
});

// Chart for Tags Math

Highcharts.chart("tagGraphMath", {
  chart: {
    zoomType: "xy",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "Question Tags",
  },
  subtitle: "Question tags count for each test",
  xAxis: {
    type: "datetime",
    categories: tagsData.dates,
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
      name: "Skips",
      data: tagsData.math.skips,
    },
    {
      name: "Guesses",
      data: tagsData.math.guesses,
    },
    {
      name: "No Time",
      data: tagsData.math.times,
    },
    {
      name: "Revisions",
      data: tagsData.math.revises,
    },
  ],
});

// Chart for Tags Reading

Highcharts.chart("tagGraphRead", {
  chart: {
    zoomType: "xy",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "Question Tags",
  },
  subtitle: "Question tags count for each test",
  xAxis: {
    type: "datetime",
    categories: tagsData.dates,
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
      name: "Skips",
      data: tagsData.reading.skips,
    },
    {
      name: "Guesses",
      data: tagsData.reading.guesses,
    },
    {
      name: "No Time",
      data: tagsData.reading.times,
    },
    {
      name: "Revisions",
      data: tagsData.reading.revises,
    },
  ],
});

// Chart for Tags Science

Highcharts.chart("tagGraphSci", {
  chart: {
    zoomType: "xy",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "Question Tags",
  },
  subtitle: "Question tags count for each test",
  xAxis: {
    type: "datetime",
    categories: tagsData.dates,
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
      name: "Skips",
      data: tagsData.science.skips,
    },
    {
      name: "Guesses",
      data: tagsData.science.guesses,
    },
    {
      name: "No Time",
      data: tagsData.science.times,
    },
    {
      name: "Revisions",
      data: tagsData.science.revises,
    },
  ],
});
