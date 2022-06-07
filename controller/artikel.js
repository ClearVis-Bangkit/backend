const cheerio = require("cheerio");
const axios = require("axios");

const getArticles = async() => {
    return await axios.get(`https://www.bing.com/news/search?q=retinoblastoma&qft=sortbydate%3d%221%22&form=YFNR`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Mobile Safari/537.36",
         },
    })
    .then(async({data}) => {
        articles = []
        const $ = cheerio.load(data)
        $('div.newscard.vr', data).each((index, element) => {
            const url = $(element).children('.caption').children('.title.itemlink').attr('href') || '';
            const title = $(element).children('.caption').children('.title.itemlink').text() || '';
            const imgOld = $(element).children('.image').children('a').children('img').attr('src');
            let img = ''
            imgOld !== undefined ? img = 'https://www.bing.com'+imgOld : img = 'No Image'
            const postBy = $(element).children('.caption').children('.bottom').children('.source').children('a').text() || '';
            const postDate = $(element).children('.caption').children('.bottom').children('span.timestamp').text() || '';
            articles.push({
                url,
                title,
                img,
                postBy,
                postDate,
            })
        })
        if (articles.length < 10) {
            await axios.get('https://www.bing.com/news/search?q=Eye+cancer&form=YFNR', {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Mobile Safari/537.36",
                 },
            })
            .then(({data}) => {
                const $ = cheerio.load(data)
                $('div.newscard.vr', data).each((index, element) => {
                    const url = $(element).children('.caption').children('.title.itemlink').attr('href') || '';
                    const title = $(element).children('.caption').children('.title.itemlink').text() || '';
                    const imgOld = $(element).children('.image').children('a').children('img').attr('src');
                    let img = ''
                    imgOld !== undefined ? img = 'https://www.bing.com'+imgOld : img = 'No Image'
                    const postBy = $(element).children('.caption').children('.bottom').children('.source').children('a').text() || '';
                    const postDate = $(element).children('.caption').children('.bottom').children('span.timestamp').text() || '';
                    articles.push({
                        url,
                        title,
                        img,
                        postBy,
                        postDate,
                    })
                })
            })
        }
        return articles
    })
}

const getArticlesHandler = async(req, res) => {
    try {
        const articles = await getArticles();
        res.status(200).json({
            success: true,
            data: articles
        });
    } catch (err) {
        res.status(500).json({success: false, msg: 'Server Errors'})
    }
} 

module.exports = {
    getArticlesHandler
}