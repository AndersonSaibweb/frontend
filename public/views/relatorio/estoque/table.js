var word = null;
var apii = null;
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

$(document).ready(function () {});

class Table {
  constructor() {
    this.table = null;
    this.sum = [];
    this.filters = "#filtros";
    this.filtersDefault = [];
    this.data = [];
    this.alias = "fields";
    this.nameTable = "";
    this.width = {};
    this.head = {};
    this.hide = [];
    this.case = {};
    this.nameCheck = "check_box";
    this.check = false;
    this.checkMultiSelection = false;
    this.searching = true;
    this.paging = true;
    this.ordering = false;
    this.buttons = [];
    this.rowsGroup = [];
    this.id = "id";
    this.fields = {};
    this.columns = [];
    this.btn = {
      createName: "Create",
      create: false,
      createFunction: () => {},

      refresh: true,
      refreshName: "Refresh",
      refreshFunction: () => {},

      update: false,
      updateName: "Edit",
      updateFunction: () => {},

      delete: false,
      deleteName: "Delete",
      deleteFunction: () => {},
    };
    this.buttons = [];
    this.createButtons = true;
  }

  createFilters() {
    var _this = this;

    if (_this.columns) {
      let option = ``;
      let selectedValues = [];
      // console.log(_this.columns)
      // console.log(_this.filtersDefault)
      _this.columns.forEach((element) => {
        let hide = false;
        _this.hide.forEach((hidden) => {
          if (hidden == element.name) {
            hide = true;
          }
        });

        if (!hide) {
          option += `<option value="${element.column}">${element.label}</option>`;
        }

        if (_this.filtersDefault.includes(element.name)) {
          selectedValues.push(element.column);
          // selectedValues[element.column] = element.value
        }
      });

      let div = `
                    <div class="card-header">
                        <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                            <label>Filtros</label>
                            <div class="select2-purple">
                                <select class="select2 select2-hidden-accessible" multiple="" onchange="table.changeFilters()"
                                data-placeholder="--Selecione--" data-dropdown-css-class="select2-purple"
                                style="width: 100%;" data-select2-id="15" tabindex="-1" aria-hidden="true">
                                ${option}
                                </select>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>            
                `;
      $(_this.filters).html(div);
      $(".select2").select2();
      // console.log(selectedValues)
      $(".select2").val(selectedValues).change();
    }
  }

  changeFilters() {
    var _this = this;

    let options = document.getElementsByClassName(
      "select2 select2-hidden-accessible"
    )[0].options;

    let optionsArray = [];
    for (let a = 0; options.length > a; a++) {
      optionsArray.push(options[a].value);
    }

    let optionsSelected = document.getElementsByClassName(
      "select2 select2-hidden-accessible"
    )[0].selectedOptions;

    for (let a = 0; optionsSelected.length > a; a++) {
      optionsArray = optionsArray.filter((e) => e !== optionsSelected[a].value);
      let column2 = _this.table.column(optionsSelected[a].value);
      if (!column2.visible()) {
        column2.visible(true);
      }
    }

    optionsArray.forEach((element) => {
      let column2 = _this.table.column(element);
      if (column2.visible()) {
        column2.visible(false);
      }
    });
  }

  validate() {
    var _this = this;

    if (!_this.nameTable.length) {
      return {
        result: false,
        message: "nameTable must be specified",
      };
    }

    if (!_this.data.length) {
      return {
        result: false,
        message: "url_get_all must be specified",
      };
    }

    if (_this.btn.refresh && !_this.btn.refreshName.length) {
      return {
        result: false,
        message: "refreshName must be specified",
      };
    }

    if (_this.btn.create && !_this.btn.createName.length) {
      return {
        result: false,
        message: "createName must be specified",
      };
    }

    if (_this.btn.update && !_this.btn.updateName.length) {
      return {
        result: false,
        message: "updateName must be specified",
      };
    }

    if (_this.btn.delete && !_this.btn.deleteName.length) {
      return {
        result: false,
        message: "deleteName must be specified",
      };
    }

    if (_this.createButtons) {
      if (_this.btn.create) {
        _this.buttons.push({
          text: `<i class="fa fa-plus"></i> ${_this.btn.createName}`,
          className: _this.buttons.length
            ? "btn btn-success ml-2"
            : "btn btn-success",
          action: function (e, dt, node, config) {
            _this.btn.createFunction();
          },
        });
      }
      if (_this.btn.update) {
        _this.buttons.push({
          text: `<i class="fa fa-edit"></i> ${_this.btn.updateName}`,
          className: _this.buttons.length
            ? "btn btn-info ml-2"
            : "btn btn-info",
          action: function (e, dt, node, config) {
            _this.btn.updateFunction();
          },
        });
      }
      if (_this.btn.delete) {
        _this.buttons.push({
          text: `<i class="fa fa-trash"></i> ${_this.btn.deleteName}`,
          className: _this.buttons.length
            ? "btn btn-danger ml-2"
            : "btn btn-danger",
          action: function (e, dt, node, config) {
            _this.btn.deleteFunction();
          },
        });
      }
      if (_this.btn.refresh) {
        _this.buttons.push({
          text: `<i class="fa fa-refresh"></i> ${_this.btn.refreshName}`,
          className: _this.buttons.length ? " ml-2" : "",
          action: function (e, dt, node, config) {
            _this.btn.refreshFunction();
          },
        });
      }
      // _this.buttons.push({ extend: 'colvis', text: 'Colunas' })
      _this.buttons.push({
        extend: "excel",
        text: "Excel",
        exportOptions: {
          columns: ":visible",
        },
      });
      _this.createButtons = false;
    }

    return {
      result: true,
      message: "successfully validated",
    };
  }

  getSelected() {
    let selecionados = [];
    let check = document.getElementById("itens").querySelectorAll(".selected");

    check.forEach((item) => {
      if (
        item.querySelector(".select-checkbox") != null &&
        item.querySelector(".select-checkbox") != undefined
      ) {
        //selecionados.push(item.cells[1].innerText)
        selecionados.push(item.cells);
      }
    });
    return selecionados;
  }

  adicionaFilterElementOnDOM(data) {
    console.log("data", data);
    const containerInputDate = `
    <div id="container-dateFilter" class="col-md-3" >
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text"><i class="far fa-clock"></i></span>
        </div>
        <input class="form-control  form-control-sm" value=${data} type="text" id="dateFilter" name="dateFilter" />
        <!-- <input type="text" value={${data}} class="form-control float-right" id="reservationtime"> --->
      </div>
    </div>
  </div>
    `;

    // const inputDate = $("#dateFilter").clone(true);
    // $(inputDate[0]).attr("hidden", false);
    $("#example1_filter label:eq(0)").before(
      `
      <label>Data final:</label>
      ${containerInputDate}
      `
    );

    $("#example1_filter").css({
      display: "flex",
      "justify-content": "flex-end",
    });

    // console.log($('input[name="dateFilter"]')[0].value);

    $(function () {
      $('input[name="dateFilter"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
          format: "DD/MM/YYYY",
          separator: " - ",
          applyLabel: "Aplicar",
          cancelLabel: "Cancelar",
          fromLabel: "De",
          data: "22/11/2000",
          toLabel: "Até",
          customRangeLabel: "Custom",
          daysOfWeek: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          monthNames: [
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
            "Dezembro",
          ],
        },
        firstDay: 0,
      });
    });
  }

  generate() {
    var _this = this;
    let { result, message } = _this.validate();
    if (!result) return alert(message);

    try {
      _this.columns = [];
      let columns = [];
      let data = [];
      if (_this.data.length) {
        if (_this.check) {
          let columnNames2 = Object.keys(_this.data[0]);
          _this.data.forEach((element) => {
            let jsonArray = {};
            jsonArray[_this.nameCheck] = "";

            for (let i in columnNames2) {
              jsonArray[columnNames2[i]] = element[columnNames2[i]];
            }
            data.push(jsonArray);
          });
        } else {
          data = _this.data;
        }

        let columnNames = Object.keys(data[0]);
        for (let i in columnNames) {
          $("#head").append("<th></th>");
          $("#foot").append("<th></th>");
          let title = columnNames[i];
          let width = "";

          let visible = true;
          _this.hide.forEach((hidden) => {
            if (hidden == title) {
              visible = false;
            }
          });

          let keysName = Object.keys(_this.width);
          keysName.forEach((nameAlter) => {
            switch (title) {
              case nameAlter:
                width = _this.width[nameAlter];
                break;
              default:
                break;
            }
          });

          keysName = Object.keys(_this.head);
          keysName.forEach((nameAlter) => {
            switch (title) {
              case nameAlter:
                title = _this.head[nameAlter];
                break;
              default:
                break;
            }
          });

          if (title != _this.nameCheck) {
            columns.push({
              width: width,
              data: columnNames[i],
              title: title,
              visible: visible,
            });
            _this.columns.push({
              label: title,
              name: columnNames[i],
              column: i,
            });
          } else {
            columns.push({
              width: "5%",
              orderable: false,
              className: "select-checkbox",
              data: _this.nameCheck,
            });
          }
          console.log(columns);
        }

        $(_this.nameTable).dataTable().fnDestroy();

        try {
          var table = $(_this.nameTable).DataTable({
            data: data,
            columns: columns,
            select: {
              style: _this.checkMultiSelection ? "os" : "single",
              selector: "td:first-child",
            },
            rowsGroup: _this.rowsGroup.length > 0 ? _this.rowsGroup : null,

            footerCallback: function (row, data, start, end, display) {
              // var api = this.api(), data;
              var api = $(_this.nameTable).dataTable().api();

              var intVal = function (i) {
                return typeof i === "string"
                  ? i.replace(/[\$,]/g, "") * 1
                  : typeof i === "number"
                  ? i
                  : 0;
              };

              $(api.column(0).footer()).html("Total");

              _this.sum.forEach((position) => {
                $(api.column(position).footer()).html(
                  api
                    .column(position)
                    .data()
                    .reduce(function (a, b) {
                      return intVal(a) + intVal(b);
                    }, 0)
                    .toLocaleString()
                ); //.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
                $(api.column(position).footer()).css("text-align", "right");
              });
            },
            rowGroup: {
              startRender: null,
              endRender: function (rows, group) {
                console.log(group);
                // converting to interger to find total
                var intVal = function (i) {
                  return typeof i === "string"
                    ? i.replace(/[\$,]/g, "") * 1
                    : typeof i === "number"
                    ? i
                    : 0;
                };

                word = rows;
                console.log(rows);

                var api = $(_this.nameTable).dataTable().api();
                var rowss = api.rows({ page: "all" }).nodes();

                // var salaryAvg = rows
                //     .data()
                //     .pluck('DEVOLUCOES')
                //     .reduce(function (a, b) {
                //         return intVal(a) + intVal(b)
                //     }, 0);

                let total_2 = [];
                api
                  .column(0, { page: "all" })
                  .data()
                  .each(function (group, i) {
                    _this.sum.forEach((s) => {
                      let group_assoc = group.replace(" ", "_");
                      group_assoc = group_assoc + "_" + s;
                      // console.log(group_assoc);
                      if (typeof total_2[group_assoc] != "undefined") {
                        total_2[group_assoc] =
                          total_2[group_assoc] +
                          intVal(api.column(s).data()[i]);
                      } else {
                        total_2[group_assoc] = intVal(api.column(s).data()[i]);
                      }
                    });
                  });

                // var salaryAvg = rowss
                //     .data()
                //     .pluck('DEVOLUCOES')
                //     .reduce(function (a, b) {
                //         return intVal(a) + intVal(b)
                //     }, 0);

                // salaryAvg = $.fn.dataTable.render.number(',', '.', 0, '$').display(salaryAvg);

                // var ageAvg = rows
                //     .data()
                //     .pluck(3)
                //     .reduce(function (a, b) {
                //         return a + b * 1;
                //     }, 0) / rows.count();

                // let line = '<td>' + group + '</td>'
                let line = "<td></td>";
                line += "<td></td>";
                line += "<td></td>";
                line += "<td></td>";
                _this.sum.forEach((s) => {
                  let group_assoc2 = group.replace(" ", "_");
                  group_assoc2 = group_assoc2 + "_" + s;
                  line +=
                    "<td>" + total_2[group_assoc2].toLocaleString() + "</td>"; //.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                });

                return $(
                  '<tr style="text-align:right; font-weight: bold;" />'
                ).append(line);
              },
              dataSrc: ["MARCA"],
            },

            // "drawCallback": function (settings) {
            //     // var api = this.api();
            //     var api = $(_this.nameTable).dataTable().api();
            //     apii = $(_this.nameTable).dataTable().api();
            //     var rows = api.rows({ page: 'all' }).nodes();
            //     var last = null;

            //     // Remove the formatting to get integer data for summation
            //     var intVal = function (i) {
            //         return typeof i === 'string' ?
            //             i.replace(/[\$,]/g, '') * 1 :
            //             typeof i === 'number' ?
            //                 i : 0;
            //     };

            //     let total_2 = []
            //     api.column(0, { page: 'all' }).data().each(function (group, i) {
            //         let group_assoc = group.replace(' ', "_");
            //         // console.log(group_assoc);
            //         if (typeof total_2[group_assoc] != 'undefined') {
            //             total_2[group_assoc] = total_2[group_assoc] + intVal(api.column(8).data()[i]);
            //         } else {
            //             total_2[group_assoc] = intVal(api.column(8).data()[i]);
            //         }
            //         if (last !== group) {
            //             $(rows).eq(i).before(
            //                 // '<tr class="group"><td colspan="1">' + group + '</td><td class="' + group_assoc + '"></td></tr>'
            //                 `<tr class="group">
            //                 <td colspan="1">${group}</td>
            //                 <td colspan="1"></td>
            //                 <td colspan="1"></td>
            //                 <td class="${group_assoc}"></td>
            //                 </tr>`
            //             );

            //             last = group;
            //         }
            //     });
            //     for (var key in total_2) {
            //         $("." + key).html("R$ " + total_2[key]);
            //     }
            //     // $(_this.nameTable).DataTable().draw();
            // },

            createdRow: function (row, data, dataIndex) {
              let indexRow = Object.keys(data);
              console.log(data);
              indexRow.forEach((item, index) => {
                if (
                  item != "EMBALAGEM" &&
                  item != "PRODUTO" &&
                  item != "MARCA"
                ) {
                  $("td", row).eq(index).css("text-align", "right");
                }

                if (
                  item == "QUANTIDADE" ||
                  item == "SALDO ESTOQUE" ||
                  item == "SALDO - CARTEIRA"
                ) {
                  if (parseFloat($("td", row).eq(index).html()) == 0) {
                    console.log("mudar cor");
                    $("td", row).eq(index).css("background-color", "#ffff00a3");
                    //     $('td', row).eq(index).html(_this.case[nameAlter][data[nameAlter]])
                  }
                  if (parseFloat($("td", row).eq(index).html()) < 0) {
                    console.log("mudar cor");
                    $("td", row).eq(index).css("background-color", "#ff6f6f8f");
                    //     $('td', row).eq(index).html(_this.case[nameAlter][data[nameAlter]])
                  }

                  if (parseFloat($("td", row).eq(index).html()) > 0) {
                    console.log("mudar cor");
                    $("td", row).eq(index).css("background-color", "#0fcd0f8a");
                    //     $('td', row).eq(index).html(_this.case[nameAlter][data[nameAlter]])
                  }
                }

                if (
                  item != "EMBALAGEM" &&
                  item != "PRODUTO" &&
                  item != "COD" &&
                  item != "MARCA"
                ) {
                  $("td", row)
                    .eq(index)
                    .html(
                      parseFloat($("td", row).eq(index).html()).toLocaleString()
                    );
                }
              });

              // _this.sum.forEach((col) => {
              //     let vlr = parseFloat($(`td:eq(${col})`, row).text())
              //     $(`td:eq(${col})`, row).text(vlr.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
              //     // console.log($(`td:eq(${col})`, row).text())
              // })
            },
            language: {
              sProcessing: "A processar...",
              sLengthMenu: "Mostrar _MENU_ registos",
              sZeroRecords: "Não foram encontrados resultados",
              sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registos",
              sInfoEmpty: "Mostrando de 0 até 0 de 0 registos",
              sInfoFiltered: "(filtrado de _MAX_ registos no total)",
              sInfoPostFix: "",
              sSearch: "Procurar:",
              sUrl: "",
              oPaginate: {
                sFirst: "Primeiro",
                sPrevious: "Anterior",
                sNext: "Seguinte",
                sLast: "Último",
              },
              buttons: {
                copyTitle: "Copiado para área de transferência",
                copyKeys:
                  "Pressione <i>ctrl</i> ou <i>\u2318</i> + <i>C</i> para copiar os dados da tabela para a área de transferência. <br><br>Para cancelar, clique nesta mensagem ou pressione Esc.",
                copySuccess: {
                  _: "%d linhas copiadas",
                  1: "1 linha copiada",
                },
              },
            },
            // fixedHeader: true,
            scrollY: "400px",
            scrollX: true,
            scrollCollapse: true,
            // fixedColumns: {
            //     left: 4,
            //     // right: 1
            // },
            responsive: false,
            // "lengthChange": true,
            // "autoWidth": false, //quebra tudo
            paging: _this.paging,
            searching: _this.searching,
            ordering: _this.ordering,
            // "info": true,
            lengthMenu: [
              [10, 25, 50, 100, -1],
              [10, 25, 50, 100, "Todos"],
            ],
            pageLength: 25,
            dom: "Bfrtip",
            buttons: _this.buttons,
          });

          $("#example1_wrapper").css("padding-top", "20px");

          // setTimeout(() => {
          console.log($("#example1_filter")[0].children[1]);
          console.log($("#example1_filter")[0].children);
          // }, 3000);
          // setTimeout(() => {
          // this.adicionaFilterElementOnDOM();
          // }, 5000);

          $(".dt-buttons").css("position", "absolute");

          _this.table = table;

          if (_this.check && _this.checkMultiSelection) {
            table
              .on("click", "th.select-checkbox", function () {
                if ($("th.select-checkbox").hasClass("selected")) {
                  table.rows().deselect();
                  $("th.select-checkbox").removeClass("selected");
                } else {
                  table.rows().select();
                  $("th.select-checkbox").addClass("selected");
                }
              })
              .on("select deselect", function () {
                if (
                  table
                    .rows({
                      selected: true,
                    })
                    .count() !== table.rows().count()
                ) {
                  $("th.select-checkbox").removeClass("selected");
                } else {
                  $("th.select-checkbox").addClass("selected");
                }
              });
          }

          if (_this.filtersDefault.length) {
            _this.createFilters();
          }
        } catch (err) {
          console.log(err.message);
        }

        let date = new Intl.DateTimeFormat([], _OPTIONS_DATE);

        $("#message").text("Atualizado " + date.format(new Date()));
        $("#periodo").removeAttr("hidden");
      } else {
        $(_this.nameTable).dataTable().fnDestroy();
        $("#itens").html("");
        $("#message").text("Nenhum resultado");
      }
      $("#loading").attr("hidden", "true");
    } catch (error) {
      return alert(error);
    }
  }

  fieldsCreated() {
    var _this = this;
    $("#" + _this.alias).html("");

    let keysFields = Object.keys(_this.fields);
    keysFields.forEach((key) => {
      let element = _this.fields[key];
      let createField = `
            <div ${element.hidden == true ? "hidden" : ""} class="${
        element.class != undefined ? element.class : ""
      }"><div class="form-group">
            <label for="${_this.alias + key}">${
        element.title != undefined ? element.title : ""
      }</label>
            `;

      switch (element.obj) {
        case "input":
          createField += `
                          <input id="${_this.alias + key}" ${
            element.disabled == true ? "disabled" : ""
          } name="${_this.alias + key}" required="" autocomplete="off" type="${
            element.type != undefined ? element.type : "text"
          }" class="form-control" placeholder="${
            element.placeholder != undefined ? element.placeholder : ""
          }">
                         </div>`;

          break;
        case "select":
          createField += `
                        <select id="${_this.alias + key}"
                        class="form-control ${
                          _this.alias + key
                        } select2-hidden-accessible" style="width: 100%;"
                        aria-hidden="true">
                        <option selected value="">--Selecione--</option>
                        `;
          let optSelect = Object.keys(element.options);
          optSelect.forEach((opt) => {
            createField += `<option value="${opt}">${element.options[opt]}</option>`;
          });

          createField += `</select>`;
          break;

        case "date":
          createField += `
                        <div class="input-group date" id="${
                          _this.alias + key
                        }" data-target-input="nearest">
                        <input type="text" class="form-control datetimepicker-input" data-target="#${
                          _this.alias + key
                        }">
                        <div class="input-group-append" data-target="#${
                          _this.alias + key
                        }" data-toggle="datetimepicker">
                            <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                        </div>
                        </div>                    
                    `;

        default:
          break;
      }

      createField += `</div></div>`;
      $("#" + _this.alias).append(createField);

      //Initialize
      if (element.obj == "select") {
        $("." + _this.alias + key).select2({
          theme: "bootstrap4",
        });
      }

      if (element.obj == "date") {
        $("#" + _this.alias + key).datetimepicker(element.config);
        // $('#' + _this.alias + key).datetimepicker({
        //     icons: {
        //         time: 'far fa-clock'
        //     },
        //     date: element.date !== undefined ? element.date : moment(new Date()).hours(0).minutes(0).seconds(0).milliseconds(0),
        //     locale: 'pt-br'
        // });
      }

      console.log(createField);
    });
  }
}

/*! RowsGroup for DataTables v2.0.0
 * 2015-2016 Alexey Shildyakov ashl1future@gmail.com
 * 2016 Tibor Wekerle
 */

/**
 * @summary     RowsGroup
 * @description Group rows by specified columns
 * @version     2.0.0
 * @file        dataTables.rowsGroup.js
 * @author      Alexey Shildyakov (ashl1future@gmail.com)
 * @contact     ashl1future@gmail.com
 * @copyright   Alexey Shildyakov
 *
 * License      MIT - http://datatables.net/license/mit
 *
 * This feature plug-in for DataTables automatically merges columns cells
 * based on it's values equality. It supports multi-column row grouping
 * in according to the requested order with dependency from each previous
 * requested columns. Now it supports ordering and searching.
 * Please see the example.html for details.
 *
 * Rows grouping in DataTables can be enabled by using any one of the following
 * options:
 *
 * * Setting the `rowsGroup` parameter in the DataTables initialisation
 *   to array which containes columns selectors
 *   (https://datatables.net/reference/type/column-selector) used for grouping. i.e.
 *    rowsGroup = [1, 'columnName:name', ]
 * * Setting the `rowsGroup` parameter in the DataTables defaults
 *   (thus causing all tables to have this feature) - i.e.
 *   `$.fn.dataTable.defaults.RowsGroup = [0]`.
 * * Creating a new instance: `new $.fn.dataTable.RowsGroup( table, columnsForGrouping );`
 *   where `table` is a DataTable's API instance and `columnsForGrouping` is the array
 *   described above.
 *
 * For more detailed information please see:
 *
 */

(function ($) {
  ShowedDataSelectorModifier = {
    order: "current",
    page: "current",
    search: "applied",
  };

  GroupedColumnsOrderDir = "asc";

  /*
   * columnsForGrouping: array of DTAPI:cell-selector for columns for which rows grouping is applied
   */
  var RowsGroup = function (dt, columnsForGrouping) {
    this.table = dt.table();
    this.columnsForGrouping = columnsForGrouping;
    // set to True when new reorder is applied by RowsGroup to prevent order() looping
    this.orderOverrideNow = false;
    this.mergeCellsNeeded = false; // merge after init
    this.order = [];

    var self = this;
    dt.on("order.dt", function (e, settings) {
      if (!self.orderOverrideNow) {
        self.orderOverrideNow = true;
        self._updateOrderAndDraw();
      } else {
        self.orderOverrideNow = false;
      }
    });

    dt.on("preDraw.dt", function (e, settings) {
      if (self.mergeCellsNeeded) {
        self.mergeCellsNeeded = false;
        self._mergeCells();
      }
    });

    dt.on("column-visibility.dt", function (e, settings) {
      self.mergeCellsNeeded = true;
    });

    dt.on("search.dt", function (e, settings) {
      // This might to increase the time to redraw while searching on tables
      //   with huge shown columns
      self.mergeCellsNeeded = true;
    });

    dt.on("page.dt", function (e, settings) {
      self.mergeCellsNeeded = true;
    });

    dt.on("length.dt", function (e, settings) {
      self.mergeCellsNeeded = true;
    });

    dt.on("xhr.dt", function (e, settings) {
      self.mergeCellsNeeded = true;
    });

    this._updateOrderAndDraw();

    /* Events sequence while Add row (also through Editor)
     * addRow() function
     *   draw() function
     *     preDraw() event
     *       mergeCells() - point 1
     *     Appended new row breaks visible elements because the mergeCells() on previous step doesn't apllied to already processing data
     *   order() event
     *     _updateOrderAndDraw()
     *       preDraw() event
     *         mergeCells()
     *       Appended new row now has properly visibility as on current level it has already applied changes from first mergeCells() call (point 1)
     *   draw() event
     */
  };

  RowsGroup.prototype = {
    setMergeCells: function () {
      this.mergeCellsNeeded = true;
    },

    mergeCells: function () {
      this.setMergeCells();
      this.table.draw();
    },

    _getOrderWithGroupColumns: function (order, groupedColumnsOrderDir) {
      if (groupedColumnsOrderDir === undefined)
        groupedColumnsOrderDir = GroupedColumnsOrderDir;

      var self = this;
      var groupedColumnsIndexes = this.columnsForGrouping.map(function (
        columnSelector
      ) {
        return self.table.column(columnSelector).index();
      });
      var groupedColumnsKnownOrder = order.filter(function (columnOrder) {
        return groupedColumnsIndexes.indexOf(columnOrder[0]) >= 0;
      });
      var nongroupedColumnsOrder = order.filter(function (columnOrder) {
        return groupedColumnsIndexes.indexOf(columnOrder[0]) < 0;
      });
      var groupedColumnsKnownOrderIndexes = groupedColumnsKnownOrder.map(
        function (columnOrder) {
          return columnOrder[0];
        }
      );
      var groupedColumnsOrder = groupedColumnsIndexes.map(function (iColumn) {
        var iInOrderIndexes = groupedColumnsKnownOrderIndexes.indexOf(iColumn);
        if (iInOrderIndexes >= 0)
          return [iColumn, groupedColumnsKnownOrder[iInOrderIndexes][1]];
        else return [iColumn, groupedColumnsOrderDir];
      });

      groupedColumnsOrder.push.apply(
        groupedColumnsOrder,
        nongroupedColumnsOrder
      );
      return groupedColumnsOrder;
    },

    // Workaround: the DT reset ordering to 'asc' from multi-ordering if user order on one column (without shift)
    //   but because we always has multi-ordering due to grouped rows this happens every time
    _getInjectedMonoSelectWorkaround: function (order) {
      if (order.length === 1) {
        // got mono order - workaround here
        var orderingColumn = order[0][0];
        var previousOrder = this.order.map(function (val) {
          return val[0];
        });
        var iColumn = previousOrder.indexOf(orderingColumn);
        if (iColumn >= 0) {
          // assume change the direction, because we already has that in previos order
          return [
            [orderingColumn, this._toogleDirection(this.order[iColumn][1])],
          ];
        } // else This is the new ordering column. Proceed as is.
      } // else got milti order - work normal
      return order;
    },

    _mergeCells: function () {
      var columnsIndexes = this.table
        .columns(this.columnsForGrouping, ShowedDataSelectorModifier)
        .indexes()
        .toArray();
      var showedRowsCount = this.table.rows(ShowedDataSelectorModifier)[0]
        .length;
      this._mergeColumn(0, showedRowsCount - 1, columnsIndexes);
    },

    // the index is relative to the showed data
    //    (selector-modifier = {order: 'current', page: 'current', search: 'applied'}) index
    _mergeColumn: function (iStartRow, iFinishRow, columnsIndexes) {
      var columnsIndexesCopy = columnsIndexes.slice();
      currentColumn = columnsIndexesCopy.shift();
      currentColumn = this.table.column(
        currentColumn,
        ShowedDataSelectorModifier
      );

      var columnNodes = currentColumn.nodes();
      var columnValues = currentColumn.data();

      var newSequenceRow = iStartRow,
        iRow;
      for (iRow = iStartRow + 1; iRow <= iFinishRow; ++iRow) {
        if (columnValues[iRow] === columnValues[newSequenceRow]) {
          $(columnNodes[iRow]).hide();
        } else {
          $(columnNodes[newSequenceRow]).show();
          $(columnNodes[newSequenceRow]).attr(
            "rowspan",
            iRow - 1 - newSequenceRow + 1
          );

          if (columnsIndexesCopy.length > 0)
            this._mergeColumn(newSequenceRow, iRow - 1, columnsIndexesCopy);

          newSequenceRow = iRow;
        }
      }
      $(columnNodes[newSequenceRow]).show();
      $(columnNodes[newSequenceRow]).attr(
        "rowspan",
        iRow - 1 - newSequenceRow + 1
      );
      if (columnsIndexesCopy.length > 0)
        this._mergeColumn(newSequenceRow, iRow - 1, columnsIndexesCopy);
    },

    _toogleDirection: function (dir) {
      return dir == "asc" ? "desc" : "asc";
    },

    _updateOrderAndDraw: function () {
      this.mergeCellsNeeded = true;

      var currentOrder = this.table.order();
      currentOrder = this._getInjectedMonoSelectWorkaround(currentOrder);
      this.order = this._getOrderWithGroupColumns(currentOrder);
      this.table.order($.extend(true, Array(), this.order));
      this.table.draw();
    },
  };

  $.fn.dataTable.RowsGroup = RowsGroup;
  $.fn.DataTable.RowsGroup = RowsGroup;

  // Automatic initialisation listener
  $(document).on("init.dt", function (e, settings) {
    if (e.namespace !== "dt") {
      return;
    }

    var api = new $.fn.dataTable.Api(settings);

    if (settings.oInit.rowsGroup || $.fn.dataTable.defaults.rowsGroup) {
      options = settings.oInit.rowsGroup
        ? settings.oInit.rowsGroup
        : $.fn.dataTable.defaults.rowsGroup;
      var rowsGroup = new RowsGroup(api, options);
      $.fn.dataTable.Api.register("rowsgroup.update()", function () {
        rowsGroup.mergeCells();
        return this;
      });
      $.fn.dataTable.Api.register("rowsgroup.updateNextDraw()", function () {
        rowsGroup.setMergeCells();
        return this;
      });
    }
  });
})(jQuery);

/*
 
TODO: Provide function which determines the all <tr>s and <td>s with "rowspan" html-attribute is parent (groupped) for the specified <tr> or <td>. To use in selections, editing or hover styles.
 
TODO: Feature
Use saved order direction for grouped columns
    Split the columns into grouped and ungrouped.
    
    user = grouped+ungrouped
    grouped = grouped
    saved = grouped+ungrouped
    
    For grouped uses following order: user -> saved (because 'saved' include 'grouped' after first initialisation). This should be done with saving order like for 'groupedColumns'
    For ungrouped: uses only 'user' input ordering
*/
