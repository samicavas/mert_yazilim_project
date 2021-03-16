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
        "url": "https://northwind.now.sh/api/employess",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "text/plain"
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
        $.each(response, function (i) {
            var id_db = response[i].id;
            var titleOfCourtesy_db = response[i].titleOfCourtesy;
            var name_db = response[i].firstName;
            var lastname_db = response[i].lastName;
            var title_db = response[i].title;
            var gsm_db = response[i].address.phone;
            var markup =
                "<tr class=\"gradeAodd\" role=\"row\">" +
                "<td class=\"sorting_1\">" + id_db + "</td>" +
                "<td>" + titleOfCourtesy_db + "</td>" +
                "<td>" + name_db + "</td>" +
                "<td>" + lastname_db + "</td>" +
                "<td>" + title_db + "</td>" +
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
        var unvan = $('#input_Unvan').val();
        var ad = $('#input_Ad').val();
        var soyad = $('#input_Soyad').val();
        var gorev = $('#input_Gorev').val();
        var gsm = $('#input_Gsm').val();
        var settings = {
            "url": "https://northwind.now.sh/api/employess",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "token": "F1A86CC6549786284C25F4958AB8E4B1",
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({"lastName":soyad,"firstName":ad,"title":gorev,"titleOfCourtesy":unvan,"address":{"phone":gsm}}),
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
        var unvan = $('#input_Unvan').val();
        var ad = $('#input_Ad').val();
        var soyad = $('#input_Soyad').val();
        var gorev = $('#input_Gorev').val();
        var gsm = $('#input_Gsm').val();

        var settings = {
            "url": "https://northwind.now.sh/api/employess/"+id,
            "method": "PUT",
            "timeout": 0,
            "headers": {
              "token": "F1A86CC6549786284C25F4958AB8E4B1",
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "lastName":soyad,
                "firstName":ad,
                "title":gorev,
                "titleOfCourtesy":unvan,
                "address":{
                    "phone":gsm
                }}),
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
                "url": "https://northwind.now.sh/api/employess/" + id,
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Content-Type": "text/plain"
                },
            };

            $.ajax(getById).done(function (response) {
                console.log(response);

                var id_db = response.id;
                var unvan_db = response.titleOfCourtesy;
                var ad_db = response.firstName;
                var soyad_db = response.lastName;
                var gorev_db = response.title;
                var gsm_db = response.address.phone;

                $('#input_id').val(id_db);
                $('#input_Unvan').val(unvan_db);
                $('#input_Ad').val(ad_db);
                $('#input_Soyad').val(soyad_db);
                $('#input_Gorev').val(gorev_db);
                $('#input_Gsm').val(gsm_db);
            });
           
          
        },

        //delete
        deletes: function (id) {
            var settings = {
                "url": "https://northwind.now.sh/api/employess/"+id,
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
