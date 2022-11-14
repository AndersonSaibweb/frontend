var query = location.search.slice(1);
var partes = query.split('&');
var dadosUrl = {};
partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    dadosUrl[chave] = valor;
});

if (dadosUrl.id != undefined) {
    console.log(dadosUrl.id)
    // recuperarDados(dadosUrl.id)
    btnFinalizar.innerText = `Salvar Alteração`
    titulo.innerText = `Editando Grupo`
} else {
    btnFinalizar.innerText = `Salvar`
    titulo.innerText = `Novo Grupo`
}

var optStatus = document.getElementById('optStatus')
var txtNomeGrupo = document.getElementById('txtNomeGrupo')
var optEmpresa = document.getElementById('optEmpresa')
var optEmpresaGroup = document.getElementById('optEmpresaGroup')
var permissao = document.getElementById('permissao')

var camposForm = [
    'txtNomeGrupo'
]
function cancelarForm() {

    let msg = ''
    if (dadosUrl.id != undefined) {
        msg = 'a edição?'
    } else {
        msg = ' o cadastro?'
    }

    Swal.fire({
        title: 'Tem certeza?',
        text: "Deseja realmente cancelar " + msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            if (dadosUrl.id != undefined) {
                document.location.href = `index.html`
            } else {
                document.location.reload(true);
            }
        };
    })

}

function salvar() {
    if (validarCamposInputs(camposForm)) {
        createGrupoUsuario('')
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Preencha os dados obrigatórios!',
            text: ''
        })
    }
}

function createGrupoUsuario(base64String) {

    let permList = permissao.querySelectorAll('input')
    let permListText = ''
    permList.forEach((perm) => {
        permListText == '' ? permListText += perm.id + ':' + perm.checked : permListText += ';' + perm.id + ':' + perm.checked
    })

    let json = {}

    let ocor_tipo = 9999999
    if(document.getElementById('txtIdOcorrencia').value != ''){
        ocor_tipo = document.getElementById('txtIdOcorrencia').value
    }

    json['GRUS_NOME'] = txtNomeGrupo.value
    json['GRUS_PERMISSAO'] = permListText
    json['OCOR_ID'] = ocor_tipo
    
    json['STATUS'] = 1
    console.log(json)

    let endPoint = ''
    let reqType = ''
    if (dadosUrl.id != undefined) {
        endPoint = _EP_GET_ID_GRUPOUSUARIO + dadosUrl.id
        reqType = 'PUT'
    } else {
        endPoint = _EP_POST_GRUPOUSUARIO
        reqType = 'POST'
    }

    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + endPoint, reqType, json, function (res) {
            if (res.status == 200) {
                Swal.fire({
                    title: 'Grupo salvo!',
                    text: "",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (dadosUrl.id != undefined) {
                            document.location.href = `index.html`
                        } else {
                            document.location.reload(true);
                        }
                    }
                })
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

function validarCamposInputs(campos = []) {
    let retorno = true;

    camposObrigatorio = document.querySelectorAll("[required]")
    camposObrigatorio.forEach((inp) => {
        inp.style = ''
        campos.forEach((camp) => {
            if (camp == inp.id && inp.value == '' && camp != 'optEmpresa') {
                console.log(camp + ` ----> ` + inp.value)
                inp.style = `border: 1px solid #ff0000;`
                retorno = false
            }

        })
    })
    return retorno
}

function recuperarDados(id) {
    //_EP_GET_ID_GRUPOUSUARIO
    if (JSON.parse(localStorage.getItem('user')) != null) {
        ajax(_BASE_URL + _EP_GET_ID_GRUPOUSUARIO + dadosUrl.id, 'GET', {}, function (grus) {
            if (grus) {
                console.log(grus)
                txtNomeGrupo.value = grus.GRUS_NOME
                document.getElementById('txtIdOcorrencia').value = grus.OCOR_ID
                try {
                    if (grus.GRUS_PERMISSAO.data.length > 0) {
                        var enc = new TextDecoder("utf-8");
                        var arr = new Uint8Array(grus.GRUS_PERMISSAO.data);
                        let perm = enc.decode(arr)
                        perm.split(`;`)
                        console.log(perm)
                        let listaPerm = perm.split(`;`)
                        let liberar = []
                        listaPerm.forEach((l) => {
                            listaIdBoolean = l.split(`:`)
                            try {
                                let check = false
                                listaIdBoolean[1] == `true` ? check = true : check = false
                                // document.getElementById(listaIdBoolean[0]).checked = check
                                check ? liberar.push(listaIdBoolean[0]) : null

                            } catch (error) {
                                console.log(error.message)
                            }
                        })
                        liberar.forEach(element => {
                            try {
                                document.getElementById(element).checked = true
                            } catch (error) {
                            }
                        });

                    }
                } catch (error) {
                    console.log(error.message)
                }

            }
        }, JSON.parse(localStorage.getItem('user')).accessToken);
    }
}

function deleteAnexoDb(id) {
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
            ajax(`/empresa/deleteLogo/${id}`, 'DELETE', {}, function (res) {
                if (res.status === true) {
                    document.getElementById('adicionar').removeAttribute("hidden");
                    document.getElementById(`anexo` + id).remove()
                    Swal.fire(
                        'Excluido!',
                        'Registro excluido com Sucesso.',
                        'success'
                    )
                }
            });
        }
    })
}

(async () => {
    if (dadosUrl.id != undefined) {
        recuperarDados(dadosUrl.id)
    } else {
    }
})();