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
var id_liquidacao = 0
var copy_cli = 0
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

$(document).ready(function () {

    get_all()

});


function principal() {
    $('#gerar_pedido').html('')
    id_liquidacao = 0
    document.getElementById('principal').removeAttribute('hidden');
    document.getElementById('secundario').hidden = true;
}

function get_all() {

    $('#loading').removeAttr('hidden');
    $('#message').text('Atualizando.. ')

    ajax(_BASE_URL + 'api/v1/logistica_liquidacao/getLiquidacoes', 'GET', {}, function (res) {
        console.log(res)

        if (res.length) {

            document.getElementById('AGUARDANDO').innerHTML = ''
            document.getElementById('AGENDADO').innerHTML = ''
            document.getElementById('PROGRAMADA').innerHTML = ''
            document.getElementById('TRANSITO').innerHTML = ''
            document.getElementById('OCORRENCIA').innerHTML = ''

            res.forEach((item) => {
                // console.log(item)
                if (!document.getElementById(item.LIQU_ID)) {
                    document.getElementById(item.STATUS).innerHTML += `
                            <li class="drag-item" id="${item.LIQU_ID}" ondblclick="openLiqui('${item.LIQU_ID}')">
                                <div style="padding: 5px 0px 0px 5px; color: rgb(61, 81, 129);">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h6 class="texto-item"><i class="nav-icon fas fa-indent"></i>
                                                    ${item.LIQU_ID}</h6>
                                            </div>
                                            <div class="col-md-12" style="padding-bottom: 5px;">
                                                <h6 class="texto-item"><i class="nav-icon fas fa-calendar"></i>
                                                    ${dataAnteriorFormatada(item.DTA_COLETA).substring(0, 10)}</h6>
                                            </div>
                                            <div class="col-md-12" id="CLI-${item.LIQU_ID}" style="padding-bottom: 5px;">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>`
                }

                let cliente = item.CLIENTE
                // if (item.CLIENTE.length >= 23) {
                //     cliente = cliente.substring(0, 23) + '...'
                // }

                document.getElementById(`CLI-${item.LIQU_ID}`).innerHTML += `
                            <h6 class="texto-item"><i class="nav-icon fas fa-user"></i>${cliente}</h6>
                        `

            })

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
            $('#loading').attr('hidden', 'true');

            // let liquidacoes = document.getElementsByClassName('drag-item');

            // for (let i = 0; i < liquidacoes.length; i++) {
            //     liquidacoes[i].ondblclick = function (e) {
            //         let liq = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('id') || 0
            //         if (liq) {

            //             console.log();
            //             Swal.fire({
            //                 title: '<strong>' + liq + '<u>example</u></strong>',
            //                 icon: 'info',
            //                 html:
            //                     'You can use <b>bold text</b>, ' +
            //                     '<a href="//sweetalert2.github.io">links</a> ' +
            //                     'and other HTML tags',
            //                 showCloseButton: true,
            //                 showCancelButton: true,
            //                 focusConfirm: false,
            //                 confirmButtonText:
            //                     '<i class="fa fa-thumbs-up"></i> Great!',
            //                 confirmButtonAriaLabel: 'Thumbs up, great!',
            //                 cancelButtonText:
            //                     '<i class="fa fa-thumbs-down"></i>',
            //                 cancelButtonAriaLabel: 'Thumbs down'
            //             })
            //         }
            //     }
            // };

        }
    })
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
            optCidade.disabled = false
            $('#editTransportadora').attr('hidden', 'true');
            //$('#optTransportadoras').removeAttr('hidden');            
            // getCidadeCliente(copy_cli)

            break;
        case 'CIF':

            $("#optTransportadoras").val(1).trigger('change');
            document.getElementById('optTransportadoras').disabled = false
            getCidadeTransportadora(1)
            optCidade.disabled = true
            $('#editTransportadora').attr('hidden', 'true');

            break;

        default:
            break;
    }
}

function openLiqui(liq) {
    // $('#modal-coleta').modal('hide');
    $('#txtIdLiquidacao').text(liq)
    $('#modal-coleta').modal('show');



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

    // selecionados.reverse()

    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + 'api/v1/logistica_liquidacao/getPedidosByLiquidacao', 'POST', { 'ID': liq }, function (res) {

            console.log(res)


            if (res.length) {
                copy_cli = res[0].PEDF_CLI_ID
                getCidadeCliente(copy_cli)
                $('#txtVlrFrete').val(res[0].FRETE.toFixed(2))
                $('#txtPlaca').val(res[0].LIQU_PLACA_TRANSP)
                $('#txtMotorista').val(res[0].PEDL_NOME_MOTORISTA)
                $('#example2').dataTable().fnDestroy();

                res[0].LIQU_GESTAO = 'S' ? document.getElementById('gestao').checked = true : document.getElementById('gestao').checked = false

                if (res[0].LIQU_FRETE_C_F == 'C') {
                    document.getElementById('optFrete').value = 'CIF'
                } else {
                    document.getElementById('optFrete').value = 'FOB'
                }

                if (res[0].PEDL_TIPO_CARGA == 1) {
                    document.getElementById('customRadio1').checked = true
                }

                if (res[0].PEDL_TIPO_CARGA == 3) {
                    document.getElementById('customRadio2').checked = true
                }

                // $('#itens').children().remove();
                $('#itens2').html('');

                res.forEach(element => {

                    item = `<tr>
                                    <td>${element.PEDIDO}</td>
                                    <td>${element.PEDF_CLI_ID}</td>
                                    <td>${element.CLIENTE}</td>
                                    <td>${element.UF}</td>
                                    <td>${element.CIDADE}</td>
                                </tr>`
                    $('#itens2').append(item)

                });

                var table2 = $("#example2").DataTable({
                    "responsive": false,
                    "lengthChange": true,
                    "autoWidth": false, //quebra tudo
                    "paging": false,
                    "searching": false,
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

            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Algo deu errado',
                    text: res.message
                })
            }

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
}

function fecharMenu() {
    $('#menu.show').removeClass('show'); //Braboo
}

function reload() {
    location.reload()
}

(async () => {
    getTransportadoras()
    getCidades()
})();