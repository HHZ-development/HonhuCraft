PlayerEvents.loggedIn(event => {
    const { player } = event;
    const { persistentData } = player;
    
    if (persistentData.initial_gear_given) return;
    
    const gearSet = [
        Item.of('minecraft:wooden_sword', 1),
        Item.of('minecraft:wooden_pickaxe', 1),
        Item.of('minecraft:wooden_axe', 1),
        Item.of('minecraft:wooden_shovel', 1),
        Item.of('minecraft:bread', 16),
        Item.of('minecraft:torch', 32),
        Item.of('minecraft:leather_helmet', 1),
        Item.of('minecraft:leather_chestplate', 1),
        Item.of('minecraft:leather_leggings', 1),
        Item.of('minecraft:leather_boots', 1)
    ];
    gearSet.forEach(item => player.give(item));
    player.giveExperiencePoints(10);
    player.tell(Text.green('<CatGPT> §b ${playerName}你醒了？生存套件已启用请小心喵~'));
    persistentData.initial_gear_given = true;
});