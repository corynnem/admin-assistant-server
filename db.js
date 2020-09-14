const Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

sequelize.authenticate().then(
    function success() {
        console.log('connected to database');
    },
    function error(err) {
        console.log(err)
    }
);

module.exports = sequelize;