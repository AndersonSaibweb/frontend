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

var selecionados = []
var perm = []
var idTransportadora = 0
const APROVADO = 'Aprovado'
const NEGADO = 'Negado'
const FINANCEIRO = 'Ag. Financeiro'
const COMERCIAL = 'Ajuste Comercial'
const APROVAR = 'Ag. Margem'
const LOGISTICA = 'Ag. Comp. Frete'

var insert = false
var tempoAtualiza = 0
var filtroPesquisa = ''
var starting = false
$('#txtVlrFrete').mask('#.##0,00', { reverse: true });

//Buscar todos os empresa
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

function alerta(texto = '') {
    Swal.fire({
        icon: 'info',
        title: '',
        text: texto
    })
}

function getPedidosStatus() {

    $('#loading').removeAttr('hidden');
    $('#message').text('Atualizando.. ')

    if (JSON.parse(localStorage.getItem('user')) != null && !request) {
        request = true

        ajax(_BASE_URL + 'api/v1/logistica/getPedidosStatus', 'GET', {}, function (res) {
            console.log(res)
            if (res.length) {

                if (JSON.parse(localStorage.getItem('user')) != null) {
                    ajax(_BASE_URL + 'api/v1/permissoes/' + 'lista', 'GET', {}, function (grus) {

                        perm = grus

                        $('#example1').dataTable().fnDestroy();

                        // $('#itens').children().remove();
                        $('#itens').html('');

                        res.forEach(element => {
                            if (element.SITUACAO == APROVADO) {

                                let color = 'white'
                                let info = ''
                                let infoAlerta = ''

                                switch (element.SITUACAO) {
                                    case NEGADO:
                                        color = '#ff94ac'
                                        info = `<i style="margin-left: 10px; cursor: pointer;" class="fa fa-info"></i>`
                                        infoAlerta = ` style="cursor: pointer;" onclick="alerta('${element.OBSERVACAO}')" `
                                        break;
                                    case FINANCEIRO:
                                        color = '#f7f3c0'
                                        break;
                                    case APROVADO:
                                        color = 'lightgreen'
                                        break;
                                    case APROVAR:
                                        color = 'lavender'
                                        break;
                                    case LOGISTICA:
                                        color = '#f5f787'
                                        break;
                                    case COMERCIAL:
                                        color = '#f7f3c0'
                                        break;

                                    default:
                                        break;
                                }


                                let razoaSocial = element.RAZAO_SOCIAL.length >= 45 ? element.RAZAO_SOCIAL.substr(0, 45) + '..' : element.RAZAO_SOCIAL

                                item = `<tr style="background-color:${color}">
                                        <td></td>
                                        <td>${element.COD_PEDIDO}</td>
                                        <td>${dataAnteriorFormatada(element.DATA_CADASTRO).substr(0, 10)}</td>
                                        <td>${element.PESO_BRUTO.toFixed(2)}</td>
                                        <td>${element.CLI_ID}</td>
                                        <td>${razoaSocial}</td>
                                        <td>${element.UF}</td>
                                        <td>${element.CIDADE}</td>
                                        <td>${element.AGRUPAMENTO}</td>
                                        <td ${infoAlerta}>${element.SITUACAO}${info}</td>
                                        </tr>`
                                $('#itens').append(item)
                            }
                        });

                        res.forEach(element => {
                            if (element.SITUACAO == NEGADO) {

                                let color = 'white'
                                let info = ''
                                let infoAlerta = ''

                                switch (element.SITUACAO) {
                                    case NEGADO:
                                        color = '#ff94ac'
                                        info = `<i style="margin-left: 10px; cursor: pointer;" class="fa fa-info"></i>`
                                        infoAlerta = ` style="cursor: pointer;" onclick="alerta('${element.OBSERVACAO}')" `
                                        break;
                                    case FINANCEIRO:
                                        color = '#f7f3c0'
                                        break;
                                    case APROVADO:
                                        color = 'lightgreen'
                                        break;
                                    case APROVAR:
                                        color = 'lavender'
                                        break;
                                    case LOGISTICA:
                                        color = '#f5f787'
                                        break;
                                    case COMERCIAL:
                                        color = '#f7f3c0'
                                        break;

                                    default:
                                        break;
                                }


                                let razoaSocial = element.RAZAO_SOCIAL.length >= 45 ? element.RAZAO_SOCIAL.substr(0, 45) + '..' : element.RAZAO_SOCIAL

                                item = `<tr style="background-color:${color}">
                                        <td></td>
                                        <td>${element.COD_PEDIDO}</td>
                                        <td>${dataAnteriorFormatada(element.DATA_CADASTRO).substr(0, 10)}</td>
                                        <td>${element.PESO_BRUTO.toFixed(2)}</td>
                                        <td>${element.CLI_ID}</td>
                                        <td>${razoaSocial}</td>
                                        <td>${element.UF}</td>
                                        <td>${element.CIDADE}</td>
                                        <td>${element.AGRUPAMENTO}</td>
                                        <td ${infoAlerta}>${element.SITUACAO}${info}</td>
                                        </tr>`
                                $('#itens').append(item)
                            }
                        });

                        res.forEach(element => {
                            if (element.SITUACAO != NEGADO && element.SITUACAO != APROVADO) {

                                let color = 'white'
                                let info = ''
                                let infoAlerta = ''

                                switch (element.SITUACAO) {
                                    case NEGADO:
                                        color = '#ff94ac'
                                        info = `<i style="margin-left: 10px; cursor: pointer;" class="fa fa-info"></i>`
                                        infoAlerta = ` style="cursor: pointer;" onclick="alerta('${element.OBSERVACAO}')" `
                                        break;
                                    case FINANCEIRO:
                                        color = '#f7f3c0'
                                        break;
                                    case APROVADO:
                                        color = 'lightgreen'
                                        break;
                                    case APROVAR:
                                        color = 'lavender'
                                        break;
                                    case LOGISTICA:
                                        color = '#f5f787'
                                        break;
                                    case COMERCIAL:
                                        color = '#f7f3c0'
                                        break;

                                    default:
                                        break;
                                }


                                let razoaSocial = element.RAZAO_SOCIAL.length >= 45 ? element.RAZAO_SOCIAL.substr(0, 45) + '..' : element.RAZAO_SOCIAL

                                item = `<tr style="background-color:${color}">
                                        <td></td>
                                        <td>${element.COD_PEDIDO}</td>
                                        <td>${dataAnteriorFormatada(element.DATA_CADASTRO).substr(0, 10)}</td>
                                        <td>${element.PESO_BRUTO.toFixed(2)}</td>
                                        <td>${element.CLI_ID}</td>
                                        <td>${razoaSocial}</td>
                                        <td>${element.UF}</td>
                                        <td>${element.CIDADE}</td>
                                        <td>${element.AGRUPAMENTO}</td>
                                        <td ${infoAlerta}>${element.SITUACAO}${info}</td>
                                        </tr>`
                                $('#itens').append(item)
                            }
                        });

                        var table = $("#example1").DataTable({

                            columnDefs: [{
                                orderable: false,
                                className: 'select-checkbox',
                                targets: 0
                            }],
                            select: {
                                style: 'os',
                                selector: 'td:first-child'
                            },
                            order: [
                                // [[ 9, 'desc' ], [ 8, 'desc' ]]
                            ],

                            'createdRow': function (row, data, dataIndex) {
                                console.log(data[9])

                                switch ($('td:eq(9)', row).text()) {
                                    case FINANCEIRO:
                                        $('td:eq(0)', row).removeClass("select-checkbox");
                                    case NEGADO:
                                        $('td:eq(0)', row).removeClass("select-checkbox");
                                        break;
                                    case APROVAR:
                                        $('td:eq(0)', row).removeClass("select-checkbox");
                                        break;
                                    case LOGISTICA:
                                        $('td:eq(0)', row).removeClass("select-checkbox");
                                        break;
                                    case COMERCIAL:
                                        $('td:eq(0)', row).removeClass("select-checkbox");
                                        break;

                                    default:
                                        break;
                                }

                                if (!perm.includes('viewGerarColetas')) {
                                    $('td:eq(0)', row).removeClass("select-checkbox");
                                }

                                // $('td:eq(7)', row).html(diaFormatado)
                            },
                            dom: 'Bfrtip',
                            "buttons": [{
                                text: 'Atualizar',
                                action: function (e, dt, node, config) {
                                    getPedidosStatus()
                                }
                            },
                            {
                                text: 'Gerar Coleta',
                                action: function (e, dt, node, config) {
                                    gerarColera()
                                }
                            },
                            {
                                text: 'Restaurar',
                                action: function (e, dt, node, config) {
                                    if (perm.includes('viewRestaurarColeta')) {
                                        Swal.fire({
                                            title: 'Carga / Liquidação',
                                            input: 'text',
                                            inputAttributes: {
                                                autocapitalize: 'off'
                                            },
                                            showCancelButton: true,
                                            confirmButtonText: 'Confirmar',
                                            showLoaderOnConfirm: true,
                                            preConfirm: (login) => {
                                                return login
                                            },
                                            allowOutsideClick: () => !Swal.isLoading()
                                        }).then((result) => {
                                            console.log(result)
                                            if (result.isConfirmed) {
                                                restaurarLiquidacao(result.value.replace(/[^0-9]/g, ''))
                                            }
                                        })
                                    }
                                }
                            }
                            ],
                            "language": {
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
                                }
                            },
                            "responsive": false,
                            "lengthChange": true,
                            "autoWidth": false, //quebra tudo
                            "paging": false,
                            "searching": true,
                            "ordering": true,
                            "info": true,
                            "lengthMenu": [
                                [10, 25, 50, 100, -1],
                                [10, 25, 50, 100, "Todos"]
                            ],
                            "pageLength": 50,
                        }) //.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

                        table.on("click", "th.select-checkbox", function () {
                            if ($("th.select-checkbox").hasClass("selected")) {
                                table.rows().deselect();
                                $("th.select-checkbox").removeClass("selected");
                            } else {

                                table.rows().select();
                                $("th.select-checkbox").addClass("selected");
                            }
                        }).on("select deselect", function () {
                            if (table.rows({
                                selected: true
                            }).count() !== table.rows().count()) {
                                $("th.select-checkbox").removeClass("selected");
                            } else {
                                $("th.select-checkbox").addClass("selected");
                            }
                        });

                        if (!starting) {
                            starting = true
                            $.fn.dataTable.ext.search.push(
                                function (settings, data, dataIndex) {

                                    console.log('pesquisando > ' + filtroPesquisa)
                                    if (filtroPesquisa == '' || filtroPesquisa == undefined) {
                                        filtroPesquisa = ''
                                        return true
                                    }
                                    console.log(data)
                                    if (filtroPesquisa != '' && filtroPesquisa != undefined) {

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
                                        if (data[6].toUpperCase().includes(filtroPesquisa.toUpperCase())) {
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
                        // document.querySelector('input[type="search"]').value = filtroPesquisa

                        $('input[type="search"]').on("keyup", function () {
                            if (filtroPesquisa != $('input[type="search"]').val()) {
                                filtroPesquisa = $('input[type="search"]').val()
                                $('#example1').DataTable().draw();
                                console.log(filtroPesquisa)
                            }
                        });


                    }, JSON.parse(localStorage.getItem('user')).accessToken);
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
                $('#message').text('Atualizado ' + date.format(new Date()))
            } else {
                $('#message').text('Sem conexão com o servidor')
            }

            $('#loading').attr('hidden', 'true');
            request = false
        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
}

restaurarLiquidacao = (liqu_id) => {

    if (liqu_id != '') {
        let json = {}
        json['LIQU_ID'] = liqu_id

        if (JSON.parse(localStorage.getItem('user')) != null) {
            ajax(_BASE_URL + _EP_RESTAURAR_LIQUIDACAO, 'PUT', json, async function (res) {
                console.log(res)

                if (res.status == 200) {
                    socket.emit("alteracaoControle", true);
                    getPedidosStatus()
                    Swal.fire({
                        icon: 'success',
                        title: res.message,
                        text: ''
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: res.message,
                        text: ''
                    })
                }
                insert = false
            }, JSON.parse(localStorage.getItem('user')).accessToken);
        }
    }
}

gerarColera = () => {
    // linhaSelecionada = $('#example1').DataTable().rows('.selected').data();
    // console.log(linhaSelecionada)
    filtroPesquisa = ''
    $('input[type="search"]').val(filtroPesquisa)
    $('#example1').DataTable().draw();

    document.getElementById('editTransportadora').value = ''
    $('#editTransportadora').attr('hidden', 'true');

    let agrupamento = ''
    let optFrete = document.getElementById("optFrete");
    optFrete.selectedIndex = 0
    document.getElementById('customRadio1').checked = false
    document.getElementById('customRadio2').checked = false
    document.getElementById('gestao').checked = false
    document.getElementById('statusAgendado').checked = true

    //Date and time picker
    $('#horarioColeta').datetimepicker({
        icons: {
            time: 'far fa-clock'
        },
        date: moment(new Date()).hours(0).minutes(0).seconds(0).milliseconds(0),
        locale: 'pt-br'
    });

    $('#horarioEntrega').datetimepicker({
        icons: {
            time: 'far fa-clock'
        },
        date: moment(new Date()).hours(0).minutes(0).seconds(0).milliseconds(0),
        locale: 'pt-br'
    });

    $('#txtPlaca').val('');
    $('#txtMotorista').val('');
    $('#txtObs').val('');

    selecionados = []

    let check = document.getElementById('itens').querySelectorAll('.selected')

    check.forEach((item) => {
        if (item.querySelector('.select-checkbox') != null && item.querySelector('.select-checkbox') != undefined) {
            //selecionados.push(item.cells[1].innerText)
            selecionados.push(item.cells)
        }
    })

    let verifyAgrupamento = true

    if (selecionados.length > 0) {
        agrupamento = selecionados[0][8].innerText

        if (selecionados.length > 0) {

            selecionados.forEach(element => {
                if (element[8].innerText != agrupamento) {
                    verifyAgrupamento = false
                }
            });
        }
    }

    if (selecionados.length > 0 && verifyAgrupamento) {

        // selecionados.reverse()

        if (JSON.parse(localStorage.getItem('user')) != null) {
            ajax(_BASE_URL + _EP_GET_PEDIDOS_BY_AGRUMAMENTO, 'POST', { 'ID': agrupamento }, function (res) {

                console.log(res)


                if (res.length == selecionados.length) {

                    let vlrFrete = 0
                    res.forEach(frete => {
                        vlrFrete += frete.FRETE
                    });
                    $('#txtVlrFrete').val(vlrFrete.toFixed(2))

                    $('#example2').dataTable().fnDestroy();

                    // $('#itens').children().remove();
                    $('#itens2').html('');

                    let cidades = []
                    let optCidade = ''
                    //$('#optCidade').children().remove();

                    selecionados.forEach(element => {


                        item = `<tr>
                                    <td>${element[1].innerText}</td>
                                    <td>${element[4].innerText}</td>
                                    <td>${element[5].innerText}</td>
                                    <td>${element[6].innerText}</td>
                                    <td>${element[7].innerText}</td>
                                    <td>${element[8].innerText}</td>
                                </tr>`
                        $('#itens2').append(item)


                        if (!cidades.includes(element[7].innerText)) {
                            cidades.push(element[7].innerText)
                            optCidade += `<option value="${element[7].innerText}">${element[7].innerText}</option>`;
                        }

                    });

                    //$('#optCidade').append(optCidade);

                    var table2 = $("#example2").DataTable({
                        "responsive": false,
                        "lengthChange": true,
                        "autoWidth": false, //quebra tudo
                        "paging": false,
                        "searching": true,
                        "ordering": true,
                        "info": true,
                        "lengthMenu": [
                            [10, 25, 50, 100, -1],
                            [10, 25, 50, 100, "Todos"]
                        ],
                        "pageLength": 50,
                    }) //.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

                    $('#example2').DataTable().draw();

                    changeFrete()

                    $('#modal-coleta').modal('show');

                    if (JSON.parse(localStorage.getItem('user')) != null) {
                        ajax(_BASE_URL + _EP_PEDIDOS_GET_LIQUIDACAO_ID, 'GET', {}, function (res) {
                            console.log(res)
                            try {
                                document.getElementById('txtIdLiquidacao').innerHTML = res
                            } catch (error) {
                                console.log(error.message)
                                document.getElementById('txtIdLiquidacao').innerHTML = 0
                            }

                        }, JSON.parse(localStorage.getItem('user')).accessToken);
                    }

                    // const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
                    // const body = document.body;
                    // body.style.position = 'fixed';
                    // body.style.top = `-${scrollY}`;;
                } else {

                    let msg = ''

                    res.forEach(element => {
                        msg += '|' + element.PEDF_ID + '|'
                    });

                    Swal.fire({
                        icon: 'error',
                        title: 'Selecione os pedidos deste Agrupamento',
                        text: msg
                    })
                }

            }, JSON.parse(localStorage.getItem('user')).accessToken);
        }


    } else if (!verifyAgrupamento) {
        Swal.fire({
            icon: 'error',
            title: 'Agrupamentos diferentes!',
            text: 'Verifique os pedidos'
        })
    }
    console.log(selecionados)

}


function getTransportadoras(seleciona = 0) {
    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + _EP_GET_TRANSPORTADORAS, 'GET', {}, function (grus) {
            console.log(grus)
            try {

                let optTransportadoras = document.getElementById('optTransportadoras')
                let optionsGrus = '' //'<option selected value="0">--Selecione--</option>';
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

}


async function getCidadeCliente(id_cliente) {
    if (JSON.parse(localStorage.getItem('user')) != null) {

        let json = {}
        json['ID'] = id_cliente
        return await ajax(_BASE_URL + _EP_GET_CIDADE_CLIENTE, 'POST', json, async function (grus) {
            console.log(grus)
            let id = 1
            if (grus)
                id = grus.CODIGO

            let optCidade = document.getElementById('optCidade')

            console.log(id)
            //document.getElementById('select2-optCidade-container').innerHTML = optCidade.options[id].innerText
            // optCidade.selectedIndex = id
            $("#optCidade").val(id).trigger('change');

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }

}

async function getCidadeTransportadora(id_transportadora) {
    if (JSON.parse(localStorage.getItem('user')) != null) {

        let json = {}
        json['ID'] = id_transportadora
        return await ajax(_BASE_URL + _EP_GET_CIDADE_TRANSPORTADORA, 'POST', json, async function (grus) {
            console.log(grus)
            let id = 1
            if (grus)
                id = grus.GEN_ID

            let optCidade = document.getElementById('optCidade')

            console.log(id)
            //document.getElementById('select2-optCidade-container').innerHTML = optCidade.options[id].innerText
            // optCidade.selectedIndex = id
            $("#optCidade").val(id).trigger('change');

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }

}

function getCidades(seleciona = 0) {
    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + _EP_GET_ALL_CIDADES, 'GET', {}, function (grus) {
            console.log(grus)
            try {

                let optCidade = document.getElementById('optCidade')
                let optionsGrus = '' //'<option selected value="0">--Selecione--</option>';
                for (let i in grus) {
                    optionsGrus += `<option value="${grus[i].GEN_ID}">${grus[i].GEN_DESCRICAO}</option>`;
                }
                $('#optCidade').children().remove();
                $('#optCidade').append(optionsGrus);

                let arroptCidade = optCidade.options
                for (let i = 0; i < arroptCidade.length; i++) {
                    if (arroptCidade[i].value == seleciona) {
                        console.log('seleção')
                        optCidade.selectedIndex = i
                    }
                }
                // changeFuncTransportadora()
            } catch (error) {

            }

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }

}

function changeFuncTransportadora() {

    let optTransportadoras = document.getElementById("optTransportadoras");
    idTransportadora = optTransportadoras.options[optTransportadoras.selectedIndex].value;
    getCidadeTransportadora(idTransportadora)
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

async function changeFrete() {
    getTransportadoras()
    let optFrete = document.getElementById("optFrete");
    let optCidade = document.getElementById('optCidade')
    let frete = optFrete.options[optFrete.selectedIndex].value;
    let optTransportadoras = document.getElementById("optTransportadoras");

    switch (frete) {
        case 'FOB':
            optTransportadoras.options[optTransportadoras.selectedIndex].value = 1
            document.getElementById('select2-optTransportadoras-container').innerHTML = 'O PRÓPRIO CLIENTE'
            //  document.getElementById('optTransportadoras').disabled = true
            // $("#optCidade").val(1).trigger('change');
            getCidadeCliente(selecionados[0][4].innerText)
            optCidade.disabled = false

            $('#editTransportadora').attr('hidden', 'true');
            //$('#optTransportadoras').removeAttr('hidden');            

            break;
        case 'CIF':

            $("#optTransportadoras").val(1).trigger('change');
            document.getElementById('optTransportadoras').disabled = false
            getCidadeTransportadora(1)
            optCidade.disabled = true
            $('#editTransportadora').attr('hidden', 'true');

            break;

        // case 'FOB-EDIT':
        //     optTransportadoras.options[optTransportadoras.selectedIndex].value = 1
        //     document.getElementById('select2-optTransportadoras-container').innerHTML = 'O PRÓPRIO CLIENTE'
        //     //   document.getElementById('optTransportadoras').disabled = true
        //     // $("#optCidade").val(1).trigger('change');
        //     getCidadeCliente(selecionados[0][4].innerText)
        //     optCidade.disabled = false

        //     //$('#optTransportadoras').attr('hidden', 'true');
        //     $('#editTransportadora').removeAttr('hidden');


        //     break;


        default:
            break;
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {


    while (true) {
        await sleep(1000)
        try {
            if (tempoAtualiza >= 20) {
                tempoAtualiza = 0
                //getPedidosStatus()
            } else {
                tempoAtualiza++
            }
        } catch (error) { console.log('opção não encontrada') }
    }
})();

// $.validator.setDefaults({
//     submitHandler: function () {
//         alert("Form successful submitted!");
//     }
// });

$("#txtPlaca").on("input", function () {
    $(this).val($(this).val().toUpperCase());
});

$("#txtMotorista").on("input", function () {
    $(this).val($(this).val().toUpperCase());
});

$.validator.setDefaults({
    submitHandler: function () {

        if (!document.getElementById('customRadio1').checked && !document.getElementById('customRadio2').checked) {
            alerta('Selecione o tipo de carga.')
            return
        }

        if (!insert) {
            insert = true
            let json = {}

            // json['FRETE'] = document.getElementById("optFrete").options[document.getElementById("optFrete").selectedIndex].innerText;

            let optTransportadoras = document.getElementById("optTransportadoras");
            let nomeTransportadora = ''
            optTransportadoras.options[optTransportadoras.selectedIndex].innerText.split('-').forEach((item, i) => {
                if (i == 1) {
                    nomeTransportadora += item
                }
                if (i > 1) {
                    nomeTransportadora += '-' + item
                }
            });

            switch (document.getElementById('optFrete').value) {
                case 'FOB':
                    json['ID_TRANSPORTADORA'] = optTransportadoras.options[optTransportadoras.selectedIndex].value;//1;
                    json['TRANSPORTADORA'] = nomeTransportadora //selecionados[0][5].innerText
                    break;

                case 'CIF':
                    json['ID_TRANSPORTADORA'] = optTransportadoras.options[optTransportadoras.selectedIndex].value;
                    json['TRANSPORTADORA'] = nomeTransportadora
                    break;

                case 'FOB-EDIT':
                    json['ID_TRANSPORTADORA'] = optTransportadoras.options[optTransportadoras.selectedIndex].value;
                    json['TRANSPORTADORA'] = document.getElementById('editTransportadora').value
                    break;

                default:
                    break;
            }

            json['ID_LIQUIDACAO'] = document.getElementById('txtIdLiquidacao').innerText;
            json['ID_CIDADE_TRANSP'] = optCidade.options[optCidade.selectedIndex].value;
            json['CIDADE'] = optCidade.options[optCidade.selectedIndex].innerText
            json['PLACA'] = document.getElementById('txtPlaca').value
            json['MOTORISTA'] = document.getElementById('txtMotorista').value
            json['CARGA_PALETIZADA'] = document.getElementById('customRadio1').checked
            json['CARGA_FRACIONADA'] = document.getElementById('customRadio2').checked
            json['CARGA_BATIDA'] = document.getElementById('customRadio3').checked
            json['CARGA_OUTROS'] = document.getElementById('customRadio4').checked
            json['STATUS'] = document.getElementById('statusAgendado').checked ? 'AGENDADO' : 'AGUARDANDO'
            json['GESTAO'] = document.getElementById('gestao').checked ? 'S' : 'N'
            json['OBS_NFE'] = document.getElementById('txtObs').value.toUpperCase()
            json['HORARIO_COLETA'] = $("#horarioColeta").find("input").val();
            json['HORARIO_ENTREGA'] = $("#horarioEntrega").find("input").val();
            json['FRETE'] = document.getElementById('optFrete').value
            json['ID_CLIENTE'] = selecionados[0][4].innerText
            json['VLR_FRETE'] = document.getElementById('txtVlrFrete').value

            let pedidos = selecionados[0][1].innerText
            selecionados.forEach(LIQU_ID => {
                if (pedidos != LIQU_ID[1].innerText) {
                    pedidos += ',' + LIQU_ID[1].innerText
                }
            });

            json['PEDIDOS'] = pedidos

            console.log(json)

            Swal.fire({
                title: 'Deseja confirmar coleta?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Confirmar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    if (JSON.parse(localStorage.getItem('user')) != null) {
                        ajax(_BASE_URL + _EP_GERAR_COLETA, 'POST', json, async function (res) {
                            console.log(res)

                            if (res.status == 200) {
                                socket.emit("alteracaoControle", true);
                                getPedidosStatus()
                                $('#modal-coleta').modal('hide');
                                Swal.fire({
                                    icon: 'success',
                                    title: res.message + ' ' + document.getElementById('txtIdLiquidacao').innerText,
                                    text: ''
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: res.message,
                                    text: ''
                                })
                            }
                            insert = false
                        }, JSON.parse(localStorage.getItem('user')).accessToken);
                    }
                } else {
                    insert = false
                }
            })
        }
    }
});

$('#quickForm').validate({
    rules: {
        txtPlaca: {
            required: true,
            maxlength: 10
        },
        txtMotorista: {
            required: true,
        },
        txtVlrFrete: {
            required: true,
        }
    },
    messages: {
        txtPlaca: {
            required: "Insira placa",
            maxlength: "Max. 10 Caracteres"
            //   email: "Please enter a vaild email address",
            //   minlength: "Preencha no mínimo 5 caracteres",
            //   maxlength: "Máximo 10 caracteres"
        },
        txtMotorista: {
            required: "Insira nome do motorista",
        },


        editTransportadora: {
            required: "Insira nome da transportadora",
        },

        txtVlrFrete: {
            required: "Valor do frete",
        },

        // terms: "Por favor aceite o Termos de Uso"
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
    }
});

(async () => {
    getTransportadoras()
    getCidades()
    getPedidosStatus()
})();