// 5 - ¿Cuantas horas han pasado desde que empezó este master? y... ¿en días?




function sinceMaster() {
    let nowDate = new Date();

    // 2/10/19 - 29/06/20
    // 16:00 - 19:00

    const masterStartDay = 2;
    const masterStartMonth = 10;
    const masterStartYear = 2019;

    const masterStart = new Date(Date.UTC(masterStartYear, masterStartMonth, masterStartDay));

    let hoursSinceMaster = nowDate.setDate(nowDate.getDate());
    console.log(hoursSinceMaster);
    let daysSinceMaster = nowDate.setDate(nowDate.getDate() + days);
}

sinceMaster();