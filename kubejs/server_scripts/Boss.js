EntityEvents.spawned(event => {
    const entityConfig = {
        'minecraft:ender_dragon': 2400,
        // 添加更多怪物配置...
    };

    const entity = event.entity;
    
    const entityId = entity.type;
    if (entityConfig[entityId]) {
        const targetHealth = entityConfig[entityId];
        entity.setMaxHealth(targetHealth);
        entity.setHealth(targetHealth);
    }
});