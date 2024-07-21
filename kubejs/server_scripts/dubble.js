ServerEvents.tick(event => {
    let world = event.server.overworld();
    let entities = world.getEntities();
        entities.forEach(entity => {
            if (entity.isLiving() && entity.type !== 'minecraft:player') {
                    let nbt = entity.persistentData;
                    if (!nbt.getBoolean("healthDoubled")) {
                        let maxHealth = entity.getMaxHealth();
                        let currentHealth = entity.getHealth();
                        if (maxHealth && currentHealth) {
                            entity.setMaxHealth(maxHealth * 3);
                            entity.setHealth(currentHealth * 3);
                            nbt.putBoolean("healthDoubled", true);
                        } 
                    }
                
                }
        });
    } 
);