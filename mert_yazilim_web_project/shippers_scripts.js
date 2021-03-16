var Constants = {
    GetShippers : "https://localhost:44354/api/Shippers/GetShippers",
    GetShippersById : "https://localhost:44354/api/Shippers/GetShippersById?id={id}",
    UpdateShippersById : "https://localhost:44354/api/Shippers/UpdateShippers?id={id}",
    AddShippers : "https://localhost:44354/api/Shippers/AddShippers",
    DeleteShippersById : "https://localhost:44354/api/Shippers/DeleteShippers?id={id}",
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
        "url": Constants.GetShippers,
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
            var companyName_db = response[i].companyName;
            var gsm_db = response[i].phone;
            var markup =
                "<tr class=\"gradeAodd\" role=\"row\">" +
                "<td class=\"sorting_1\">" + id_db + "</td>" +
                "<td>" + companyName_db + "</td>" +
                "<td>" + gsm_db + "</td>" +
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
        var companyName = $('#input_Ad').val();
        var phone = $('#input_Gsm').val();
        var data = new Object();
        data.companyName = companyName;
        data.phone = phone;
        var settings = {
            "url": Constants.AddShippers,
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

    });

}

function updDel() {
    $("#guncelle").click(function () {
        var id = $('#input_id').val();
        var ad = $('#input_Ad').val();
        var gsm = $('#input_Gsm').val();

        var settings = {
            "url": Constants.UpdateShippersById,
            "method": "PUT",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id":id,
                "companyName":ad,
                "phone":gsm
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
                "url": Constants.GetShippersById.replace("{id}",id),
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
            };

            $.ajax(getById).done(function (response) {
                console.log(response);

                var id_db = response.id;
                var ad_db = response.companyName;
                var gsm_db = response.phone;

                $('#input_id').val(id_db);
                $('#input_Ad').val(ad_db);
                $('#input_Gsm').val(gsm_db);
            });
           
          
        },

        //delete
        deletes: function (id) {
            var settings = {
                "url": Constants.DeleteShippersById.replace("{id}",id),
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

        $('#input_Unvan').val("");
        $('#input_Ad').val("");
        $('#input_Soyad').val("");
        $('#input_Gorev').val("");
        $('#input_Gsm').val("");
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
