const moment = require("moment/moment");
const ms = require("ms");


const now = ms('10y')
console.log(now)
console.log(new Date(ms('1y')))
console.log(moment(new Date().getTime()+now).format('dddd,MMMM Do YYYY'))
console.log(new Date().getTime()+ms('300d'))
console.log(moment(1691472443888).format())
console.log(moment(1691472502766).format())
var apa ,then
apa = moment(new Date().getTime()).format("dddd,MMMM Do YYYY")
then = moment(1981128798834).format('dddd,MMMM Do YYYY')
if(apa === then) {
    console.log("udah waktunya")
} else {
    console.log(apa+"\n"+then)
}

const sekarang = moment(new Date().getTime()+ms('2y')).format('dddd,MMMM Do YYYY')
const nanti = moment(new Date().getTime()+ms('300d')).format('dddd,MMMM Do YYYY')
if(sekarang > nanti) {
    console.log("keluarnya tahunan alias 1.000.000")
} else {
    console.log("kleluarnya bulanan alias 300.000")
}
