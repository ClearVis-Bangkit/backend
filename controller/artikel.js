const cheerio = require("cheerio");
const axios = require("axios");

const getArticles = async() => {
    const keyword = encodeURI('retinoblastoma');
    const response = await axios.get(`https://news.google.com/search?for=${keyword}&hl=en-ID&gl=ID&ceid=ID%3Aen`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
         },
    })
    const htmlData = response.data;
    const $ = cheerio.load(htmlData);
    const articels = []

    $('article', htmlData).each(async(index, element) => {
        const oldUrl = $(element).children('.VDXfz').attr('href');
        const url = `https://news.google.com${oldUrl.replace('.', '')}`;
        const title = $(element).children('.ipQwMb').text();
        const postBy = $(element).children('.QmrVtf').children('.SVJrMe').children('.wEwyrc').text();
        const datePost = $(element).children('.QmrVtf').children('.SVJrMe').children('time').text();
        articels.push({
            url,
            title,
            postBy,
            datePost
        })
    });
    return articels;
}

const getArticlesHandler = async(req, res) => {
    const articles = await getArticles();
    res.send(articles);
} 

module.exports = {
    getArticlesHandler
}