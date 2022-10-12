const moment = require("moment/moment");
const ms = require("ms");

const time = ms('1y')
moment(ms('1d'),'')
const format = moment(time).format('dddd, MMMM Do YYYY')
console.log(format)
console.log(time)
console.log("cobaaa")
console.log(moment(format).valueOf())