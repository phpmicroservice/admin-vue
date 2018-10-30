//时间格式转换
function date(type, time) {
    let date = 0;
    if (time.toString().length == 10) {
        date = new Date(parseInt(time) * 1000);
    }
    else {
        date = new Date(parseInt(time));
    }
    let Y = date.getFullYear('YY') + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    let H = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
    let MM = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    //月日时分
    if (type == 'MDHMM') {
        return M + D + ' ' + H + ':' + MM;
    }
    else if (type == 'YMD') {
        return Y + M + D;
    }
    else if (type == 'YMDHMM') {
        return Y + M + D + ' ' + H + ':' + MM;
    }
}
export default date;