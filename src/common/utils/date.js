// 获取过去几个月的时间

export const dateUtils = {
    getPastTime(month) {
        let time = new Date();
        const yy = time.getFullYear(); //获取完整的年份(4位,1970-???)
        const M = time.getMonth() + 1; //获取当前月份(0-11,0代表1月),
        const d = time.getDate(); //获取当前日(1-31)
        const H = time.getHours(); //获取当前小时数(0-23)
        const m = time.getMinutes(); //获取当前分钟数(0-59)
        const s = time.getSeconds(); //获取当前秒数(0-59)
        // 获取指定的过去时间
        const past = M - month;
        const pastM = past < 0 ? past + 12 : past > 10 ? past : "0" + past;
        // 小于9的，在前面加0
        const MM = M > 9 ? M : "0" + M;
        const dd = d > 9 ? d : "0" + d;
        const HH = H > 9 ? H : "0" + H;
        const mm = m > 9 ? m : "0" + m;
        const ss = s > 9 ? s : "0" + s;
        // 指定的过去时间
        const PastTime = yy + "-" + pastM + "-" + dd + " " + HH + ":" + mm + ":" + ss;
        // 当前时间
        const nowTime = yy + "-" + MM + "-" + dd + " " + HH + ":" + mm + ":" + ss;

        return [PastTime, nowTime];
    },
    getCHDayName(dateStr){
        let dayNum = new Date(dateStr).getDay();
        const datMap = {
            1: "星期一",
            2: "星期二",
            3: "星期三",
            4: "星期四",
            5: "星期五",
            6: "星期六",
            7: "星期日",
        }
        return datMap[dayNum]
    }
}
