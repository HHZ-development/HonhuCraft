val ammo_68x51mm = <item:tacz:ammo>.withTag({AmmoId: "tacz:68x51fury"});
val ammo_9mm = <item:tacz:ammo>.withTag({AmmoId: "tacz:9mm"});
val ammo_338 = <item:tacz:ammo>.withTag({AmmoId: "tacz:338"});
val ammo_308 = <item:tacz:ammo>.withTag({AmmoId: "tacz:308"});
val ammo_357 = <item:tacz:ammo>.withTag({AmmoId: "tacz:357mag"});
val ammo_46x30 = <item:tacz:ammo>.withTag({AmmoId: "tacz:46x30"});
val ammo_45acp = <item:tacz:ammo>.withTag({AmmoId: "tacz:45acp"});
val ammo_50bmg = <item:tacz:ammo>.withTag({AmmoId: "tacz:50bmg"});
val ammo_12g = <item:tacz:ammo>.withTag({AmmoId: "tacz:12g"});
val ammo_30_06 = <item:tacz:ammo>.withTag({AmmoId: "tacz:30_06"});
val ammo_50ae = <item:tacz:ammo>.withTag({AmmoId: "tacz:50ae"});
val ammo_magnum_r = <item:tacz:ammo>.withTag({AmmoId: "tacz:magnum_r"});
val ammo_rpg_rocket = <item:tacz:ammo>.withTag({AmmoId: "tacz:rpg_rocket"});
val ammo_762x25 = <item:tacz:ammo>.withTag({AmmoId: "tacz:762x25"});
val ammo_556x45 = <item:tacz:ammo>.withTag({AmmoId: "tacz:556x45"});
val ammo_58x42 = <item:tacz:ammo>.withTag({AmmoId: "tacz:58x42"});
val ammo_762x39 = <item:tacz:ammo>.withTag({AmmoId: "tacz:762x39"});
val ammo_762x54 = <item:tacz:ammo>.withTag({AmmoId: "tacz:762x54"});

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
    [<item:minecraft:gunpowder>*9,<item:minecraft:blaze_rod>]
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