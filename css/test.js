var css = require("css");

var path = require("path");

var fs = require("fs");

var csspath = "/root/devspace/web/css/main_debug.css";

var csscontent = fs.readFileSync(csspath);

//console.log(csscontent.toString());
var ast = css.parse(csscontent.toString(), {
    source: csspath
});

//console.log(ast);
//console.log(JSON.stringify(ast, null, 2));
function ruleswalker(rules, transfer) {
    //记录路径:
    //media
    rules.forEach(function(rule, index) {
        if (rule.rules && rule.rules.length > 0) {
            ruleswalker(rule.rules, transfer);
        } else {
            transfer(rule);
        }
    });
}

var property_re = /background(-.*)?/g;

function isBackground(property) {
    //console.log('----------------------');
    //console.log(typeof property);
    //console.log('----------------------');
    var lowerp = property.toLowerCase();
    return !!lowerp.match(property_re);
}

var image_re = /url\s*\(\s*(['"]?)(.*)\1\)/gi;

function getIfHasBackgroundImage(value) {
    var r = value.match(image_re);
    if (r) {
        var image = RegExp.$2;
        var rs=value.replace(image_re, function(matched, $1, $2, startpos, origin) {
            var newurl=matched.split(/[()]/g);
            //console.log(arguments);
            newurl=newurl[0]+'('+path.join('../../',$2)+')'+newurl.pop();
            return newurl
        });
        return rs;
    }
}

function transer(cssrule) {
    if (cssrule.type == "rule") {
        cssrule.declarations && cssrule.declarations.forEach(function(declaration, index) {
            if (isBackground(declaration.property)) {
                var r = getIfHasBackgroundImage(declaration.value);
                if (r) {
                    console.log(cssrule.selectors.join(","), "{");
                    console.log("	", declaration.property, ":", declaration.value);
                    console.log(r);
                    declaration.value = r;
                    console.log("}");
                }
            }
        });
    }
}

ruleswalker(ast.stylesheet.rules, transer);

console.log(css.stringify(ast));

