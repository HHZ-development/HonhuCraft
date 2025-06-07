craftingTable.removeByName("tacz:gun_smith_table"); //删除枪械工作台
val ammo_68x51mm = <item:tacz:ammo>.withTag({AmmoId: "tacz:68x51fury"});
val ammo_9mm = <item:tacz:ammo>.withTag({AmmoId: "tacz:9mm"}); //已注册
val ammo_338 = <item:tacz:ammo>.withTag({AmmoId: "tacz:338"}); //已注册
val ammo_308 = <item:tacz:ammo>.withTag({AmmoId: "tacz:308"}); //已注册
val ammo_357 = <item:tacz:ammo>.withTag({AmmoId: "tacz:357mag"}); //已注册
val ammo_46x30 = <item:tacz:ammo>.withTag({AmmoId: "tacz:46x30"}); //未注册
val ammo_45acp = <item:tacz:ammo>.withTag({AmmoId: "tacz:45acp"}); //已注册
val ammo_50bmg = <item:tacz:ammo>.withTag({AmmoId: "tacz:50bmg"}); //已注册
val ammo_12g = <item:tacz:ammo>.withTag({AmmoId: "tacz:12g"}); //已注册
val ammo_30_06 = <item:tacz:ammo>.withTag({AmmoId: "tacz:30_06"}); //未注册
val ammo_50ae = <item:tacz:ammo>.withTag({AmmoId: "tacz:50ae"}); //未注册
val ammo_magnum_r = <item:tacz:ammo>.withTag({AmmoId: "tacz:magnum_r"});
val ammo_rpg_rocket = <item:tacz:ammo>.withTag({AmmoId: "tacz:rpg_rocket"}); //已注册
val ammo_762x25 = <item:tacz:ammo>.withTag({AmmoId: "tacz:762x25"}); //未注册
val ammo_556x45 = <item:tacz:ammo>.withTag({AmmoId: "tacz:556x45"}); //已注册
val ammo_58x42 = <item:tacz:ammo>.withTag({AmmoId: "tacz:58x42"}); //未注册
val ammo_762x39 = <item:tacz:ammo>.withTag({AmmoId: "tacz:762x39"}); //已注册
val ammo_762x54 = <item:tacz:ammo>.withTag({AmmoId: "tacz:762x54"}); //未注册
val ammo_127x55 = <item:tacz:ammo>.withTag({AmmoId: "nitrogen:127x55"}); //已注册（附属包）
val ammo_9x21 = <item:tacz:ammo>.withTag({AmmoId: "nitrogen:9x21"}); //已注册（附属包）
val ammo_9x39 = <item:tacz:ammo>.withTag({AmmoId: "nitrogen:9x39"}); //已注册（附属包）
val ammo_x16sg = <item:tacz:ammo>.withTag({AmmoId: "emxarms:x16sg"}); //已注册（附属包）
val ammo_339x57 = <item:tacz:ammo>.withTag({AmmoId: "emxarms:339x57"}); //已注册（附属包）
val ammo_1045x103 = <item:tacz:ammo>.withTag({AmmoId: "emxarms:1045x103"}); //已注册（附属包）
val ammo_402x31 = <item:tacz:ammo>.withTag({AmmoId: "emxarms:402x31"}); //已注册（附属包）
val ammo_410x57ap = <item:tacz:ammo>.withTag({AmmoId: "emxarms:410x57ap"}); //已注册（附属包）
val ammo_pistol = <item:tacz:ammo>.withTag({AmmoId: "helldiver2:pistol_normal"}); //已注册（附属包）
val ammo_rifle = <item:tacz:ammo>.withTag({AmmoId: "helldiver2:rifle_normal"}); //已注册（附属包）
val ammo_rifle_ap = <item:tacz:ammo>.withTag({AmmoId: "helldiver2:rifle_ap"}); //已注册（附属包）
val ammo_shotgun = <item:tacz:ammo>.withTag({AmmoId: "helldiver2:shotgun_normal"}); //已注册（附属包）
val ammo_explode = <item:tacz:ammo>.withTag({AmmoId: "helldiver2:explode_ap"}); //已注册（附属包）
val ammo_75x52mm = <item:tacz:ammo>.withTag({AmmoId: "qkl:rb10"}); //已注册（附属包）
val ammo_firefox = <item:tacz:ammo>.withTag({AmmoId: "fire_fox:fire_fox_ammo"}); //已注册（附属包）

craftingTable.addShaped("9mmm", ammo_9mm*2, [
    [<item:create:copper_nugget>],
    [<item:minecraft:gunpowder>*2],
    [<item:create:copper_sheet>]
]);

craftingTable.addShaped("12g", ammo_12g*2, [
    [<item:minecraft:iron_nugget>*4],
    [<item:minecraft:gunpowder>*2],
    [<item:create:copper_sheet>]
]);

craftingTable.addShaped("308", ammo_308*4, [
    [<item:minecraft:lapis_lazuli>*2],
    [<item:minecraft:gunpowder>*4],
    [<item:create:copper_sheet>*6]
]);

craftingTable.addShaped("50bmg", ammo_50bmg, [
    [<item:minecraft:iron_ingot>*4],
    [<item:minecraft:gunpowder>*6],
    [<item:create:copper_sheet>*9,<item:minecraft:blaze_rod>]
]);

craftingTable.addShaped("rpg", ammo_rpg_rocket*2, [
    [<item:minecraft:iron_ingot>*12],
    [<item:minecraft:gunpowder>*24]
]);

craftingTable.addShaped("7.62x39mm", ammo_762x39*12, [
    [<item:create:copper_nugget>*8],
    [<item:minecraft:gunpowder>*7],
    [<item:create:copper_sheet>*6]
]);

craftingTable.addShaped("5.56x45mm", ammo_556x45*12, [
    [<item:create:copper_nugget>*8],
    [<item:minecraft:gunpowder>*6],
    [<item:create:copper_sheet>*6]
]);

craftingTable.addShaped(".45mm", ammo_45acp*6, [
    [<item:create:copper_nugget>*2],
    [<item:minecraft:gunpowder>*4],
    [<item:create:copper_sheet>*3]
]);

craftingTable.addShaped(".338", ammo_338*4, [
    [<item:minecraft:lapis_lazuli>*6],
    [<item:minecraft:gunpowder>*8],
    [<item:create:copper_sheet>*4]
]);

craftingTable.addShaped(".357", ammo_357*12, [
    [<item:create:copper_nugget>*9],
    [<item:minecraft:gunpowder>*8],
    [<item:create:copper_sheet>*6]
]);

craftingTable.addShaped(".50ae", ammo_50ae*4, [
    [<item:create:copper_nugget>*8],
    [<item:minecraft:gunpowder>*6],
    [<item:create:copper_sheet>*2]
]);

//从以下开始均为tacz的附属包

craftingTable.addShaped("127x55mm", ammo_127x55*8, [
    [<item:create:copper_nugget>*6],
    [<item:minecraft:gunpowder>*8,<item:minecraft:flint>*5],
    [<item:create:copper_sheet>*9,<item:minecraft:iron_ingot>*8]
]);

craftingTable.addShaped("9x21mm", ammo_9x21*12, [
    [<item:create:copper_nugget>*8],
    [<item:minecraft:gunpowder>*12,<item:minecraft:flint>*4],
    [<item:create:copper_sheet>*7,<item:minecraft:iron_ingot>*9]
]);

craftingTable.addShaped("9x39", ammo_9x39*6, [
    [<item:create:copper_nugget>*9],
    [<item:minecraft:gunpowder>*8,<item:minecraft:flint>*5],
    [<item:create:copper_sheet>*2,<item:minecraft:iron_ingot>*11]
]);

craftingTable.addShaped("x16sg", ammo_x16sg*3, [
    [<item:minecraft:iron_nugget>*6],
    [<item:minecraft:gunpowder>*2,<item:minecraft:coal>*4],
    [<item:create:copper_sheet>*4,<item:minecraft:iron_ingot>*2,<item:minecraft:redstone>*4]
]);

craftingTable.addShaped("339x57mm", ammo_339x57*7, [
    [<item:minecraft:iron_nugget>*8],
    [<item:minecraft:gunpowder>*6,<item:minecraft:coal>*9],
    [<item:create:copper_sheet>*7,<item:minecraft:iron_ingot>*4,<item:minecraft:redstone>*8]
]);

craftingTable.addShaped("1045x103mm", ammo_1045x103*4 ,[
    [<item:minecraft:iron_nugget>*6],
    [<item:minecraft:gunpowder>*3,<item:minecraft:coal>*6],
    [<item:create:copper_sheet>*4,<item:minecraft:iron_ingot>*2,<item:minecraft:redstone>*6]
]);

craftingTable.addShaped("402x31mm", ammo_402x31*5 ,[
    [<item:minecraft:iron_nugget>*6],
    [<item:minecraft:gunpowder>*5,<item:minecraft:coal>*6],
    [<item:create:copper_sheet>*4,<item:minecraft:iron_ingot>*3,<item:minecraft:redstone>*8]
]);

craftingTable.addShaped("410x57mm", ammo_410x57ap*4 ,[
    [<item:minecraft:iron_nugget>*6],
    [<item:minecraft:gunpowder>*4,<item:minecraft:coal>*3,<item:minecraft:blaze_powder>],
    [<item:create:copper_sheet>*2,<item:minecraft:iron_ingot>*3,<item:minecraft:redstone>*2]
]);

craftingTable.addShaped("pistol", ammo_pistol*7, [
    [<item:minecraft:iron_nugget>*8],
    [<item:minecraft:gunpowder>*6,<item:minecraft:coal>*4],
    [<item:create:copper_sheet>*4,<item:minecraft:blaze_powder>*2]
]);

craftingTable.addShaped("rifle", ammo_rifle*6, [
    [<item:minecraft:iron_nugget>*6],
    [<item:minecraft:gunpowder>*4,<item:minecraft:coal>*6],
    [<item:create:copper_sheet>*4,<item:minecraft:blaze_powder>*3]
]);

craftingTable.addShaped("rifle_ap", ammo_rifle_ap*6, [
    [<item:minecraft:iron_nugget>*8],
    [<item:minecraft:gunpowder>*4,<item:minecraft:coal>*6],
    [<item:create:copper_sheet>*4,<item:minecraft:blaze_powder>*2]
]);

craftingTable.addShaped("shotgun", ammo_shotgun*6, [
    [<item:minecraft:iron_nugget>*12],
    [<item:minecraft:gunpowder>*6,<item:minecraft:coal>*16],
    [<item:create:copper_sheet>*4,<item:minecraft:blaze_powder>*2]
]);

craftingTable.addShaped("explode", ammo_explode, [
    [<item:minecraft:iron_nugget>*8],
    [<item:minecraft:gunpowder>*4,<item:minecraft:coal>*6],
    [<item:create:copper_sheet>*2,<item:minecraft:blaze_powder>*2]
]);

craftingTable.addShaped("75x52mm", ammo_75x52mm, [
    [<item:minecraft:iron_nugget>],
    [<item:minecraft:gunpowder>],
    [<item:create:copper_sheet>]
]);

craftingTable.addShaped("firefox", ammo_firefox, [
    [<item:minecraft:redstone>*32],
    [<item:minecraft:cobblestone>*32],
    [<item:minecraft:experience_bottle>*8,<item:minecraft:blaze_powder>*16]
]);