let damageMap = new Map();
let loggedNonPlayerSources = new Set();
let nonPlayerLogThrottle = 30000;
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

    if (!player) {
        if (!loggedNonPlayerSources.has(source.type)) {
            loggedNonPlayerSources.add(source.type);
            setTimeout(() => {
                loggedNonPlayerSources.delete(source.type);
            }, nonPlayerLogThrottle);
        }
        return;
    }

    if (!damageMap.has(entityId)) {
        damageMap.set(entityId, {
            total: 0,
            timer: setTimeout(() => {
                damageMap.delete(entityId);
            }, DAMAGE_RESET_TIME)
        });
    }

    let record = damageMap.get(entityId);
    clearTimeout(record.timer); 
    record.total += damage;
    record.timer = setTimeout(() => {
        damageMap.delete(entityId);
    }, DAMAGE_RESET_TIME);
    damageMap.set(entityId, record);

    let message = `《你对 ${entityName} 造成了 ${record.total} 点伤害喵!》`;
    try {
        player.runCommandSilent(`title @s actionbar {"text":"${message}","color":"green"}`);
    } catch (e) {}
});