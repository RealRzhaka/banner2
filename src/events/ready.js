const Utils = require("../util/Utils");
require('dotenv').config()

module.exports = client => {
    console.log('Успешная авторизация в Discord');

    Utils.setBanner(client); // первый вызов

    setInterval(async () => {
        Utils.setBanner(client);
    }, Utils.convertMinutes(process.env.CHANGE_INTERVAL));
};