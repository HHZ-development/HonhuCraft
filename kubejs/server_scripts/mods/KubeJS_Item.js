ServerEvents.recipes(event => {
    event.shapeless('kubejs:iron_coin', ['9x kubejs:copper_coin']).id('cti')
    event.shapeless('kubejs:gold_coin', ['9x kubejs:iron_coin']).id('itg')
    event.shapeless('kubejs:diamond_coin', ['9x kubejs:gold_coin']).id('gtd')
    event.shapeless('kubejs:emerald_coin', ['9x kubejs:diamond_coin']).id('dte')
    event.shapeless('kubejs:netherite_coin', ['9x kubejs:emerald_coin']).id('etn')
    event.shapeless('9x kubejs:emerald_coin', ['kubejs:netherite_coin']).id('nte')
    event.shapeless('9x kubejs:diamond_coin', ['kubejs:emerald_coin']).id('etd')
    event.shapeless('9x kubejs:gold_coin', ['kubejs:diamond_coin']).id('dtg')
    event.shapeless('9x kubejs:iron_coin', ['kubejs:gold_coin']).id('gti')
    event.shapeless('9x kubejs:copper_coin', ['kubejs:iron_coin']).id('itc')
});