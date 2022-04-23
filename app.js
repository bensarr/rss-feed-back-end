const express = require('express');
const cors = require("cors");

let Parser = require('rss-parser');

const app = express();

const corsOptions = {
    origin: ["https://rss-feed-front-end.herokuapp.com", "http://localhost:4200"],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
let parser = new Parser({
    headers: { 'User-Agent': 'Chrome' },
    requestOptions: {
        rejectUnauthorized: false
    },
    customFields:{
        item: [
            'description',
            ['media:content', 'media:content']
        ]
    }
});

async function fetchRssFeed(feedUrl) {
    let feed = await parser.parseURL(feedUrl);
    return feed.items.map(item => {
        return {
            title: item.title,
            description: item.description,
            link: item.link,
            date: item.pubDate,
            media: item['media:content'],
        }
    });
}

const bitcoinFeedUrl = 'https://www.lemonde.fr/rss/en_continu.xml';

app.get('/api/news', async (req, res) => {
    await fetchRssFeed(bitcoinFeedUrl)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({
                status: 'error',
                message: 'An error occurred when fetching news'
            })
        })
});

const db = require("./models");
db.sequelize.sync();

require("./routes/article.routes")(app);

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server is running on port 5000");
})