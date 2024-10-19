// Apı URL

// gönderilmesi gereken header'lar
const url = 'https://shazam.p.rapidapi.com/search?term=ceza&locale=tr&offset=0&limit=10';
const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "ce411ca7a4msh233f6bb3e85d082p1dcbe3jsn6b03f3dd1383",
        "x-rapidapi-host": "shazam.p.rapidapi.com",
    },
};

// fonksiyonların bir arada tutulması için class yapısını tercih edelim
export default class API {
    // popüler müzikleri getiricek
    async getPopular() {
        const data1 = await this.searchMusic("tarkan");
        const data2 = await this.searchMusic("ceza");
        const data3 = await this.searchMusic("Sagopa Kajmer");

        return [...data1, ...data2, ...data3];
    }

    // aratulan kelimeye uygun sonuçları getirecek
    async searchMusic(query) {
        // term parametresini dinamik olarak belirledik
        const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr`;

        // api isteğini at - gelen cevabı işle
        const res = await fetch(url, options);
        const data = await res.json();

        // veriyi formatladık
        const formatted = data.tracks.hits.map((item) => item.track);

        // fonksiyonun çağrdılığı yere veriyi döndürdük
        return formatted;

    }
}