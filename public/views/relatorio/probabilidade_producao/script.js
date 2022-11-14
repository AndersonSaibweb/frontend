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
table.rowsGroup = [0, 1, 2, 3, 4, 5]

table.nameTable = '#example1'
table.check = false
table.head = {
    'COD_PROD': 'Cod.',
    'MARCA': 'Marca',
    'PRODUTO': 'Produto',
    'COD_INSUMO': 'Cod.',
    'INSUMO': 'Insumo',
    'QUANTIDADE': 'Estoque Fabrica',
    'EMBALAGEM': 'Embalagem',
    'GRUPO': 'Grupo',
    'SUB_GRUPO': 'Sub Grupo',
    'ESTOQUE_FABRICA': 'Est. Fabrica',
    'TERCEIROS': 'Terceiros',
    'RESERVA': 'Reserva',
    'COMPRAS': 'Compras',
    'CONVERSOR': 'Conversor',
    'QTD_POSSIVEL': 'Qtd. Possível',
    'UNIDADE': 'Und.',
    'CUSTO_ATUAL': 'Custo Atual',
    'CUSTO_UNITARIO': 'Custo Unitário',
    'ESTOQUE': 'Estoque',
    'UNIDADE_INSUMO': 'Und.'
}
table.sum = [
    // 5, 6, 7, 8, 9
]
table.width = {
    'QUANTIDADE': '100px',
    'QTD_POSSIVEL': '100px',
    'EMBALAGEM': '150px',
    'PRODUTO': '280px',
    'SUB_GRUPO': '280px',
    'CUSTO_UNITARIO': '100px',
    'INSUMO': '400px',

}
table.hide = [
    // 'MARCA',
    // 'EMBALAGEM',
    // 'UNIDADE',
    // 'SERIE',
    // 'GRUPO',
    // 'UNIDADE_1'
]
table.filtersDefault = [
    // 'PRODUTO',
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

    ajax(_BASE_URL + _EP_ESTOQUE_MP, 'GET', {}, function(res) {

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