function getScalesData(stats, section) {
  const scale = scales[section];
  const arr = [];
  for (let i = 0; i < scale.length; i++) {
    arr.push({
      x: i,
      y: scale[i].scaled,
    });
  }
  return arr;
}

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
Highcharts.chart("distEng", {
  chart: {
    type: "column",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
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
      data: getData(topicStats, 0).arr,
    },
  ],
  drilldown: {
    series: getData(topicStats, 0).drilldown,
  },
});
Highcharts.chart("distMath", {
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
      data: getData(topicStats, 1).arr,
    },
  ],
  drilldown: {
    series: getData(topicStats, 1).drilldown,
  },
});
Highcharts.chart("distReading", {
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
      data: getData(topicStats, 2).arr,
    },
  ],
  drilldown: {
    series: getData(topicStats, 2).drilldown,
  },
});
Highcharts.chart("distScience", {
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
      data: getData(topicStats, 3).arr,
    },
  ],
  drilldown: {
    series: getData(topicStats, 3).drilldown,
  },
});

Highcharts.chart("scaleEng", {
  chart: {
    zoomType: "xy",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "English Section Scale",
  },
  subtitle: "",
  xAxis: {
    accessibility: {
      rangeDescription: "Range: 0-75 ",
    },
  },
  yAxis: {
    title: {
      text: "",
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
      data: getScalesData(scales, "english"),
      step: "left",
    },
  ],
});

Highcharts.chart("scaleMath", {
  chart: {
    zoomType: "xy",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "Math Section Scale",
  },
  subtitle: "",
  xAxis: {
    accessibility: {
      rangeDescription: "Range: 0-60 ",
    },
  },
  yAxis: {
    title: {
      text: "",
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
      name: "Math",
      data: getScalesData(scales, "math"),
      step: "left",
    },
  ],
});

Highcharts.chart("scaleReading", {
  chart: {
    zoomType: "xy",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "Reading Section Scale",
  },
  subtitle: "",
  xAxis: {
    accessibility: {
      rangeDescription: "Range: 0-40 ",
    },
  },
  yAxis: {
    title: {
      text: "",
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
      name: "reading",
      data: getScalesData(scales, "reading"),
      step: "left",
    },
  ],
});

Highcharts.chart("scaleScience", {
  chart: {
    zoomType: "xy",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "Science Section Scale",
  },
  subtitle: "",
  xAxis: {
    accessibility: {
      rangeDescription: "Range: 0-40 ",
    },
  },
  yAxis: {
    title: {
      text: "",
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
      name: "Science",
      data: getScalesData(scales, "science"),
      step: "left",
    },
  ],
});
