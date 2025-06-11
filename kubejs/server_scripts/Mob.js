EntityEvents.spawned(event => {
    const Bosslist = {
        'minecraft:ender_dragon': 2400,
        //单独设置生物血量
    };

    const entity = event.entity;
    
    const entityId = entity.type;
    if (Bosslist[entityId]) {
        const targetHealth = Bosslist[entityId];
        entity.setMaxHealth(targetHealth);
        entity.setHealth(targetHealth);
    }
});

ServerEvents.tick(event => {
    //获取当前世界
    let world = event.server.overworld();
    let the_nether = event.server.getLevel('minecraft:the_nether');
    let the_end = event.server.getLevel('minecraft:the_end');
    //获取维度实体
    let entities = world.getEntities();
    let nether_entities = the_nether.getEntities();
    let end_entities = the_end.getEntities();
   //黑名单
    const blacklist = [
        'minecraft:ender_dragon',
        //不需要翻倍的生物
    ];
    
    entities.forEach(entity => {
        if (entity.isLiving() && entity.type !== 'minecraft:player') {
            if (blacklist.includes(entity.type)) return;
            
            let nbt = entity.persistentData;
            if (!nbt.getBoolean("healthDoubled")) {
                let maxHealth = entity.getMaxHealth();
                let currentHealth = entity.getHealth();
                if (maxHealth && currentHealth) {
                    entity.setMaxHealth(maxHealth * 6);
                    entity.setHealth(currentHealth * 6);
                    nbt.putBoolean("healthDoubled", true);
                }
            }
        }
    });
        nether_entities.forEach(entity => {
        if (entity.isLiving() && entity.type !== 'minecraft:player') {
            if (blacklist.includes(entity.type)) return;
            
            let nbt = entity.persistentData;
            if (!nbt.getBoolean("healthDoubled")) {
                let maxHealth = entity.getMaxHealth();
                let currentHealth = entity.getHealth();
                if (maxHealth && currentHealth) {
                    entity.setMaxHealth(maxHealth * 10);
                    entity.setHealth(currentHealth * 10);
                    nbt.putBoolean("healthDoubled", true);
                }
            }
        }
    });
        end_entities.forEach(entity => {
        if (entity.isLiving() && entity.type !== 'minecraft:player') {
            if (blacklist.includes(entity.type)) return;
            
            let nbt = entity.persistentData;
            if (!nbt.getBoolean("healthDoubled")) {
                let maxHealth = entity.getMaxHealth();
                let currentHealth = entity.getHealth();
                if (maxHealth && currentHealth) {
                    entity.setMaxHealth(maxHealth * 14);
                    entity.setHealth(currentHealth * 14);
                    nbt.putBoolean("healthDoubled", true);
                }
            }
        }
    });
});
//不管了，能跑就可以了