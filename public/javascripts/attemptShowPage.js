function getMistakeData(mistakes, section) {
  const mistakeSection = mistakes[section];
  const length = {
    english: 75,
    math: 60,
    reading: 40,
    science: 40,
  }[section];
  const indexArr = [];
  for (let i = 0; i < mistakeSection.length; i++) {
    indexArr.push(mistakeSection[i].index);
  }
  const categories = [];
  const values = [];
  for (let i = 5; i < length + 1; i += 5) {
    categories.push(i - 5 + " - " + i);
    values.push(0);
  }
  for (let index of indexArr) {
    for (let i = 0; i < categories.length; i++) {
      const min = parseInt(categories[i].slice().split(" - ")[0]);
      const max = parseInt(categories[i].slice().split(" - ")[1]);
      if (max >= index && index > min) {
        values[i] += 1;
      }
    }
  }
  return { categories, values };
}
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
      data: getData(topicStats, 0).arr,
    },
  ],
  drilldown: {
    series: getData(topicStats, 0).drilldown,
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
      data: getData(topicStats, 1).arr,
    },
  ],
  drilldown: {
    series: getData(topicStats, 1).drilldown,
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
      data: getData(topicStats, 2).arr,
    },
  ],
  drilldown: {
    series: getData(topicStats, 2).drilldown,
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
      data: getData(topicStats, 3).arr,
    },
  ],
  drilldown: {
    series: getData(topicStats, 3).drilldown,
  },
});

Highcharts.chart("histEng", {
  chart: {
    type: "column",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "Mistake Histogram",
  },
  subtitle: {
    text: "The distribution of your mistake by question #",
  },
  xAxis: {
    categories: getMistakeData(mistakes, "english").categories,
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: {
      text: "# of Mistakes",
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">Q: {point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name} </td>' +
      '<td style="padding:0"><b>{point.y} mistakes</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      shadow: false,
      borderWidth: 0.5,
      borderColor: "#666",
      pointPadding: 0,
      groupPadding: 0,
      color: "rgba(204,204,204,.85)",
    },
  },
  series: [
    {
      name: "",
      data: getMistakeData(mistakes, "english").values,
    },
  ],
});

Highcharts.chart("histMath", {
  chart: {
    type: "column",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "Mistake Histogram",
  },
  subtitle: {
    text: "The distribution of your mistake by question #",
  },
  xAxis: {
    categories: getMistakeData(mistakes, "math").categories,
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: {
      text: "# of Mistakes",
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">Q: {point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name} </td>' +
      '<td style="padding:0"><b>{point.y} mistakes</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      shadow: false,
      borderWidth: 0.5,
      borderColor: "#666",
      pointPadding: 0,
      groupPadding: 0,
      color: "rgba(204,204,204,.85)",
    },
  },
  series: [
    {
      name: "",
      data: getMistakeData(mistakes, "math").values,
    },
  ],
});

Highcharts.chart("histRead", {
  chart: {
    type: "column",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "Mistake Histogram",
  },
  subtitle: {
    text: "The distribution of your mistake by question #",
  },
  xAxis: {
    categories: getMistakeData(mistakes, "reading").categories,
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: {
      text: "# of Mistakes",
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">Q: {point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name} </td>' +
      '<td style="padding:0"><b>{point.y} mistakes</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      shadow: false,
      borderWidth: 0.5,
      borderColor: "#666",
      pointPadding: 0,
      groupPadding: 0,
      color: "rgba(204,204,204,.85)",
    },
  },
  series: [
    {
      name: "",
      data: getMistakeData(mistakes, "reading").values,
    },
  ],
});

Highcharts.chart("histSci", {
  chart: {
    type: "column",
  },
  colors: ["#00A7E1", "#00171F", "#003459", "#007EA7"],
  credits: {
    enabled: false,
  },
  title: {
    text: "Mistake Histogram",
  },
  subtitle: {
    text: "The distribution of your mistake by question #",
  },
  xAxis: {
    categories: getMistakeData(mistakes, "science").categories,
    crosshair: true,
  },
  yAxis: {
    min: 0,
    title: {
      text: "# of Mistakes",
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">Q: {point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name} </td>' +
      '<td style="padding:0"><b>{point.y} mistakes</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      shadow: false,
      borderWidth: 0.5,
      borderColor: "#666",
      pointPadding: 0,
      groupPadding: 0,
      color: "rgba(204,204,204,.85)",
    },
  },
  series: [
    {
      name: "",
      data: getMistakeData(mistakes, "science").values,
    },
  ],
});
