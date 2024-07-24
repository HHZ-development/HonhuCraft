//帕特斯之梦食物配方
craftingTable.remove(<item:pasterdream:watermelon_juice>); //删除帕特斯之梦西瓜汁
craftingTable.addShaped("melon_juice",<item:pasterdream:watermelon_juice>, [
    [<item:pasterdream:glass_cup>,<item:minecraft:melon_slice>,<item:minecraft:melon_slice>],
    [<item:minecraft:melon_slice>,<item:minecraft:melon_slice>,<item:minecraft:melon_slice>],
    [<item:minecraft:melon_slice>,<item:minecraft:melon_slice>,<item:minecraft:melon_slice>]
]);

craftingTable.remove(<item:pasterdream:honey_juice>);
craftingTable.addShaped("honey_juice",<item:pasterdream:honey_juice>,[
    [<item:pasterdream:glass_cup>,<item:minecraft:honeycomb>,<item:minecraft:honeycomb>],
    [<item:minecraft:honeycomb>,<item:minecraft:honeycomb>,<item:minecraft:honeycomb>],
    [<item:minecraft:honeycomb>,<item:minecraft:honeycomb>,<item:minecraft:honeycomb>]
]);
craftingTable.remove(<item:pasterdream:apple_juice>);
craftingTable.addShaped("apple_juice",<item:pasterdream:apple_juice>,[
    [<item:pasterdream:glass_cup>,<item:minecraft:apple>,<item:minecraft:apple>],
    [<item:minecraft:apple>,<item:minecraft:apple>,<item:minecraft:apple>],
    [<item:minecraft:apple>,<item:minecraft:apple>,<item:minecraft:apple>]
]);
craftingTable.remove(<item:pasterdream:dyedream_flower_tea_0>);
craftingTable.addShaped("flower_tea",<item:pasterdream:dyedream_flower_tea_0>,[
    [<item:pasterdream:glass_cup>,<item:pasterdream:dyedream_corolla>,<item:pasterdream:dyedream_leaves>],
    [<item:pasterdream:amber_candy>,<item:minecraft:honeycomb>,<item:minecraft:apple>]
]);