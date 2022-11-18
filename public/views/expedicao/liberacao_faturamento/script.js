var id_liquidacao = 0

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

    get_all();

    $('#example2').DataTable({
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
            }
        },
        // fixedHeader: true,
        scrollY: "360px",
        scrollX: true,
        scrollCollapse: true,
        // fixedColumns: {
        //     left: 3,
        //     // right: 1
        // },
        "responsive": false,
        // "lengthChange": true,
        "autoWidth": false, //quebra tudo
        "paging": true,
        "searching": true,
        "ordering": false,
        // "info": true,
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
        "pageLength": 25,
    });
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

    principal();

    ajax(_BASE_URL + 'api/v1/expedicao/all', 'GET', {}, function (res) {
        console.log(res)
        if (res.length) {
            console.log('1')

            $('#example1').dataTable().fnDestroy();

            $('#itens').html('')
            res.forEach(linha => {
                console.log('1')

                let cor = "#f77a7a82"; //Vermelha
                let dropMenu = "";

                // amerelo #f0fa3282
                // verde #7af77f82

                if (linha["STATUS"] == "L") {
                    cor = "#7af77f82";
                    dropMenu = `<a onclick='can_fat(${linha['LIQUIDACAO']})' class='dropdown-item' href='#' data-widget='iframe-close' data-type='all'>Cancelar Liberação</a>`;
                    dropMenu += `<a hidden class='dropdown-item' href='#' data-widget='iframe-close' data-type='all-other'>Inserir Lotes</a>`;
                }

                if (linha["STATUS"] == "B") {
                    dropMenu = `<a onclick='verificar_estoque(${linha['COLETA']},${linha['LIQUIDACAO']})' class='dropdown-item' href='#' data-widget='iframe-close' data-type='all'>Liberar Faturamento</a>`;
                }

                let item = `<tr style='background-color:${cor}'>
                                <td>
                                    <div onclick="fecharMenu()" class='nav-item dropdown'>
                                        <a   style='display: unset !important;' class='nav-link bg-info dropdown-toggle' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'></a>
                                        <div onmouseleave='fecharMenu()' id='menu' class='dropdown-menu mt-0' style='left: 0px; right: inherit;'>
                                            ${dropMenu}
                                        </div>
                                    </div>
                                </td>
                                <td class='itens'>${linha["COLETA"]}</td>
                                <td class='itens'>${linha["LIQUIDACAO"]}</td>
                                <td class='itens'>${linha["FRETE"]}</td>
                                <td class='itens'>${linha["TRANSPORTADOR"]}</td>
                                <td class='itens'>${linha["PLACA"]}</td>
                                <td class='itens'>${linha["MOTORISTA"]}</td>
                                <td class='itens'>${linha["PESO"].toFixed(3)}</td>
                                <td class='itens'>`+ getDataFormatada(linha["DATA_COLETA"]).substring(0, 10) + `</td>
                                <td class='itens'>${linha["TIPO"]}</td>
                          </tr> `

                $('#itens').append(item)
            });

            $('#example1').DataTable({
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
                    }
                },
                // fixedHeader: true,
                scrollY: "360px",
                scrollX: true,
                scrollCollapse: true,
                // fixedColumns: {
                //     left: 3,
                //     // right: 1
                // },
                "responsive": false,
                // "lengthChange": true,
                "autoWidth": false, //quebra tudo
                "paging": true,
                "searching": true,
                "ordering": false,
                // "info": true,
                "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
                "pageLength": 25,
            });

        }
        let date = new Intl.DateTimeFormat([], _OPTIONS_DATE);
        $('#message').text('Atualizado ' + date.format(new Date()))
        $('#loading').attr('hidden', 'true');
    });

    // $.ajax({
    //     type: "POST",
    //     url: 'crud.php',
    //     data: {
    //         action: 'get_all'
    //     },
    //     success: function (data) {
    //         data = JSON.parse(data)
    //         console.log(data);
    //         console.log('1')

    //     }
    // });
}

function gerarPedido() {

    let liqu = parseInt($('#gerar_pedido').html()) || 0

    if (liqu == 0) return;

    if ($('#txtPallets').val() > 0 || $('#txtChapatex').val()) {
        Swal.fire({
            title: 'Deseja confirmar a geração de Pedido?',
            text: "",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {

                ajax(_BASE_URL + 'api/v1/expedicao/gerar_pedido', 'POST', {
                    liquidacao: liqu,
                    pallets: $('#txtPallets').val() || 0,
                    chapatex: $('#txtChapatex').val() || 0
                }, function (res) {
                    console.log(res)
                    if (res.status == 200) {
                        id_liquidacao = liqu
                        Swal.fire(
                            'Pedido(Pallets/Chapatex): ' + res.novo_id,
                            'Liquidação ' + id_liquidacao + ' foi liberada para faturamento',
                            'success'
                        )
                        lib_fat(false)
                        $('#modal-default').modal('hide');
                        $('#gerar_pedido').html('')
                        $('#txtPallets').val('')
                        $('#txtChapatex').val('')
                        get_all()
                    } else {
                        Swal.fire(
                            'Algo deu errado!',
                            res.message || 0,
                            'error'
                        )
                    }
                })
            }
        })
    } else {
        alert('Preencha')
    }
}

function gerar_palete(liqu = 0) {
    $('#gerar_pedido').html('')

    if (liqu == 0) return;

    Swal.fire({
        title: 'Deseja gerar Pedido(Pallets/Chapatex)?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.isConfirmed) {

            // $('#modal-default').modal('toggle');
            $('#gerar_pedido').html(liqu)
            $('#modal-default').modal('show');
            // $('#modal-default').modal('hide');
        } else {
            lib_fat()
        }
    })
}

function lib_fat(msg = true) {
    if (id_liquidacao) {
        console.log(id_liquidacao)

        let produtos = []
        let table = document.getElementById('example2').querySelector('tbody').querySelectorAll('tr')
        let count = table.length;
        for (let i = 0; i < count; i++) {
            let linha = table[i].querySelectorAll('td')
            produtos.push({
                prod_id: linha[0].innerHTML,
                qtd_coleta: linha[2].innerHTML
            })
            // console.log(linha[0].innerHTML) // ID PROD
            // console.log(linha[2].innerHTML) // QTD COLETA
        }

        console.log(produtos)
        if (produtos.length) {

            ajax(_BASE_URL + 'api/v1/expedicao/lib_fat', 'POST', {
                liquidacao: id_liquidacao,
                produtos: produtos
            }, function (res) {
                console.log(res)
                if (res.status) {
                    if (msg) {
                        Swal.fire(
                            'Liberado!',
                            'Liquidação ' + id_liquidacao + ' foi liberada para faturamento',
                            'success'
                        )
                    }
                    get_all()
                } else {
                    Swal.fire(
                        'Algo deu errado!',
                        'Liquidação ' + id_liquidacao,
                        'error'
                    )
                }
            })
        }
    }
}

function can_fat(id = 0) {

    Swal.fire({
        title: 'Deseja realmente cancelar?',
        text: "LIQUIDAÇÃO: " + id,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.isConfirmed) {

            ajax(_BASE_URL + 'api/v1/expedicao/can_fat', 'POST', { liquidacao: id }, function (res) {
                console.log(res)
                if (res.status) {
                    Swal.fire(
                        'Cancelado!',
                        'Liquidação ' + id + ' foi retornada!',
                        'success'
                    )
                    get_all()
                } else {
                    Swal.fire(
                        'Algo deu errado!',
                        res.message,
                        'error'
                    )
                    get_all()
                }
            })
        }
    })
}


function verificar_estoque(id = 0, id_liqui = 0) {

    let timerInterval
    Swal.fire({
        title: 'Carregando dados!',
        html: '', //I will close in <b></b> milliseconds.
        timer: 15000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()

            ajax(_BASE_URL + 'api/v1/expedicao/verificar_estoque', 'POST', { coleta: id }, function (res) {
                console.log(res)

                if (res.length) {

                    Swal.close();
                    $('#message2').html(`COLETA: ${id} | LQUIDAÇÃO: ${id_liqui}`);
                    id_liquidacao = id_liqui
                    document.getElementById('secundario').removeAttribute('hidden');
                    document.getElementById('principal').hidden = true;

                    console.log('1')

                    $('#example2').dataTable().fnDestroy();

                    $('#itens2').html('')

                    res.forEach(linha => {
                        console.log('1')

                        let cor = "#f77a7a82"; //Vermelha

                        if (parseInt(linha["DIFERENCA"]) >= 0) {
                            cor = "#7af77f82";
                        } else {
                            id_liquidacao = 0
                        }

                        let item = `<tr style='background-color:${cor}'>
                                    <td class='itens'>${linha["ID"]}</td>
                                    <td class='itens'>${linha["DESCRICAO"]}</td>
                                    <td class='itens'>${linha["COLETA"]}</td>
                                    <td class='itens'>${linha["ESTOQUE"]}</td>
                                    <td class='itens'>${linha["RESERVA"]}</td>
                                    <td class='itens'>${linha["DIFERENCA"]}</td>
                              </tr> `

                        $('#itens2').append(item)
                    });

                    let opc = `<button onclick="principal()" class="btn btn-info">Voltar</button>`
                    if (id_liquidacao) {
                        opc = `<button onclick="gerar_palete(${id_liquidacao})" style="margin-right: 50px;" class="btn btn-success">Liberar</button>` + opc
                    }

                    $('#opcoes').html(opc);

                    $('#example2').DataTable({
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
                            }
                        },
                        // fixedHeader: true,
                        scrollY: "320px",
                        scrollX: true,
                        scrollCollapse: true,
                        // fixedColumns: {
                        //     left: 3,
                        //     // right: 1
                        // },
                        "responsive": false,
                        // "lengthChange": true,
                        "autoWidth": false, //quebra tudo
                        "paging": false,
                        "searching": false,
                        "ordering": false,
                        // "info": true,
                        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
                        "pageLength": 25,
                    });

                }
            })



            // const b = Swal.getHtmlContainer().querySelector('b')
            // timerInterval = setInterval(() => {
            //   b.textContent = Swal.getTimerLeft()
            //   Swal.clos
            // }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })


}


function fecharMenu() {
    $('#menu.show').removeClass('show'); //Braboo
}
