var idPesquisa = ''
var descPesquisa = ''

pesquisa = (id, desc) => {
    idPesquisa = id
    descPesquisa = desc
}

selecionado = (id, desc) => {
    document.getElementById(idPesquisa).value = id
    document.getElementById(descPesquisa).value = desc
}

getDados = () => {

    ajax(_BASE_URL + 'api/v1/contabil/get', 'GET', {}, function (res) {
        console.log(res)
        if (res.status) {

            $('#PAC_PCTA_REF_DB').val(res.data.PAC_PCTA_REF_DB)
            $('#PAC_PCTA_REF_DB_DESC').val(res.data.PAC_PCTA_REF_DB_DESC)
            $('#PAC_HIST_GEN_ID_DB').val(res.data.PAC_HIST_GEN_ID_DB)
            $('#PAC_HIST_GEN_ID_DB_DESC').val(res.data.PAC_HIST_GEN_ID_DB_DESC)
            $('#PAC_GRUPO_GEN_ID_DB').val(res.data.PAC_GRUPO_GEN_ID_DB)
            $('#PAC_GRUPO_GEN_ID_DB_DESC').val(res.data.PAC_GRUPO_GEN_ID_DB_DESC)

            $('#PAC_PCTA_REF_CR').val(res.data.PAC_PCTA_REF_CR)
            $('#PAC_PCTA_REF_CR_DESC').val(res.data.PAC_PCTA_REF_CR_DESC)
            $('#PAC_HIST_GEN_ID_CR').val(res.data.PAC_HIST_GEN_ID_CR)
            $('#PAC_HIST_GEN_ID_CR_DESC').val(res.data.PAC_HIST_GEN_ID_CR_DESC)
            $('#PAC_GRUPO_GEN_ID_CR').val(res.data.PAC_GRUPO_GEN_ID_CR)
            $('#PAC_GRUPO_GEN_ID_CR_DESC').val(res.data.PAC_GRUPO_GEN_ID_CR_DESC)

            $('#PCO_PCTA_REF_DB').val(res.data.PCO_PCTA_REF_DB)
            $('#PCO_PCTA_REF_DB_DESC').val(res.data.PCO_PCTA_REF_DB_DESC)
            $('#PCO_HIST_GEN_ID_DB').val(res.data.PCO_HIST_GEN_ID_DB)
            $('#PCO_HIST_GEN_ID_DB_DESC').val(res.data.PCO_HIST_GEN_ID_DB_DESC)
            $('#PCO_GRUPO_GEN_ID_DB').val(res.data.PCO_GRUPO_GEN_ID_DB)
            $('#PCO_GRUPO_GEN_ID_DB_DESC').val(res.data.PCO_GRUPO_GEN_ID_DB_DESC)

            $('#PCO_PCTA_REF_CR').val(res.data.PCO_PCTA_REF_CR)
            $('#PCO_PCTA_REF_CR_DESC').val(res.data.PCO_PCTA_REF_CR_DESC)
            $('#PCO_HIST_GEN_ID_CR').val(res.data.PCO_HIST_GEN_ID_CR)
            $('#PCO_HIST_GEN_ID_CR_DESC').val(res.data.PCO_HIST_GEN_ID_CR_DESC)
            $('#PCO_GRUPO_GEN_ID_CR').val(res.data.PCO_GRUPO_GEN_ID_CR)
            $('#PCO_GRUPO_GEN_ID_CR_DESC').val(res.data.PCO_GRUPO_GEN_ID_CR_DESC)

            $('#PFR_PCTA_REF_DB').val(res.data.PFR_PCTA_REF_DB)
            $('#PFR_PCTA_REF_DB_DESC').val(res.data.PFR_PCTA_REF_DB_DESC)
            $('#PFR_HIST_GEN_ID_DB').val(res.data.PFR_HIST_GEN_ID_DB)
            $('#PFR_HIST_GEN_ID_DB_DESC').val(res.data.PFR_HIST_GEN_ID_DB_DESC)
            $('#PFR_GRUPO_GEN_ID_DB').val(res.data.PFR_GRUPO_GEN_ID_DB)
            $('#PFR_GRUPO_GEN_ID_DB_DESC').val(res.data.PFR_GRUPO_GEN_ID_DB_DESC)

            $('#PFR_PCTA_REF_CR').val(res.data.PFR_PCTA_REF_CR)
            $('#PFR_PCTA_REF_CR_DESC').val(res.data.PFR_PCTA_REF_CR_DESC)
            $('#PFR_HIST_GEN_ID_CR').val(res.data.PFR_HIST_GEN_ID_CR)
            $('#PFR_HIST_GEN_ID_CR_DESC').val(res.data.PFR_HIST_GEN_ID_CR_DESC)
            $('#PFR_GRUPO_GEN_ID_CR').val(res.data.PFR_GRUPO_GEN_ID_CR)
            $('#PFR_GRUPO_GEN_ID_CR_DESC').val(res.data.PFR_GRUPO_GEN_ID_CR_DESC)
        }
    })

}
update = () => {

    var json = {
        PAC_PCTA_REF_DB: $('#PAC_PCTA_REF_DB').val(),
        PAC_HIST_GEN_ID_DB: $('#PAC_HIST_GEN_ID_DB').val(),
        PAC_GRUPO_GEN_ID_DB: $('#PAC_GRUPO_GEN_ID_DB').val(),
        PAC_PCTA_REF_CR: $('#PAC_PCTA_REF_CR').val(),
        PAC_HIST_GEN_ID_CR: $('#PAC_HIST_GEN_ID_CR').val(),
        PAC_GRUPO_GEN_ID_CR: $('#PAC_GRUPO_GEN_ID_CR').val(),
        PCO_PCTA_REF_DB: $('#PCO_PCTA_REF_DB').val(),
        PCO_HIST_GEN_ID_DB: $('#PCO_HIST_GEN_ID_DB').val(),
        PCO_GRUPO_GEN_ID_DB: $('#PCO_GRUPO_GEN_ID_DB').val(),
        PCO_PCTA_REF_CR: $('#PCO_PCTA_REF_CR').val(),
        PCO_HIST_GEN_ID_CR: $('#PCO_HIST_GEN_ID_CR').val(),
        PCO_GRUPO_GEN_ID_CR: $('#PCO_GRUPO_GEN_ID_CR').val(),
        PFR_PCTA_REF_DB: $('#PFR_PCTA_REF_DB').val(),
        PFR_HIST_GEN_ID_DB: $('#PFR_HIST_GEN_ID_DB').val(),
        PFR_GRUPO_GEN_ID_DB: $('#PFR_GRUPO_GEN_ID_DB').val(),
        PFR_PCTA_REF_CR: $('#PFR_PCTA_REF_CR').val(),
        PFR_HIST_GEN_ID_CR: $('#PFR_HIST_GEN_ID_CR').val(),
        PFR_GRUPO_GEN_ID_CR: $('#PFR_GRUPO_GEN_ID_CR').val()
    }
    console.log(json)

    ajax(_BASE_URL + 'api/v1/contabil/update', 'POST', json, function (res) {
        console.log(res)
        if (!res.status) {
            Swal.fire({
                icon: 'erro',
                title: res.message,
                text: ''
            })
        } else {
            getDados()
            Swal.fire({
                icon: 'success',
                title: res.message,
                text: ''
            })
        }
    })
}

$(document).on('destroy.dt', function (e, settings) {
    var api = new $.fn.dataTable.Api(settings);
    api.off('order.dt');
    api.off('preDraw.dt');
    api.off('column-visibility.dt');
    api.off('search.dt');
    api.off('page.dt');
    api.off('length.dt ');
    api.off(' xhr.dt ');
});

fecharModal = (id) => {
    $('#' + id).modal('hide');
}



ajax(_BASE_URL + 'api/v1/contabil/plano_contas', 'GET', {}, function (res) {
    console.log(res)
    $('#tablePesquisa').dataTable().fnDestroy();
    $('#itens').html('');

    if (res.length) {

        !res.forEach(element => {
            item = `<tr ondblclick="selecionado('${element.PCTA_REF}','${element.PCTA_DESC}');fecharModal('modal-planoconta')">
                        <td>${element.PCTA_REF}</td>
                        <td>${element.PCTA_CONTA}</td>
                        <td>${element.PCTA_DESC}</td>
                    </tr>`

            $('#itens').append(item)
        });

        var table = $("#tablePesquisa").DataTable({
            "language": {
                "sProcessing": "A processar...",
                "sLengthMenu": "Mostrar _MENU_ registos",
                "sZeroRecords": "Não foram encontrados resultados",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                "sInfoPostFix": "",
                "sSearch": "Procurar",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext": "Seguinte",
                    "sLast": "Último"
                }
            },
            "responsive": false,
            "lengthChange": false,
            "autoWidth": false,
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": false,
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "Todos"]
            ],
            "pageLength": 10,
        }) //.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    }

    $('#tablePesquisa_filter').css('text-align', 'right');
})



ajax(_BASE_URL + 'api/v1/contabil/historicos', 'GET', {}, function (res) {
    console.log(res)
    $('#tableHistoricos').dataTable().fnDestroy();
    $('#itensHistoricos').html('');

    if (res.length) {

        !res.forEach(element => {
            item = `<tr ondblclick="selecionado('${element.GEN_ID}','${element.GEN_DESCRICAO}');fecharModal('modal-historicos')">
                        <td>${element.GEN_ID}</td>
                        <td>${element.GEN_DESCRICAO}</td>
                    </tr>`

            $('#itensHistoricos').append(item)
        });

        var table = $("#tableHistoricos").DataTable({
            "language": {
                "sProcessing": "A processar...",
                "sLengthMenu": "Mostrar _MENU_ registos",
                "sZeroRecords": "Não foram encontrados resultados",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                "sInfoPostFix": "",
                "sSearch": "Procurar",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext": "Seguinte",
                    "sLast": "Último"
                }
            },
            "responsive": false,
            "lengthChange": false,
            "autoWidth": false,
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": false,
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "Todos"]
            ],
            "pageLength": 10,
        }) //.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    }

    $('#tablePesquisa_filter').css('text-align', 'right');
})


ajax(_BASE_URL + 'api/v1/contabil/grupos', 'GET', {}, function (res) {
    console.log(res)
    $('#tableGrupos').dataTable().fnDestroy();
    $('#itensGrupos').html('');

    if (res.length) {

        !res.forEach(element => {
            item = `<tr ondblclick="selecionado('${element.GEN_ID}','${element.GEN_DESCRICAO}');fecharModal('modal-grupos')">
                        <td>${element.GEN_ID}</td>
                        <td>${element.GEN_DESCRICAO}</td>
                    </tr>`

            $('#itensGrupos').append(item)
        });

        var table = $("#tableGrupos").DataTable({
            "language": {
                "sProcessing": "A processar...",
                "sLengthMenu": "Mostrar _MENU_ registos",
                "sZeroRecords": "Não foram encontrados resultados",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registos",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registos",
                "sInfoFiltered": "(filtrado de _MAX_ registos no total)",
                "sInfoPostFix": "",
                "sSearch": "Procurar",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "Primeiro",
                    "sPrevious": "Anterior",
                    "sNext": "Seguinte",
                    "sLast": "Último"
                }
            },
            "responsive": false,
            "lengthChange": false,
            "autoWidth": false,
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": false,
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "Todos"]
            ],
            "pageLength": 10,
        }) //.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    }

    $('#tablePesquisa_filter').css('text-align', 'right');
})

getDados()