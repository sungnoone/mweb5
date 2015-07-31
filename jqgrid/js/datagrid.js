/**
 * Created by hl on 2015/7/28.
 */

$(document).ready(function () {
    $("#jqGrid").jqGrid({
        //url: 'data1.json',
        url: 'http://192.168.1.229:8088/srv/get/all/',
        datatype: "json",
        colModel: [
            {
                label: "編號",
                name: 'id',
                width: 75
            },
            {
                label: "姓名",
                name: 'full_name',
                width: 140,
                editable: true // must set editable to true if you want to make the field editable
            },
            {
                label: "辦公室",
                name: 'branch',
                width: 100,
                editable: true
            },
            {
                label : "部門",
                name: 'department',
                width: 120,
                editable: true
            }
        ],
        sortname: 'id',
        loadonce : true,
        viewrecords: true,
        onSelectRow: editRow, // the javascript function to call on row click. will ues to to put the row in edit mode
        width: 780,
        height: 200,
        rowNum: 10,
        pager: "#jqGridPager",
        regional:"tw"
    });

    var lastSelection;

    var saveparameters = {
        "url":"clientArray",
        "aftersavefunc":function(response){
            var grid = $("#jqGrid");
            var row = grid.jqGrid("getRowData",response);
            for(var k in row){
                console.log(k+" : "+row[k]);
            }
            $.ajax({
                url:"http://192.168.1.229:8088/srv/auto/save/",
                data:row,
                method:"POST"
            })
        }
    }

    function editRow(id) {
        if (id && id !== lastSelection) {
            var grid = $("#jqGrid");
            grid.jqGrid('saveRow',lastSelection,saveparameters);
            //grid.jqGrid('restoreRow',lastSelection);
            grid.jqGrid('editRow',id, {keys: true} );
            lastSelection = id;
        }
    }

});