if(typeof $$ !== "undefined" && typeof $$.blockchain === "undefined"){
    const pskDB = require("pskdb");
    const pds = pskDB.startDB("./path_to_storage_folder");
}

require("./assets/Token.js");
require("./assets/Account.js");

require("./transactions/tokenManagement.js");
require("./transactions/accountManagement.js");