
var Constants = {
    GetProducts : "https://localhost:44354/api/Products/GetProducts",
    GetProductsById : "https://localhost:44354/api/Products/GetProductsById?id={id}",
    UpdateProductsById : "https://localhost:44354/api/Products/UpdateProducts?id={id}",
    AddProducts : "https://localhost:44354/api/Products/AddProducts",
    DeleteProductsById : "https://localhost:44354/api/Products/DeleteProducts?id={id}",
}


//set fonksiyonu tekrarlanan kodları tutuyor.
function set(url, method, data, content) {

    var settings = {

        "url": url,
        "method": method,
        "timeout": 0,
        "headers": {
            "token": "F1A86CC6549786284C25F4958AB8E4B1",
            "Content-Type": content
        },
        "data": data,
    };

    $.ajax(settings).done(function (response) {

        console.log(response);

       
    });
}

function list() {
    $("#ids").css("display", "none");
    var settings = {
        "url": Constants.GetProducts,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        $.each(response, function (i) {
            var id_db = response[i].id;
            var name_db = response[i].name;
            var supplierId_db = response[i].supplierId;
            var categoryId_db = response[i].categoryId;
            var quantityPerUnit_db = response[i].quantityPerUnit;
            var unitPrice_db = response[i].unitPrice;
            var unitsInStock_db = response[i].unitsInStock;
            var markup =
                "<tr class=\"gradeAodd\" role=\"row\">" +
                "<td class=\"sorting_1\">" + id_db + "</td>" +
                "<td>" + name_db + "</td>" +
                "<td>" + supplierId_db + "</td>" +
                "<td>" + categoryId_db + "</td>" +
                "<td>" + quantityPerUnit_db + "</td>" +
                "<td>" + unitPrice_db + "</td>" +
                "<td>" + unitsInStock_db + "</td>" +
                " <td> <a data-toggle=\"modal\"  data-target=\".bd-example-modal-lg\" "+
                " class= \"btn btn-outline-warning\" onClick=\"$.uptdel.uptades(" + id_db + ")\" >Düzenle</a>" +
                " <a class=\"btn btn-outline-danger\"  onClick=\"$.uptdel.deletes(" + id_db + ")\">Sil</a></td>" +
                "</tr>";
            tableBody = $("table tbody");
            tableBody.append(markup);
            $('tr:even').css("background-color", "#F7F7F7");
        });
        $('#search').keyup(function () {
            // Search text
            var text = $(this).val();
            // Hide all content class element
            $('.gradeAodd').hide();
            // Search and show
            $('.gradeAodd:contains("' + text + '")').show();
        });
    });
}

function add() {
    $("#kaydet").click(function (e) {

        $("#ids").css("display", "none");
        var name = $('#input_Name').val();
        var supplierId = $('#input_SupplierId').val();
        var categoryId = $('#input_CategoryId').val();
        var quantityPerUnit = $('#input_QuantityPerUnit').val();
        var unitPrice = $('#input_UnitPrice').val();
        var unitsInStock = $('#input_UnitsInStock').val();
        var data = new Object();
        data.name=name;
        data.supplierId=supplierId;
        data.categoryId=categoryId;
        data.quantityPerUnit=quantityPerUnit;
        data.unitPrice=unitPrice;
        data.unitsInStock=unitsInStock;
        var settings = {
            "url": Constants.AddProducts,
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify(data),
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });

          swal("Başarıyla eklenmiştir.", "", "success").then(function () {
            location.reload();
        });

        // set('https://northwind.now.sh/api/employess', "POST",JSON.stringify({"lastName":"Dodsworths2","firstName":"Annes2","title":"Sales Representative","titleOfCourtesy":"Ms.","address":{"phone":"(71) 555-4444"}}),
        // "application/json;");
    });

}

function updDel() {
    $("#guncelle").click(function () {
        var id = $('#input_id').val();
        var name = $('#input_Name').val();
        var supplierId = $('#input_SupplierId').val();
        var categoryId = $('#input_CategoryId').val();
        var quantityPerUnit = $('#input_QuantityPerUnit').val();
        var unitPrice = $('#input_UnitPrice').val();
        var unitsInStock = $('#input_UnitsInStock').val();

        var settings = {
            "url": Constants.UpdateProductsById,
            "method": "PUT",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id":id,
                "name":name,
                "supplierId":supplierId,
                "categoryId":categoryId,
                "quantityPerUnit":quantityPerUnit,
                "unitPrice":unitPrice,
                "unitsInStock":unitsInStock
                }),
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });

        $("#kaydet").css("display", "block");
        $("#guncelle").css("display", "none");
        swal("Başarıyla güncellenmiştir.", "", "success").then(function () {
            location.reload();
        });

    });

    //update ve delete işlemeleri
    $.uptdel = {

        //update
        uptades: function (id) {


            $("#guncelle").css("display", "block");
            $("#kaydet").css("display", "none");
            $("#ids").css("display", "block");

            var getById = {
                "url": Constants.GetProductsById.replace("{id}",id),
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
            };

            $.ajax(getById).done(function (response) {
                console.log(response);

                var id_db = response.id;
                var name_db = response.name;
                var supplierId_db = response.supplierId;
                var categoryId_db = response.categoryId;
                var quantityPerUnit_db = response.quantityPerUnit;
                var unitPrice_db = response.unitPrice;
                var unitsInStock_db = response.unitsInStock;

                $('#input_id').val(id_db);
                $('#input_Name').val(name_db);
                $('#input_SupplierId').val(supplierId_db);
                $('#input_CategoryId').val(categoryId_db);
                $('#input_QuantityPerUnit').val(quantityPerUnit_db);
                $('#input_UnitPrice').val(unitPrice_db);
                $('#input_UnitsInStock').val(unitsInStock_db);
            });
           
          
        },

        //delete
        deletes: function (id) {
            var settings = {
                "url": Constants.DeleteProductsById.replace("{id}",id),
                "method": "DELETE",
                "timeout": 0,
                "headers": {
                  "token": "F1A86CC6549786284C25F4958AB8E4B1",
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify({}),
              };
              
              $.ajax(settings).done(function (response) {
                console.log(response);
              });

              swal("Başarıyla silinmiştir.", "", "success").then(function () {
                location.reload();
            });
     
        },
    };
}

function clear() {
    $("#sil").click(function () {

        $('#input_Name').val("");
        $('#input_SupplierId').val("");
        $('#input_CategoryId').val("");
        $('#input_QuantityPerUnit').val("");
        $('#input_UnitPrice').val("");
        $('#input_UnitsInStock').val("");
        $("#kaydet").css("display", "block");
        $("#ids").css("display", "none");
        $("#guncelle").css("display", "none");
    });
}

$(document).ready(function () {

    //listeleme
    list();
    //kaydetme
    add();
    //Güncelleme/silme
    updDel();
    //temizleme
    clear();

});
