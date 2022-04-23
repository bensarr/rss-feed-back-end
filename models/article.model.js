module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        link: {
            type: Sequelize.STRING
        }
    });
    return Article;
};