# mert_yazilim_project
 
"MertYazilim" dosyası içinde .net ile hazılamış olduğum https://northwind.now.sh adresindeki ilgili servislere istekler attığım Web API katmanı bulunmaktadır.

"mert_yazilim_web_project" dosyası içinde arayüzü html kodlarıyla tasarlayıp hazıladığım Web API'lere jquery ile istekler attığım proje bulunmaktadır.

"mert_yazilim_web_project" projesini açmadan önce "MertYazilim" projesini çalıştırmanız gerekmektedir.

"mert_yazilim.json"dosyasının içinde hazırladığım Web API'lerin daha rahat anlaşılması için yazdığım requestler bulunmaktadır.


# Örnekler

GET https://localhost:44354/api/Employess/GetEmployess Get all Employess
GET https://localhost:44354/api/Employess/GetEmployessById?id=1 Get a Employess by Id 1
POST https://localhost:44354/api/Employess/UpdateEmployess Adds a new Employess
PUT https://localhost:44354/api/Employess/UpdateEmployess Edit a Employess, send Id in header
DELETE https://localhost:44354/api/Employess/DeleteEmployess?id=1 Delete a Employess with Id 1
