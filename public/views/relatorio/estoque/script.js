//Date and time picker
var tempoAtualiza = 0;
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

let date = new Date();

let mes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getMonth() + 1;
mes.toString().padStart(2, "0");

let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
ultimoDia.toString().padStart(2, "0");

var anoAtual = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0
).getFullYear();

let startDateInicial = "01/" + mes + "/" + anoAtual;
let endDateFinal = ultimoDia + "/" + mes + "/" + anoAtual;

// setTimeout(() => {
$("#reservationtime").datetimepicker({
  // icons: {
  //   time: "far fa-clock",
  // },
  date: moment(new Date()).hours(0).minutes(0).seconds(0).milliseconds(0),
  locale: "pt-br",
  format: "L",
  inline: true,
});
// }, 5000);

// $(".datepicker").datepicker({
//   format: "mm/dd/yyyy",
//   startDate: "-3d",
// });

const table = new Table();

table.searching = true;
table.btn.refresh = true;
table.paging = false;
table.rowsGroup = [0, 1, 2, 3];

table.nameTable = "#example1";
table.check = false;
table.head = {
  COD: "Cod.",
  MARCA: "Marca",
  PRODUTO: "Produto",
  QUANTIDADE: "Estoque Fabrica",
  EMBALAGEM: "Embalagem",
  RESERVADO: "Lib Faturamento",
  GESTAO: "Gestão",
  CENTRO_SUL: "Centro Sul",
  "SALDO ESTOQUE": "Estoque Geral",
  "SALDO - CARTEIRA": "Geral - Carteira",
  CARTEIRA: "Carteria",
  PRODUZIR: "Produzir",
  "NECESSIDADE PROD": "Nesc. Prod.",
  FATURADO: "Faturado",
  ESTOQUE_SP: "Estoque SP",
  SUG15DIAS: "Sug. 15 Dias",
};
table.sum = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
table.width = {
  QUANTIDADE: "100px",
  RESERVADO: "110px",
  EMBALAGEM: "150px",
  PRODUTO: "280px",
  "NECESSIDADE PROD": "80px",
  ESTOQUE_SP: "70px",
  CARTEIRA: "60px",
  CENTRO_SUL: "80px",
  "SALDO ESTOQUE": "100px",
  "SALDO - CARTEIRA": "100px",
  SUG15DIAS: "100px",
};
table.hide = [
  //    'RESERVADO',
  // 'SUG15DIAS'
];
table.filtersDefault = [
  // 'AREA',
  // 'GERENTE',
  // 'REPRESENTANTE',
  // 'VENDEDOR',
  // 'VENDAS_GERAL',
  // 'DEVOLUCOES',
  // 'VLR_COMERCIAL',
  // 'VLR_ACORDO',
  // 'VLR_LIQUIDO',
  // 'DESC_BOLETO',
  // 'DEV_DESC_BOLETO',
  // 'VLR_FINANCEIRO',
  // 'A_FATURAR',
  // 'CARTEIRA',
];
table.case = {
  ativo: {
    true: "Sim",
    false: "Não",
  },
};

table.btn.update = false;
table.btn.create = false;
table.btn.delete = false;

table.btn.refreshFunction = () => {
  getAll();
};

getAll = () => {
  $("#loading").removeAttr("hidden");
  $("#message").text("Atualizando.. ");
  let url = "";
  const dataAtual = moment().format("DD/MM/YYYY");
  const dataFinal = $('input[name="dateFilter"]');
  const produto = $("#descriptionFilter")[0]?.value;
  let idProduto;
  if (produto) {
    idProduto = produto.split("-")[0].trim();
  }

  const dataFinal_ = moment(
    dataFinal.data("daterangepicker")?.endDate?._d
  ).format("DD/MM/YYYY");

  const dataFiltro = dataFinal_ ? dataFinal_ : dataAtual;

  url = `api/v1/estoque/getEstoqueProdutos?dataFinal=${dataFiltro}`;
  if (idProduto) {
    url += `&idProduto=${idProduto}`;
  }

  console.log("url", url);

  ajax(_BASE_URL + url, "GET", {}, function (res_) {
    table.data = res_;
    table.generate();

    console.log("res_", res_);
    if (res_?.length) {
      table.adicionaFilterElementOnDOM(dataFiltro);
      table.adicionaFilterProductElementOnDOM("");
    }

    // response(table.adicionaFilterElementOnDOM());
  });

  // return new Promise(async (res) =>
  //   ajax(_BASE_URL + url, "GET", {}, function (res_) {
  //     console.log(res_);
  //     table.data = res_;
  //     res(
  //       new Promise(async (response) =>
  //         setTimeout(() => {
  //           response(table.generate());
  //           table.adicionaFilterElementOnDOM(dataFiltro);
  //           // response(table.adicionaFilterElementOnDOM());
  //         }, 3000)
  //       )
  //     );
  //   })
  // );
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
(async () => {
  getAll();
  // table.adicionaFilterElementOnDOM();
  // alert();
  // table.adicionaFilterElementOnDOM();
  // setTimeout(() => {
  // }, 3000);
  // while (true) {
  //     await sleep(1000)
  //     try {
  //         if (tempoAtualiza >= 60) {
  //             tempoAtualiza = 0
  //             getAll()
  //         } else {
  //             tempoAtualiza++
  //         }
  //     } catch (error) { console.log('opção não encontrada') }
  // }
})();
