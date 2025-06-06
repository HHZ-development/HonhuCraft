ServerEvents.recipes(event => {
    // 西瓜汁配方（3x3布局）
    event.shaped('pasterdream:watermelon_juice', [
        'GMM',
        'MMM',
        'MMM'
    ], {
        G: 'pasterdream:glass_cup',
        M: 'minecraft:melon_slice'
    }).id('pasterdream:melon_juice');

    // 蜂蜜汁配方（3x3布局）
    event.shaped('pasterdream:honey_juice', [
        'GHH',
        'HHH',
        'HHH'
    ], {
        G: 'pasterdream:glass_cup',
        H: 'minecraft:honeycomb'
    }).id('pasterdream:honey_juice');

    // 苹果汁配方（3x3布局）
    event.shaped('pasterdream:apple_juice', [
        'GAA',
        'AAA',
        'AAA'
    ], {
        G: 'pasterdream:glass_cup',
        A: 'minecraft:apple'
    }).id('pasterdream:apple_juice');

    // 花茶配方（3x3布局，空位用null填充）
    event.shaped('pasterdream:dyedream_flower_tea_0', [
        'GFC',
        'AHA',
        '   '
    ], {
        G: 'pasterdream:glass_cup',
        F: 'pasterdream:dyedream_corolla',
        C: 'pasterdream:dyedream_leaves',
        A: 'pasterdream:amber_candy',
        H: 'minecraft:honeycomb',
        ' ': null  // 空位占位符
    }).id('pasterdream:flower_tea');
});