// TODO: Setup Tab View to hold graph below
// https://www.w3schools.com/howto/howto_js_tabs.asp
// TODO: reformat + populate data to fit the following format below
section = 0;

function getData(stats, section) {
  var arr = [];
  var drilldown = [];
  const data = stats[section];
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const types = data[key];
    // Add general topic to data arr
    arr.push({
      name: key,
      y: types.length,
      drilldown: key,
    });
    //   Add specific types to drill down data arr
    var drillDownData = [];
    for (let type of types) {
      drillDownData.push([type.questionType.name, type.value]);
    }
    drilldown.push({
      name: key,
      id: key,
      data: drillDownData,
    });
  }
  return { arr, drilldown };
}
const data = getData(topicStats, section);
console.log(data);
// https://www.highcharts.com/demo/column-drilldown
Highcharts.chart("qTypeBar", {
  chart: {
    type: "column",
  },
  title: {
    text: "Mistakes by Question Type",
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
      data: data.arr,
    },
  ],
  drilldown: {
    series: data.drilldown,
  },
});
