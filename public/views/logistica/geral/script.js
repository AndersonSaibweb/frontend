var obrigatorio = [];
var idLiquidacao = 0;
var idOcorrecia = 0;
var idColeta = 0;
function dataAnteriorFormatada(dt) {
  var data = new Date(dt),
    dia = data.getDate().toString().padStart(2, "0"),
    mes = (data.getMonth() + 1).toString().padStart(2, "0"), //+1 pois no getMonth Janeiro começa com zero.
    ano = data.getFullYear();
  horas = data.getHours().toString().padStart(2, "0");
  minutos = data.getMinutes().toString().padStart(2, "0");
  segundos = data.getSeconds().toString().padStart(2, "0");
  return (
    dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos
  );
}
var id_liquidacao = 0;
var copy_cli = 0;
var insert = false;
var selecionados = [];

$(document).on("destroy.dt", function (e, settings) {
  var api = new $.fn.dataTable.Api(settings);
  api.off("order.dt");
  api.off("preDraw.dt");
  api.off("column-visibility.dt");
  api.off("search.dt");
  api.off("page.dt");
  api.off("length.dt ");
  api.off(" xhr.dt ");
});

$(document).ready(function () {
  get_all();
});

function principal() {
  $("#gerar_pedido").html("");
  id_liquidacao = 0;
  document.getElementById("principal").removeAttribute("hidden");
  document.getElementById("secundario").hidden = true;
}

function habilitarOpcoesStatus() {
  $("#opcNoCliente").attr("hidden", false);
  $("#opcParado").attr("hidden", false);
  $("#opcEmTransito").attr("hidden", false);
  $("#opcOcorrencia").attr("hidden", false);
}

function openModalAlterarStatus(statusLiq) {
  $("#modal-default2").modal("show");

  document.getElementById("optStatus").value = "";
  document.getElementById("optOcorrencias").value = "";
  document.getElementById("txtNovaMensagem").value = "";
  $("#optOcorrenciasGroup").attr("hidden", true);

  switch (statusLiq) {
    case "EM TRANSITO":
      $("#opcEmTransito").attr("hidden", true);
      break;
    case "NO CLIENTE":
      $("#opcNoCliente").attr("hidden", true);
      $("#opcEmTransito").attr("hidden", true);
      break;
    case "PARADO":
      $("#opcNoCliente").attr("hidden", true);
      $("#opcParado").attr("hidden", true);
      $("#opcEmTransito").attr("hidden", true);
      break;
    case "OCORRENCIA":
      $("#opcOcorrencia").attr("hidden", true);
      break;
    default:
      break;
  }
}

function aoClicarCard(statusLiq, idLiquidacao_, idColeta_) {
  // console.log("liquidacao", liquidacao);
  idLiquidacao = idLiquidacao_;
  idColeta = idColeta_;
  const listaStatusSemClick = [
    "CARREGANDO",
    "FINALIZADO",
    // "OCORRENCIA",
    "FINALIZADO",
    "AGENDADO",
  ];
  const listaStatusModalLiberarPedido = ["AGUARDANDO AGENDA"];

  if (!statusLiq || listaStatusSemClick.includes(statusLiq)) {
    return;
  }

  if (listaStatusModalLiberarPedido.includes(statusLiq)) {
    openLiqui(idLiquidacao_);
    return;
  }

  openModalAlterarStatus(statusLiq);
}

function get_all() {
  $("#loading").removeAttr("hidden");
  $("#message").text("Atualizando.. ");
  let url = "api/v1/logistica_liquidacao/getLiquidacoes";
  const getFinalizados = $("#filtrarFinalizados")[0].checked;

  if (getFinalizados) {
    url += "?isFinalizados=true";
  }

  ajax(_BASE_URL + url, "GET", {}, function (res) {
    if (res.length) {
      document.getElementById("AGUARDANDO AGENDA").innerHTML = "";
      document.getElementById("AGENDADO").innerHTML = "";
      document.getElementById("CARREGANDO").innerHTML = "";
      document.getElementById("EM TRANSITO").innerHTML = "";
      document.getElementById("NO CLIENTE").innerHTML = "";
      document.getElementById("PARADO").innerHTML = "";
      document.getElementById("OCORRENCIA").innerHTML = "";
      document.getElementById("FINALIZADO").innerHTML = "";

      res.forEach((item) => {
        // if (item.STATUS === "AGENDADO") {
        //   return;
        // }
        if (!document.getElementById(item.LIQU_ID)) {
          document.getElementById(item.STATUS).innerHTML += `
                            <li class="drag-item" id="${item.LIQU_ID}"
                            ondblclick="aoClicarCard('${item.STATUS}', '${
            item.LIQU_ID
          }', '${item.COLETA}')">
                                <div style="padding: 5px 0px 0px 5px; color: rgb(61, 81, 129);">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h6 class="texto-item"><i class="nav-icon fas fa-indent"></i>
                                                    ${item.LIQU_ID}</h6>
                                            </div>
                                            <div class="col-md-12" style="padding-bottom: 5px;">
                                                <h6 class="texto-item"><i class="nav-icon fas fa-calendar"></i>
                                                    ${dataAnteriorFormatada(
                                                      item.DTA_COLETA
                                                    ).substring(0, 10)}</h6>
                                               
                                                    <h6 class="texto-item"><i class="fas fa-calendar-day"></i>
                                                    Dt. agen. 
                                                    ${dataAnteriorFormatada(
                                                      item.PEDL_DTA_AGEND_CLI
                                                    ).substring(0, 10)}
                                                </h6>

                                                <h6 class="texto-item"><i class="far fa-clock"></i>
                                                    Hr. agen. 
                                                    ${item.PEDL_HORA_AGEND_CLI}
                                                </h6>
                                            </div>
                                            <div class="col-md-12" id="CLI-${
                                              item.LIQU_ID
                                            }" style="padding-bottom: 5px;">
                                                
                                              </div>


                                              

                                              
                                        </div>
                                    </div>
                                </div>
                            </li>`;

          let cliente = item.CLIENTE;
          // if (item.CLIENTE.length >= 23) {
          //     cliente = cliente.substring(0, 23) + '...'
          // }

          document.getElementById(`CLI-${item.LIQU_ID}`).innerHTML += `
                            <h6 class="texto-item"><i class="nav-icon fas fa-user"></i>${cliente}</h6>
                        `;
        }
      });

      let options = {
        timeZone: "America/Sao_Paulo",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      let date = new Intl.DateTimeFormat([], options);
      $("#message").text("Atualizado " + date.format(new Date()));
      $("#loading").attr("hidden", "true");

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
  });
}

$.validator.setDefaults({
  submitHandler: function () {
    if (
      !document.getElementById("customRadio1").checked &&
      !document.getElementById("customRadio2").checked
    ) {
      alerta("Selecione o tipo de carga.");
      return;
    }

    if (!insert) {
      insert = true;
      let json = {};

      // json['FRETE'] = document.getElementById("optFrete").options[document.getElementById("optFrete").selectedIndex].innerText;

      let optTransportadoras = document.getElementById("optTransportadoras");
      let nomeTransportadora = "";
      optTransportadoras.options[optTransportadoras.selectedIndex].innerText
        .split("-")
        .forEach((item, i) => {
          if (i == 1) {
            nomeTransportadora += item;
          }
          if (i > 1) {
            nomeTransportadora += "-" + item;
          }
        });

      let linhaPedidos = document
        .getElementById("itens2")
        .querySelectorAll("tr");
      const pedidos = linhaPedidos[0];

      let pedidos_ = "";
      const idCliente = pedidos.querySelectorAll("td")[1].innerText;

      linhaPedidos.forEach((pedido, indexP) => {
        pedido.querySelectorAll("td").forEach((item, index) => {
          if (indexP > 0 && index === 0) {
            pedidos_ += ", " + item.innerText;
            return;
          }
          if (index === 0) {
            pedidos_ = item.innerText;
          }
        });
      });

      // check.length &&
      //   check.forEach((item) => {
      //     if (
      //       item.querySelector(".select-checkbox") != null &&
      //       item.querySelector(".select-checkbox") != undefined
      //     ) {
      //       console.log("item", item);
      //       //selecionados.push(item.cells[1].innerText)
      //       selecionados.push(item.cells);
      //     }
      //   });

      switch (document.getElementById("optFrete").value) {
        case "FOB":
          json["ID_TRANSPORTADORA"] =
            optTransportadoras.options[optTransportadoras.selectedIndex].value; //1;
          json["TRANSPORTADORA"] = nomeTransportadora; //selecionados[0][5].innerText
          break;

        case "CIF":
          json["ID_TRANSPORTADORA"] =
            optTransportadoras.options[optTransportadoras.selectedIndex].value;
          json["TRANSPORTADORA"] = nomeTransportadora;
          break;

        case "FOB-EDIT":
          json["ID_TRANSPORTADORA"] =
            optTransportadoras.options[optTransportadoras.selectedIndex].value;
          json["TRANSPORTADORA"] =
            document.getElementById("editTransportadora").value;
          break;

        default:
          break;
      }

      try {
        json["ID_LIQUIDACAO"] =
          document.getElementById("txtIdLiquidacao").innerText;
        json["ID_CIDADE_TRANSP"] =
          optCidade.options[optCidade.selectedIndex].value;
        json["CIDADE"] = optCidade.options[optCidade.selectedIndex].innerText;
        json["PLACA"] = document.getElementById("txtPlaca").value;
        json["MOTORISTA"] = document.getElementById("txtMotorista").value;
        json["CARGA_PALETIZADA"] =
          document.getElementById("customRadio1").checked;
        json["CARGA_FRACIONADA"] =
          document.getElementById("customRadio2").checked;
        json["CARGA_BATIDA"] = document.getElementById("customRadio3").checked;
        json["CARGA_OUTROS"] = document.getElementById("customRadio4").checked;
        json["STATUS"] = document.getElementById("statusAgendado").checked
          ? "AGENDADO"
          : "AGUARDANDO";
        json["GESTAO"] = document.getElementById("gestao").checked ? "S" : "N";
        json["OBS_NFE"] = document.getElementById("txtObs").value.toUpperCase();
        json["HORARIO_COLETA"] = $("#horarioColeta").find("input").val();
        json["HORARIO_ENTREGA"] = $("#horarioEntrega").find("input").val();
        json["FRETE"] = document.getElementById("optFrete").value;
        json["ID_CLIENTE"] = idCliente;
        json["VLR_FRETE"] = document.getElementById("txtVlrFrete").value;

        // let pedidos = selecionados[0][1].innerText;
        // selecionados.forEach((LIQU_ID) => {
        //   if (pedidos != LIQU_ID[1].innerText) {
        //     pedidos += "," + LIQU_ID[1].innerText;
        //   }
        // });

        json["PEDIDOS"] = pedidos_;
      } catch (error) {
        console.log("error", error);
      }

      console.log(json);

      Swal.fire({
        title: "Deseja confirmar coleta?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (JSON.parse(localStorage.getItem("user")) != null) {
            ajax(
              _BASE_URL + _EP_GERAR_COLETA,
              "POST",
              json,
              async function (res) {
                console.log(res);

                if (res.status == 200) {
                  // socket.emit("alteracaoControle", true);
                  get_all();
                  $("#modal-coleta").modal("hide");
                  Swal.fire({
                    icon: "success",
                    title:
                      res.message +
                      " " +
                      document.getElementById("txtIdLiquidacao").innerText,
                    text: "",
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: res.message,
                    text: "",
                  });
                }
                insert = false;
              },
              JSON.parse(localStorage.getItem("user")).accessToken
            );
          }
        } else {
          insert = false;
        }
      });
    }
  },
});

$("#quickForm").validate({
  rules: {
    txtPlaca: {
      required: true,
      maxlength: 10,
    },
    txtMotorista: {
      required: true,
    },
    txtVlrFrete: {
      required: true,
    },
  },
  messages: {
    txtPlaca: {
      required: "Insira placa",
      maxlength: "Max. 10 Caracteres",
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
  errorElement: "span",
  errorPlacement: function (error, element) {
    error.addClass("invalid-feedback");
    element.closest(".form-group").append(error);
  },
  highlight: function (element, errorClass, validClass) {
    $(element).addClass("is-invalid");
  },
  unhighlight: function (element, errorClass, validClass) {
    $(element).removeClass("is-invalid");
  },
});

function changeFunc() {
  let optOcorrencias = document.getElementById("optOcorrencias");
  idOcorrecia = optOcorrencias.options[optOcorrencias.selectedIndex].value;
}

getOcorrecias();

function getOcorrecias(seleciona = 0) {
  if (JSON.parse(localStorage.getItem("user")) != null) {
    ajax(
      _BASE_URL + _EP_GET_ALL_OCORRENCIAS,
      "GET",
      {},
      function (grus) {
        let optOcorrencias = document.getElementById("optOcorrencias");
        let optionsGrus = '<option selected value="0">--Selecione--</option>';
        for (let i in grus) {
          optionsGrus += `<option value="${grus[i].OCOR_ID}">${grus[i].OCOR_DESCRICAO}</option>`;
        }
        $("#optOcorrencias").children().remove();
        $("#optOcorrencias").append(optionsGrus);

        let arroptOcorrencias = optOcorrencias.options;
        for (let i = 0; i < arroptOcorrencias.length; i++) {
          if (arroptOcorrencias[i].value == seleciona) {
            optOcorrencias.selectedIndex = i;
          }
        }
      },
      JSON.parse(localStorage.getItem("user")).accessToken
    );
  }
  // } else {
  //     let optionsGrus = '<option selected value="">--Selecione--</option>';
  //     $('#optOcorrencias').children().remove();
  //     $('#optOcorrencias').append(optionsGrus);
  // }
}

const statusEnum = {
  AGENDADO: 0,
  CARREGANDO: 1,
  "EM TRANSITO": 2,
  "NO CLIENTE": 3,
  PARADO: 4,
  FINALIZADO: 5,
  OCORRENCIA: 6,
  "AGUARDANDO AGENDA": 9,
};

function validaCnpjCpf(val) {
  val = val.trim();
  val = val.replace(/([^\d])+/gim, "");

  if (val.length >= 11) {
    var cpf = val.trim();
    cpf = cpf.split("");

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
      for (var i = 0, p = 10; cpf.length - 2 > i; i++, p--) {
        v1 += cpf[i] * p;
      }

      v1 = (v1 * 10) % 11;

      if (v1 == 10) {
        v1 = 0;
      }

      if (v1 != cpf[9]) {
        // return false;
      } else {
        for (var i = 0, p = 11; cpf.length - 1 > i; i++, p--) {
          v2 += cpf[i] * p;
        }

        v2 = (v2 * 10) % 11;

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
    cnpj = cnpj.split("");

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

    for (var i = 0, p1 = 5, p2 = 13; cnpj.length - 2 > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v1 += cnpj[i] * p1;
      } else {
        v1 += cnpj[i] * p2;
      }
    }

    v1 = v1 % 11;

    if (v1 < 2) {
      v1 = 0;
    } else {
      v1 = 11 - v1;
    }

    if (v1 != cnpj[12]) {
      return false;
    }

    for (var i = 0, p1 = 6, p2 = 14; cnpj.length - 1 > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v2 += cnpj[i] * p1;
      } else {
        v2 += cnpj[i] * p2;
      }
    }

    v2 = v2 % 11;

    if (v2 < 2) {
      v2 = 0;
    } else {
      v2 = 11 - v2;
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

verify = () => {
  var x = document.getElementById("optStatus").value;
  if (x == "6") {
    try {
      document.getElementById("select2-optOcorrencias-container").innerText =
        "--Selecione--";
    } catch (e) {}
    try {
      document.getElementById("optOcorrencias").selectedIndex = 0;
    } catch (e) {}
    $("#optOcorrenciasGroup").removeAttr("hidden");
    $("#optOcorrencias").removeAttr("hidden");
    obrigatorio.push("optOcorrencias");
    let x = document.getElementById("btnRegistro").offsetTop;
    // $('#modal-default2 .modal-body').scrollTop(x - 30);
  } else {
    if (obrigatorio.includes("txtCpfMotorista")) {
      obrigatorio = ["optStatus", "txtCpfMotorista"];
    } else {
      obrigatorio = ["optStatus"];
    }

    $("#optOcorrenciasGroup").attr("hidden", "true");
    $("#optOcorrenciasGroup").attr("hidden", "true");
  }
};

function validarCamposInputs(campos = []) {
  let retorno = true;

  let camposObrigatorio = document.querySelectorAll("[required]");
  camposObrigatorio.forEach((inp) => {
    inp.style = "";
    campos.forEach((camp) => {
      if (camp == inp.id && inp.value == "") {
        inp.style = `border: 1px solid #ff0000;`;
        retorno = false;
      }
      if (camp == "optOcorrencias" && camp == inp.id && inp.value == "0") {
        let grpu = document.getElementById("optOcorrenciasGroup");
        let grpu2 = grpu.querySelector("span");
        // grpu2.style = `border: 1px solid #ff0000;`;
        retorno = false;
      }
    });
  });
  return retorno;
}

registrar = () => {
  console.log(obrigatorio);

  if (obrigatorio.includes("optOcorrencias") && !parseInt(idOcorrecia)) {
    alert("Selecione uma ocorrência");
    return;
  }

  aaaa = document.getElementById("optStatus").value;

  if (document.getElementById("optStatus").value == "") return;

  let json = {};
  json["idLiquidacao"] = idLiquidacao;
  json["idColeta"] = idColeta;
  json["status"] = document.getElementById("optStatus").value;
  json["obs"] = document.getElementById("txtNovaMensagem").value;
  json["idOcorrecia"] = idOcorrecia;
  console.log("json", json);
  if (JSON.parse(localStorage.getItem("user")) != null) {
    ajax(
      _BASE_URL + _EP_POST_CDTR_LOG_AGENDAMENTOS,
      "POST",
      json,
      function (res) {
        if (res.status == 200) {
          //atualizarTabela()
          obrigatorio = ["optStatus"];
          $("#modal-default2").modal("hide");
          // socket.emit("alteracaoControle", true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Falha a salvar!",
            text: "",
          });
        }
      },
      JSON.parse(localStorage.getItem("user")).accessToken
    );
  }
};

function onClickRegistrar() {
  const codStatus = document.getElementById("optStatus").value;
  const observacao = document.getElementById("txtNovaMensagem").value;
  if (!codStatus) {
    alert("Status obrigatório");
    return;
  }

  if (parseInt(codStatus) === statusEnum.OCORRENCIA || observacao) {
    registrar();
  }

  if (parseInt(codStatus) === statusEnum.OCORRENCIA && !parseInt(idOcorrecia)) {
    return;
  }
  atualizarStatusAgendamento(codStatus);

  $("#modal-default2").modal("hide");
}

function atualizarStatusAgendamento(status) {
  if (!status) {
    return;
  }

  const data = {
    status: status,
    liqu_id: idLiquidacao,
  };

  ajax(
    _BASE_URL + "api/v1/logistica_liquidacao/setStatus",
    "PUT",
    data,
    function (res) {
      get_all();
    },
    JSON.parse(localStorage.getItem("user")).accessToken
  );
}

function getTransportadoras(seleciona = 0) {
  if (JSON.parse(localStorage.getItem("user")) != null) {
    ajax(
      _BASE_URL + _EP_GET_TRANSPORTADORAS,
      "GET",
      {},
      function (grus) {
        try {
          let optTransportadoras =
            document.getElementById("optTransportadoras");
          let optionsGrus = ""; //'<option selected value="0">--Selecione--</option>';
          for (let i in grus) {
            optionsGrus += `<option value="${grus[i].FRO_ID}">${grus[i].FRO_ID}-${grus[i].FRO_DESC}</option>`;
          }
          $("#optTransportadoras").children().remove();
          $("#optTransportadoras").append(optionsGrus);

          let arroptTransportadoras = optTransportadoras.options;
          for (let i = 0; i < arroptTransportadoras.length; i++) {
            if (arroptTransportadoras[i].value == seleciona) {
              optTransportadoras.selectedIndex = i;
            }
          }
          changeFuncTransportadora();
        } catch (error) {}
      },
      JSON.parse(localStorage.getItem("user")).accessToken
    );
  }
}

function getCidades(seleciona = 0) {
  if (JSON.parse(localStorage.getItem("user")) != null) {
    ajax(
      _BASE_URL + _EP_GET_ALL_CIDADES,
      "GET",
      {},
      function (grus) {
        try {
          let optCidade = document.getElementById("optCidade");
          let optionsGrus = ""; //'<option selected value="0">--Selecione--</option>';
          for (let i in grus) {
            optionsGrus += `<option value="${grus[i].GEN_ID}">${grus[i].GEN_DESCRICAO}</option>`;
          }
          $("#optCidade").children().remove();
          $("#optCidade").append(optionsGrus);

          let arroptCidade = optCidade.options;
          for (let i = 0; i < arroptCidade.length; i++) {
            if (arroptCidade[i].value == seleciona) {
              optCidade.selectedIndex = i;
            }
          }
          // changeFuncTransportadora()
        } catch (error) {}
      },
      JSON.parse(localStorage.getItem("user")).accessToken
    );
  }
}

function changeFuncTransportadora() {
  let optTransportadoras = document.getElementById("optTransportadoras");
  idTransportadora =
    optTransportadoras.options[optTransportadoras.selectedIndex].value;
  getCidadeTransportadora(idTransportadora);
  nomeTransportadora = "";
  optTransportadoras.options[optTransportadoras.selectedIndex].innerText
    .split("-")
    .forEach((item, i) => {
      if (i == 1) {
        nomeTransportadora += item;
      }
      if (i > 1) {
        nomeTransportadora += "-" + item;
      }
    });
}

async function getCidadeTransportadora(id_transportadora) {
  if (JSON.parse(localStorage.getItem("user")) != null) {
    let json = {};
    json["ID"] = id_transportadora;
    return await ajax(
      _BASE_URL + _EP_GET_CIDADE_TRANSPORTADORA,
      "POST",
      json,
      async function (grus) {
        let id = 1;
        if (grus) id = grus.GEN_ID;

        let optCidade = document.getElementById("optCidade");

        //document.getElementById('select2-optCidade-container').innerHTML = optCidade.options[id].innerText
        // optCidade.selectedIndex = id
        $("#optCidade").val(id).trigger("change");
      },
      JSON.parse(localStorage.getItem("user")).accessToken
    );
  }
}

async function getCidadeCliente(id_cliente) {
  if (JSON.parse(localStorage.getItem("user")) != null) {
    let json = {};
    json["ID"] = id_cliente;
    return await ajax(
      _BASE_URL + _EP_GET_CIDADE_CLIENTE,
      "POST",
      json,
      async function (grus) {
        let id = 1;
        if (grus) id = grus.CODIGO;

        let optCidade = document.getElementById("optCidade");

        //document.getElementById('select2-optCidade-container').innerHTML = optCidade.options[id].innerText
        // optCidade.selectedIndex = id
        $("#optCidade").val(id).trigger("change");
      },
      JSON.parse(localStorage.getItem("user")).accessToken
    );
  }
}

async function changeFrete() {
  getTransportadoras();
  let optFrete = document.getElementById("optFrete");
  let optCidade = document.getElementById("optCidade");
  let frete = optFrete.options[optFrete.selectedIndex].value;
  let optTransportadoras = document.getElementById("optTransportadoras");

  switch (frete) {
    case "FOB":
      optTransportadoras.options[optTransportadoras.selectedIndex].value = 1;
      document.getElementById(
        "select2-optTransportadoras-container"
      ).innerHTML = "O PRÓPRIO CLIENTE";
      //  document.getElementById('optTransportadoras').disabled = true
      // $("#optCidade").val(1).trigger('change');
      optCidade.disabled = false;
      $("#editTransportadora").attr("hidden", "true");
      //$('#optTransportadoras').removeAttr('hidden');
      // getCidadeCliente(copy_cli)

      break;
    case "CIF":
      $("#optTransportadoras").val(1).trigger("change");
      document.getElementById("optTransportadoras").disabled = false;
      getCidadeTransportadora(1);
      optCidade.disabled = true;
      $("#editTransportadora").attr("hidden", "true");

      break;

    default:
      break;
  }
}

function openLiqui(liq) {
  // $('#modal-coleta').modal('hide');
  $("#txtIdLiquidacao").text(liq);
  $("#modal-coleta").modal("show");

  document.getElementById("editTransportadora").value = "";
  $("#editTransportadora").attr("hidden", "true");

  let agrupamento = "";
  let optFrete = document.getElementById("optFrete");
  optFrete.selectedIndex = 0;
  document.getElementById("customRadio1").checked = false;
  document.getElementById("customRadio2").checked = false;
  document.getElementById("gestao").checked = false;
  document.getElementById("statusAgendado").checked = true;

  //Date and time picker
  $("#horarioColeta").datetimepicker({
    icons: {
      time: "far fa-clock",
    },
    date: moment(new Date()).hours(0).minutes(0).seconds(0).milliseconds(0),
    locale: "pt-br",
  });

  $("#horarioEntrega").datetimepicker({
    icons: {
      time: "far fa-clock",
    },
    date: moment(new Date()).hours(0).minutes(0).seconds(0).milliseconds(0),
    locale: "pt-br",
  });

  $("#txtPlaca").val("");
  $("#txtMotorista").val("");
  $("#txtObs").val("");

  // selecionados.reverse()

  if (JSON.parse(localStorage.getItem("user")) != null) {
    ajax(
      _BASE_URL + "api/v1/logistica_liquidacao/getPedidosByLiquidacao",
      "POST",
      { ID: liq },
      function (res) {
        console.log(res);

        if (res.length) {
          copy_cli = res[0].PEDF_CLI_ID;
          getCidadeCliente(copy_cli);
          $("#txtVlrFrete").val(res[0].FRETE.toFixed(2));
          $("#txtPlaca").val(res[0].LIQU_PLACA_TRANSP);
          $("#txtMotorista").val(res[0].PEDL_NOME_MOTORISTA);
          $("#example2").dataTable().fnDestroy();

          res[0].LIQU_GESTAO = "S"
            ? (document.getElementById("gestao").checked = true)
            : (document.getElementById("gestao").checked = false);

          if (res[0].LIQU_FRETE_C_F == "C") {
            document.getElementById("optFrete").value = "CIF";
          } else {
            document.getElementById("optFrete").value = "FOB";
          }

          if (res[0].PEDL_TIPO_CARGA == 1) {
            document.getElementById("customRadio1").checked = true;
          }

          if (res[0].PEDL_TIPO_CARGA == 3) {
            document.getElementById("customRadio2").checked = true;
          }

          // $('#itens').children().remove();
          $("#itens2").html("");

          res.forEach((element) => {
            item = `<tr>
                                    <td>${element.PEDIDO}</td>
                                    <td>${element.PEDF_CLI_ID}</td>
                                    <td>${element.CLIENTE}</td>
                                    <td>${element.UF}</td>
                                    <td>${element.CIDADE}</td>
                                </tr>`;
            $("#itens2").append(item);
          });

          var table2 = $("#example2").DataTable({
            responsive: false,
            lengthChange: true,
            autoWidth: false, //quebra tudo
            paging: false,
            searching: false,
            ordering: true,
            info: true,
            lengthMenu: [
              [10, 25, 50, 100, -1],
              [10, 25, 50, 100, "Todos"],
            ],
            pageLength: 50,
          }); //.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

          $("#example2").DataTable().draw();

          changeFrete();

          $("#modal-coleta").modal("show");

          if (JSON.parse(localStorage.getItem("user")) != null) {
            ajax(
              _BASE_URL + _EP_PEDIDOS_GET_LIQUIDACAO_ID,
              "GET",
              {},
              function (res) {
                console.log(res);
                try {
                  document.getElementById("txtIdLiquidacao").innerHTML = res;
                } catch (error) {
                  console.log(error.message);
                  document.getElementById("txtIdLiquidacao").innerHTML = 0;
                }
              },
              JSON.parse(localStorage.getItem("user")).accessToken
            );
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo deu errado",
            text: res.message,
          });
        }
      },
      JSON.parse(localStorage.getItem("user")).accessToken
    );
  }
}

function fecharMenu() {
  $("#menu.show").removeClass("show"); //Braboo
}

function reload() {
  location.reload();
}

(async () => {
  getTransportadoras();
  getCidades();
})();
