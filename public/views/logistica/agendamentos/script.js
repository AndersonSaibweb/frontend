var cargaTemp = 0
var idLiquidacao = 0
var idColeta = 0
var perm = []
var idOcorrecia = 0
var idTransportadora = 0
var nomeTransportadora = ''
var obrigatorio = []
var edit = false
var rowsBackup = []
var rowsLine = 0
var tempoAtualiza = 0
var starting = false
filtroPesquisa = ''
$('#txtCpfMotorista').mask('000.000.000-00', { reverse: false });
$('#txtChamadoCpfMotorista').mask('000.000.000-00', { reverse: false });

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
    if (JSON.parse(localStorage.getItem('user')) != null && !request && !edit) {
        request = true
        $('#loading').removeAttr('hidden');
        $('#message').text('Atualizando.. ')

        ajax(_BASE_URL + _EP_GET_AGENDAMENTOS, 'GET', {}, function (res) {
            console.log(res);

            if (res.length) {

                if (JSON.parse(localStorage.getItem('user')) != null) {
                    ajax(_BASE_URL + _EP_GET_PERMISSOES + 'lista', 'GET', {}, function (grus) {

                        console.log(grus);
                        perm = grus

                        // if (!perm.includes('viewUpdateCarga')) {
                        //     console.log('Atualizando')
                        try { document.getElementById('custom-tabs-four-editar-tab').remove() } catch (e) { }
                        // }

                        if (perm.includes('viewAberturaChamado')) {
                            $('#btnAbrirChamado').removeAttr('hidden')
                        }


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
                                case 'Transportadora':
                                    head += `<th>${chave}</th>`
                                    group.push(count)
                                    break;
                                case 'Frete':
                                    head += `<th style="width: 40px;">${chave}</th>`
                                    break;
                                case 'Placa':
                                    head += `<th style="width: 70px;">${chave}</th>`
                                    break;
                                case 'Motorista':
                                    head += `<th style="width: 200px;">${chave}</th>`
                                    break;
                                case 'Faturado':
                                    head += `<th style="width: 25px;"><img style="width: 25px" src='../../../src/nfe.png' alt='nfe'/></th>`
                                    // head += `<th style="width: 50px;"><img style="width: 25px" src='../../../src/nfe.png' alt='nfe'/></th>`
                                    break;
                                case 'Carga':
                                    head += `<th style="width: 50px;">${chave}</th>`
                                    break;
                                case 'Coleta':
                                    head += `<th hidden style="width: 40px;">${chave}</th>`
                                    break;
                                case 'Data':
                                    head += `<th style="width: 80px;">${chave}</th>`
                                    break;
                                case 'Hora':
                                    head += `<th style="width: 40px;">${chave}</th>`
                                    break;
                                case 'Status':
                                    head += `<th style="width: 150px;">${chave}</th>`
                                    break;
                                case 'LIQU_FRO_ID':
                                    head += `<th hidden style="width: 40px;">${chave}</th>`
                                    break;

                                default:
                                    break;
                            }

                            count++
                        });
                        console.log(sum)

                        head += `<th style="width: 20px;"></th>`
                        head += '</tr>'

                        $('#head').html(head)

                        // let foot = '<tr>'
                        // for (let c = 0; c < count; c++) {
                        //     foot += '<th></th>'
                        // }
                        // foot += '</tr>'
                        // $('#foot').html(foot)

                        sum.forEach((numb) => {
                            columsDef.push({ "targets": [numb], "visible": true, className: "text-right" })
                        })

                        $('#example1').dataTable().fnDestroy();
                        $('#itens').html('')

                        res.forEach(element => {

                            if (element.Status != 'E') {

                                let btnEditar = `<a onClick="openModal2('${element.Transportadora}',${element.Carga},${element.Coleta}, '${element.Status}', '${element.LIQU_FRO_ID}')" style="font-size: 15px" href="#"><i class="fas fa-exchange-alt"></i></a>`
                                // switch (element.Status) {
                                //     case 'A':
                                //         perm.includes('viewUpdateChegadaPortaria') ? null : btnEditar = ''
                                //         break;
                                //     case 'B':
                                //         perm.includes('viewUpdateEntradaLiberada') ? null : btnEditar = ''
                                //         break;
                                //     case 'C':
                                //         perm.includes('viewUpdateCarregamentoIniciado') ? null : btnEditar = ''
                                //         break;
                                //     case 'D':
                                //         perm.includes('viewUpdateCarregamentoFinalizado') ? null : btnEditar = ''
                                //         break;
                                //     case 'E':
                                //         perm.includes('viewUpdateSaidaLiberada') ? null : btnEditar = ''
                                //         break;
                                //     case 'F':
                                //         perm.includes('viewUpdateOcorrencia') ? null : btnEditar = ''
                                //         break;
                                //     default:
                                //         perm.includes('viewUpdateAguardandoVeiculo') ? null : btnEditar = ''
                                //         break;
                                // }





                                let hr = element.Hora
                                let dt = element.Data
                                if (element.Status != '' && element.Status != undefined) {
                                    if (element["Hora Status"] != '' && element["Hora Status"] != undefined) {
                                        hr = element["Hora Status"].substr(0, 5)
                                    }
                                    if (element["Data Status"] != '' && element["Data Status"] != undefined) {
                                        dt = element["Data Status"]
                                    }
                                }

                                item = `<tr>
                            <td>${element.Transportadora}</td>
                            <td>${element.Frete}</td>
                            <td>${element.Placa}</td>
                            <td>${element.Motorista}</td>
                            <td>${element.Faturado}</td>
                            <td>${element.Carga}</td>
                            <td hidden>${element.Coleta}</td>
                            <td>${dt}</td>
                            <td style="text-align: center">${hr}</td>
                            <td>${element.Status}</td>
                            <td>${btnEditar}</td>
                            <td hidden>${element.LIQU_FRO_ID}</td>
                           </tr>`
                                $('#itens').append(item)
                            }
                        });

                        // res.forEach(element => {

                        //     let arrayItem = []
                        //     headString.forEach((ele) => {
                        //         arrayItem.push(element[ele])
                        //     })
                        //     data.push(arrayItem);

                        // });

                        // console.log(data)



                        var table = $("#example1").DataTable({

                            "columnDefs": [

                                { "targets": [2], "visible": true, className: "center" },
                                { "targets": [5], "visible": true, className: "center" },
                                { "targets": [6], "visible": true, className: "center" },
                                { "targets": [7], "visible": true, className: "center" },
                                // { "targets": [8], "visible": true, className: "center" },
                                // {
                                //     "targets": [9],
                                //     "visible": true,
                                //     "mData": "userId",
                                //     "mRender": function (data, type, full) {
                                //         return '<a style="font-size: 15px" href="#"><i class="fas fa-exchange-alt"></i></a>';
                                //     }
                                // },

                            ],
                            //'data': data,
                            // 'rowsGroup': [8],
                            'createdRow': function (row, data, dataIndex) {
                                //console.log(data)
                                //    console.log(row)

                                let data2 = new Date(data[7]), //posição data
                                    dia = data2.getDate().toString().padStart(2, '0'),
                                    mes = (data2.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
                                    ano = data2.getFullYear();
                                horas = data2.getHours().toString().padStart(2, '0')
                                minutos = data2.getMinutes().toString().padStart(2, '0')
                                segundos = data2.getSeconds().toString().padStart(2, '0')
                                //return dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos;
                                let diaFormatado = dia + "/" + mes + "/" + ano
                                if (diaFormatado == 'NaN/NaN/NaN') {
                                    diaFormatado = element.Data
                                }

                                $('td:eq(7)', row).html(diaFormatado)

                                $('td:eq(2)', row).css('text-align', 'center');
                                $('td:eq(5)', row).css('text-align', 'center');
                                $('td:eq(6)', row).css('text-align', 'center');
                                $('td:eq(7)', row).css('text-align', 'center');

                                //  $('td:eq(9)', row).css('text-align', 'center');
                                //$('td:eq(9)', row).attr('onClick', `openModal2(${dataIndex})`);

                                //<i class="fa fa-trash"/>

                                let status
                                //console.log($('td:eq(8)', row).text())
                                switch ($('td:eq(9)', row).text()) {
                                    case 'A':
                                        status = 'CHEGADA NA PORTARIA'
                                        $('td', row).css('background-color', 'rgb(255 193 7 / 75%)');
                                        break;
                                    case 'B':
                                        status = 'ENTRADA LIBERADA'
                                        $('td', row).css('background-color', 'rgb(136 247 162)');
                                        break;
                                    case 'C':
                                        status = 'CARREGAMENTO INICIADO'
                                        $('td', row).css('background-color', '#9BC2E6');
                                        break;
                                    case 'D':
                                        status = 'CARREGAMENTO FINALIZADO'
                                        $('td', row).css('background-color', '#F4B084');
                                        break;
                                    case 'E':
                                        status = 'SAIDA NA PORTARIA'
                                        $('td', row).css('background-color', '#B2B2B2');
                                        break;
                                    case 'F':
                                        status = 'OCORRENCIA'
                                        $('td', row).css('background-color', '#B2B2B2');
                                        break;
                                    default:
                                        status = 'AGUARDANDO VEÍCULO'
                                        break;
                                }
                                $('td:eq(9)', row).html(status)

                            },
                            // "order": [[8, "desc"]],
                            "order": [[9, "asc"], [7, 'asc'], [8, 'desc']],
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
                        })//.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

                        if (!starting) {
                            starting = true
                            let myTable = $('#example1').DataTable();
                            $('#example1').on('dblclick', 'tbody tr', function () {

                                let rowsEdit = this.querySelectorAll('td')
                                console.log(rowsEdit[11].innerHTML)
                                if (perm.includes('viewUpdateCarga') && rowsEdit[11].innerHTML != '0') {
                                    if (rowsEdit[9].innerHTML == 'CHEGADA NA PORTARIA' || rowsEdit[9].innerHTML == 'AGUARDANDO VEÍCULO' || rowsEdit[9].innerHTML == 'OCORRENCIA') {
                                        if (edit)
                                            return
                                        edit = true

                                        var dataa = $('#example1').DataTable().row(this).data();
                                        console.log(dataa)
                                        rowsLine = this
                                        rowsBackup = dataa
                                        console.log('rowsBackup')
                                        console.log(rowsBackup)
                                        // rowsLine = myTable.row(this).index()
                                        console.log(this)

                                        if (rowsEdit[1].innerHTML == 'CIF') {
                                            rowsEdit[0].innerHTML = `                                          
                                            <select id="optTransportadoras" keydown="tabtoenter(e)" onchange="changeFuncTransportadora();"
                                            class="form-control select2bs4Trans select2-hidden-accessible" style="width: 100%;"
                                            aria-hidden="true">
                                            <option selected value="">--Selecione--</option>
                                            </select>                                                                                                                               
                                        `
                                        } else {
                                            rowsEdit[0].innerHTML = `<input id="txtTransportadoraa" style="width: 100%; text-transform: uppercase" type="text" value="${rowsEdit[0].innerHTML}">`
                                        }

                                        let freteType = rowsEdit[1].innerHTML
                                        rowsEdit[1].innerHTML = `
                                        <select style="width: 50px; height: 25px;" id="optFrete" onchange="mudandoFrete()">
                                            <option value="CIF">CIF</option>
                                            <option value="FOB">FOB</option>
                                        </select>                                        
                                        `

                                        let arroptFrete = document.getElementById('optFrete').options
                                        for (let i = 0; i < arroptFrete.length; i++) {
                                            console.log(freteType)
                                            console.log(arroptFrete[i].value)
                                            if (arroptFrete[i].value == freteType) {
                                                optFrete.selectedIndex = i
                                            }
                                        }

                                        // rowsEdit[1].innerHTML = `<input style="width: 100%; text-transform: uppercase" type="text" value="${rowsEdit[1].innerHTML}">`
                                        rowsEdit[2].innerHTML = `<input style="width: 100%; text-transform: uppercase" type="text" value="${rowsEdit[2].innerHTML}">`
                                        rowsEdit[3].innerHTML = `<input style="width: 100%; text-transform: uppercase" type="text" value="${rowsEdit[3].innerHTML}">`
                                        rowsEdit[7].innerHTML = `<input id="txtData" style="width: 100%; text-transform: uppercase" type="text" value="${rowsEdit[7].innerHTML}">`
                                        rowsEdit[8].innerHTML = `<input id="txtHora" style="width: 100%; text-transform: uppercase" type="text" value="${rowsEdit[8].innerHTML}">`

                                        $("#txtData").mask("00/00/0000");
                                        $("#txtHora").mask("00:00");

                                        $("input.focus").focus(function () {
                                            var val = this.value,
                                                $this = $(this);
                                            $this.val("");

                                            setTimeout(function () {
                                                $this.val(val);
                                            }, 1);
                                        });


                                        $('body').on('keydown', 'input, select', function (e) {
                                            if (e.keyCode == 13) {
                                                var focusable = $('input,a,select,button,textarea').filter(':visible');
                                                let el = focusable.eq(focusable.index(this) + 1)
                                                el.focus();
                                                el.select();
                                                return false;
                                            }
                                        });

                                        $('.select2bs4Trans').select2({
                                            theme: 'bootstrap4'
                                        })
                                        try { document.querySelector('span[aria-labelledby="select2-optTransportadoras-container"]').style = 'height:25px !important' } catch (e) { }
                                        try { document.getElementById('select2-optTransportadoras-container').style = 'font-size: 14px;line-height: 1.8 !important' } catch (e) { }
                                        getTransportadoras(rowsEdit[11].innerHTML)

                                        if (freteType == 'FOB') {
                                            document.getElementById('txtTransportadoraa').focus()
                                            document.getElementById('txtTransportadoraa').select()
                                        } else {
                                            document.getElementById('optTransportadoras').focus()
                                        }

                                    }
                                } else if (!edit && perm.includes('viewUpdateCarga') && rowsEdit[11].innerHTML == '0') {
                                    document.getElementById('txtAssociarCarga').value = ''
                                    cargaTemp = rowsEdit[5].innerHTML
                                    console.log(cargaTemp)
                                    $('#modal-associar').modal('show');

                                    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
                                    const body = document.body;
                                    body.style.position = 'fixed';
                                    body.style.top = `-${scrollY}`;;
                                }

                            });

                            $('#example1').DataTable().draw();
                            $.fn.dataTable.ext.search.push(
                                function (settings, data, dataIndex) {

                                    if (filtroPesquisa == '' || filtroPesquisa == undefined) {
                                        filtroPesquisa = ''
                                        return true
                                    }

                                    if (filtroPesquisa != '' && filtroPesquisa != undefined) {
                                        if (data[0].toUpperCase().includes(filtroPesquisa.toUpperCase())) {
                                            return true
                                        }
                                        if (data[1].toUpperCase().includes(filtroPesquisa.toUpperCase())) {
                                            return true
                                        }
                                        if (data[2].toUpperCase().includes(filtroPesquisa.toUpperCase())) {
                                            return true
                                        }
                                        if (data[3].toUpperCase().includes(filtroPesquisa.toUpperCase())) {
                                            return true
                                        }
                                        if (data[4].toUpperCase().includes(filtroPesquisa.toUpperCase())) {
                                            return true
                                        }
                                        if (data[5].toUpperCase().includes(filtroPesquisa.toUpperCase())) {
                                            return true
                                        }
                                        if (data[7].toUpperCase().includes(filtroPesquisa.toUpperCase())) {
                                            return true
                                        }
                                        if (data[8].toUpperCase().includes(filtroPesquisa.toUpperCase())) {
                                            return true
                                        }
                                        if (data[9].toUpperCase().includes(filtroPesquisa.toUpperCase())) {
                                            return true
                                        }
                                        return false

                                    } else {
                                        return false;
                                    }

                                }
                            );
                            $('#example1').DataTable().draw();
                        }

                        $('input[type="search"]').val(filtroPesquisa)


                        $('input[type="search"]').on("keyup", function () {
                            if (filtroPesquisa != $('input[type="search"]').val()) {
                                filtroPesquisa = $('input[type="search"]').val()
                                $('#example1').DataTable().draw();
                                console.log(filtroPesquisa)
                            }
                        });


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
                    }, JSON.parse(localStorage.getItem('user')).accessToken);
                }

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
            tempoAtualiza = 0
            edit = false
            $('#loading').attr('hidden', 'true');
            getLogsAgendamento()

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
}

window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

function openModal(index) {

    let rows = document.getElementById('itens').querySelectorAll('tr')

    // rows = [...rows]
    // rows.reverse()
    console.log(rows[index])

    let row = rows[index]

    let transportadora = $('td:eq(0)', row).text()
    let frete = $('td:eq(1)', row).text()
    let placa = $('td:eq(2)', row).text()
    let motorista = $('td:eq(3)', row).text()
    let carga = $('td:eq(4)', row).text()
    let data = $('td:eq(5)', row).text()
    let hora = $('td:eq(6)', row).text()
    let status = $('td:eq(7)', row).text()

    $('#titleModal').text(transportadora)
    $('#bodyModal').html(
        `
        <div class="card card-primary card-outline card-outline-tabs">
            <div class="card-header p-0 border-bottom-0">
            <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                <li class="nav-item">
                <a class="nav-link active" id="custom-tabs-four-detalhes-tab" data-toggle="pill" href="#custom-tabs-four-detalhes"
                    role="tab" aria-controls="custom-tabs-four-detalhes" aria-selected="true">
                    <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Detalhes</font>
                    </font>
                </a>
                </li>
                <li class="nav-item">
                <a class="nav-link" id="custom-tabs-four-status-tab" data-toggle="pill" href="#custom-tabs-four-status"
                    role="tab" aria-controls="custom-tabs-four-status" aria-selected="false">
                    <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Status</font>
                    </font>
                </a>
                </li>
                <li class="nav-item">
                <a class="nav-link" id="custom-tabs-four-ocorrencia-tab" data-toggle="pill" href="#custom-tabs-four-ocorrencia"
                    role="tab" aria-controls="custom-tabs-four-ocorrencia" aria-selected="false">
                    <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Ocorrencia</font>
                    </font>
                </a>
                </li>
                <li class="nav-item">
                <a class="nav-link" id="custom-tabs-four-historico-tab" data-toggle="pill" href="#custom-tabs-four-historico"
                    role="tab" aria-controls="custom-tabs-four-historico" aria-selected="false">
                    <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">Histórico</font>
                    </font>
                </a>
                </li>
            </ul>
            </div>
            <div class="card-body">
            <div class="tab-content" id="custom-tabs-four-tabContent">
                <div class="tab-pane fade active show" id="custom-tabs-four-detalhes" role="tabpanel"
                aria-labelledby="custom-tabs-four-detalhes-tab">
                0
                </div>
                <div class="tab-pane fade" id="custom-tabs-four-status" role="tabpanel"
                aria-labelledby="custom-tabs-four-status-tab">
                1
                </div>
                <div class="tab-pane fade" id="custom-tabs-four-ocorrencia" role="tabpanel"
                aria-labelledby="custom-tabs-four-ocorrencia-tab">
                2
                </div>
                <div class="tab-pane fade" id="custom-tabs-four-historico" role="tabpanel"
                aria-labelledby="custom-tabs-four-historico-tab">
                3
                </div>
            </div>
            </div>
            <!-- /.card -->
        </div>    
    `)


    //$('#modal-default').modal('show');
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;;

}

function openModal2(transportadora, liquidacao, coleta, status, idFrota) {


    if (edit && perm.includes('viewUpdateCarga')) {

        // itens = document.getElementById('itens')
        // lista = itens.querySelectorAll('tr')

        // lista.forEach((item) => {
        //     if (item.querySelectorAll('td')[5].innerText == liquidacao) {
        //         rowsEdit = item
        //     }

        // })

        // console.log(rowsEdit)
        let rowsEdit = rowsLine.querySelectorAll('td')

        let optFrete = document.getElementById("optFrete");

        if (optFrete.options[optFrete.selectedIndex].value == 'FOB') {
            console.log(rowsEdit[0].querySelector('input'))
            nomeTransportadora = rowsEdit[0].querySelector('input').value
            idTransportadora = 1
        } else if (idTransportadora == 0 || nomeTransportadora == '') {
            //deixar vermelho veoff
            return
        }

        if (nomeTransportadora == '')
            return

        // if (rowsEdit[1].querySelector('input').value == '') {
        //     rowsEdit[1].querySelector('input').focus()
        //     return
        // }

        if (rowsEdit[2].querySelector('input').value == '') {
            rowsEdit[2].querySelector('input').focus()
            return
        }

        if (rowsEdit[3].querySelector('input').value == '') {
            rowsEdit[3].querySelector('input').focus()
            return
        }

        if (rowsEdit[7].querySelector('input').value.length < 10) {
            rowsEdit[7].querySelector('input').focus()
            return
        }

        if (rowsEdit[8].querySelector('input').value.length < 5) {
            rowsEdit[8].querySelector('input').focus()
            return
        }


        Swal.fire({
            title: 'Deseja confirmar alteração?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Confirmar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {


                console.log(nomeTransportadora)
                // console.log(rowsEdit[1].querySelector('input').value)
                console.log(rowsEdit[2].querySelector('input').value)
                console.log(rowsEdit[3].querySelector('input').value)
                console.log(rowsEdit[7].querySelector('input').value)
                console.log(rowsEdit[8].querySelector('input').value)

                let json = {}

                json['idLiquidacao'] = liquidacao
                json['idTransportadora'] = idTransportadora //veoff linha de baixo
                json['transportadora'] = nomeTransportadora//rowsEdit[0].querySelector('input').value.toUpperCase()
                json['frete'] = optFrete.options[optFrete.selectedIndex].value.toUpperCase()[0] //rowsEdit[1].querySelector('input').value.toUpperCase()[0]
                json['placa'] = rowsEdit[2].querySelector('input').value.toUpperCase()
                json['motorista'] = rowsEdit[3].querySelector('input').value.toUpperCase()
                json['dataColeta'] = rowsEdit[7].querySelector('input').value.toUpperCase()
                json['horaColeta'] = rowsEdit[8].querySelector('input').value.toUpperCase()


                if (JSON.parse(localStorage.getItem('user')) != null) {
                    ajax(_BASE_URL + _EP_UPDATE_CARGA, 'PUT', json, function (res) {
                        if (res.status == 200) {

                            rowsEdit[0].innerHTML = nomeTransportadora
                            rowsEdit[1].innerHTML = rowsBackup[1]
                            rowsEdit[2].innerHTML = rowsBackup[2]
                            rowsEdit[3].innerHTML = rowsBackup[3]

                            idTransportadora = 0
                            nomeTransportadora = ''

                            let data2 = new Date(rowsBackup[7]), //posição data
                                dia = data2.getDate().toString().padStart(2, '0'),
                                mes = (data2.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
                                ano = data2.getFullYear();
                            horas = data2.getHours().toString().padStart(2, '0')
                            minutos = data2.getMinutes().toString().padStart(2, '0')
                            segundos = data2.getSeconds().toString().padStart(2, '0')
                            //return dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos;
                            let diaFormatado = dia + "/" + mes + "/" + ano
                            if (diaFormatado == 'NaN/NaN/NaN') {
                                diaFormatado = element.Data
                            }

                            rowsEdit[7].innerHTML = diaFormatado
                            rowsEdit[8].innerHTML = rowsBackup[8]
                            edit = false

                            socket.emit("alteracaoControle", true);

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Falha a salvar!',
                                text: ''
                            })
                        }

                    }, JSON.parse(localStorage.getItem('user')).accessToken);
                }


            } else if (result.isDenied) {
                let rowsEdit = rowsLine.querySelectorAll('td')
                rowsEdit[0].innerHTML = rowsBackup[0]
                rowsEdit[1].innerHTML = rowsBackup[1]
                rowsEdit[2].innerHTML = rowsBackup[2]
                rowsEdit[3].innerHTML = rowsBackup[3]

                let data2 = new Date(rowsBackup[7]), //posição data
                    dia = data2.getDate().toString().padStart(2, '0'),
                    mes = (data2.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
                    ano = data2.getFullYear();
                horas = data2.getHours().toString().padStart(2, '0')
                minutos = data2.getMinutes().toString().padStart(2, '0')
                segundos = data2.getSeconds().toString().padStart(2, '0')
                //return dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos;
                let diaFormatado = dia + "/" + mes + "/" + ano
                if (diaFormatado == 'NaN/NaN/NaN') {
                    diaFormatado = element.Data
                }

                rowsEdit[7].innerHTML = diaFormatado

                rowsEdit[8].innerHTML = rowsBackup[8]


                edit = false
            }
        })

    } else {

        if (idFrota == '27998499cvjk') {
            //Abrir modal que vai poder linkar
            //rowsEdit[11].innerHTML != '0'
            if (!edit && perm.includes('viewUpdateCarga')) {
                document.getElementById('txtAssociarCarga').value = ''
                cargaTemp = liquidacao
                $('#modal-associar').modal('show');

                const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
                const body = document.body;
                body.style.position = 'fixed';
                body.style.top = `-${scrollY}`;;
            }

        } else {

            $('#optStatus').html(`
                <option value="">--Selecione--</option>
                <option id="viewChegadaPortaria" value="A">CHEGADA NA PORTARIA</option>
                <option id="viewEntradaLiberada" value="B">ENTRADA LIBERADA</option>
                <option id="viewCarregamentoIniciado" value="C">CARREGAMENTO INICIADO</option>
                <option id="viewCarregamentoFinalizado" value="D">CARREGAMENTO FINALIZADO</option>
                <option id="viewSaidaLiberada" value="E">SAIDA NA PORTARIA</option>
                <option id="viewOcorrencia" value="F">OCORRÊNCIA</option>
            `)

            document.getElementById('optStatus').selectedIndex = 0
            document.getElementById('txtNovaMensagem').value = ''
            $('#optOcorrenciasGroup').attr('hidden', 'true');
            idLiquidacao = liquidacao
            idColeta = coleta
            idOcorrecia = 0

            console.log(idLiquidacao)
            console.log(idColeta)


            $('#titleModal2').text(transportadora)

            document.getElementById('timelineLista').innerHTML = `
                <!--<div class="time-label">
                    <span class="bg-blue">${transportadora}</span>
                </div>

                <div>
                    <i class="fas fa-user bg-blue"></i>
                    <div class="timeline-item">
                        <h3 class="timeline-header no-border">
                            <a href="#">AGUARDANDO VEÍCULO</a>
                        </h3>
                    </div>
                </div> --> `

            obrigatorio = ['optStatus', 'txtCpfMotorista']
            console.log('------------')
            console.log(status)
            console.log('------------')
            document.getElementById('custom-tabs-four-detalhes-tab').click()
            $('#divRegistrar').attr('hidden', 'true')
            switch (status) {
                case 'A':

                    if (perm.includes('viewUpdateChegadaPortaria'))
                        $('#divRegistrar').removeAttr('hidden')

                    obrigatorio = ['optStatus']
                    $('#inputMotorista').attr('hidden', 'true')
                    $('#custom-tabs-four-editar-tab').attr('hidden', 'true')
                    try { document.getElementById('viewChegadaPortaria').remove() } catch (e) { }
                    break;
                case 'B':

                    if (perm.includes('viewUpdateEntradaLiberada'))
                        $('#divRegistrar').removeAttr('hidden')

                    $('#inputMotorista').attr('hidden', 'true')
                    $('#custom-tabs-four-editar-tab').attr('hidden', 'true')
                    obrigatorio = ['optStatus']
                    try { document.getElementById('viewChegadaPortaria').remove() } catch (e) { }
                    try { document.getElementById('viewEntradaLiberada').remove() } catch (e) { }
                    break;
                case 'C':

                    if (perm.includes('viewUpdateCarregamentoIniciado'))
                        $('#divRegistrar').removeAttr('hidden')

                    $('#inputMotorista').attr('hidden', 'true')
                    $('#custom-tabs-four-editar-tab').attr('hidden', 'true')
                    obrigatorio = ['optStatus']
                    try { document.getElementById('viewChegadaPortaria').remove() } catch (e) { }
                    try { document.getElementById('viewEntradaLiberada').remove() } catch (e) { }
                    try { document.getElementById('viewCarregamentoIniciado').remove() } catch (e) { }
                    break;
                case 'D':

                    if (perm.includes('viewUpdateCarregamentoFinalizado'))
                        $('#divRegistrar').removeAttr('hidden')

                    $('#inputMotorista').attr('hidden', 'true')
                    $('#custom-tabs-four-editar-tab').attr('hidden', 'true')
                    obrigatorio = ['optStatus']
                    try { document.getElementById('viewChegadaPortaria').remove() } catch (e) { }
                    try { document.getElementById('viewEntradaLiberada').remove() } catch (e) { }
                    try { document.getElementById('viewCarregamentoIniciado').remove() } catch (e) { }
                    try { document.getElementById('viewCarregamentoFinalizado').remove() } catch (e) { }
                    break;
                case 'E':

                    $('#divRegistrar').removeAttr('hidden')

                    $('#inputMotorista').attr('hidden', 'true')
                    $('#custom-tabs-four-editar-tab').attr('hidden', 'true')
                    obrigatorio = ['optStatus']
                    break;
                case 'F':

                    if (perm.includes('viewOcorrencia'))
                        $('#divRegistrar').removeAttr('hidden')

                    $('#inputMotorista').attr('hidden', 'true')
                    obrigatorio = ['optStatus']
                    break;
                default:

                    $('#divRegistrar').removeAttr('hidden')

                    $('#inputMotorista').removeAttr('hidden')
                    $('#custom-tabs-four-editar-tab').removeAttr('hidden')
                    try { document.getElementById('viewCarregamentoIniciado').remove() } catch (e) { }
                    try { document.getElementById('viewCarregamentoFinalizado').remove() } catch (e) { }
                    try { document.getElementById('viewSaidaLiberada').remove() } catch (e) { }
                    try { document.getElementById('viewEntradaLiberada').remove() } catch (e) { }
                    // try { document.getElementById('viewOcorrencia').remove() } catch (e) { }
                    break;
            }

            //Apenas o que pode ser feito no COMBOBOX
            try { perm.includes('viewChegadaPortaria') ? null : document.getElementById('viewChegadaPortaria').remove() } catch (err) { }
            try { perm.includes('viewEntradaLiberada') ? null : document.getElementById('viewEntradaLiberada').remove() } catch (err) { }
            try { perm.includes('viewCarregamentoIniciado') ? null : document.getElementById('viewCarregamentoIniciado').remove() } catch (err) { }
            try { perm.includes('viewCarregamentoFinalizado') ? null : document.getElementById('viewCarregamentoFinalizado').remove() } catch (err) { }
            try { perm.includes('viewSaidaLiberada') ? null : document.getElementById('viewSaidaLiberada').remove() } catch (err) { }
            try { perm.includes('viewOcorrencia') ? null : document.getElementById('viewOcorrencia').remove() } catch (err) { }

            $('#modal-default2').modal('show');

            const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
            const body = document.body;
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}`;;

            $('#modal-default2 .timeline').animate({ scrollTop: $('#modal-default2 .timeline').offset().top }, 'slow');
            $('#modal-default2').scrollTop = $('#modal-default2').scrollHeight



            getLogsAgendamento()
        }
    }

}

function openChamado() {
    if (!edit && perm.includes('viewAberturaChamado')) {
        $('#modal-chamado').modal('show');
    }
}

function closeModal() {
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

$('#modal-default2').on('shown.bs.modal', function (event) {
    // reset the scroll to top
    // $('#modal-default2 .modal-body').scrollTop(0);
    // get the section using data
    // var section = $('#txtTitleCliente').data('section');
    // get the top of the section
    let x = document.getElementById("btnRegistro").offsetTop
    console.log(x);

    // $('#modal-default2 .modal-body').animate({
    //     scrollTop: x - 30
    // }, "slow");
    // $('#modal-default2 .modal-body').scrollTop(x - 30);
});

$('#modal-default2').on('shown.bs.modal', function (event) {
    closeModal()
});
$('#modal-chamados').on('shown.bs.modal', function (event) {
    closeModal()
});
$('#modal-associar').on('shown.bs.modal', function (event) {
    closeModal()
});


registrar = () => {
    console.log(obrigatorio)
    if (validarCamposInputs(obrigatorio)) {

        if (!validaCnpjCpf(document.getElementById('txtCpfMotorista').value) && obrigatorio.includes('txtCpfMotorista')) {
            document.getElementById('txtCpfMotorista').style = `border: 1px solid #ff0000;`
            Swal.fire({
                icon: 'error',
                title: 'CPF Inválido!',
                text: 'Verifique os dígitos'
            })
            return
        }

        console.log(idLiquidacao)
        console.log(idColeta)
        aaaa = document.getElementById('optStatus').value

        if (document.getElementById('optStatus').value == '')
            return

        if ((document.getElementById('optStatus').value == 'F') && (idOcorrecia == 0)) {
            return
        }

        let json = {}
        json['idLiquidacao'] = idLiquidacao
        json['idColeta'] = idColeta
        json['status'] = document.getElementById('optStatus').value
        json['obs'] = document.getElementById('txtNovaMensagem').value
        json['idOcorrecia'] = idOcorrecia
        json['txtCpfMotorista'] = document.getElementById('txtCpfMotorista').value


        if (JSON.parse(localStorage.getItem('user')) != null && !request) {
            ajax(_BASE_URL + _EP_POST_CDTR_LOG_AGENDAMENTOS, 'POST', json, function (res) {
                if (res.status == 200) {
                    //atualizarTabela()
                    obrigatorio = ['optStatus']
                    $('#modal-default2').modal('hide');
                    document.getElementById('txtCpfMotorista').value = ''
                    socket.emit("alteracaoControle", true);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Falha a salvar!',
                        text: ''
                    })
                }

            }, JSON.parse(localStorage.getItem('user')).accessToken);
        }
    }
}

getLogsAgendamento = () => {

    if ((idLiquidacao != 0) && (idColeta != 0)) {

        console.log(idLiquidacao)
        console.log(idColeta)

        let json = {}
        json['idLiquidacao'] = idLiquidacao
        json['idColeta'] = idColeta

        console.log('json')
        console.log(json)
        console.log('json')
        if (JSON.parse(localStorage.getItem('user')) != null && !request) {
            ajax(_BASE_URL + _EP_GET_CDTR_LOG_AGENDAMENTOS, 'POST', json, function (res) {
                if (res.length) {
                    console.log(res)
                    document.getElementById('timelineLista').innerHTML = ''

                    liberarSaida = false

                    res.forEach((item) => {

                        let data = new Date(item.CDTR_DATA), //posição data
                            dia = data.getDate().toString().padStart(2, '0'),
                            mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
                            ano = data.getFullYear();
                        horas = data.getHours().toString().padStart(2, '0')
                        minutos = data.getMinutes().toString().padStart(2, '0')
                        segundos = data.getSeconds().toString().padStart(2, '0')
                        //return dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos;
                        let diaFormatado = dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos
                        if (diaFormatado == 'NaN/NaN/NaN') {
                            diaFormatado = element.Data
                        }

                        let date1 = new Date(item.CDTR_DATA);
                        let date2 = new Date();
                        let diffMs = (date2 - date1);
                        let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
                        let diffSecs = Math.trunc(((diffMs % 86400000) % 3600000) / 1000);
                        let diffMins = Math.trunc(diffSecs / 60);
                        //let diffMins = Math.round(((diffMs % 86400000) / 3600000) / 60000);
                        let diffDias = Math.trunc(diffMs / (24 * 60 * 60 * 1000))
                        //let diff = diffHrs + 'h ' + diffMins + 'm ' + diffSecs + 's';

                        let obs = `<p style="font-size: 12px;">${item.USR_NOME}</p>`
                        if (item.OCORRENCIA != '' && item.OCORRENCIA != undefined) {
                            obs += `<p>${item.OCORRENCIA}</p>`
                        }
                        if (item.CDTR_OBS != '' && item.CDTR_OBS != undefined) {
                            obs += `<p>${item.CDTR_OBS.toUpperCase()}</p>`
                        }

                        let tempo = diaFormatado
                        if (diffDias < 1) {
                            if (diffDias > 0) {
                                if (diffDias == 1) {
                                    tempo = diffDias + ' dia atrás'
                                } else {
                                    tempo = diffDias + ' dias atrás'
                                }
                            } else if (diffHrs > 0) {
                                if (diffHrs == 1) {
                                    tempo = diffHrs + ' hora atrás'
                                } else {
                                    tempo = diffHrs + ' horas atrás'
                                }
                            } else if (diffMins > 0) {
                                if (diffMins == 1) {
                                    tempo = diffMins + ' minuto atrás'
                                } else {
                                    tempo = diffMins + ' minutos atrás'
                                }
                            } else if (diffSecs >= 0) {
                                if (diffSecs == 1) {
                                    tempo = diffSecs + ' segundo atrás'
                                } else {
                                    tempo = diffSecs + ' segundos atrás'
                                }
                            }
                        }
                        tempo = diaFormatado
                        console.log(item.CDTR_STATUS)
                        switch (item.CDTR_STATUS) {
                            case 'A':
                                try { document.getElementById('viewChegadaPortaria').remove() } catch (e) { }
                                break;
                            case 'B':
                                try { document.getElementById('viewEntradaLiberada').remove() } catch (e) { }
                                break;
                            case 'C':
                                try { document.getElementById('viewCarregamentoIniciado').remove() } catch (e) { }
                                break;
                            case 'D':
                                liberarSaida = true
                                try { document.getElementById('viewCarregamentoFinalizado').remove() } catch (e) { }
                                break;
                            case 'E':
                                break;
                            case 'F':
                                break;
                            default:
                                break;
                        }


                        let status = ''
                        switch (item.CDTR_STATUS) {
                            case 'A':
                                status = `
                                <div>
                                    <i class="fas fa-map-marker-alt bg-yellow"></i>
                                    <!--<i class="fas fa-user bg-green"></i>-->
                                    <div class="timeline-item">
                                        <span class="time"><i hidden class="fas fa-clock" style="padding-right: 4px;"></i>${tempo}</span>
                                        <h3 class="timeline-header no-border">
                                            <b href="#">CHEGADA NA PORTARIA</b>
                                            ${obs}
                                        </h3>
                                    </div>
                                </div>                             
                                `
                                break;

                            case 'B':
                                status = `
                                <div>
                                    <i style="color: #000!important;" class="fas fa-door-open bg-green"></i>
                                    <!--<i class="fas fa-user bg-green"></i>-->
                                    <div class="timeline-item">
                                        <span class="time"><i hidden class="fas fa-clock" style="padding-right: 4px;"></i>${tempo}</span>
                                        <h3 class="timeline-header no-border">
                                            <b href="#">ENTRADA LIBERADA</b>
                                            ${obs}
                                        </h3>
                                    </div>
                                </div>                            
                                `
                                break;

                            case 'C':
                                status = `
                                <div>
                                    <i style="background-color: #9BC2E6" class="fas fa-people-carry"></i>
                                    <!--<i class="fas fa-user bg-green"></i>-->
                                    <div class="timeline-item">
                                        <span class="time"><i hidden class="fas fa-clock" style="padding-right: 4px;"></i>${tempo}</span>
                                        <h3 class="timeline-header no-border">
                                            <b href="#">CARREGAMENTO INICIADO</b>
                                            ${obs}
                                        </h3>
                                    </div>
                                </div>                          
                                `
                                break;

                            case 'D':
                                status = `
                                <div>
                                    <i style="background-color: #F4B084" class="fas fa-calendar-check"></i>
                                    <!--<i class="fas fa-user bg-green"></i>-->
                                    <div class="timeline-item">
                                        <span class="time"><i hidden class="fas fa-clock" style="padding-right: 4px;"></i>${tempo}</span>
                                        <h3 class="timeline-header no-border">
                                            <b href="#">CARREGAMENTO FINALIZADO</b>
                                            ${obs}
                                        </h3>
                                    </div>
                                </div>                          
                                `
                                break;

                            case 'E':
                                status = `
                                <div>
                                    <i style="background-color: #b2b2b2" class="fas fa-truck"></i>
                                    <!--<i class="fas fa-user bg-green"></i>-->
                                    <div class="timeline-item">
                                        <span class="time"><i hidden class="fas fa-clock" style="padding-right: 4px;"></i>${tempo}</span>
                                        <h3 class="timeline-header no-border">
                                            <b href="#">SAÍDA NA PORTARIA</b>
                                            ${obs}
                                        </h3>
                                    </div>
                                </div>                        
                                `
                                break;

                            case 'F':
                                status = `
                                <div>
                                    <i style="background-color: #b2b2b2" class="fas fa-truck"></i>
                                    <!--<i class="fas fa-user bg-green"></i>-->
                                    <div class="timeline-item">
                                        <span class="time"><i hidden class="fas fa-clock" style="padding-right: 4px;"></i>${tempo}</span>
                                        <h3 class="timeline-header no-border">
                                            <b href="#">OCORRÊNCIA</b>
                                            ${obs}
                                        </h3>
                                    </div>
                                </div>                        
                                `
                                break;

                            default:
                                break;
                        }

                        document.getElementById('timelineLista').innerHTML += status
                    })

                    if (!liberarSaida) {
                        document.getElementById('viewSaidaLiberada').remove()
                    }

                    console.log(res)
                }

            }, JSON.parse(localStorage.getItem('user')).accessToken);
        }
    }
}

socket.on("atualizarControle", async function (data) {
    if (data && !edit) {
        atualizarTabela()
    }
});

verify = () => {
    var x = document.getElementById("optStatus").value;
    if (x == 'F') {
        try { document.getElementById('select2-optOcorrencias-container').innerText = '--Selecione--' } catch (e) { }
        try { document.getElementById('optOcorrencias').selectedIndex = 0 } catch (e) { }
        $('#optOcorrenciasGroup').removeAttr('hidden');
        obrigatorio.push('optOcorrencias')
        let x = document.getElementById("btnRegistro").offsetTop
        console.log(x);
        // $('#modal-default2 .modal-body').scrollTop(x - 30);
    } else {
        if (obrigatorio.includes('txtCpfMotorista')) {
            obrigatorio = ['optStatus', 'txtCpfMotorista']
        } else {
            obrigatorio = ['optStatus']
        }

        $('#optOcorrenciasGroup').attr('hidden', 'true');
    }
}

function validarCamposInputs(campos = []) {
    let retorno = true;

    let camposObrigatorio = document.querySelectorAll("[required]")
    camposObrigatorio.forEach((inp) => {
        inp.style = ''
        campos.forEach((camp) => {
            if (camp == inp.id && inp.value == '') {
                console.log(camp + ` ----> ` + inp.value)
                inp.style = `border: 1px solid #ff0000;`
                retorno = false
            }
            if (camp == 'optOcorrencias' && camp == inp.id && inp.value == '0') {
                let grpu = document.getElementById('optOcorrenciasGroup')
                let grpu2 = grpu.querySelector('span')
                grpu2.style = `border: 1px solid #ff0000;`
                retorno = false
            }
        })
    })
    return retorno
}


function getOcorrecias(seleciona = 0) {
    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + _EP_GET_ALL_OCORRENCIAS, 'GET', {}, function (grus) {
            console.log(grus)
            let optOcorrencias = document.getElementById('optOcorrencias')
            let optionsGrus = '<option selected value="0">--Selecione--</option>';
            for (let i in grus) {
                optionsGrus += `<option value="${grus[i].OCOR_ID}">${grus[i].OCOR_DESCRICAO}</option>`;
            }
            $('#optOcorrencias').children().remove();
            $('#optOcorrencias').append(optionsGrus);

            let arroptOcorrencias = optOcorrencias.options
            for (let i = 0; i < arroptOcorrencias.length; i++) {
                if (arroptOcorrencias[i].value == seleciona) {
                    console.log('seleção')
                    optOcorrencias.selectedIndex = i
                }
            }

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
    // } else {
    //     let optionsGrus = '<option selected value="">--Selecione--</option>';
    //     $('#optOcorrencias').children().remove();
    //     $('#optOcorrencias').append(optionsGrus);
    // }
}

function getTransportadoras(seleciona = 0) {
    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + _EP_GET_TRANSPORTADORAS, 'GET', {}, function (grus) {
            console.log(grus)
            try {

                let optTransportadoras = document.getElementById('optTransportadoras')
                let optionsGrus = ''//'<option selected value="0">--Selecione--</option>';
                for (let i in grus) {
                    optionsGrus += `<option value="${grus[i].FRO_ID}">${grus[i].FRO_ID}-${grus[i].FRO_DESC}</option>`;
                }
                $('#optTransportadoras').children().remove();
                $('#optTransportadoras').append(optionsGrus);

                let arroptTransportadoras = optTransportadoras.options
                for (let i = 0; i < arroptTransportadoras.length; i++) {
                    if (arroptTransportadoras[i].value == seleciona) {
                        console.log('seleção')
                        optTransportadoras.selectedIndex = i
                    }
                }
                changeFuncTransportadora()
            } catch (error) {

            }

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
    // } else {
    //     let optionsGrus = '<option selected value="">--Selecione--</option>';
    //     $('#optOcorrencias').children().remove();
    //     $('#optOcorrencias').append(optionsGrus);
    // }
}

function changeFunc() {
    let optOcorrencias = document.getElementById("optOcorrencias");
    idOcorrecia = optOcorrencias.options[optOcorrencias.selectedIndex].value;
}

function mudandoFrete() {
    let optFrete = document.getElementById("optFrete");

    let rowsEdit = rowsLine.querySelectorAll('td')
    //   rowsEdit[0].innerHTML = rowsBackup[0]
    //   rowsEdit[1].innerHTML = rowsBackup[1]

    console.log(optFrete.options[optFrete.selectedIndex].value)

    if (optFrete.options[optFrete.selectedIndex].value == 'CIF') {
        rowsEdit[0].innerHTML = `        
        <select id="optTransportadoras" keydown="tabtoenter(e)" onchange="changeFuncTransportadora();"
        class="form-control select2bs4Trans select2-hidden-accessible" style="width: 100%;"
        aria-hidden="true">
        <option selected value="">--Selecione--</option>
        </select>                                                                             
    `
        $('.select2bs4Trans').select2({
            theme: 'bootstrap4'
        })
        try { document.querySelector('span[aria-labelledby="select2-optTransportadoras-container"]').style = 'height:25px !important' } catch (e) { }
        try { document.getElementById('select2-optTransportadoras-container').style = 'font-size: 14px;line-height: 1.8 !important' } catch (e) { }
        getTransportadoras(rowsBackup[11])
    } else {
        rowsEdit[0].innerHTML = `<input id="txtTransportadoraa" style="width: 100%; text-transform: uppercase" type="text" value="${rowsBackup[0]}">`
    }

}

function changeFuncTransportadora() {

    let optTransportadoras = document.getElementById("optTransportadoras");
    idTransportadora = optTransportadoras.options[optTransportadoras.selectedIndex].value;
    nomeTransportadora = ''
    optTransportadoras.options[optTransportadoras.selectedIndex].innerText.split('-').forEach((item, i) => {
        if (i == 1) {
            nomeTransportadora += item
        }
        if (i > 1) {
            nomeTransportadora += '-' + item
        }
    });
}

getOcorrecias()


//Validação de CNPJ e CPF
function validaCnpjCpf(val) {

    val = val.trim();
    val = val.replace(/([^\d])+/gim, '');

    if (val.length >= 11) {
        var cpf = val.trim();
        cpf = cpf.split('');

        var v1 = 0;
        var v2 = 0;
        var aux = false;

        for (var i = 1; cpf.length > i; i++) {
            if (cpf[i - 1] != cpf[i]) {
                aux = true;
            }
        }

        if (aux == false) {
            // return false;
        } else {
            for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
                v1 += cpf[i] * p;
            }

            v1 = ((v1 * 10) % 11);

            if (v1 == 10) {
                v1 = 0;
            }

            if (v1 != cpf[9]) {
                // return false;
            } else {
                for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
                    v2 += cpf[i] * p;
                }

                v2 = ((v2 * 10) % 11);

                if (v2 == 10) {
                    v2 = 0;
                }

                if (v2 != cpf[10]) {
                    // return false;
                } else {
                    return true;
                }
            }

        }
    }

    if (val.length >= 14) {
        var cnpj = val.trim();
        cnpj = cnpj.split('');

        var v1 = 0;
        var v2 = 0;
        var aux = false;

        for (var i = 1; cnpj.length > i; i++) {
            if (cnpj[i - 1] != cnpj[i]) {
                aux = true;
            }
        }

        if (aux == false) {
            return false;
        }

        for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v1 += cnpj[i] * p1;
            } else {
                v1 += cnpj[i] * p2;
            }
        }

        v1 = (v1 % 11);

        if (v1 < 2) {
            v1 = 0;
        } else {
            v1 = (11 - v1);
        }

        if (v1 != cnpj[12]) {
            return false;
        }

        for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v2 += cnpj[i] * p1;
            } else {
                v2 += cnpj[i] * p2;
            }
        }

        v2 = (v2 % 11);

        if (v2 < 2) {
            v2 = 0;
        } else {
            v2 = (11 - v2);
        }

        if (v2 != cnpj[13]) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

$('body').on('keydown', function (e) {
    console.log(e)

    if (e.target.getAttribute('class') == 'select2-search__field') {
        if (e.key === "Escape") {
            $('#optFrete').focus()
            return
        }

        if (e.key === "Enter") {
            $('#optFrete').focus()
            return
        }
    }

    if (!edit) {
        tempoAtualiza = 0
    }
    if (e.key === "Escape") {
        if (edit && perm.includes('viewUpdateCarga')) {
            let rowsEdit = rowsLine.querySelectorAll('td')
            rowsEdit[0].innerHTML = rowsBackup[0]
            rowsEdit[1].innerHTML = rowsBackup[1]
            rowsEdit[2].innerHTML = rowsBackup[2]
            rowsEdit[3].innerHTML = rowsBackup[3]

            let data2 = new Date(rowsBackup[7]), //posição data
                dia = data2.getDate().toString().padStart(2, '0'),
                mes = (data2.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
                ano = data2.getFullYear();
            horas = data2.getHours().toString().padStart(2, '0')
            minutos = data2.getMinutes().toString().padStart(2, '0')
            segundos = data2.getSeconds().toString().padStart(2, '0')
            //return dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos;
            let diaFormatado = dia + "/" + mes + "/" + ano
            if (diaFormatado == 'NaN/NaN/NaN') {
                diaFormatado = element.Data
            }

            rowsEdit[7].innerHTML = diaFormatado

            rowsEdit[8].innerHTML = rowsBackup[8]


            edit = false
        }
    }
});

abrirChamado = () => {

    if (perm.includes('viewAberturaChamado')) {

        let txtChamadoTransportadora = document.getElementById('txtChamadoTransportadora')
        let txtChamadoPlaca = document.getElementById('txtChamadoPlaca')
        let txtChamadaMotorista = document.getElementById('txtChamadaMotorista')
        let txtChamadoCpfMotorista = document.getElementById('txtChamadoCpfMotorista')

        if (!validarCamposInputs([
            'txtChamadoTransportadora',
            'txtChamadoPlaca',
            'txtChamadaMotorista'
        ])) {
            return
        }

        if (!validaCnpjCpf(document.getElementById('txtChamadoCpfMotorista').value)) {
            document.getElementById('txtChamadoCpfMotorista').style = `border: 1px solid #ff0000;`
            Swal.fire({
                icon: 'error',
                title: 'CPF Inválido!',
                text: 'Verifique os dígitos'
            })
            return
        }

        let json = {}
        json['transportadora'] = txtChamadoTransportadora.value
        json['placa'] = txtChamadoPlaca.value
        json['motorista'] = txtChamadaMotorista.value
        json['cpf'] = txtChamadoCpfMotorista.value

        if (JSON.parse(localStorage.getItem('user')) != null) {
            ajax(_BASE_URL + _EP_INSERT_CHAMADO, 'PUT', json, function (res) {
                if (res.status == 200) {
                    $('#modal-chamado').modal('hide');
                    socket.emit("alteracaoControle", true);
                    socket.emit("novaNotificacao", true);
                    txtChamadoTransportadora.value = ''
                    txtChamadoPlaca.value = ''
                    txtChamadaMotorista.value = ''
                    txtChamadoCpfMotorista.value = ''
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Falha a salvar!',
                        text: res.message
                    })
                }

            }, JSON.parse(localStorage.getItem('user')).accessToken);
        }
    }

}

associarCarga = () => {

    let json = {}
    json['liquidacao'] = document.getElementById('txtAssociarCarga').value
    json['liquidacaoTemp'] = cargaTemp

    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + _EP_ASSOCIAR_CARGA, 'PUT', json, function (res) {
            if (res.status == 200) {
                $('#modal-associar').modal('hide');
                socket.emit("alteracaoControle", true);
                socket.emit("novaNotificacao", true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Não foi encontramos a Carga!',
                    text: res.message
                })
            }

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {


    while (true) {
        await sleep(1000)
        try {
            if (tempoAtualiza > 120 && !edit) {
                tempoAtualiza = 0
                atualizarTabela()
            } else {
                tempoAtualiza++
            }
        } catch (error) { console.log('opção não encontrada') }
    }
})();

