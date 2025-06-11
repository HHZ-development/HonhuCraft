let damageMap = new Map(); // 存储实体ID和{伤害值, 计时器}
let loggedNonPlayerSources = new Set();
let nonPlayerLogThrottle = 30000;
// 伤害重置时间（5秒）
const DAMAGE_RESET_TIME = 5000; 

EntityEvents.hurt(event => {
    let entity = event.entity;
    let source = event.source;
    let player = source.getPlayer();
    let damage = Math.floor(event.amount || event.damage || event.damageAmount);

    if (isNaN(damage)) {
        console.error("伤害值无效");
        return;
    }

    let entityName = entity.getDisplayName().getString() || entity.type;
    let entityId = entity.id;

    // 非玩家来源处理（日志节流）
    if (!player) {
        if (!loggedNonPlayerSources.has(source.type)) {
            console.log(`非玩家来源 ${source.type} 对 ${entityName} 造成了 ${damage} 点伤害`);
            loggedNonPlayerSources.add(source.type);
            setTimeout(() => {
                loggedNonPlayerSources.delete(source.type);
            }, nonPlayerLogThrottle);
        }
        return; // 非玩家伤害不记录累积值
    }

    // 玩家来源处理
    if (!damageMap.has(entityId)) {
        // 新实体初始化
        damageMap.set(entityId, {
            total: 0,
            timer: setTimeout(() => {
                damageMap.delete(entityId);
            }, DAMAGE_RESET_TIME)
        });
    }

    // 更新伤害值并重置计时器
    let record = damageMap.get(entityId);
    clearTimeout(record.timer); // 清除旧计时器
    record.total += damage;
    record.timer = setTimeout(() => {
        damageMap.delete(entityId);
    }, DAMAGE_RESET_TIME);
    damageMap.set(entityId, record);

    // 显示实时伤害
    let message = `《你对 ${entityName} 造成了 ${record.total} 点伤害喵!》`;
    try {
        player.runCommandSilent(`title @s actionbar {"text":"${message}","color":"green"}`);
        console.log(`玩家 ${player.getName()} 对 ${entityName} 造成了 ${record.total} 点伤害`);
    } catch (e) {}
});