### Log4js_content_filter
This is a log filtering plugin for log4js-node. If you want filter content you can try this plugin

#### 可以干什么?
在输出日志根据条件判断是否需要输出该日志(已知bug:过滤掉的日志会输出一个空行)

#### Principle
自定义一个log4js的layout,在该layout中判断输出的内容

#### How to use

> install
`npm install log4js_content_filter --save`

> use

```javascript
const LoggerContentFilter = require('log4js_content_filter');
const log4js = require('log4js');

//at first add filter case and layout name
LoggerContentFilter.addContentFilter("filter-content",function (msg) {
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
                type: "filter-content",//new type addContentFilter function first argument
                useLayout:"Coloured"//logger output layout style :Basic, Coloured, Dummy, messagePassThrough
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

```