
var filtro = ["Area", "Gerente", "Representante"]

$(document).ready(function () {

    var selectedValues = new Array();
    filtro.forEach((fit, i) => {
        selectedValues[i] = fit;
    })
    $(".select2").val(selectedValues);

    atualizarTabela();
    $('#btnAtt').removeAttr('hidden');

});
$(document).on('destroy.dt', function (e, settings) {
    var api = new $.fn.dataTable.Api(settings);
    api.off('order.dt');
    api.off('preDraw.dt');
    api.off('column-visibility.dt');
    api.off('search.dt');
    api.off('page.dt');
    api.off('length.dt ');
    api.off(' xhr.dt ');
});

var request = false
atualizarTabela = () => {

    if (JSON.parse(localStorage.getItem('user')) != null && !request) {
        request = true
        $('#loading').removeAttr('hidden');
        $('#message').text('Atualizando.. ')

        let options = {
            timeZone: 'America/Sao_Paulo',

            month: 'numeric',

        };
        let date = new Intl.DateTimeFormat([], options);
        let mes = date.format(new Date()) - 0

        let json = {}

        json['mes'] = mes
        json['filtro'] = filtro

        ajax(_BASE_URL + _EP_RELATORIO_VENDAS_DETALHADA_COMPLETA, 'POST', json, function (res) {
            console.log(res);

            if (res.length) {

                let data = []
                let sum = []
                let columsDef = []

                

                let group = []

                let headString = []
                let head = '<tr>'

                let count = 0
                Object.keys(res[0]).forEach(chave => {
                    console.log(chave);
                    headString.push(chave)

                    if (typeof res[0][chave] == 'number' && chave != 'Cod') {
                        sum.push(count)
                        head += `<th style="width: 90px;">${chave}</th>`
                    } else if (typeof res[0][chave] == 'number' && chave == 'Cod') {
                        head += `<th style="width: 30px;">${chave}</th>`
                    } else {
                        group.push(count)
                        head += `<th>${chave}</th>`
                    }
                    count++
                });
                console.log(sum)
                head += '</tr>'

                $('#head').html(head)

                let foot = '<tr>'
                for (let c = 0; c < count; c++) {
                    foot += '<th></th>'
                }
                foot += '</tr>'
                $('#foot').html(foot)

                sum.forEach((numb)=>{
                    columsDef.push({ "targets": [numb], "visible": true, className: "text-right" })
                })


                // $('#head').html(`
                // <tr>
                //     <th style="width: 100px;">Gerente</th>
                //     <th>Representante</th>
                //     <th>Vendedor</th>
                //     <th style="width: 90px;">Vlr. Geral</th>
                //     <th style="width: 90px;">Devoluções</th>
                //     <th style="width: 90px;">Vlr. Comercial</th>
                //     <th style="width: 90px;">Acordo</th>
                //     <th style="width: 90px;">Vlr. Líquido</th>
                //     <th style="width: 90px;">Desc. Boleto</th>
                // </tr>                    
                // `)



                res.forEach(element => {

                    let arrayItem = []
                    headString.forEach((ele) => {
                        arrayItem.push(typeof element[ele] == 'number' && ele != 'Cod' ? element[ele].toFixed(2) : element[ele])
                    })
                    data.push(arrayItem);
                    

                    // data.push([
                    //     element.GERENTE,  //0
                    //     element.REPRESENTANTE, //1
                    //     element.VENDEDOR, //2
                    //     // element.CLIENTE, //2
                    //     // element.EMBALAGEM, //2
                    //     // element.COD_PROD, //2
                    //     // element.PRODUTO, //2
                    //     element.VENDAS_GERAL.toFixed(2), //3
                    //     element.DEVOLUCOES.toFixed(2), //4
                    //     element.VALOR_COMERCIAL.toFixed(2), //5
                    //     element.VALOR_ACORDO.toFixed(2), //6
                    //     element.VALOR_LIQUIDO.toFixed(2), //7
                    //     element.DESC_BOLETO.toFixed(2) //8
                    // ]);

                });


                // 'data': [
                //     //    ["Tiger Nixon","System Architect","Edinburgh","5421","2011/04/25","$320,800"],
                //     //    ["Tiger Nixon","Additional information","","","","sasads"],

                //     ["DEMAIS UFS", "205-NEGOCIOS E NEGOCIOS", "295-CARLOS QUADROS", "850", "13303,5", "13303,5", "10", "2021"],
                //     ["DEMAIS UFS", "206-BARROS E CARNEIRO", "296-BARROS E CARNEIRO", "2145", "36570,6", "36570,6", "10", "2021"],
                //     ["DEMAIS UFS", "45-REPORMIX REPRESENTAC?ES LTDA - ME", "180-REPORMIX REPRESENTACÕES LTDA - ME", "2000", "34150,8", "33809,3", "10", "2021"],
                //     ["SP", "117-MARY & MARY REPRESENTACAO", "169-MARY E MARY REPRESENTACAO", "9930", "185861,88", "185861,88", "10", "2021"],
                //     ["ABC-BAIXADA", "221-FLAVIA ANDRADE", "323-FLAVIA ANDRADE", "8614", "129257,84", "129257,84", "10", "2021"],
                //     ["ABC-BAIXADA", "228-IAE REPRESENTACAO E SERVICOS", "329-LEANDRO ALMEIDA", "6124", "110837,04", "110837,04", "10", "2021"],
                //     ["ABC-BAIXADA", "229-MEFT REPRESENTACAO", "330-MARCOS BONZE", "4589", "71188,43", "71188,43", "10", "2021"],
                //     ["ABC-BAIXADA", "63-TIAGO ADEMIR DE ANGELO SAO ROQUE -  ME", "16-TIAGO ADEMIR", "4222", "70790,51", "70790,51", "10", "2021"],
                //     ["ABC-BAIXADA", "82-LOGI INTELLIGENCE LTDA", "213-PEDRO BATISTA", "1876", "29497,95", "29497,95", "10", "2021"],
                //     ["SP-INTERIOR", "58-SANCER REPRESENTACOES", "350-ALEXANDRE", "4329", "66267,09", "66267,09", "10", "2021"],
                //     ["SP-INTERIOR", "81-GERENTE FELIPE", "212-FELIPE ARAGAO", "1007", "20935,53", "20935,53", "10", "2021"],
                //     ["OUTRAS", "1-MARIZA CAPITAL", "153-VENDAS DIRETAS", "275", "2319,66", "2319,66", "10", "2021"],
                //     ["GOIAS", "224-MARIZA VAREJO I", "199-LAZARO LOPES", "6064", "83308,51", "83308,51", "10", "2021"],
                //     ["GOIAS", "224-MARIZA VAREJO I", "311-JORGE SILVA", "2731", "29257,06", "29257,06", "10", "2021"],
                //     ["GOIAS", "224-MARIZA VAREJO I", "358-WALISSON BARREIRA", "525", "6259,77", "6259,77", "10", "2021"],
                //     ["GOIAS", "9-GESTAO EMPRESARIAL GO", "17-FABIO", "17094", "262076,23", "257837,96", "10", "2021"],

                // ],

                console.log(data)


                //$('#example1').DataTable().clear();
                //$('#example1').DataTable().destroy();
                $('#example1').dataTable().fnDestroy();
                $('#itens').html('')

                // res.forEach(element => {
                //     item = `<tr>
                //             <td>${element.GERENTE}</td>
                //             <td>${element.REPRESENTANTE}</td>
                //             <td>${element.VENDEDOR}</td>
                //             <td>${element.VENDAS_GERAL.toFixed(2)}</td>
                //             <td>${element.DEVOLUCOES.toFixed(2)}</td>
                //             <td>${element.VALOR_COMERCIAL.toFixed(2)}</td>
                //             <td>${element.VALOR_ACORDO.toFixed(2)}</td>
                //             <td>${element.VALOR_LIQUIDO.toFixed(2)}</td>
                //             <td>${element.DESC_BOLETO.toFixed(2)}</td>
                //            </tr>`
                //     $('#itens').append(item)
                // });


                try {

                    var table = $('#example1').DataTable({
                        "footerCallback": function (row, data, start, end, display) {
                            var api = this.api(), data;

                            // converting to interger to find total
                            var intVal = function (i) {
                                return typeof i === 'string' ?
                                    i.replace(/[\$,]/g, '') * 1 :
                                    typeof i === 'number' ?
                                        i : 0;
                            };

                            $(api.column(0).footer()).html('Total');

                            sum.forEach(position => {
                                $(api.column(position).footer()).html(api
                                    .column(position)
                                    .data()
                                    .reduce(function (a, b) {
                                        return intVal(a) + intVal(b);
                                    }, 0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
                            });

                        },
                        'data': data,
                 
                         "columnDefs": columsDef,
                        //     // { "targets": [3], "visible": false },
                        //     // { "targets": [4], "visible": false },
                        //     // { "targets": [5], "visible": false },
                        //     // { "targets": [6], "visible": false },

                        //     // { "targets": [3], "visible": true, className: "text-right" },
                        //     // { "targets": [4], "visible": true, className: "text-right" },
                        //     // { "targets": [5], "visible": true, className: "text-right" },
                        //     // { "targets": [6], "visible": true, className: "text-right" },
                        //     // { "targets": [7], "visible": true, className: "text-right" },
                        //     // { "targets": [8], "visible": true, className: "text-right" },

                        //     // { "targets": [9], "visible": true },
                        //     // { "targets": [10], "visible": true },
                        //     // { "targets": [11], "visible": true },
                        //     // { "targets": [12], "visible": true },

                        // ],
                        'rowsGroup': group,// 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        'rowGroup': {
                            endRender: function (rows, group) {
                                console.log(rows)
                                var result = '';
                                columns.forEach(function (column) {
                                    var ageAvg = rows.data().pluck(column).reduce(function (a, b) {
                                        return a + b * 1;
                                    }, 0);
                                    result += 'column ' + column + ': ' + ageAvg + "</br>";
                                });
                                return group + "</br>" + result;
                            },
                            startRender: null
                        },
                        'createdRow': function (row, data, dataIndex) {
                            console.log(data)
                            console.log(row)

                            sum.forEach((col)=>{
                                let vlr = parseFloat($(`td:eq(${col})`, row).text())
                                $(`td:eq(${col})`, row).text(vlr.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
                                console.log($(`td:eq(${col})`, row).text())
                            })
                            //liquido - desconto boleto

                            // Use empty value in the "Office" column
                            // as an indication that grouping with COLSPAN is needed
                            // console.log(data[2])
                            // if (data[2] === '') { 
                            //     // Add COLSPAN attribute
                            //     $('td:eq(1)', row).attr('colspan', 4);

                            //     // Hide required number of columns
                            //     // next to the cell with COLSPAN attribute
                            //     $('td:eq(2)', row).css('display', 'none');
                            //     $('td:eq(3)', row).css('display', 'none');
                            //     $('td:eq(4)', row).css('display', 'none');
                            //     //$('td:eq(5)', row).css('display', 'none');
                            // }                    
                        },
                        "language":
                        {
                            "sProcessing": "A processar...",
                            "sLengthMenu": "Mostrar _MENU_ registos",
                            "sZeroRecords": "Não foram encontrados resultados",
                            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                            "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                            "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                            "sInfoPostFix": "",
                            "sSearch": "Procurar:",
                            "sUrl": "",
                            "oPaginate": {
                                "sFirst": "Primeiro",
                                "sPrevious": "Anterior",
                                "sNext": "Seguinte",
                                "sLast": "Último"
                            },
                            buttons: {
                                copyTitle: 'Copiado para área de transferência',
                                copyKeys: 'Pressione <i>ctrl</i> ou <i>\u2318</i> + <i>C</i> para copiar os dados da tabela para a área de transferência. <br><br>Para cancelar, clique nesta mensagem ou pressione Esc.',
                                copySuccess: {
                                    _: '%d linhas copiadas',
                                    1: '1 linha copiada'
                                }
                            }
                        },
                        "responsive": true,
                        "lengthChange": true,
                        "autoWidth": false, //quebra tudo
                        "paging": false,
                        "searching": true,
                        "ordering": true,
                        "info": true,
                        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
                        "pageLength": 10,
                        "buttons": [
                            // {
                            //     extend: 'copy', text: 'Copiar dados',
                            //     exportOptions: {
                            //         columns: ':visible'
                            //     }
                            // },
                            {
                                extend: 'excel', text: 'Excel',
                                exportOptions: {
                                    columns: ':visible'
                                }
                            },
                            {
                                extend: 'pdfHtml5',
                                text: 'PDF',
                                customize: function (doc) {


                                    doc['footer'] = (function (page, pages) {
                                        return {
                                            columns: [
                                                '',
                                                {
                                                    alignment: 'right',
                                                    margin: [0, 0, 40],
                                                    text: [
                                                        { text: page.toString(), italics: true },
                                                        ' de ',
                                                        { text: pages.toString(), italics: true }
                                                    ]
                                                }
                                            ],
                                        }
                                    });
                                },
                                pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                                exportOptions: {
                                    columns: ':visible',
                                    // search: 'applied',
                                    // order: 'applied'
                                },
                                orientation: 'landscape',
                                messageTop: function () {
                                    return $('#message').text()
                                },
                                footer: true
                            },
                            {
                                extend: 'print', text: 'Imprimir',
                                exportOptions: {
                                    columns: ':visible'
                                }
                            },
                            // { extend: 'colvis', text: 'Colunas' },

                        ]
                        // "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
                } catch (error) {
                    console.log(error.message)
                }

                let options = {
                    timeZone: 'America/Sao_Paulo',
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                };
                let date = new Intl.DateTimeFormat([], options);
                console.log(date.format(new Date()));
                $('#message').text('Atualizado ' + date.format(new Date()))
                request = false
            } else {
                $('#example1').dataTable().fnDestroy();

                $('#itens').html('')

                $("#example1").DataTable({
                    "language":
                    {
                        "sZeroRecords": "Não foram encontrados resultados",
                    },
                    "searching": false,
                    "lengthChange": false,
                    "paging": false,
                    "info": false
                })//.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

                $('#message').text('Sem conexão com o servidor')
                request = false
            }
            $('#loading').attr('hidden', 'true');

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
}

$('select').on('select2:select', function (e) {
    var data = e.params.data;
    // console.log(data.id);
    // console.log(data.text);

    filtro.push(data.text)
    console.log(filtro);

});



$('select').on('select2:unselect', function (e) {
    var data = e.params.data;
    // console.log(data.id);
    // console.log(data.text);

    const index = filtro.indexOf(data.text);
    if (index > -1) {
        filtro.splice(index, 1);
    }
    // filtro = [2, 9]
    console.log(filtro);

});

