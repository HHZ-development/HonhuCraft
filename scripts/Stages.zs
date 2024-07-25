import mods.itemstages.ItemStages;
import mods.redimstages.ReDimensionStages;
ItemStages.createModRestriction("thermal", "thermal");
ItemStages.createModRestriction("mekanism", "mekanism");
ItemStages.createModRestriction("ae2", "ae2");
ReDimensionStages.restrict("minecraft:the_nether", "the_nether");
ReDimensionStages.restrict("pasterdream:dyedream_world", "pasterdream");
ReDimensionStages.restrict("minecraft:the_end", "the_end");
ReDimensionStages.restrictWithMessage("minecraft:the_nether", "你还没完成前置阶段就想越级打怪？等遣返吧你！", "the_nether");
