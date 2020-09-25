const LoggerContentFilter = require('../index');
const log4js = require('log4js');
LoggerContentFilter.addContentFilter('filter-content',function (msg) {
    if (msg.indexOf("法外狂徒张三") > -1) {
        return true;
    }
    return false;
});

log4js.configure({
    appenders: {
        stdout: {
            type: 'console',
            layout: {
                type: "filter-content",
                useLayout:"Coloured"
            }
        },
    },
    categories: {
        default: { appenders: ['stdout'], level: 'debug' },
    },
});

let logger = log4js.getLogger();
logger.info("我是法外狂徒张三,看看有没有内容的输出");
logger.info("原来我没得选,我现在想做个好人");
logger.error("我是法外狂徒张三");
logger.error("原来我没得选");