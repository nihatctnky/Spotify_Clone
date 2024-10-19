
import API from "./api.js";
import UI from "./ui.js";

// class örnegini al metodları görmek için
const api = new API();
const ui = new UI();


//  sayfanın yüklenme anı apı popüler müzikleri al

document.addEventListener("DOMContentLoaded", async () => {



    // Başlıgı güncelle

    // ekrana leodar at

    ui.renderLoader();


    // Api istegi at

    api.getPopular().then((data) => {
        ui.renderCards(data)
        console.log(data)
    })
        .catch((error) => {

            console.log(error);
            alert("Üzgünüz bir sorun oluştu")

        });

});
// formda bişey aratıldıgında apıdan aratılan kelimeyi uygun sonuçları al uygula
ui.form.addEventListener("submit", (e) => {
    // sayfa yenilemeyi engelle
    e.preventDefault();

    // Aratılan kelimye eriş
    const query = (e.target[0].value);

    // aratılan kelime boşsa fonksiyon durdur
    if (query.trim() === "") return alert("Lütfen geçerli bir metin aratın");

    //  Ekrana loader basama
    ui.renderLoader();

    // Başlıgı güncelle

    ui.updateTitle(query + " için sonuçlar");

    // apiden verileri
    api
        .searchMusic(query)
        .then((data) => ui.renderCards(data))
        .catch((err) => {
            console.log(err);
            alert("üzgünüz bir sorun oluştu");
        });
});

// Liste alanındaki tıklama olaylarını  izle ve eger oynat butonuna tıklanırsa o şarkıyı oynat
ui.list.addEventListener("click", (e) => {
    // Eger oynat butonuna tıklanırsa o şarkıyı oynat
    if (e.target.className === "play") {
        // Oynatılacak şarkıların kartına eriş
        const card = e.target.closest(".card");
        // Oynatılacak şarkının bilgilerini al
        const data = card.dataset;


        // Player alanını tekrar renderla
        ui.renderPlayer(data);

    }
});


