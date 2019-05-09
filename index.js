if(typeof $$ !== "undefined" && typeof $$.blockchain === "undefined"){
    const pskDB = require("pskdb");
    const pds = pskDB.startDB("./path_to_storage_folder");
}

const path = require("path");

let prefix = "..";

//temporary fix
//cwd and point of reference is different when loaded in domain vs agent
if(process.cwd().indexOf("engine") === -1){
    prefix = "code";
}

$$.loadLibrary("token_example", path.join(prefix, path.dirname(__filename), "token_example"));
$$.loadLibrary("art", path.join(prefix, path.dirname(__filename), "art&portofolio_example"));