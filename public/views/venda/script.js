
var tempoAtualiza = 0
var chart;
var chartArea;

function dataAnteriorFormatada(dt) {
    var data = new Date(dt),
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano = data.getFullYear();
    horas = data.getHours().toString().padStart(2, '0')
    minutos = data.getMinutes().toString().padStart(2, '0')
    segundos = data.getSeconds().toString().padStart(2, '0')
    return dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos;
}

let date = new Date();

let mes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getMonth() + 1
mes = mes.toString().padStart(2, '0')
const mesAgora = mes

let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
ultimoDia = ultimoDia.toString().padStart(2, '0')

let anoAtual = new Date(date.getFullYear(), date.getMonth() + 1, 0).getFullYear()
const anoAgora = anoAtual

let startDateInicial = '01/' + mes + '/' + anoAtual
let endDateFinal = ultimoDia + '/' + mes + '/' + anoAtual

document.getElementById('mes').value = mes

$('#reservationtime').daterangepicker({
    minDate: 0,
    // maxDate: '+1M',
    timePicker: false,
    timePickerIncrement: 30,
    startDate: startDateInicial,
    endDate: endDateFinal,
    locale: {
        format: 'DD/MM/YYYY'
    },
    "locale": {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "applyLabel": "Aplicar",
        "cancelLabel": "Cancelar",
        "daysOfWeek": [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sab"
        ],
        "monthNames": [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ],
        "firstDay": 1
    }
})

$(document).on("click", ".applyBtn", function () {
    atualizarDados();
});

$(document).ready(function () {
    atualizarDados();
});

var request = false
atualizarDados = () => {

    $('#loading').removeAttr('hidden');
    $('#message').text('Atualizando.. ')
    try {
        chartArea.destroy();

    } catch (error) {

    }
    try {
        chart.destroy();

    } catch (error) {

    }
    let dataSelecionada = document.getElementById('mes').value + '/01/' + document.getElementById('ano').value

    let date = new Date(dataSelecionada);

    let mes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getMonth() + 1
    mes = mes.toString().padStart(2, '0')

    let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    ultimoDia = ultimoDia.toString().padStart(2, '0')

    let anoAtual = new Date(date.getFullYear(), date.getMonth() + 1, 0).getFullYear()

    let startDateInicial = '01/' + mes + '/' + anoAtual
    let endDateFinal = ultimoDia + '/' + mes + '/' + anoAtual

    let json = {}
    json['DT_INICIAL'] = startDateInicial
    // json['DT_INICIAL'] = dataAnteriorFormatada($('#reservationtime').data('daterangepicker').startDate._d).substr(0, 10)
    json['DT_FINAL'] = endDateFinal
    // json['DT_FINAL'] = dataAnteriorFormatada($('#reservationtime').data('daterangepicker').endDate._d).substr(0, 10)
    json['ANO'] = anoAtual

    let habilitarCarteira = false
    if (mesAgora == mes && anoAgora == anoAtual) {
        habilitarCarteira = true
    }

    switch (mes) {
        case '01':
            json['MES'] = 'JANEIRO'
            break;
        case '02':
            json['MES'] = 'FEVEREIRO'
            break;
        case '03':
            json['MES'] = 'MARCO'
            break;
        case '04':
            json['MES'] = 'ABRIL'
            break;
        case '05':
            json['MES'] = 'MAIO'
            break;
        case '06':
            json['MES'] = 'JUNHO'
            break;
        case '07':
            json['MES'] = 'JULHO'
            break;
        case '08':
            json['MES'] = 'AGOSTO'
            break;
        case '09':
            json['MES'] = 'SETEMBRO'
            break;
        case '10':
            json['MES'] = 'OUTUBRO'
            break;
        case '11':
            json['MES'] = 'NOVEMBRO'
            break;
        case '12':
            json['MES'] = 'DEZEMBRO'
            break;

        default:
            break;
    }

    $('#txtFiltro').html(json['MES'] + ' / ' + document.getElementById('ano').value)
    $('#MesSelect').html(json['MES'] + ' / ' + document.getElementById('ano').value)

    console.log(json)

    ajax(_BASE_URL + 'api/v1/relatorio/get_view_analise_vendas_grafico_area', 'POST', json, function (res) {
        console.log(res)

        if (res.length > 0) {
            try {
                chartArea.destroy();
            } catch (error) {

            }
            let progressoMensal = 100;
            let categorias = [];
            let objetivoMeta = [];
            let objetivoCarteira = [];
            let objetivoFaturamento = [];

            res.forEach((item) => {
                categorias.push(item.AREA)
                objetivoMeta.push(item.META)
                if (habilitarCarteira) {
                    objetivoCarteira.push(item.COMERCIAL_CARTEIRA)
                } else {
                    objetivoCarteira.push(0)
                }
                objetivoFaturamento.push(item.VLR_COMERCIAL)

            })
            // define a cor de cada coluna
            // var atualizaobjetivoFaturamento = function() {
            for (let i = 0; i < objetivoFaturamento.length; i++) {
                let columnColor = "#548235";
                let vlrFalta = objetivoFaturamento[i] - objetivoMeta[i]
                // if (vlrFalta < 0) {
                //     vlrFalta = 0
                // }

                let percentualAtingido = ((objetivoFaturamento[i] / objetivoMeta[i]) * 100).toFixed(2);
                let acimaAbaixo = (percentualAtingido >= progressoMensal) ? 'acima' : 'abaixo';
                let diferencaProgresso = (percentualAtingido - progressoMensal).toFixed(2);
                if (objetivoFaturamento[i] >= objetivoCarteira[i]) {
                    columnColor = "#548235";
                }
                if (percentualAtingido == Infinity) {
                    percentualAtingido = 100
                }

                if (!parseFloat(percentualAtingido) > 0) {
                    percentualAtingido = 0
                }

                // if (!habilitarCarteira) {
                //     percentualAtingido = 0
                // }

                vlrFalta = vlrFalta.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                let faturamento = objetivoFaturamento[i].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                objetivoFaturamento[i] = { falta: vlrFalta, y: objetivoFaturamento[i], yy: faturamento, color: columnColor, atingido: percentualAtingido, diferencaProgresso: diferencaProgresso, acimaAbaixo: acimaAbaixo };
                // console.log(objetivoFaturamento);
            }

            for (let i = 0; i < objetivoCarteira.length; i++) {
                let columnColor = "#A9D08E";
                let carteria = objetivoCarteira[i].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                objetivoCarteira[i] = { y: objetivoCarteira[i], yy: carteria, color: columnColor };
                console.log(objetivoCarteira);
            }

            for (let i = 0; i < objetivoMeta.length; i++) {
                let columnColor = "#E0DDDD";
                let meta = objetivoMeta[i].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                objetivoMeta[i] = { y: objetivoMeta[i], yy: meta, color: columnColor };
                console.log(objetivoMeta);
            }
            // };
            // atualizaobjetivoFaturamento();
            // Highcharts.SVGRenderer.prototype.symbols['c-rect'] = function (x, y, w, h) {
            //     return ['M', x, y + h / 2, 'L', x + w, y + h / 2];
            // };

            chartArea = new Highcharts.chart('container1Area', {
                chart: {
                    type: 'column',
                    height: 290
                },

                title: {
                    text: 'OBJETIVO POR GERÊNCIA'
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
                    shadow: true
                },

                tooltip: {
                    shared: true,
                    outside: true,
                    useHTML: true,
                    headerFormat: '<b>{point.key}</b><table>',
                    pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span>  {series.name}: </td>' + '<td style="text-align: right"><b style="font-family: monospace;">{point.y}</b></td></tr>',
                    footerFormat: '</table>'
                },

                plotOptions: {
                    column: {
                        grouping: false,
                        shadow: false,
                        borderWidth: 0
                    }
                },

                // dataSorting: {
                //     enabled: true
                // },

                series: [
                    // {
                    //     name: 'Objetivo do mês',
                    //     color: 'rgba(0,0,0,.08)',
                    //     data: objetivoMeta,
                    //     borderRadius: 3,
                    //     legendIndex: 1,
                    //     style: {
                    //         fontFamily: 'monospace'
                    //     }
                    // },

                    {
                        name: 'Objetivo do mês',
                        color: '#E0DDDD',
                        data: objetivoMeta,
                        borderRadius: 3,
                        legendIndex: 1,
                        legendColor: '#fafafa',
                        tooltip: {
                            headerFormat: '<b>{point.key}</b>',
                            // pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span>d  {series.name}: </td>' + '<td style="text-align: right"><b>{point.y}</b></br></br><b>a</b> b</b></td></tr>',
                            pointFormat: `
                            <table>

                            <tr>
                            <td><span style="color:{point.color}">\u25CF</span>&nbsp; {series.name}: <b style="font-family: monospace;">{point.yy}</b></td>
                            </tr>

                            </table>
                            `,
                            footerFormat: ''
                        },
                    },
                    //rgba(64,47,104,.8)
                    {
                        name: 'Fatur. + Carteira',
                        color: '#A9D08E',
                        data: objetivoCarteira,
                        borderRadius: 3,
                        pointPadding: 0.2,
                        legendIndex: 2,
                        legendColor: '#fafafa',
                        tooltip: {
                            headerFormat: '<b>{point.key}</b>',
                            // pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span>d  {series.name}: </td>' + '<td style="text-align: right"><b>{point.y}</b></br></br><b>a</b> b</b></td></tr>',
                            pointFormat: `
                            <table>

                            <tr>
                            <td><span style="color:{point.color}">\u25CF</span>&nbsp; {series.name}: <b style="font-family: monospace;">{point.yy}</b></td>
                            </tr>

                            </table>
                            `,
                            footerFormat: ''
                        },
                    },

                    {
                        name: 'Faturamento atual',
                        color: '#548235',
                        data: objetivoFaturamento,
                        borderRadius: 3,
                        pointPadding: 0.2,
                        legendColor: '#fafafa',
                        tooltip: {
                            headerFormat: '<b>{point.key}</b>',
                            // pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span>d  {series.name}: </td>' + '<td style="text-align: right"><b>{point.y}</b></br></br><b>a</b> b</b></td></tr>',
                            pointFormat: `
                            <table>

                            <tr>
                            <td><span style="color:{point.color}">\u25CF</span>&nbsp; {series.name}: <b style="font-family: monospace;">{point.yy}</b></td>
                            </tr>

                            <tr>
                            <td>Atingido <b>{point.atingido}%</b> do objetivo</td>
                            </tr>

                            <tr>
                            <td>Dif. <b>{point.falta}</b></td>
                            </tr>                            

                            </table>
                            `,
                            footerFormat: ''
                        },
                        legendIndex: 3
                    },
                    // {
                    //     name: 'Carteira + Faturamento',
                    //     color: '#A9D08E',
                    //     data: objetivoCarteira,
                    //     marker: {
                    //         symbol: 'c-rect',
                    //         lineWidth: 5,
                    //         lineColor: '#3E2F68',
                    //         radius: '18',
                    //         states: {
                    //             hover: {
                    //                 enabled: false
                    //             }
                    //         }
                    //     },
                    //     type: 'scatter',
                    //     legendIndex: 1
                    // }
                ],

                credits: {
                    enabled: false
                },

                exporting: {
                    enabled: false
                }
            }, function (chart) {
                let series = chart.series;
                $(series[1]).each(function (i, serie) {
                    if (serie.legendSymbol) serie.legendSymbol.destroy();
                    if (serie.legendLine) serie.legendLine.destroy();
                });
            });
        }
    })

    ajax(_BASE_URL + 'api/v1/relatorio/getMargemGeralFaturado', 'POST', json, function (res) {
        if (res) {
            let vlrMargem = res[0]?.PERC_M
            $('#margem').html(vlrMargem.toFixed(2) + '%')
            if (parseFloat(vlrMargem) < 12) {
                document.getElementById('margem').style.color = 'red'
            } else {
                document.getElementById('margem').style.color = '#548235'
            }
        }
        console.log(res)
    })

    ajax(_BASE_URL + 'api/v1/relatorio/get_view_analise_vendas_grafico', 'POST', json, function (res) {
        console.log(res)

        if (res.length > 0) {
            try {
                chart.destroy();

            } catch (error) {

            }
            let progressoMensal = 100;
            let categorias = [];
            let objetivoMeta = [];
            let objetivoCarteira = [];
            let objetivoFaturamento = [];
            let metaVlr = 0
            let faturCarteiraVlr = 0
            let carteiraVlr = 0
            let faturadoVlr = 0
            res.forEach((item) => {
                categorias.push(item.GERENTE)
                objetivoMeta.push(item.META)
                metaVlr += parseFloat(item.META)
                if (habilitarCarteira) {
                    objetivoCarteira.push(item.COMERCIAL_CARTEIRA)
                    faturCarteiraVlr += parseFloat(item.COMERCIAL_CARTEIRA)
                    carteiraVlr += parseFloat(item.CARTEIRA)
                } else {
                    objetivoCarteira.push(0)
                }
                objetivoFaturamento.push(item.VLR_COMERCIAL)
                faturadoVlr += parseFloat(item.VLR_COMERCIAL)

            })
            $('#metaVlr').html(metaVlr.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
            $('#carteiraVlr').html(carteiraVlr.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
            $('#faturCarteiraVlr').html(faturCarteiraVlr.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
            $('#faturadoVlr').html(faturadoVlr.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))



            let atingidoPorcentual = ((faturadoVlr / metaVlr) * 100).toFixed(2);
            if (!parseFloat(atingidoPorcentual) > 0) {
                atingidoPorcentual = 0
            }

            if (atingidoPorcentual == Infinity) {
                atingidoPorcentual = 0
            }

            $('#atingidoVlr').html(atingidoPorcentual + '%');

            let diferenca = faturadoVlr - metaVlr

            $('#diferenca').html(diferenca.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));

            if (diferenca <= 0) {
                document.getElementById('diferenca').style.color = 'red'
            } else {
                document.getElementById('diferenca').style.color = '#548235'
            }
            // define a cor de cada coluna
            // var atualizaobjetivoFaturamento = function() {
            for (let i = 0; i < objetivoFaturamento.length; i++) {
                let columnColor = "#548235";
                let vlrFalta = objetivoFaturamento[i] - objetivoMeta[i]

                // if (vlrFalta < 0) {
                //     vlrFalta = 0
                // }

                let percentualAtingido = ((objetivoFaturamento[i] / objetivoMeta[i]) * 100).toFixed(2);
                let acimaAbaixo = (percentualAtingido >= progressoMensal) ? 'acima' : 'abaixo';
                let diferencaProgresso = (percentualAtingido - progressoMensal).toFixed(2);
                if (objetivoFaturamento[i] >= objetivoCarteira[i]) {
                    columnColor = "#548235";
                }
                if (percentualAtingido == Infinity) {
                    percentualAtingido = 100
                }

                if (!parseFloat(percentualAtingido) > 0) {
                    percentualAtingido = 0
                }

                // if (!habilitarCarteira) {
                //     percentualAtingido = 0
                // }

                vlrFalta = vlrFalta.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                let faturamento = objetivoFaturamento[i].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                objetivoFaturamento[i] = { falta: vlrFalta, y: objetivoFaturamento[i], yy: faturamento, color: columnColor, atingido: percentualAtingido, diferencaProgresso: diferencaProgresso, acimaAbaixo: acimaAbaixo };
                // console.log(objetivoFaturamento);
            }

            for (let i = 0; i < objetivoCarteira.length; i++) {
                let columnColor = "#A9D08E";
                let carteria = objetivoCarteira[i].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                objetivoCarteira[i] = { y: objetivoCarteira[i], yy: carteria, color: columnColor };
                console.log(objetivoCarteira);
            }

            for (let i = 0; i < objetivoMeta.length; i++) {
                let columnColor = "#E0DDDD";
                let meta = objetivoMeta[i].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                objetivoMeta[i] = { y: objetivoMeta[i], yy: meta, color: columnColor };
                console.log(objetivoMeta);
            }
            // };
            // atualizaobjetivoFaturamento();
            Highcharts.SVGRenderer.prototype.symbols['c-rect'] = function (x, y, w, h) {
                return ['M', x, y + h / 2, 'L', x + w, y + h / 2];
            };

            chart = new Highcharts.chart('container1', {
                chart: {
                    type: 'column',
                    height: 290
                },

                title: {
                    text: 'OBJETIVO POR REGIÃO'
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
                    shadow: true
                },

                tooltip: {
                    shared: true,
                    outside: true,
                    useHTML: true,
                    headerFormat: '<b>{point.key}</b><table>',
                    pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span>  {series.name}: </td>' + '<td style="text-align: right"><b style="font-family: monospace;">{point.y}</b></td></tr>',
                    footerFormat: '</table>'
                },

                plotOptions: {
                    column: {
                        grouping: false,
                        shadow: false,
                        borderWidth: 0
                    }
                },

                series: [
                    // {
                    //     name: 'Objetivo do mês',
                    //     color: 'rgba(0,0,0,.08)',
                    //     data: objetivoMeta,
                    //     borderRadius: 3,
                    //     legendIndex: 1,
                    //     style: {
                    //         fontFamily: 'monospace'
                    //     }
                    // },

                    {
                        name: 'Objetivo do mês',
                        color: '#E0DDDD',
                        data: objetivoMeta,
                        borderRadius: 3,
                        legendIndex: 1,
                        legendColor: '#fafafa',
                        tooltip: {
                            headerFormat: '<b>{point.key}</b>',
                            // pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span>d  {series.name}: </td>' + '<td style="text-align: right"><b>{point.y}</b></br></br><b>a</b> b</b></td></tr>',
                            pointFormat: `
                            <table>

                            <tr>
                            <td><span style="color:{point.color}">\u25CF</span>&nbsp; {series.name}: <b style="font-family: monospace;">{point.yy}</b></td>
                            </tr>

                            </table>
                            `,
                            footerFormat: ''
                        },
                    },
                    //rgba(64,47,104,.8)
                    {
                        name: 'Fatur. + Carteira',
                        color: '#A9D08E',
                        data: objetivoCarteira,
                        borderRadius: 3,
                        pointPadding: 0.2,
                        legendIndex: 2,
                        legendColor: '#fafafa',
                        tooltip: {
                            headerFormat: '<b>{point.key}</b>',
                            // pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span>d  {series.name}: </td>' + '<td style="text-align: right"><b>{point.y}</b></br></br><b>a</b> b</b></td></tr>',
                            pointFormat: `
                            <table>

                            <tr>
                            <td><span style="color:{point.color}">\u25CF</span>&nbsp; {series.name}: <b style="font-family: monospace;">{point.yy}</b></td>
                            </tr>

                            </table>
                            `,
                            footerFormat: ''
                        },
                    },

                    {
                        name: 'Faturamento Atual',
                        color: '#548235',
                        data: objetivoFaturamento,
                        borderRadius: 3,
                        pointPadding: 0.2,
                        legendColor: '#fafafa',
                        tooltip: {
                            headerFormat: '<b>{point.key}</b>',
                            // pointFormat: '<tr><td><span style="color:{point.color}">\u25CF</span>d  {series.name}: </td>' + '<td style="text-align: right"><b>{point.y}</b></br></br><b>a</b> b</b></td></tr>',
                            pointFormat: `
                            <table>

                            <tr>
                            <td><span style="color:{point.color}">\u25CF</span>&nbsp; {series.name}: <b style="font-family: monospace;">{point.yy}</b></td>
                            </tr>

                            <tr>
                            <td>Atingido <b>{point.atingido}%</b> do objetivo</td>
                            </tr>

                            <tr>
                            <td>Dif. <b>{point.falta}</b></td>
                            </tr>                            

                            </table>
                            `,
                            footerFormat: ''
                        },
                        legendIndex: 3
                    },
                    // {
                    //     name: 'Carteira + Faturamento',
                    //     color: '#A9D08E',
                    //     data: objetivoCarteira,
                    //     marker: {
                    //         symbol: 'c-rect',
                    //         lineWidth: 5,
                    //         lineColor: '#3E2F68',
                    //         radius: '18',
                    //         states: {
                    //             hover: {
                    //                 enabled: false
                    //             }
                    //         }
                    //     },
                    //     type: 'scatter',
                    //     legendIndex: 1
                    // }
                ],

                credits: {
                    enabled: false
                },

                exporting: {
                    enabled: false
                }
            }, function (chart) {
                let series = chart.series;
                $(series[1]).each(function (i, serie) {
                    if (serie.legendSymbol) serie.legendSymbol.destroy();
                    if (serie.legendLine) serie.legendLine.destroy();
                });
            });
        }
        let date = new Intl.DateTimeFormat([], _OPTIONS_DATE);
        $('#message').text('Atualizado ' + date.format(new Date()))
        $('#loading').attr('hidden', 'true');
    });

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {


    while (true) {
        await sleep(1000)
        try {
            if (tempoAtualiza >= 600) {
                tempoAtualiza = 0
                let lista = document.getElementsByClassName('highcharts-tooltip-container')
                lista = [...lista]
                lista.forEach((element) => {
                    element.innerHTML = ''
                })
                atualizarDados()
            } else {
                tempoAtualiza++
            }
        } catch (error) { console.log('opção não encontrada') }
    }
})();

// $("#goTo").click(function() {
//     window.open('https://codepen.io/mycnlz/full/wXoZyz');
// });