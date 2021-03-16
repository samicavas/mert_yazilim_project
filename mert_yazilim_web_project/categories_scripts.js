
var Constants = {
    GetCategories : "https://localhost:44354/api/Categories/GetCategories",
    GetCategoriesById : "https://localhost:44354/api/Categories/GetCategoriesById?id={id}",
    UpdateCategoriesById : "https://localhost:44354/api/Categories/UpdateCategories?id={id}",
    AddCategories : "https://localhost:44354/api/Categories/AddCategories",
    DeleteCategoriesById : "https://localhost:44354/api/Categories/DeleteCategories?id={id}",
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
        "url": Constants.GetCategories,
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
            var description_db = response[i].description;
            var name_db = response[i].name;
           
            var markup =
                "<tr class=\"gradeAodd\" role=\"row\">" +
                "<td class=\"sorting_1\">" + id_db + "</td>" +
                "<td>" + description_db + "</td>" +
                "<td>" + name_db + "</td>" +
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
        var description = $('#input_Description').val();
        var name = $('#input_Ad').val();
        var data = new Object();
        data.description=description;
        data.name=name
        var settings = {
            "url": Constants.AddCategories,
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "description":description,
                "name":name
        }),
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
        var description = $('#input_Description').val();
        var ad = $('#input_Ad').val();
   

        var settings = {
            "url": Constants.UpdateCategoriesById,
            "method": "PUT",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id":id,
                "description":description,
                "name":ad,
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
                "url": Constants.GetCategoriesById.replace("{id}",id),
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
            };

            $.ajax(getById).done(function (response) {
                console.log(response);

                var id_db = response.id;
                var description_db = response.description;
                var ad_db = response.name;
                

                $('#input_id').val(id_db);
                $('#input_Description').val(description_db);
                $('#input_Ad').val(ad_db);
               
            });
           
          
        },

        //delete
        deletes: function (id) {
            var settings = {
                "url": Constants.DeleteCategoriesById.replace("{id}",id),
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

        $('#input_Description').val("");
        $('#input_Ad').val("");
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
