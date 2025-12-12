let damageMap = new Map();
let loggedNonPlayerSources = new Set();
let nonPlayerLogThrottle = 600;
let versionCounter = 0;
const DAMAGE_RESET_TICKS = 100;

EntityEvents.hurt(event => {
    let entity = event.entity;
    let source = event.source;
    let player = source.getPlayer();
    let damage = event.damage || 0;
    if (damage <= 0) return;
    
    let entityName = entity.getDisplayName().getString() || entity.type;
    let entityId = entity.id;

    if (!player) {
        if (!loggedNonPlayerSources.has(source.type)) {
            loggedNonPlayerSources.add(source.type);
            Utils.server.scheduleInTicks(nonPlayerLogThrottle, () => {
                loggedNonPlayerSources.delete(source.type);
            });
        }
        return;
    }

    if (!damageMap.has(entityId)) {
        damageMap.set(entityId, {
            total: 0,
            version: 0
        });
    }

    let record = damageMap.get(entityId);
    record.total += damage;
    versionCounter++;
    let currentVersion = versionCounter;
    record.version = currentVersion;
    damageMap.set(entityId, record);

    Utils.server.scheduleInTicks(DAMAGE_RESET_TICKS, () => {
        let current = damageMap.get(entityId);
        if (current && current.version === currentVersion) {
            damageMap.delete(entityId);
        }
    });

    let message = `《你对 ${entityName} 造成了 ${Math.floor(record.total)} 点伤害喵!》`;
    try {
        player.runCommandSilent(`title @s actionbar {"text":"${message}","color":"green"}`);
    } catch (e) {}
});

EntityEvents.death(event => {
    let entity = event.entity;
    let source = event.source;
    let player = source.getPlayer();

    if (player) {
        try {
            let command = 'playsound minecraft:entity.experience_orb.pickup voice @s[distance=..16] ~ ~ ~ 1 1';
            player.runCommandSilent(command);
        } catch (e) {}
    }
});
