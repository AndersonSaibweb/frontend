$(document).ready(function () {
    atualizarTabela();
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

        ajax(_BASE_URL + _EP_ESTOQUE, 'GET', {}, function (res) {
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
                    switch (chave) {
                        case 'Marca':
                            head += `<th style="width: 90px;">${chave}</th>`
                            group.push(count)
                            break;
                        case 'Embalagem':
                            head += `<th style="width: 140px;">${chave}</th>`
                            group.push(count)
                            break;
                        case 'Cod':
                            head += `<th style="width: 40px;">${chave}</th>`
                            break;
                        case 'Produto':
                            head += `<th>${chave}</th>`
                            break;
                        case 'Estoque':
                            head += `<th style="width: 50px;">${chave}</th>`
                            break;
                        case 'Carteira':
                            head += `<th style="width: 60px;">${chave}</th>`
                            break;
                        case 'Estoque - Carteira':
                            head += `<th style="width: 110px;">${chave}</th>`
                            break;
                        case 'Md Vd Men':
                            head += `<th style="width: 70px;">${chave}</th>`
                            break;
                        case 'Md Vd Sem':
                            head += `<th style="width: 70px;">${chave}</th>`
                            break;
                        case 'Dias':
                            head += `<th style="width: 30px;">${chave}</th>`
                            break;
                        case 'A Produzir':
                            head += `<th style="width: 70px;">${chave}</th>`
                            break;
                        default:
                            break;
                    }

                    // if(typeof res[0][chave] == 'number' && chave != 'Carteira'){
                    //     sum.push(count)
                    //     head += `<th style="width: 50px;">${chave}</th>`
                    // } else if (typeof res[0][chave] == 'number' && chave != 'Cod') {
                    //     sum.push(count)
                    //     head += `<th style="width: 90px;">${chave}</th>`
                    // } else if (typeof res[0][chave] == 'number' && chave == 'Cod') {
                    //     head += `<th style="width: 30px;">${chave}</th>`
                    // } else {
                    //     group.push(count)
                    //     head += `<th>${chave}</th>`
                    // }


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

                sum.forEach((numb) => {
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
                        arrayItem.push(element[ele])
                    })
                    data.push(arrayItem);

                });



                console.log(data)

                $('#example1').dataTable().fnDestroy();
                $('#itens').html('')


                var table = $("#example1").DataTable({
                    'data': data,
                    'rowsGroup': group,
                    'createdRow': function (row, data, dataIndex) {
                        console.log(data)
                        console.log(row)

                        if (data[9] < 0) {
                            $('td:eq(9)', row).html(0)
                        }
                        vlrDias = data[9]


                        if (vlrDias <= 10) {
                            //$('td:eq(0)', row).css('background-color', '#feb2a1');
                            $('td', row).css('background-color', '#feb2a1');
                        } else if (vlrDias <= 30) {
                            $('td', row).css('background-color', '#f2f263'); //rgb(240 255 0 / 75%);
                        } else if (vlrDias > 30) {
                            $('td', row).css('background-color', 'rgb(212 255 144)');
                        }

                        if (data[10] < 0) {
                            $('td:eq(10)', row).html(0)
                        }

                        // sum.forEach((col)=>{
                        //     let vlr = parseFloat($(`td:eq(${col})`, row).text())
                        //     $(`td:eq(${col})`, row).text(vlr.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
                        //     console.log($(`td:eq(${col})`, row).text())
                        // })
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
                    "responsive": false,
                    "lengthChange": true,
                    "autoWidth": false, //quebra tudo
                    "paging": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
                    "pageLength": 10,
                    "buttons": [
                        {
                            text: 'Atualizar',
                            action: function (e, dt, node, config) {
                                atualizarTabela()
                            }
                        },
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

                                // doc.styles.title = {
                                //     color: 'red',
                                //     fontSize: '40',
                                //     background: 'blue',
                                //     alignment: 'center',
                                //   }   

                                //doc.content[2].alignment = 'right'

                                // var cols = [];
                                // cols[0] = { text: 'Left part', alignment: 'left', margin: [20] };
                                // cols[1] = { text: 'Right part', alignment: 'right', margin: [0, 0, 20] };
                                // var objFooter = {};
                                // objFooter['columns'] = cols;
                                // doc['footer'] = objFooter;

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
                                        // margin: [0, 0, 20],
                                    }
                                });

                                // doc.content.splice(1, 0,
                                //     {
                                //         margin: [0, 0, 0, 12],
                                //         alignment: 'center',
                                //         image: 'data:image/png;base64,'
                                //     });                          
                            },
                            pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                            exportOptions: {
                                columns: ':visible',
                                // search: 'applied',
                                // order: 'applied'
                            },
                            // orientation: 'landscape',
                            messageTop: function () {
                                return $('#message').text()
                            },
                            footer: false
                        },
                        {
                            extend: 'print', text: 'Imprimir',
                            exportOptions: {
                                columns: ':visible'
                            }
                        },
                        { extend: 'colvis', text: 'Colunas' },

                    ]
                    // "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

                $('a.toggle-vis').on('click', function (e) {
                    e.preventDefault();

                    // Get the column API object
                    var table2 = $("#example1").dataTable()
                    var column = table2.api().column($(this).attr('data-column'));

                    // Toggle the visibility
                    column.visible(!column.visible());
                });

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
                    "info": false,
                    "buttons": [
                        {
                            text: 'Atualizar',
                            action: function (e, dt, node, config) {
                                atualizarTabela()
                            }
                        }
                    ]
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

                $('#message').text('Sem conexão com o servidor')
                request = false
            }
            $('#loading').attr('hidden', 'true');

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
}

