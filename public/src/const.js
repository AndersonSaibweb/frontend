_BASE_URL = 'http://webservice.grupomariza.com.br:8085/'
_EP_LOGIN = 'api/v1/auth/login'
_EP_PROFILE = 'api/v1/auth/profile'
_EP_ESTOQUE = 'api/v1/estoque/getEstoqueProdutos'
_EP_ESTOQUE_MP = 'api/v1/estoque/getEstoqueMateriaPrima'
_EP_RELATORIO_VENDAS_META = 'api/v1/relatorio/getVendasMeta'
_EP_RELATORIO_VENDAS_DETALHADA_COMPLETA = 'api/v1/relatorio/getVendaDetalhadaCompleta'
_EP_VALOR_META = 'api/v1/relatorio/getValorMeta'
_EP_GET_AGENDAMENTOS = 'api/v1/logistica/getAgendamentos'
_EP_GET_TRANSPORTADORAS = 'api/v1/logistica/getTransportadoras'
_EP_POST_CDTR_LOG_AGENDAMENTOS = 'api/v1/logistica/insertLogAgendamento'
_EP_GET_CDTR_LOG_AGENDAMENTOS = 'api/v1/logistica/getLogAgendamento'
_EP_ASSOCIAR_CARGA = 'api/v1/logistica/associarCarga'
_EP_INSERT_CHAMADO = 'api/v1/logistica/insertChamadoAgendamento'
_EP_UPDATE_CARGA = 'api/v1/logistica/updateCarga'
_EP_POST_GRUPOUSUARIO = 'api/v1/grupousuario/insert'
_EP_GET_ALL_USUARIO = 'api/v1/usuario/all'
_EP_UPDATE_GRUS_USUARIO = 'api/v1/usuario/'
_EP_GET_ALL_GRUPOUSUARIO = 'api/v1/grupousuario/all'
_EP_GET_ID_GRUPOUSUARIO = 'api/v1/grupousuario/'
_EP_GET_PERMISSOES = 'api/v1/permissoes/'
_EP_GET_ALL_OCORRENCIAS = 'api/v1/ocorrencias/all'
_EP_GET_ALL_NOTIFICACOES = 'api/v1/notificacoes/all'
_EP_LOGISTICA_GET_PEDIDOS_STATUS = 'api/v1/logistica/getPedidosStatus'
_EP_PEDIDOS_GET_LIQUIDACAO_ID = 'api/v1/pedidos/getNextLiquidacaoId'
_EP_PEDIDOS_GET_CIDADE_CLIENTE = 'api/v1/pedidos/getCidadeCliente'
_EP_GET_ALL_CIDADES = 'api/v1/pedidos/getAllCidades'
_EP_GET_CIDADE_TRANSPORTADORA = 'api/v1/pedidos/getCidateTransportadora'
_EP_GET_CIDADE_CLIENTE = 'api/v1/pedidos/getCidadeCliente'
_EP_GET_PEDIDOS_BY_AGRUMAMENTO = 'api/v1/pedidos/getPedidosByAgrupamento'
_EP_GERAR_COLETA = 'api/v1/pedidos/insertPedido'
_EP_RESTAURAR_LIQUIDACAO = 'api/v1/pedidos/getRestaurarLiquidacao'


var _OPTIONS_DATE = {
    timeZone: 'America/Sao_Paulo',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

function getDataFormatada(dt) {
    var data = new Date(dt),
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano = data.getFullYear();
    horas = data.getHours().toString().padStart(2, '0')
    minutos = data.getMinutes().toString().padStart(2, '0')
    segundos = data.getSeconds().toString().padStart(2, '0')
    return dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos + ":" + segundos;
}

function getDiffDates(date) {
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffTime + " milliseconds");
    // console.log(diffDays + " days");
    return diffDays
}

function formatNumber(value) {
    value = convertToFloatNumber(value);
    return value.formatMoney(2, ',', '.');
}

logout = () => {
    localStorage.setItem('user', null)
    $(location).attr('href', `/signin.html`);
}

ajax = (url, type, data, callback) => {

    let token = JSON.parse(localStorage.getItem('user')) != null ? JSON.parse(localStorage.getItem('user')).accessToken : '';

    $.ajax({
        type: type,
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        dataType: "json",
        success: function (res) {
            if (res.status) {
                $(".alert").fadeTo(2000, 500).slideUp(500, function () {
                    $(".alert").slideUp(500);
                    $(".alert").slideUp(0);
                });
            }
            callback(res);
        },
        error: function (request, status, errorThrown) {
            callback(request);
        }
    });
}
