var zerarCarteira = false

function dataAnteriorFormatada(dt) {
    var data = new Date(dt),
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano = data.getFullYear();
    horas = data.getHours().toString().padStart(2, '0')
    minutos = data.getMinutes().toString().padStart(2, '0')
    segundos = data.getSeconds().toString().padStart(2, '0')
    return dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos;
}

//Date and time picker
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

let date = new Date();

let mes = new Date(date.getFullYear(), date.getMonth() + 1, 0).getMonth() + 1
mes = mes.toString().padStart(2, '0')

let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
ultimoDia.toString().padStart(2, '0')

var anoAtual = new Date(date.getFullYear(), date.getMonth() + 1, 0).getFullYear()

let startDateInicial = '01/' + mes + '/' + anoAtual
let endDateFinal = ultimoDia + '/' + mes + '/' + anoAtual

$('#reservationtime').daterangepicker({
    minDate: 0,
    // maxDate: '+1M',
    timePicker: false,
    timePickerIncrement: 30,
    startDate: startDateInicial,
    endDate: endDateFinal,
    locale: {
        format: 'DD/MM/YYYY'
    },
    "locale": {
        "format": "DD/MM/YYYY",
        "separator": " - ",
        "applyLabel": "Aplicar",
        "cancelLabel": "Cancelar",
        "daysOfWeek": [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sab"
        ],
        "monthNames": [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ],
        "firstDay": 1
    }
})

console.log($('#reservationtime').data('daterangepicker').startDate)
console.log($('#reservationtime').data('daterangepicker').endDate)

const table = new Table()

table.searching = true
table.paging = false
table.rowsGroup = [0, 1, 2, 3]

table.nameTable = '#example1'
table.check = false
table.head = {
    'AREA': 'Área',
    'GERENTE': 'Gerente',
    'REPRESENTANTE': 'Representante',
    'VENDEDOR': 'Vendedor',
    // 'CLIENTE': 'Cliente',
    // 'EMBALAGEM': 'Embalagem',
    // 'PRODUTO': 'Produto',
    'VENDAS_GERAL': 'Vendas Geral',
    'DEVOLUCOES': 'Devoluções',
    'VLR_COMERCIAL': 'Vlr. Comercial',
    'VLR_ACORDO': 'Vlr. Acordo',
    'VLR_LIQUIDO': 'Vlr. Liquido',
    'DESC_BOLETO': 'Desc. Boleto',
    'DEV_DESC_BOLETO': 'Devol. Desc. Boleto',
    'VLR_FINANCEIRO': 'Vlr. Financeiro',
    'A_FATURAR': 'Á Faturar',
    'CARTEIRA': 'Carteira'
}
table.sum = [
    4, 5, 6, 7, 8, 9, 10, 11, 12
]
table.width = {
    'ID': '1px',
    'GERENTE': '150px',
    'REPRESENTANTE': '250px',
    'VENDEDOR': '250px',
    'DEV_DESC_BOLETO': '110px'
}
table.hide = []

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
table.btn.refresh = true

table.btn.refreshFunction = () => {
    getAll()
}

$(document).on("click", ".applyBtn", function() {
    getAll()
});

getAll = () => {

    $('#loading').removeAttr('hidden');
    $('#message').text('Atualizando.. ')

    let dataInicial = dataAnteriorFormatada($('#reservationtime').data('daterangepicker').startDate._d).substr(0, 10)
    let dataFinal = dataAnteriorFormatada($('#reservationtime').data('daterangepicker').endDate._d).substr(0, 10)
    if(dataInicial.substr(3,2) != mes || dataFinal.substr(3,2) != mes){
        zerarCarteira = true
    }
    if(dataInicial.substr(6,4) != anoAtual || dataFinal.substr(6,4) != anoAtual){
        zerarCarteira = true
    }   
    if(dataFinal.substr(3,2) == mes && dataFinal.substr(6,4) == anoAtual) {
        zerarCarteira = false
    }
    

    let json = {}
    json['DT_INICIAL'] = dataInicial
    json['DT_FINAL'] = dataFinal

    ajax(_BASE_URL + 'api/v1/relatorio/get_view_analise_vendas', 'POST', json, function(res) {
        console.log(res)
        table.data = res
        table.generate()
    });
}


(async() => {
    getAll()
})();