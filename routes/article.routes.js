module.exports = app => {
    const articles = require("../controllers/article.controller");
    var router = require("express").Router();
    // Create a new Article
    router.post("/", articles.create);
    // Retrieve all Articles
    router.get("/", articles.findAll);
    // Retrieve a single Article with id
    //router.get("/:id", articles.findOne);
    // Retrieve a single Article with title
    router.get("/:link", articles.findByLink);
    // Update a Article with title
    router.put("/:title", articles.update);
    app.use('/api/articles', router);
};