// 初始化数据
let killStreaks = {};
let lastKillTimes = {};
let timeoutDuration = 10000; // 超时时间设置为30秒（30000毫秒）
let reminderInterval = 1000; // 提示消息的时间间隔设置为1秒（1000毫秒）
let lastReminderTimes = {}; // 存储玩家上次发送提示消息的时间

// 检查实体是否是怪物
function isMonster(entity) {
    let type = entity.getType();
    // 定义怪物的类型
    return [
        'minecraft:zombie',
        'minecraft:skeleton',
        'minecraft:spider',
        'minecraft:creeper',
        'minecraft:ender_dragon',
        'minecraft:wither_skeleton',
        'minecraft:witch',
        'minecraft:slime',
        'minecraft:magma_cube',
        'minecraft:phantom', // 例如，添加幻影
        'minecraft:pillager' // 例如，添加掠夺者
    ].includes(type);
}

// 处理玩家击杀生物的事件
EntityEvents.death(event => {
    let entity = event.entity;
    let source = event.source;
    let player = source.getPlayer();

    if (player && isMonster(entity)) {
        let playerName = player.getName();
        let currentTime = Date.now();

        // 初始化玩家数据
        if (!(playerName in killStreaks)) {
            killStreaks[playerName] = 0;
            lastKillTimes[playerName] = currentTime;
            lastReminderTimes[playerName] = currentTime;
        }

        // 计算自上次击杀以来的时间
        let timeSinceLastKill = currentTime - lastKillTimes[playerName];

        // 重置连续击杀次数如果超出了超时时间
        if (timeSinceLastKill > timeoutDuration) {
            killStreaks[playerName] = 0;
        }

        // 增加连续击杀次数并更新击杀时间
        killStreaks[playerName]++;
        lastKillTimes[playerName] = currentTime;

        // 给予玩家速度和夜视效果如果连续击杀达到20次
        if (killStreaks[playerName] === 20) {
            player.runCommandSilent('effect give @s minecraft:speed 60 1 true');
            player.runCommandSilent('effect give @s minecraft:night_vision 60 1 true');
        }
    }
});

// 定期更新玩家的状态和提示信息
ServerEvents.tick(event => {
    let currentTime = Date.now();

    event.server.players.forEach(player => {
        let playerName = player.getName();

        if (playerName in killStreaks) {
            let timeSinceLastKill = currentTime - lastKillTimes[playerName];

            // 如果超出了超时时间，则重置玩家数据
            if (timeSinceLastKill > timeoutDuration) {
                delete killStreaks[playerName];
                delete lastKillTimes[playerName];
                delete lastReminderTimes[playerName];
            } else {
                // 检查是否到达提示间隔
                if (currentTime - lastReminderTimes[playerName] >= reminderInterval) {
                    lastReminderTimes[playerName] = currentTime;

                    // 只有在连续击杀达到3次时才显示提示
                    if (killStreaks[playerName] >= 3) {
                        let streak = killStreaks[playerName];
                        let color = timeSinceLastKill > (timeoutDuration - 3000) ? "red" : "green"; // 最后10秒显示红色

                        // 发送炫酷的提示信息到玩家的操作栏（action bar）
                        let message = `§l《连续击杀: ${streak}》`; // 加粗和金色字体
                        player.runCommandSilent(`title @s actionbar {"text":"${message}","color":"${color}","bold":true,"italic":false}`);
                    }
                }
            }
        }
    });
});
