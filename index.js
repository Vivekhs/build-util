"use strict";
var crypto = require('crypto');
var fs = require('fs');
var mkdirp = require('mkdirp');
var Path = require('path');
module.exports = {
    fileNameGeneration : function(path, cssPath, length){
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
            let hash = crypto.randomBytes(length).toString('hex');
            let cssHash = crypto.randomBytes(length).toString('hex');
            let cssContent = fs.readFileSync(cssPath);
            fs.writeFileSync(`${Path.dirname(cssPath)}/${cssHash}.css`, cssContent)
            let data = {
                jsFileName:hash,
                cssFileName:cssHash
            }
            fs.writeFileSync(`${path}`, JSON.stringify(data));
    }
}
