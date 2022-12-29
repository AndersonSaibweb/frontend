dragula([
  // document.getElementById('AGUARDANDO'),
  // document.getElementById('AGENDADO'),
  // document.getElementById('PROGRAMADA'),
  // document.getElementById('TRANSITO'),
  // document.getElementById('OCORRENCIA'),
  // document.getElementById('6')
])
  .on("drag", function (el) {
    // add 'is-moving' class to element being dragged
    // console.log('segura')
    el.classList.add("is-moving");
  })
  .on("dragend", function (el) {
    // console.log('solta')
    console.log(el.parentNode.getAttribute("id"));
    console.log(el.getAttribute("id"));
    ajax(
      _BASE_URL + "api/v1/logistica_liquidacao/setStatus",
      "PUT",
      {
        liqu_id: el.getAttribute("id"),
        status: el.parentNode.getAttribute("id"),
      },
      function (res) {
        console.log(res);
        if (res.status == 200) {
          get_all();
        }
      }
    );
    // remove 'is-moving' class from element after dragging has stopped
    el.classList.remove("is-moving");

    // add the 'is-moved' class for 600ms then remove it
    window.setTimeout(
      function () {
        el.classList.add("is-moved");

        window.setTimeout(
          function () {
            el.classList.remove("is-moved");
          },

          600
        );
      },

      100
    );
  });

$.validator.setDefaults({
  submitHandler: function () {
    alert("AMUAMUAMUAMAU");

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
      json["ID_CLIENTE"] = selecionados[0][4].innerText;
      json["VLR_FRETE"] = document.getElementById("txtVlrFrete").value;

      let pedidos = selecionados[0][1].innerText;
      selecionados.forEach((LIQU_ID) => {
        if (pedidos != LIQU_ID[1].innerText) {
          pedidos += "," + LIQU_ID[1].innerText;
        }
      });

      json["PEDIDOS"] = pedidos;

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
                  socket.emit("alteracaoControle", true);
                  getPedidosStatus();
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

var createOptions = (function () {
  var dragOptions = document.querySelectorAll(".drag-options");

  // these strings are used for the checkbox labels
  var options = ["algum filtro"];

  // create the checkbox and labels here, just to keep the html clean. append the <label> to '.drag-options'
  function create() {
    for (var i = 0; i < dragOptions.length; i++) {
      options.forEach(function (item) {
        var checkbox = document.createElement("input");
        var label = document.createElement("label");
        var span = document.createElement("span");
        checkbox.setAttribute("type", "checkbox");
        span.innerHTML = item;
        label.appendChild(span);
        label.insertBefore(checkbox, label.firstChild);
        label.classList.add("drag-options-label");
        dragOptions[i].appendChild(label);
      });
    }
  }

  return {
    create: create,
  };
})();

var showOptions = (function () {
  // the 3 dot icon
  var more = document.querySelectorAll(".drag-header-more");

  function show() {
    // show 'drag-options' div when the more icon is clicked
    var target = this.getAttribute("data-target");
    var options = document.getElementById(target);
    options.classList.toggle("active");
  }

  function init() {
    for (i = 0; i < more.length; i++) {
      more[i].addEventListener("click", show, false);
    }
  }

  return {
    init: init,
  };
})();

createOptions.create();
showOptions.init();
