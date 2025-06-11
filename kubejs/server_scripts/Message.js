PlayerEvents.loggedIn(event => {
    let player = event.player;
    let playerName = player.getName().getString();
    event.server.tell(`<CatGPT> §b欢迎回来${playerName}！我等你很久啦~`);
});