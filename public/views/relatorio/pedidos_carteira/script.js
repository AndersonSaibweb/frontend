//Date and time picker
var tempoAtualiza = 0
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

const table = new Table()

table.searching = true
table.btn.refresh = true
table.paging = false
// table.rowsGroup = [0, 1, 2, 3]

table.nameTable = '#example1'
table.check = false
table.head = {
    'DATA': 'Data',
    'PEDIDO': 'Pedido',
    'OPERACAO': 'Operação',
    'UF': 'UF',
    'CIDADE': 'Cidade',
    'LIQUIDACAO': 'Carga',
    'AREA': 'Área',
    'GERENTE': 'Gerente',
    'REPRESENTANTE': 'Representante',
    'VENDEDOR': 'Vendedor',
    'COD_CLI': 'Cod.',
    'CLIENTE': 'Cliente',
    'VLR_NOTA': 'Valor',
   
}
table.sum = [
    4
]
table.width = {
    'DATA': '40px',
    'PEDIDO': '80px',
    'OPERACAO': '100px',
    'AREA': '100px',
    'REPRESENTANTE': '300px',
    'GERENTE': '150px',
    'VENDEDOR': '200px',
    'CLIENTE': '350px',
    'VLR_NOTA': '100px',
}
table.hide = [
    //    'RESERVADO'
]
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
]
table.case = {
    'ativo': {
        'true': 'Sim',
        'false': 'Não'
    }
}

table.btn.update = false
table.btn.create = false
table.btn.delete = false

table.btn.refreshFunction = () => {
    getAll()
}


getAll = () => {

    $('#loading').removeAttr('hidden');
    $('#message').text('Atualizando.. ')

    ajax(_BASE_URL + 'api/v1/pedidos/getPedidosCarteira', 'GET', {}, function(res) {
        console.log(res)
        table.data = res
        table.generate()
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async() => {
    getAll()
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