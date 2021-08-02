var configValues = require("./config");

module.exports = {
    getDbConnectionString: function() {
        return `mongodb+srv://${configValues.username}:${configValues.password}@cluster0.u6n6z.mongodb.net/test`;
    }
}