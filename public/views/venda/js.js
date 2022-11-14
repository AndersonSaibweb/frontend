var progressoMensal = 100;
var categorias = ['AAAAAAAA', 'BBBBB', 'CCCCC', 'DDDDDDDDD', 'EEEEEE'];
var objetivoPorCategoria = [5, 8, 10, 4, 15];
var objetivoDiarioPorCategoria = [5, 8, 10, 4, 15];
var realizadoPorCategoria = [5, 6, 7, 9, 12];

// define a cor de cada coluna
var atualizaRealizadoPorCategoria = function () {
    for (var i = 0; i < realizadoPorCategoria.length; i++) {
        var columnColor = "#E57373";
        var percentualAtingido = ((realizadoPorCategoria[i] / objetivoDiarioPorCategoria[i]) * 100).toFixed(2);
        var acimaAbaixo = (percentualAtingido >= progressoMensal) ? 'acima' : 'abaixo';
        var diferencaProgresso = (percentualAtingido - progressoMensal).toFixed(2);
        if (realizadoPorCategoria[i] >= objetivoDiarioPorCategoria[i]) {
            columnColor = "#57D680";
        }
        realizadoPorCategoria[i] = { y: realizadoPorCategoria[i], color: columnColor, atingido: percentualAtingido, diferencaProgresso: diferencaProgresso, acimaAbaixo: acimaAbaixo };
        console.log(realizadoPorCategoria);
    }
};
atualizaRealizadoPorCategoria();

Highcharts.SVGRenderer.prototype.symbols['c-rect'] = function (x, y, w, h) {
    return ['M', x, y + h / 2, 'L', x + w, y + h / 2];
};

Highcharts.chart('container1', {
    chart: {
        type: 'column',
        height: 290
    },

    title: {
        text: ''
    },

    xAxis: {
        categories: categorias,
        labels: {
            maxStaggerLines: 2
        }
    },
    yAxis: [{
        min: 0,
        lineColor: '#E0E0E0',
        gridLineColor: '#EEEEEE',
        endOnTick: false,
        title: null
    }],

    legend: {
        shadow: false
    },

    tooltip: {
        shared: true,
        outside: true,
        useHTML: true,
        headerFormat: '<b>{point.key}</b><table>',
        pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span>  {series.name}: </td>' + '<td style="text-align: right"><b>{point.y} clientes</b></td></tr>',
        footerFormat: '</table>'
    },

    plotOptions: {
        column: {
            grouping: false,
            shadow: false,
            borderWidth: 0
        }
    },

    series: [{
        zones: [{
            value: 1,
            color: '#ff4d40'
        }],
        dataLabels: {
            enabled: true,
            format: '{y:,.2f}'
        },
        dataSorting: {
            enabled: true,
            sortKey: 'y'
        },

        data: [{
            name: 'objetivo do mês',
            color: 'rgba(0,0,0,.08)',
            data: objetivoPorCategoria,
            borderRadius: 3,
            legendIndex: 1
        }, {
            name: 'clientes positivados',
            color: '#E57373',
            data: realizadoPorCategoria,
            borderRadius: 3,
            pointPadding: 0.2,
            legendColor: '#fafafa',
            tooltip: {
                headerFormat: '<b>{point.key}</b><table>',
                pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span>  {series.name}: </td>' + '<td style="text-align: right"><b>{point.y} clientes</b></br></br><b>{point.atingido}</b> % do objetivo do mês</br><b>{point.diferencaProgresso}</b> % {point.acimaAbaixo} do esperado até hoje</td></tr>',
                footerFormat: '</table>'
            },
            legendIndex: 0
        }, {
            name: 'esperado até hoje',
            color: 'rgba(64,47,104,.8)',
            data: objetivoDiarioPorCategoria,
            marker: {
                symbol: 'c-rect',
                lineWidth: 5,
                lineColor: '#3E2F68',
                radius: '18',
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            type: 'scatter',
            legendIndex: 1
        }]
    }],

    credits: {
        enabled: false
    },

    exporting: {
        enabled: false
    }
}, function (chart) {
    var series = chart.series;
    $(series[1]).each(function (i, serie) {
        if (serie.legendSymbol) serie.legendSymbol.destroy();
        if (serie.legendLine) serie.legendLine.destroy();
    });
});