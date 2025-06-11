let damageMap = new Map();
let loggedNonPlayerSources = new Set();
let nonPlayerLogThrottle = 30000; // 30秒
const DAMAGE_RESET_TIME = 5000; // 5秒

EntityEvents.hurt(event => {
    let entity = event.entity;
    let source = event.source;
    let player = source.getPlayer();
    let damage = Math.floor(event.amount || event.damage || event.damageAmount);
    let entityName = entity.getDisplayName().getString() || entity.type;
    let entityId = entity.id;

    if (!player) {
        if (!loggedNonPlayerSources.has(source.type)) {
            loggedNonPlayerSources.add(source.type);
            Utils.server.scheduleInTicks(nonPlayerLogThrottle / 50, () => {
                loggedNonPlayerSources.delete(source.type);
            });
        }
        return;
    }

    let now = Date.now();

    if (!damageMap.has(entityId)) {
        damageMap.set(entityId, {
            total: 0,
            lastUpdate: now
        });
    }

    let record = damageMap.get(entityId);
    record.total += damage;
    record.lastUpdate = now;
    damageMap.set(entityId, record);

    Utils.server.scheduleInTicks(DAMAGE_RESET_TIME / 50, () => {
        let current = damageMap.get(entityId);
        if (current && current.lastUpdate === now) {
            damageMap.delete(entityId);
        }
    });

    let message = `《你对 ${entityName} 造成了 ${record.total} 点伤害喵!》`;
    try {
        player.runCommandSilent(`title @s actionbar {"text":"${message}","color":"green"}`);
    } catch (e) {}
});