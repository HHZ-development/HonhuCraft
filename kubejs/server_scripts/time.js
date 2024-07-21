let lastTimePeriod = '';

ServerEvents.tick(event => {
    let world = event.server.overworld();
    if (!world) return;

    let time = world.dayTime() % 24000;
    if (isNaN(time)) return;

    // 定义怪物类型和效果
    let entities = ['minecraft:zombie', 'minecraft:skeleton'];
    let effects = {
        day: [
            { type: 'minecraft:slowness', level: 2 },
            { type: 'minecraft:weakness', level: 0 }
        ],
        night: []
    };

    function applyEffects(entityTypes, effects) {
        for (let entityType of entityTypes) {
            for (let effect of effects) {
                let command = `effect give @e[type=${entityType}] ${effect.type} infinite ${effect.level} true`;
                event.server.runCommandSilent(command);
            }
        }
    }

    function clearEffects(entityTypes) {
        for (let entityType of entityTypes) {
            let command = `effect clear @e[type=${entityType}]`;
            event.server.runCommandSilent(command);
        }
    }

    let currentTimePeriod;
    if (time >= 1000 && time <= 13000) {
        currentTimePeriod = 'day';
        // 白天，为指定怪物添加效果
        applyEffects(entities, effects.day);
        if (lastTimePeriod !== 'day') {
            let dayMessage = '§l<CatGPT> §2现在是白天，怪物们被削弱了喵!';
            event.server.players.forEach(player => {
                player.tell(dayMessage);
            });
        }
    } else {
        currentTimePeriod = 'night';
        // 夜晚，清除指定怪物的效果
        clearEffects(entities);
        if (lastTimePeriod !== 'night') {
            let nightMessage = '§l<CatGPT> §4现在是晚上，怪物将会大幅增强喵!';
            event.server.players.forEach(player => {
                player.tell(nightMessage);
            });
        }
    }

    lastTimePeriod = currentTimePeriod;
});
