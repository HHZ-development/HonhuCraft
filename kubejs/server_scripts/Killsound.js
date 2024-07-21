EntityEvents.death(event => {
    let entity = event.entity;
    let source = event.source;
    let player = source.getPlayer();

    if (player) {
        try {
            let command = 'playsound minecraft:entity.experience_orb.pickup voice @s[distance=..16] ~ ~ ~ 1 1';
            player.runCommandSilent(command);
        } catch (e) {
            // 这里可以选择记录错误信息，或者采取其他处理措施
        }
    }
});
