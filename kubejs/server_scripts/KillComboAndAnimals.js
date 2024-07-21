// 用于跟踪已处理的事件
let damageMap = new Map();
let loggedNonPlayerSources = new Set(); // 存储已记录的非玩家来源
let nonPlayerLogThrottle = 30000; // 非玩家日志间隔时间（30秒）

EntityEvents.hurt(event => {
    let entity = event.entity;
    let source = event.source;
    let player = source.getPlayer();

    // 获取伤害值并格式化为整数
    let damage = Math.floor(event.amount || event.damage || event.damageAmount);

    // 检查伤害值是否有效
    if (isNaN(damage)) {
        console.error("伤害值无效");
        return;
    }

    // 获取实体的显示名称
    let entityName = entity.getDisplayName().getString() || entity.type; // 如果没有显示名称，就使用原始类型

    // 如果伤害记录中没有该实体，初始化记录
    if (!damageMap.has(entity.id)) {
        damageMap.set(entity.id, 0);
    }

    // 更新总伤害
    let totalDamage = damageMap.get(entity.id) + damage;
    damageMap.set(entity.id, totalDamage);

    if (player) {
        // 实时显示累计伤害
        let message = `《你对 ${entityName} 造成了 ${totalDamage} 点伤害喵!》`;
        try {
            player.runCommandSilent(`title @s actionbar {"text":"${message}","color":"green"}`);
            console.log(`玩家 ${player.getName()} 对 ${entityName} 造成了 ${totalDamage} 点伤害`);
        } catch (e) {
            console.error(`Error displaying damage message: ${e}`);
        }

        // 定义会反击的动物类型及其对应的名称
        let animals = {
            'minecraft:cow': '牛',
            'minecraft:sheep': '绵羊',
            'minecraft:pig': '猪',
            'minecraft:chicken': '鸡'
        };

        // 定义远程攻击类型的名称片段
        let projectileNames = ['arrow', 'bullet', 'snowball', 'fireball', 'trident', 'potion'];

        // 检查实体是否是动物以及伤害来源是否是玩家
        if (Object.keys(animals).includes(entity.type)) {
            // 获取动物的中文名称
            let animalName = animals[entity.type];

            // 获取伤害来源类型
            let sourceType = source.getType ? source.getType() : source.type;

            // 将 sourceType 转换为字符串
            let sourceTypeString = String(sourceType);

            // 检查伤害来源是否包含远程攻击类型的名称片段
            let isProjectile = projectileNames.some(name => sourceTypeString.includes(name));
            console.log(`source.type: ${sourceTypeString}, isProjectile: ${isProjectile}`);

            if (isProjectile) {
                console.log(`检测到远程攻击类型 ${sourceTypeString}，不触发反击机制`);
                return;
            }

            // 设置反击概率，例如20%
            let retaliateChance = 0.2;

            // 生成0到1之间的随机数，如果小于反击概率，则执行反击
            if (Math.random() < retaliateChance) {
                // 输出日志，表示进入反击逻辑
                console.log(`动物 ${animalName} 被玩家攻击，有 ${retaliateChance * 100}% 的概率进行反击`);

                // 生成随机伤害值，范围从1到5
                let retaliateDamage = Math.floor(Math.random() * 5) + 1;

                // 通过命令对玩家造成随机伤害
                let command = `damage @p ${retaliateDamage}`;
                try {
                    event.server.runCommandSilent(command);
                    // 输出日志，表示反击命令已执行
                    console.log(`动物 ${animalName} 进行了反击，造成了 ${retaliateDamage} 点伤害`);

                    // 在屏幕底部显示反击提示
                    let retaliateMessage = `《警告: 你被 ${animalName} 反击了! 造成了 ${retaliateDamage} 点伤害喵!快反击！(╬￣皿￣)》`;
                    player.runCommandSilent(`title @s actionbar {"text":"${retaliateMessage}","color":"red"}`);
                } catch (e) {
                    console.error(`Error executing damage command: ${e}`);
                }
            }
        }
    } else {
        // 获取伤害来源类型
        let sourceType = source.getType ? source.getType() : "unknown";
        let currentTime = Date.now();

        // 仅在特定间隔内记录日志
        if (!loggedNonPlayerSources[sourceType] || currentTime - loggedNonPlayerSources[sourceType] > nonPlayerLogThrottle) {
            loggedNonPlayerSources[sourceType] = currentTime;
            console.warn(`伤害来源不是玩家，伤害来源类型: ${sourceType}, 无法显示伤害消息`);
        }
    }
});
