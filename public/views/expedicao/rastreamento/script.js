var id_liquidacao = 0
var id_pedido = 0
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
var perm = ''

$(document).ready(function () {
    ajax(_BASE_URL + 'api/v1/permissoes/' + 'lista', 'GET', {}, function (grus) {
        perm = grus
        console.log(perm)
        get_all();
    })

});


function viewEtiquetaProduto(prod_id) {
    let timerInterval
    Swal.fire({
        title: 'Carregando dados!',
        html: '', //I will close in <b></b> milliseconds.
        timer: 15000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            ajax(_BASE_URL + 'api/v1/rastreamento/viewEtiquetaProduto', 'POST', { liquidacao: id_liquidacao, prod_id: prod_id, pedido: id_pedido }, function (res) {
                console.log(res)
                Swal.close();

                $('#example3').dataTable().fnDestroy();

                $('#itens3').html('')
                if (res.length) {
                    res.forEach(linha => {

                        let item = `<tr>
                        <td class='itens'>${linha["PROD_ID"]}</td>
                        <td class='itens'>${linha["ETIQUETA"]}</td>
                        <td class='itens'>${linha["QTD_INSERIDA"]}</td>
                        <td style="width: 70px" class="project-actions text-right">
                            <a style="padding: 0rem 0.5rem !important;" onclick="deleteSaida('${linha["ETIQUETA"]}',${prod_id})" class="btn btn-danger btn-sm" href="#">
                                <i class="fas fa-trash">
                                </i>
                            </a> 
                        </td>
                  </tr> `

                        $('#itens3').append(item)
                    });

                    $('#example3').DataTable({
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
                        scrollY: "160px",
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
                        "searching": true,
                        "ordering": false,
                        "info": false,
                        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
                        "pageLength": 25,
                    });

                    window.setTimeout(function () {

                        document.getElementById('txtEtiqueta').focus();
                    }, 500);
                }
            })
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


senhaAdm = () => {

    Swal.fire({
        title: 'Senha Administrativa',
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
            let senha = result.value.replace(/[^0-9]/g, '')

            ajax(_BASE_URL + 'api/v1/usuario/senhaAdm', 'POST', {
                senhaAdm: senha
            }, function (res) {
                if (res.status) {

                } else {
                    Swal.fire(
                        'Senha incorreta!',
                        '',
                        'info'
                    )
                }
            })
        }
    })
}

restaurarLiquidacao = () => {
    Swal.fire({
        title: 'Senha Administrativa',
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
            let senha = result.value + ''
            console.log(senha)
            ajax(_BASE_URL + 'api/v1/usuario/senhaAdm', 'POST', {
                senha: senha,
            }, function (res) {
                if (res.status) {
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

                            let timerInterval
                            Swal.fire({
                                title: 'Finalizando..',
                                html: '', //I will close in <b></b> milliseconds.
                                timer: 15000,
                                timerProgressBar: true,
                                didOpen: () => {
                                    Swal.showLoading()
                                    ajax(_BASE_URL + 'api/v1/rastreamento/retornarRastreio', 'POST', {
                                        liquidacao: result.value.replace(/[^0-9]/g, '')
                                    }, function (res) {
                                        Swal.close();
                                        console.log(res)
                                        if (res.status) {
                                            Swal.fire(
                                                'Liquidação: ' + result.value.replace(/[^0-9]/g, ''),
                                                res.message || 0,
                                                'success'
                                            )
                                            id_liquidacao = 0
                                            id_pedido = 0
                                            get_all()
                                        } else {
                                            Swal.fire(
                                                'Não foi possível localizar!',
                                                res.message || 0,
                                                'error'
                                            )
                                        }
                                    })
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
                    })
                } else {
                    Swal.fire(
                        'Senha incorreta!',
                        '',
                        'info'
                    )
                }
            })
        }
    })
}


finalizarRastreio = () => {

    Swal.fire({
        title: 'Deseja Finalizar?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            let timerInterval
            Swal.fire({
                title: 'Finalizando..',
                html: '', //I will close in <b></b> milliseconds.
                timer: 15000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    ajax(_BASE_URL + 'api/v1/rastreamento/finalizarRastreio', 'POST', {
                        liquidacao: id_liquidacao
                    }, function (res) {
                        Swal.close();
                        console.log(res)
                        if (res.status) {
                            Swal.fire(
                                'Liquidação: ' + id_liquidacao,
                                res.message || 0,
                                'success'
                            )
                            id_liquidacao = 0
                            id_pedido = 0
                            get_all()
                        } else {
                            Swal.fire(
                                'Algo deu errado!',
                                res.message || 0,
                                'error'
                            )
                        }
                    })
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
    })
}

deleteSaida = (etiqueta, prod_id) => {

    Swal.fire({
        title: 'Tem certeza?',
        text: "Deletar " + etiqueta,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            let timerInterval
            Swal.fire({
                title: 'Excluindo!',
                html: '', //I will close in <b></b> milliseconds.
                timer: 15000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    ajax(_BASE_URL + 'api/v1/rastreamento/deleteSaida', 'POST', {
                        liquidacao: id_liquidacao,
                        pedido: id_pedido,
                        etiqueta: etiqueta
                    }, function (res) {
                        Swal.close();
                        console.log(res)
                        if (res.status) {
                            if (id_pedido) {
                                // Swal.fire(`You selected: ${pedido}`)
                                // return
                                let timerInterval
                                Swal.fire({
                                    title: 'Carregando dados!',
                                    html: '', //I will close in <b></b> milliseconds.
                                    timer: 15000,
                                    timerProgressBar: true,
                                    didOpen: () => {
                                        Swal.showLoading()

                                        ajax(_BASE_URL + 'api/v1/rastreamento/getProdutosInserirLotes', 'POST', { id_liqui: id_liquidacao, pedido: id_pedido }, function (res) {
                                            console.log(res)
                                            $('#opcoes').html('');

                                            Swal.close();

                                            $('#example2').dataTable().fnDestroy();

                                            $('#itens2').html('')
                                            let finalizarLiquidacao = true;

                                            res.forEach(linha => {
                                                console.log('1')

                                                let cor = "#f77a7a82"; //Vermelha
                                                if (parseInt(linha["FALTAM"]) <= 0 && parseInt(linha["QTD_INSERIDA"]) > 0) {
                                                    cor = "#7af77f82";
                                                } else {
                                                    finalizarLiquidacao = false
                                                }

                                                let faltam = 0
                                                if (parseInt(linha["FALTAM"]) == 0 && parseInt(linha["QTD_INSERIDA"]) == 0) {
                                                    faltam = linha["QTD"]
                                                } else {
                                                    faltam = parseInt(linha["FALTAM"])
                                                }

                                                let item = `<tr style='background-color:${cor}'>
                                                            <td class='itens'>${linha["PROD_ID"]}</td>
                                                            <td class='itens'>${linha["PROD_DESC"]}</td>
                                                            <td class='itens'>${linha["QTD"]}</td>
                                                            <td class='itens'>${linha["QTD_INSERIDA"]}</td>
                                                            <td class='itens'>${faltam}</td>
                                                      </tr> `

                                                $('#itens2').append(item)
                                            });

                                            let opc = `<button onclick="voltar()" class="btn btn-info">Voltar</button>`

                                            if (finalizarLiquidacao) {
                                                // opc = `<button onclick="finalizarRastreio()" style="margin-right: 50px;" class="btn btn-success">Finalizar</button>` + opc
                                            }

                                            $('#opcoes').html(opc);

                                            $('#example2').DataTable({
                                                "language":
                                                {
                                                    "sProcessing": "A processar...",
                                                    "sLengthMenu": "Mostrar _MENU_ registos",
                                                    "sZeroRecords": "Não foram encontrados resultados",
                                                    "sInfo": "",
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
                                                scrollY: "160px",
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
                                                // "info": false,
                                                "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
                                                "pageLength": 25,
                                            });

                                            window.setTimeout(function () {

                                                document.getElementById('txtEtiqueta').focus();
                                            }, 100);

                                            let table = document.getElementById("example2");
                                            let rows = table.getElementsByTagName("tr");
                                            for (i = 0; i < rows.length; i++) {
                                                let currentRow = table.rows[i];
                                                let createClickHandler = function (row) {
                                                    return function () {
                                                        let cell = row.getElementsByTagName("td")[0];
                                                        let id = cell.innerHTML;
                                                        viewEtiquetaProduto(id)
                                                    };
                                                };
                                                currentRow.onclick = createClickHandler(currentRow);
                                            }
                                        })
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

                                // Swal.fire(`You selected: ${pedido}`)
                            }
                            viewEtiquetaProduto(prod_id)
                        } else {
                            Swal.fire(
                                'Algo deu errado!',
                                res.message || 0,
                                'error'
                            )
                        }
                    })
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
    })
}

function principal() {
    $('#gerar_pedido').html('')
    id_liquidacao = 0
    id_pedido = 0
    $('#example2').dataTable().fnDestroy();
    $('#itens2').html('')
    $('#example3').dataTable().fnDestroy();
    $('#itens3').html('')
    document.getElementById('principal').removeAttribute('hidden');
    document.getElementById('secundario').hidden = true;
    // get_all()
}

function get_all() {

    $('#loading').removeAttr('hidden');
    $('#message').text('Atualizando.. ')

    principal();

    ajax(_BASE_URL + 'api/v1/rastreamento/all', 'GET', {}, function (res) {
        console.log(res)
        if (res.length) {
            console.log('1')

            $('#example1').dataTable().fnDestroy();

            $('#itens').html('')
            res.forEach(linha => {

                if (!perm.includes('viewRastreamentoGestao') && linha['GESTAO'] == 'S') {
                    return
                }

                if (!perm.includes('viewRastreamentoIndustria') && linha['GESTAO'] != 'S') {
                    return
                }

                console.log('1')

                let cor = "#f77a7a82"; //Vermelha
                let dropMenu = "";

                // amerelo #f0fa3282
                // verde #7af77f82
                linha["STATUS"] = 'L'
                if (linha["STATUS"] == "L") {
                    cor = "#7af77f82";
                    // dropMenu = `<a onclick='can_fat(${linha['LIQUIDACAO']})' class='dropdown-item' href='#' data-widget='iframe-close' data-type='all'>Cancelar Liberação</a>`;
                    dropMenu += `<a onClick='inserirLotes(${linha['LIQUIDACAO']})' class='dropdown-item' href='#' data-widget='iframe-close' data-type='all-other'>Inserir Lotes</a>`;
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
                                <td class='itens'>${linha["LIQUIDACAO"]}</td>
                                <td class='itens'>${linha["FRETE"]}</td>
                                <td class='itens'>${linha["TRANSPORTADOR"]}</td>
                                <td class='itens'>${linha["PLACA"]}</td>
                                <td class='itens'>${linha["MOTORISTA"]}</td>
                                <td class='itens'>${linha["CXS"]}</td>
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


async function inserirLotes(id_liqui = 0) {

    ajax(_BASE_URL + 'api/v1/rastreamento/getClientesPedido', 'POST', { id_liqui: id_liqui }, async function (res) {
        console.log(res)
        if (res) {
            if (res.length) {
                let inputOptions = {}
                res.forEach((item) => {
                    let pedido_fat = item.PEDF_ID + ''
                    inputOptions['Número do Pedido: ' + item.PEDF_ID] = JSON.parse(`{ "${pedido_fat}": "${item.CLI_RAZAO_SOCIAL}" }`)
                })
                console.log(inputOptions)

                const { value: pedido } = await Swal.fire({
                    title: 'Liquidação: ' + id_liqui,
                    input: 'select',
                    inputOptions: inputOptions,
                    inputPlaceholder: 'Selecione o cliente',
                    showCancelButton: true,
                    inputValidator: (value) => {
                        return new Promise((resolve) => {
                            resolve()
                            // resolve('You need to select oranges :)')
                        })
                    }
                })

                if (pedido) {
                    // Swal.fire(`You selected: ${pedido}`)
                    // return
                    let timerInterval
                    Swal.fire({
                        title: 'Carregando dados!',
                        html: '', //I will close in <b></b> milliseconds.
                        timer: 15000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()

                            ajax(_BASE_URL + 'api/v1/rastreamento/getProdutosInserirLotes', 'POST', { id_liqui: id_liqui, pedido: pedido }, function (res) {
                                console.log(res)
                                $('#opcoes').html('');

                                // if (res.length) {

                                Swal.close();
                                $('#message2').html(`INSERIR LOTES | LIQUIDAÇÃO: ${id_liqui} | PEDIDO: ` + pedido);
                                id_liquidacao = id_liqui
                                id_pedido = pedido
                                document.getElementById('secundario').removeAttribute('hidden');
                                document.getElementById('principal').hidden = true;

                                console.log('1')

                                $('#example2').dataTable().fnDestroy();

                                $('#itens2').html('')
                                let finalizarLiquidacao = true;

                                res.forEach(linha => {
                                    console.log('1')

                                    let cor = "#f77a7a82"; //Vermelha
                                    if (parseInt(linha["FALTAM"]) <= 0 && parseInt(linha["QTD_INSERIDA"]) > 0) {
                                        cor = "#7af77f82";
                                    } else {
                                        finalizarLiquidacao = false
                                    }
                                    $('#message2').html(`${linha["TIPO"]} | LIQUIDAÇÃO: ${id_liqui} | PEDIDO: ` + pedido);
                                    // <td class='itens'>${linha["TIPO"]}</td>
                                    // <td class='itens'>${linha["PEDF_ID"]}</td>

                                    let faltam = 0
                                    if (parseInt(linha["FALTAM"]) == 0 && parseInt(linha["QTD_INSERIDA"]) == 0) {
                                        faltam = linha["QTD"]
                                    } else {
                                        faltam = parseInt(linha["FALTAM"])
                                    }

                                    let item = `<tr style='background-color:${cor}'>
                                                <td class='itens'>${linha["PROD_ID"]}</td>
                                                <td class='itens'>${linha["PROD_DESC"]}</td>
                                                <td class='itens'>${linha["QTD"]}</td>
                                                <td class='itens'>${linha["QTD_INSERIDA"]}</td>
                                                <td class='itens'>${faltam}</td>
                                          </tr> `

                                    $('#itens2').append(item)
                                });

                                let opc = `<button onclick="voltar()" class="btn btn-info">Voltar</button>`

                                if (finalizarLiquidacao) {
                                    // opc = `<button onclick="finalizarRastreio()" style="margin-right: 50px;" class="btn btn-success">Finalizar</button>` + opc
                                }

                                $('#opcoes').html(opc);

                                $('#example2').DataTable({
                                    "language":
                                    {
                                        "sProcessing": "A processar...",
                                        "sLengthMenu": "Mostrar _MENU_ registos",
                                        "sZeroRecords": "Não foram encontrados resultados",
                                        "sInfo": "",
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
                                    scrollY: "160px",
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
                                    // "info": false,
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
                                    "pageLength": 25,
                                });

                                window.setTimeout(function () {

                                    document.getElementById('txtEtiqueta').focus();
                                }, 100);

                                let table = document.getElementById("example2");
                                let rows = table.getElementsByTagName("tr");
                                for (i = 0; i < rows.length; i++) {
                                    let currentRow = table.rows[i];
                                    let createClickHandler = function (row) {
                                        return function () {
                                            let cell = row.getElementsByTagName("td")[0];
                                            let id = cell.innerHTML;
                                            viewEtiquetaProduto(id)
                                        };
                                    };
                                    currentRow.onclick = createClickHandler(currentRow);
                                }
                            })
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

                    // Swal.fire(`You selected: ${pedido}`)
                }
            }
        }
    })




}

function voltar() {
    inserirLotes(id_liquidacao)
    get_all()
}

var pesquisando = false
function pesquisarEtiqueta() {
    console.log('PES 1')
    if (document.getElementById('txtEtiqueta').value.length >= 24 && !pesquisando) {
        pesquisando = true

        let etiqueta = document.getElementById('txtEtiqueta').value


        ajax(_BASE_URL + 'api/v1/rastreamento/getPesquisarEtiqueta', 'POST', { etiqueta: etiqueta }, function (res) {
            console.log(res)
            console.log('PES 4')

            if (res.message) {
                document.getElementById('txtEtiqueta').value = ''
                Swal.fire(
                    'Etiqueta não encontrada ou não gerou ACEITE!',
                    res.message,
                    'error'
                )
            } else {
                console.log('PES 5')
                console.log(res[0].ETQP_QTDE)
                let qtdEt = res[0].ETQP_QTDE || 0
                if (parseInt(qtdEt) > 0) {
                    $('#txtEstoque').val(qtdEt)
                    $('#txtQtd').val(qtdEt)
                    adicionarEtiqueta()
                } else {
                    document.getElementById('txtEtiqueta').value = ''
                    Swal.fire(
                        'Etiqueta sem estoque!',
                        '',
                        'info'
                    )
                    $('#txtEtiqueta').val('')
                    $('#txtEstoque').val('')
                    $('#txtQtd').val('')
                }
            }
            pesquisando = false
        })
    } else {
        $('#txtEstoque').val('')
        $('#txtQtd').val('')
    }
}


function adicionarEtiqueta() {

    let qtd = $('#txtQtd').val() || 0
    let etiqueta = $('#txtEtiqueta').val() || 0

    if (parseFloat(qtd) > parseFloat(etiqueta)) {
        $('#txtQtd').val(etiqueta)
        qtd = etiqueta
    }

    // if(qtd >)

    if (parseFloat(qtd) > 0 && parseFloat(qtd) <= parseFloat(etiqueta)) {
        ajax(_BASE_URL + 'api/v1/rastreamento/insertSaidaEtiqueta', 'POST', { etiqueta: etiqueta, liquidacao: id_liquidacao, qtd: qtd, pedido: id_pedido }, function (res) {
            console.log(res)
            if (res.status == 200) {
                $('#txtEtiqueta').val('')
                $('#txtEstoque').val('')
                $('#txtQtd').val('')
                // inserirLotes(id_liquidacao)
                // alert('')
                if (id_pedido) {
                    // Swal.fire(`You selected: ${pedido}`)
                    // return
                    let timerInterval
                    Swal.fire({
                        title: 'Carregando dados!',
                        html: '', //I will close in <b></b> milliseconds.
                        timer: 15000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()

                            ajax(_BASE_URL + 'api/v1/rastreamento/getProdutosInserirLotes', 'POST', { id_liqui: id_liquidacao, pedido: id_pedido }, function (res) {
                                console.log(res)
                                $('#opcoes').html('');

                                Swal.close();

                                $('#example2').dataTable().fnDestroy();

                                $('#itens2').html('')
                                let finalizarLiquidacao = true;

                                res.forEach(linha => {
                                    console.log('1')

                                    let cor = "#f77a7a82"; //Vermelha
                                    if (parseInt(linha["FALTAM"]) <= 0 && parseInt(linha["QTD_INSERIDA"]) > 0) {
                                        cor = "#7af77f82";
                                    } else {
                                        finalizarLiquidacao = false
                                    }

                                    let faltam = 0
                                    if (parseInt(linha["FALTAM"]) == 0 && parseInt(linha["QTD_INSERIDA"]) == 0) {
                                        faltam = linha["QTD"]
                                    } else {
                                        faltam = parseInt(linha["FALTAM"])
                                    }

                                    let item = `<tr style='background-color:${cor}'>
                                                <td class='itens'>${linha["PROD_ID"]}</td>
                                                <td class='itens'>${linha["PROD_DESC"]}</td>
                                                <td class='itens'>${linha["QTD"]}</td>
                                                <td class='itens'>${linha["QTD_INSERIDA"]}</td>
                                                <td class='itens'>${faltam}</td>
                                          </tr> `

                                    $('#itens2').append(item)
                                });

                                let opc = `<button onclick="voltar()" class="btn btn-info">Voltar</button>`

                                if (finalizarLiquidacao) {
                                    // opc = `<button onclick="finalizarRastreio()" style="margin-right: 50px;" class="btn btn-success">Finalizar</button>` + opc
                                }

                                $('#opcoes').html(opc);

                                $('#example2').DataTable({
                                    "language":
                                    {
                                        "sProcessing": "A processar...",
                                        "sLengthMenu": "Mostrar _MENU_ registos",
                                        "sZeroRecords": "Não foram encontrados resultados",
                                        "sInfo": "",
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
                                    scrollY: "160px",
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
                                    // "info": false,
                                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
                                    "pageLength": 25,
                                });

                                window.setTimeout(function () {

                                    document.getElementById('txtEtiqueta').focus();
                                }, 100);

                                let table = document.getElementById("example2");
                                let rows = table.getElementsByTagName("tr");
                                for (i = 0; i < rows.length; i++) {
                                    let currentRow = table.rows[i];
                                    let createClickHandler = function (row) {
                                        return function () {
                                            let cell = row.getElementsByTagName("td")[0];
                                            let id = cell.innerHTML;
                                            viewEtiquetaProduto(id)
                                        };
                                    };
                                    currentRow.onclick = createClickHandler(currentRow);
                                }
                            })
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

                    // Swal.fire(`You selected: ${pedido}`)
                }
                viewEtiquetaProduto(0)
            } else {
                $('#txtEtiqueta').val('')
                $('#txtEstoque').val('')
                $('#txtQtd').val('')
                Swal.fire(
                    'Etiqueta!',
                    res.message,
                    'error'
                )
            }
        })
    }
}

function fecharMenu() {
    $('#menu.show').removeClass('show'); //Braboo
}
