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
table.rowsGroup = [0, 1, 7]

table.nameTable = '#example1'
table.check = false
table.head = {
    'COD_PROD': 'Cod.',
    'MARCA': 'Marca',
    'PRODUTO': 'Produto',
    'REF_CONTABIL': 'Ref. Contábil',
    'CONTA_CONTABIL': 'Conta Contabil',
    'NOME_CONTA': 'Nome Conta',
    'UND': 'Und',
    'GRUPO': 'Grupo',
    'SUB_GRUPO': 'Sub Grupo',
    'ESTOQUE_FABRICA': 'Est. Fabrica',
    'ESTOQUE_TERCEIRO': 'Terceiros',
    'ESTOQUE_CONTABIL': 'Geral',
    'COMPRAS': 'Compras',
    'CUSTO_ATUAL': 'Custo Atual',
    'CUSTO_UNITARIO': 'Custo Unit.',
    'RESERVA': 'Reserva',
    'ESTOQUE_VIRTUAL': 'Virtual'
}
table.sum = [
    9, 10, 11, 12, 13, 14, 15, 16
]
table.width = {
    'GRUPO': '200px',
    'REF_CONTABIL': '100px',
    'CONTA_CONTABIL': '100px',
    'NOME_CONTA': '350px',
    'PRODUTO': '300px',
    'SUB_GRUPO': '180px',
    'CUSTO_UNITARIO': '80px',
    'ESTOQUE_CONTABIL': '100PX',
    'ESTOQUE_VIRTUAL': '100PX',
    'INSUMO': '400px',
    'COMPRAS': '80px',
}
table.hide = [
    // 'REF_CONTABIL',
    // 'CONTA_CONTABIL',
    // 'NOME_CONTA',
    // 'NCM'
]
table.filtersDefault = [
    // 'GRUPO',
    'SUB_GRUPO',
    'COD_PROD',
    'PRODUTO',
    'UND',
    'ESTOQUE_FABRICA',
    // 'CUSTO_ATUAL',
    // 'CUSTO_UNITARIO',
    'ESTOQUE_TERCEIRO',
    'RESERVA',
    'COMPRAS',
    'ESTOQUE_CONTABIL',
    'ESTOQUE_VIRTUAL'
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

    ajax(_BASE_URL + 'api/v1/estoque/getKardexWeb', 'GET', {}, function (res) {

        console.log(res)
        table.data = res
        table.generate()

        let options = {
            timeZone: 'America/Sao_Paulo',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        let date = new Intl.DateTimeFormat([], options);
        console.log(date.format(new Date()));
        $('#message').text('Atualizado ' + date.format(new Date()))
        $('#loading').attr('hidden', 'true');
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
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