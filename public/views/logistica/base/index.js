const APROVADO = 'Aprovado'
const FINANCEIRO = 'Ag. Financeiro'
const COMERCIAL = 'Ag. Comercial'
const APROVAR = 'Ag. Aprovar'

var tempoAtualiza = 0
var filtroPesquisa = ''
var starting = false
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
function getPedidosStatus() {

    $('#loading').removeAttr('hidden');
    $('#message').text('Atualizando.. ')

    if (JSON.parse(localStorage.getItem('user')) != null && !request) {
        request = true

        ajax(_BASE_URL + _EP_LOGISTICA_GET_PEDIDOS_STATUS, 'GET', {}, function (res) {
            console.log(res)
            if (res.length) {

                $('#example1').dataTable().fnDestroy();

                // $('#itens').children().remove();
                $('#itens').html('');

                res.forEach(element => {

                    let color = 'white'
                    switch (element.SITUACAO) {
                        case FINANCEIRO:
                            color = '#f7f3c0'
                            break;
                        case APROVADO:
                            color = 'lightgreen'
                            break;
                        case APROVAR:
                            color = 'lavender'
                            break;
                        case COMERCIAL:
                            color = '#f7f3c0'
                            break;

                        default:
                            break;
                    }

                    let razoaSocial = element.RAZAO_SOCIAL.length >= 55 ? element.RAZAO_SOCIAL.substr(0, 55) + '..' : element.RAZAO_SOCIAL

                    item = `<tr style="background-color:${color}">
                            <td></td>
                            <td>${element.COD_PEDIDO}</td>
                            <td>${element.PESO_BRUTO.toFixed(2)}</td>
                            <td>${element.CLI_ID}</td>
                            <td>${razoaSocial}</td>
                            <td>${element.UF}</td>
                            <td>${element.CIDADE}</td>
                            <td>${element.SITUACAO}</td>
                           </tr>`
                    $('#itens').append(item)
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
                        [7, 'desc']
                    ],

                    'createdRow': function (row, data, dataIndex) {
                        console.log(data[7])

                        switch ($('td:eq(7)', row).text()) {
                            case FINANCEIRO:
                                $('td:eq(0)', row).removeClass("select-checkbox");
                                break;
                            case APROVAR:
                                $('td:eq(0)', row).removeClass("select-checkbox");
                                break;
                            case COMERCIAL:
                                $('td:eq(0)', row).removeClass("select-checkbox");
                                break;

                            default:
                                break;
                        }
                        // $('td:eq(7)', row).html(diaFormatado)
                    },

                    "buttons": [
                        {
                            text: 'Atualizar',
                            action: function (e, dt, node, config) {
                                getPedidosStatus()
                            }
                        }
                    ],

                    "responsive": false,
                    "lengthChange": true,
                    "autoWidth": false, //quebra tudo
                    "paging": false,
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
                    "pageLength": 50,
                })//.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

                table.on("click", "th.select-checkbox", function () {
                    if ($("th.select-checkbox").hasClass("selected")) {
                        table.rows().deselect();
                        $("th.select-checkbox").removeClass("selected");
                    } else {
                        table.rows().select();
                        $("th.select-checkbox").addClass("selected");
                    }
                }).on("select deselect", function () {
                    ("Some selection or deselection going on")
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
                                if (data[6].toUpperCase().includes(filtroPesquisa.toUpperCase())) {
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
            request = false
        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
}

deleteGrupoUsuario = (id) => {

    // Swal.fire({
    //     title: 'Tem certeza?',
    //     text: "Uma vez excluído, você não poderá recuperar este dado!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     cancelButtonText: 'Cancelar',
    //     confirmButtonText: 'Sim'
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         if (JSON.parse(localStorage.getItem('user')) != null) {
    //             ajax(_BASE_URL + _EP_GET_ID_GRUPOUSUARIO + id, 'DELETE', {}, function (res) {
    //                 getPedidosStatus()
    //                 Swal.fire(
    //                     'Excluido!',
    //                     'Registro excluido com Sucesso.',
    //                     'success'
    //                 )
    //             }, JSON.parse(localStorage.getItem('user')).accessToken);
    //         }
    //     }
    // })
}



function openModal2(seleciona, user, nomeUser) {
    // idUser = user
    // getGrupoUsuario(seleciona)

    // $('#titleModal2').html(nomeUser)
    // $('#modal-default2').modal('show');
    // // $('#modal-default2 .timeline').animate({ scrollTop: $('#modal-default2 .timeline').offset().top }, 'slow');
    // // $('#modal-default2').scrollTop = $('#modal-default2').scrollHeight

}

function getGrupoUsuario(seleciona = 0) {
    // if (JSON.parse(localStorage.getItem('user')) != null) {
    //     ajax(_BASE_URL + _EP_GET_ALL_GRUPOUSUARIO, 'GET', {}, function (grus) {

    //         let optGrupoUsuario = document.getElementById('optGrupoUsuario')
    //         let optionsGrus = '<option selected value="0">--Selecione--</option>';
    //         for (let i in grus) {
    //             optionsGrus += `<option value="${grus[i].id}">${grus[i].GRUS_NOME}</option>`;
    //         }
    //         $('#optGrupoUsuario').children().remove();
    //         $('#optGrupoUsuario').append(optionsGrus);

    //         let arroptGrupoUsuario = optGrupoUsuario.options
    //         for (let i = 0; i < arroptGrupoUsuario.length; i++) {
    //             if (arroptGrupoUsuario[i].value == seleciona) {
    //                 optGrupoUsuario.selectedIndex = i
    //             }
    //         }

    //     }, JSON.parse(localStorage.getItem('user')).accessToken);
    // }
    // } else {
    //     let optionsGrus = '<option selected value="">--Selecione--</option>';
    //     $('#optGrupoUsuario').children().remove();
    //     $('#optGrupoUsuario').append(optionsGrus);
    // }
}

salvar = () => {

    // let json = {}
    // json['ID_GRUPOUSUARIO'] = document.getElementById('optGrupoUsuario').value

    // if (JSON.parse(localStorage.getItem('user')) != null) {
    //     ajax(_BASE_URL + _EP_UPDATE_GRUS_USUARIO + idUser, 'PUT', json, function (res) {
    //         getPedidosStatus()
    //         $('#modal-default2').modal('hide');
    //         Swal.fire(
    //             'Alterado!',
    //             'Registro Alterado com Sucesso.',
    //             'success'
    //         )
    //     }, JSON.parse(localStorage.getItem('user')).accessToken);
    // }

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


(async () => { getPedidosStatus() })();

