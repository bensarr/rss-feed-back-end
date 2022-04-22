const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;
// Create and Save a new Article
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Article
    const article = {
        title: req.body.title,
        description: req.body.description
    };
    // Save Article in the database
    Article.create(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Article."
            });
        });
};
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    Article.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Articles."
            });
        });
};
// Find a single Article with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Article.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Article with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Article with id=" + id
            });
        });
};
// Find a single Article with an id
exports.findByTitle = (req, res) => {
    const title = req.params.title;
    Article.findOne({where: {title: title}})
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Article with title=${title}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Article with title=" + title
            });
        });
};
// Update a Article by the id in the request
exports.update = (req, res) => {
    const title = req.params.title;
    Article.update(req.body, {
        where: { title: title }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Article was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Article with title=${title}. Maybe Article was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Article with title=" + title
            });
        });
};