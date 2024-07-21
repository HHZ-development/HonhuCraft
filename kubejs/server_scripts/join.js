PlayerEvents.loggedIn(event => {
    let player = event.player;
    let playerName = player.getName().getString();
    event.server.tell(`<CatGPT> §b欢迎来到这个美丽的世界，${playerName}！愿你的每一天都充满冒险和快乐喵~`);
});