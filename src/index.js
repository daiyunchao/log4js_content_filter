const log4js = require('log4js');
const { basicLayout, colouredLayout, dummyLayout, patternLayout, messagePassThroughLayout } = require('log4js/lib/layouts');
const util = require('util');
class LoggerContentFilter {
    //add filter content 
    //filterCase 过滤条件函数,要求返回true则过滤,返回false,则不过滤
    constructor() {
        this.layoutMenu = {
            "Basic": basicLayout,
            "Coloured": colouredLayout,
            "Dummy": dummyLayout,
            "messagePassThrough": messagePassThroughLayout,
        }
    }
    addContentFilter(filterType,filterCase) {
        let self = this;
        log4js.addLayout(filterType, config => {
            return function (log) {
                let msg = util.format(...log.data);
                let isFilter = false;
                if (msg) {
                    isFilter = filterCase(msg);
                }
                if (isFilter) {
                    return "";
                }
                if (
                    config.useLayout === "Basic" ||
                    config.useLayout === "Coloured" ||
                    config.useLayout === "Dummy" ||
                    config.useLayout === "messagePassThrough"
                ) {
                    return self.layoutMenu[config.useLayout](log);
                } else {
                    return basicLayout(log);
                }
            }
        });
    }
}

module.exports = new LoggerContentFilter();