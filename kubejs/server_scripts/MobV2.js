const MobConfig = {
    healthPerLevel: 0.05, //在这后面添加血量系数
    attackPerLevel: 0.04, //在这后面添加攻击系数
    dimensionMultiplier: {
        overworld: 1.0, //在这后面添加维度系数
        nether: 1.8, //在这后面添加维度系数
        end: 2.4 //在这后面添加维度系数
    },
    safeZoneRadius: 64, //安全区半径（以玩家重生点为中心）
    safeZoneLevel: 1, //安全区内的怪物等级
    categoryMultiplier: {
        hostile: { health: 1.0, attack: 1.0 }, //敌对生物：100%增强
        passive: { health: 1.0, attack: 0.0 }, //被动生物：只增强血量，不增强攻击
        neutral: { health: 0.5, attack: 0.3 } //中立生物：50%血量，30%攻击
    }
};

const ModBlacklist = [
    'alexsmobs',
    'touhou_little_maid'
    //在这后面添加模组排除
];

const LevelStages = [
    { day: 0, minLevel: 1, maxLevel: 15 },
    { day: 5, minLevel: 3, maxLevel: 19 },
    { day: 10, minLevel: 5, maxLevel: 23 },
    { day: 15, minLevel: 7, maxLevel: 27 },
    { day: 20, minLevel: 9, maxLevel: 31 },
    { day: 25, minLevel: 11, maxLevel: 35 },
    { day: 30, minLevel: 13, maxLevel: 39 },
    { day: 35, minLevel: 15, maxLevel: 43 },
    { day: 40, minLevel: 17, maxLevel: 47 },
    { day: 45, minLevel: 19, maxLevel: 51 },
    { day: 50, minLevel: 21, maxLevel: 55 },
    { day: 55, minLevel: 23, maxLevel: 59 },
    { day: 60, minLevel: 25, maxLevel: 63 },
    { day: 65, minLevel: 27, maxLevel: 67 },
    { day: 70, minLevel: 29, maxLevel: 71 },
    { day: 75, minLevel: 31, maxLevel: 75 },
    { day: 80, minLevel: 33, maxLevel: 79 },
    { day: 85, minLevel: 35, maxLevel: 83 },
    { day: 90, minLevel: 37, maxLevel: 87 },
    { day: 95, minLevel: 39, maxLevel: 91 },
    { day: 100, minLevel: 41, maxLevel: 95 },
    { day: 105, minLevel: 43, maxLevel: 97 },
    { day: 110, minLevel: 45, maxLevel: 99 },
    { day: 115, minLevel: 47, maxLevel: 100 },
    { day: 120, minLevel: 50, maxLevel: 100 }
    //在这后面添加阶段
];

function getStageInfo(day) {
    for (let i = LevelStages.length - 1; i >= 0; i--) {
        if (day >= LevelStages[i].day) {
            return LevelStages[i];
        }
    }
    return LevelStages[0];
}

function checkStageChange(server, day) {
    let serverData = server.getPersistentData();
    let lastDay = serverData.getInt('mobLevelLastDay');
    let lastStage = getStageInfo(lastDay);
    let currentStage = getStageInfo(day);
    
    if (currentStage.day > lastStage.day) {
        let foundNext = false;
        let playerList = server.getPlayers();
        for (let i = 0; i < LevelStages.length; i++) {
            if (LevelStages[i].day > day) {
                let daysRemaining = LevelStages[i].day - day;
                playerList.forEach(player => {
                    player.tell(Text.of(`§6[怪物等级系统] §e已进入新阶段！怪物等级范围: ${currentStage.minLevel}-${currentStage.maxLevel}级`));
                    player.tell(Text.of(`§6[怪物等级系统] §7距离下一阶段还有 §c${daysRemaining} §7天`));
                });
                foundNext = true;
                break;
            }
        }
        if (!foundNext) {
            playerList.forEach(player => {
                player.tell(Text.of(`§6[怪物等级系统] §e已进入最终阶段！怪物等级范围: ${currentStage.minLevel}-${currentStage.maxLevel}级`));
            });
        }
        serverData.putInt('mobLevelLastDay', day);
    }
}

function getEntityCategory(entity) {
    if (entity.isMonster()) {
        return 'hostile';
    }
    if (entity.isAnimal()) {
        return 'passive';
    }
    let id = String(entity.type);
    if (id.includes('golem') || id.includes('wolf') || id.includes('bee')) {
        return 'neutral';
    }
    return 'hostile';
}

function getNearestPlayerSpawn(server, entityPos, dimension) {
    let players = server.getPlayers();
    let nearestDist = Infinity;
    let nearestSpawn = null;
    
    players.forEach(player => {
        if (String(player.level.dimension) === String(dimension)) {
            let spawnBlock = player.getSpawnLocation();
            if (spawnBlock) {
                let spawnPos = {
                    x: spawnBlock.x,
                    y: spawnBlock.y,
                    z: spawnBlock.z
                };
                let dx = entityPos.x - spawnPos.x;
                let dy = entityPos.y - spawnPos.y;
                let dz = entityPos.z - spawnPos.z;
                let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearestSpawn = spawnPos;
                }
            }
        }
    });
    
    return { pos: nearestSpawn, dist: nearestDist };
}

function isInSafeZone(entity, server) {
    let entityPos = {
        x: entity.x,
        y: entity.y,
        z: entity.z
    };
    let dimension = entity.level.dimension;
    let spawnInfo = getNearestPlayerSpawn(server, entityPos, dimension);
    
    if (!spawnInfo.pos) {
        return false;
    }
    
    return spawnInfo.dist <= MobConfig.safeZoneRadius;
}

ServerEvents.tick(event => {
    let server = event.server;
    let tickCount = server.getTickCount();
    if (tickCount % 1200 === 0) {
        let overworld = server.getOverworld();
        let gameTime = overworld ? overworld.dayTime() : 0;
        let day = Math.floor(gameTime / 24000);
        checkStageChange(server, day);
    }
});

EntityEvents.spawned(event => {
    const Bosslist = {
        'minecraft:ender_dragon': 100
        //在这后面添加boss等级
    };
    let entity = event.entity;
    if (!entity.isLiving() || entity.type === 'minecraft:player') return;
    let id = entity.type;
    let modId = id.split(':')[0];
    if (ModBlacklist.includes(modId)) {
        //console.log(`[Mob Debug] 模组排除: ${id} (模组: ${modId})`);
        return;
    }
    let nbt = entity.persistentData;
    //console.log(`[Mob Debug] 实体生成: ${id}`);
    let levelObj = entity.level;
    let server = entity.getServer();
    let overworld = server.getOverworld();
    let gameTime = overworld ? overworld.dayTime() : (levelObj.dayTime ? levelObj.dayTime() : 0);
    let day = Math.floor(gameTime / 24000);
    let mobLevel;
    let category = getEntityCategory(entity);
    let categoryMult = MobConfig.categoryMultiplier[category] || MobConfig.categoryMultiplier.hostile;
    
    if (Bosslist[id]) {
        let bossConfig = Bosslist[id];
        mobLevel = typeof bossConfig === 'number' ? bossConfig : bossConfig.level;
        nbt.putInt('mobLevel', mobLevel);
        //console.log(`[Mob Debug] Boss处理: ${id}, 等级: ${mobLevel}`);
    } else {
        let inSafeZone = isInSafeZone(entity, server);
        let stageInfo = getStageInfo(day);
        let maxLevel = stageInfo.maxLevel;
        let minLevel = stageInfo.minLevel;
        
        if (inSafeZone) {
            mobLevel = MobConfig.safeZoneLevel;
            //console.log(`[Mob Debug] 安全区怪物: ${id}, 等级: ${mobLevel}`);
        } else {
            mobLevel = nbt.getInt('mobLevel');
            let oldLvl = mobLevel;
            //console.log(`[Mob Debug] 实体: ${id}, 游戏时间: ${gameTime}, 天数: ${day}, 最小等级: ${minLevel}, 最大等级: ${maxLevel}, 原有等级: ${oldLvl}, 维度: ${levelObj.dimension}`);
            if (mobLevel <= 0 || mobLevel < minLevel || mobLevel > maxLevel) {
                mobLevel = minLevel + Math.floor(Math.random() * (maxLevel - minLevel + 1));
                //console.log(`[Mob Debug] 重新生成等级: ${oldLvl} -> ${mobLevel}`);
            } else {
                //console.log(`[Mob Debug] 保留原有等级: ${mobLevel}`);
            }
            if (mobLevel > maxLevel) {
                //console.log(`[Mob Debug] 等级超限，限制到: ${maxLevel}`);
                mobLevel = maxLevel;
            }
        }
        nbt.putInt('mobLevel', mobLevel);
        //console.log(`[Mob Debug] 最终结果: ${id}, 等级: ${mobLevel}, 类别: ${category}`);
    }
    let baseName = entity.displayName ? entity.displayName.string : String(entity.type);
    nbt.putString('baseName', baseName);
    let dimMul = MobConfig.dimensionMultiplier.overworld;
    let dim = String(levelObj.dimension);
    if (dim.includes('the_nether')) dimMul = MobConfig.dimensionMultiplier.nether;
    if (dim.includes('the_end')) dimMul = MobConfig.dimensionMultiplier.end;
    let baseMax = entity.getMaxHealth();
    if (baseMax > 0) {
        let levelMul = 1 + mobLevel * MobConfig.healthPerLevel * categoryMult.health;
        let hp = baseMax * levelMul * dimMul;
        entity.setMaxHealth(hp);
        entity.setHealth(hp);
    }
    try {
        let atkBase = entity.getAttributeBaseValue('minecraft:generic.attack_damage');
        if (atkBase && atkBase > 0) {
            let atkMul = 1 + mobLevel * MobConfig.attackPerLevel * categoryMult.attack;
            entity.setAttributeBaseValue('minecraft:generic.attack_damage', atkBase * atkMul);
        }
    } catch (e) {
    }
});

EntityEvents.hurt(event => {
    let entity = event.entity;
    if (!entity.isLiving() || entity.type === 'minecraft:player') return;
    let id = entity.type;
    let modId = id.split(':')[0];
    if (ModBlacklist.includes(modId)) {
        return;
    }
    let nbt = entity.persistentData;
    let lvl = nbt.getInt('mobLevel');
    if (lvl <= 0) return;
    let max = Math.floor(entity.getMaxHealth());
    let cur = Math.floor(entity.getHealth());
    if (max <= 0) return;
    if (cur >= max) {
        entity.setCustomName(null);
        return;
    }
    let levelObj = entity.level;
    let server = entity.getServer();
    let overworld = server.getOverworld();
    let gameTime = overworld ? overworld.dayTime() : (levelObj.dayTime ? levelObj.dayTime() : 0);
    let day = Math.floor(gameTime / 24000);
    let stageInfo = getStageInfo(day);
    let maxLevel = stageInfo.maxLevel;
    let tier;
    let color;
    if (lvl >= maxLevel * 0.67) {
        tier = '高阶';
        color = 0xFF5555;
    } else if (lvl >= maxLevel * 0.33) {
        tier = '中阶';
        color = 0xFFFF55;
    } else {
        tier = '低阶';
        color = 0x55FF55;
    }
    let baseName = nbt.getString('baseName');
    if (!baseName || baseName.length === 0 || baseName.includes('Lv.') || baseName.includes('低阶') || baseName.includes('中阶') || baseName.includes('高阶')) {
        baseName = String(entity.type);
        nbt.putString('baseName', baseName);
    }
    entity.setCustomName(null);
    let name = baseName;
    let text = Text.of('[' + tier + ' Lv.' + lvl + '] ' + name + ' ' + cur + '/' + max).color(color);
    entity.setCustomName(text);
});