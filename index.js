"use strict";
var crypto = require('crypto');
var fs = require('fs');
var mkdirp = require('mkdirp');
module.exports = {
    fileNameGeneration : function(path, length){
            if(!path){
                path = 'buildDetails.json';
            }
            if(!path.endsWith('.json')){
                path = path+'.json';
            }
            let parts = path.split('/');
            parts.splice(parts.length-1, 1);
            if(!fs.exists(path)){
                let loc = parts.join('/');
                mkdirp.sync(loc);
            }
            if(!length){
                length = 5;
            }
            let current_date = (new Date()).valueOf().toString();
            let random = Math.random().toString();
            let hash = crypto.randomBytes(length).toString('hex');
            let data = {
                fileName:hash
            }
            fs.writeFileSync(`${path}`, JSON.stringify(data));
    }
}
