var idUser = 0
//Buscar todos os empresa
function getAllUsuario() {

    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + _EP_GET_ALL_USUARIO, 'GET', {}, function (res) {
            console.log(res)
            if (res.length) {

                $('#example1').dataTable().fnDestroy();

                $('#itens').children().remove();
                $('#itens').html('');

                res.forEach(element => {

                    let status = 'Ativo'
                    element.STATUS != 1 ? status = 'Inativo' : null

                    let nomeGrupo = element.ID_GRUPOUSUARIO == 0 ? 'Sem Grupo' : element.GRUS_NOME


                    item = `<tr>
                            <td>${element.ID}</td>
                            <td>${element.USUA_NOME}</td>
                            <td>${element.ID_GRUPOUSUARIO}</td>
                            <td>${nomeGrupo}</td>
                            <td style="width: 70px" class="project-actions text-right">
                                    <!-- <a onclick="viewGrupoUsuario(${element.ID})" class="btn btn-primary btn-sm" href="#">
                                        <i class="fas fa-folder">
                                        </i>
                                    </a> -->
                                    <a href="#" class="btn btn-info btn-sm" onclick="openModal2('${element.ID_GRUPOUSUARIO}',${element.ID},'${element.USUA_NOME}')" href="#">
                                        <i class="fas fa-pencil-alt">
                                        </i>
                                    </a>
                                    <!-- <a onclick="deleteGrupoUsuario(${element.ID})" class="btn btn-danger btn-sm" href="#">
                                        <i class="fas fa-trash">
                                        </i>
                                    </a> -->
                                </td>
                           </tr>`
                    $('#itens').append(item)
                });


                $("#example1").DataTable({
                    "responsive": true, "lengthChange": false, "autoWidth": false
                })
                $('#example2').DataTable({
                    "paging": true,
                    "lengthChange": false,
                    "searching": false,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false,
                    "responsive": true,
                });

            }

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
}

deleteGrupoUsuario = (id) => {

    Swal.fire({
        title: 'Tem certeza?',
        text: "Uma vez excluído, você não poderá recuperar este dado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            if (JSON.parse(localStorage.getItem('user')) != null) {
                ajax(_BASE_URL + _EP_GET_ID_GRUPOUSUARIO + id, 'DELETE', {}, function (res) {
                    getAllUsuario()
                    Swal.fire(
                        'Excluido!',
                        'Registro excluido com Sucesso.',
                        'success'
                    )
                }, JSON.parse(localStorage.getItem('user')).accessToken);
            }
        }
    })
}



function openModal2(seleciona, user, nomeUser) {
    idUser = user
    getGrupoUsuario(seleciona)
    getUserId(user)

    $('#titleModal2').html(nomeUser)
    $('#modal-default2').modal('show');
    // $('#modal-default2 .timeline').animate({ scrollTop: $('#modal-default2 .timeline').offset().top }, 'slow');
    // $('#modal-default2').scrollTop = $('#modal-default2').scrollHeight

}

function getGrupoUsuario(seleciona = 0) {
    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + _EP_GET_ALL_GRUPOUSUARIO, 'GET', {}, function (grus) {

            let optGrupoUsuario = document.getElementById('optGrupoUsuario')
            let optionsGrus = '<option selected value="0">--Selecione--</option>';
            for (let i in grus) {
                optionsGrus += `<option value="${grus[i].id}">${grus[i].GRUS_NOME}</option>`;
            }
            $('#optGrupoUsuario').children().remove();
            $('#optGrupoUsuario').append(optionsGrus);

            let arroptGrupoUsuario = optGrupoUsuario.options
            for (let i = 0; i < arroptGrupoUsuario.length; i++) {
                if (arroptGrupoUsuario[i].value == seleciona) {
                    optGrupoUsuario.selectedIndex = i
                }
            }

        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
    // } else {
    //     let optionsGrus = '<option selected value="">--Selecione--</option>';
    //     $('#optGrupoUsuario').children().remove();
    //     $('#optGrupoUsuario').append(optionsGrus);
    // }
}

function getUserId(userId) {
    console.log(userId)
    document.getElementById('txtSenhaAdm').value = ''

    ajax(_BASE_URL + 'api/v1/usuario/getUserId', 'POST', { id: userId }, function (res) {
        console.log(res)
        if(res.length){
            document.getElementById('txtSenhaAdm').value = res[0].SENHA_ADM
        }
    });
}

salvar = () => {

    let json = {}
    json['ID_GRUPOUSUARIO'] = document.getElementById('optGrupoUsuario').value
    json['SENHA_ADM'] = document.getElementById('txtSenhaAdm').value || '' 

    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + _EP_UPDATE_GRUS_USUARIO + idUser, 'PUT', json, function (res) {
            getAllUsuario()
            $('#modal-default2').modal('hide');
            document.getElementById('txtSenhaAdm').value = ''
            Swal.fire(
                'Alterado!',
                'Registro Alterado com Sucesso.',
                'success'
            )
        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }

}

var logoSemImagem = `data:image/png;base64,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`;

(async () => { getAllUsuario() })();

