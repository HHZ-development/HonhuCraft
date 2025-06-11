LevelEvents.tick(event => {
    var moon_context = event.level.getLunarContext()
    var moon
    if (moon_context == null){
        return;
    }else{
        moon = moon_context.lunarForecast.forecast[0]
    }
    let moon_type = moon.getLunarEventKey().path
    // 获取当前游戏天数(游戏日)
    let today = Math.trunc(event.level.dayTime()/24000)
    // 获取最近事件月的计划日
    let scheduledDay = moon.scheduledDay()
    // 获取间隔
    let interval = (scheduledDay) - (today)
    // 获取当前游戏时间(用于计划任务)
    if (event.level.getDayTime()%24000 == 10){
        if (moon_type == "blood_moon"){
            event.server.tell(`<CatGPT> 距离§c§l血月§r还有${interval.toString()}天喵~ 血月是一种特别的月亮现象，当世界被红色笼罩，怪物会大量生成，玩家无法通过睡觉来跳过这个夜晚，是一个充满挑战和危险的时刻喵~`);
        } if (moon_type == "blue_moon"){
             event.server.tell(`<CatGPT> 距离§9§l蓝月§r还有${interval.toString()}天喵~ 蓝月是一种罕见的月亮现象，当天空染上美丽的蓝色光辉，玩家的幸运值会增加，战利品的质量也会变好，是一个充满好运和惊喜的夜晚喵~`);
        } if (moon_type == "harvest_moon"){
             event.server.tell(`<CatGPT> 距离§e§l丰收之月§r还有${interval.toString()}天喵~ 丰收之月是一种温暖的月亮现象，当夜晚的天空被金黄色的光辉照亮，农作物生长速度加快，收获变得更加丰盈，是农民们最期待的丰收时刻喵~`);
        } else {
             event.server.tell(`<CatGPT> 啊哦，代码出错了喵，阔乐是大笨蛋！(错误代码:${moon_type()} ${interval.toString()})`);
        }
        }
    })