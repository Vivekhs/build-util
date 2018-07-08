"use strict";
var crypto = require('crypto');
var fs = require('fs');
var mkdirp = require('mkdirp');
var Path = require('path');
var rimraf = require('rimraf');

module.exports = {

    /**
     * @author Vivek Sinha
     * @augments options{path, cssPath, length, cssEnabled}
     * @param path path of configuration which will have css and js filename
     * @param cssPath path of css path
     * @param length length of filename
     * @param cssEnabled if true css file random generation will happen
     * else filename will be the same
     */
    fileNameGeneration : function(options){
        let path = options.path;
        let cssPath = options.cssPath;
        let length = options.length;
        let cssEnabled = options.cssEnabled;
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
            let cssHash = '';
            if(cssEnabled){
                let cssHash = crypto.randomBytes(length).toString('hex');
                let cssContent = fs.readFileSync(cssPath);
                rimraf.sync(`${Path.dirname(cssPath)}/copiedStyles`);
                mkdirp.sync(`${Path.dirname(cssPath)}/copiedStyles`);
                fs.writeFileSync(`${Path.dirname(cssPath)}/copiedStyles/${cssHash}.css`, cssContent)
            }
            else{
                let cssFileParts = cssPath.split('/');
                cssHash = cssFileParts[cssFileParts.length - 1].replace('.css', '');
            }
            let data = {
                jsFileName:hash,
                cssFileName:cssHash
            }
            fs.writeFileSync(`${path}`, JSON.stringify(data));
    }
}
