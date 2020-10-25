require("prototype.spawn")();
require("prototype.tower")();
require("prototype.creep")();

module.exports.loop = function () {
//Clear up deceased creeps' memory
	for (let name in Memory.creeps) {
		if (Game.creeps[name] == undefined) {
			delete Memory.creeps[name];
		}
	}
//Iterate through each creep in the game
	for (let name in Game.creeps) {
		Game.creeps[name].doRole();
	}

	var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
	for (let tower of towers) {
		tower.defend();
	}

	var spawns = _.filter(Game.structures, s => s.structureType == STRUCTURE_SPAWN);

	var minHarvesters = 2;
	var minBuilders = 2;
	var minUpgraders = 2;
	var minWallUpgraders = 2;
	var minRepairers = 2;
	var minMiners = 1;
	var W18S21_harvester = 1;
	var totalHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
	var totalBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
	var totalUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
	var totalWallUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'wallUpgrader');
	var totalRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
	var totalMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
	var W18S21_harvester_total = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceHarvester' && c.memory.target == "W18S21");

	var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
	var name = undefined;

	if (totalHarvesters < minHarvesters) {
		/*name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
			{ role: 'harvester', isWorking: false});*/
		name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');

		if(name == ERR_NOT_ENOUGH_ENERGY && totalHarvesters == 0){
		    name = Game.spawns.Spawn1.createCustomCreep(Game.spawns.Spawn1.room.energyAvailable, "harvester");
		}
	}
	else if(totalMiners < minMiners){
		name = Game.spawns.Spawn1.createMiner(44,37);
	}
	else if(totalRepairers < minRepairers){
	    name = Game.spawns.Spawn1.createCustomCreep(energy, "repairer");
	}
	else if(totalBuilders < minBuilders){
	    name = Game.spawns.Spawn1.createCustomCreep(energy, "builder");
	}
	else if(totalUpgraders < minUpgraders){
		name = Game.spawns.Spawn1.createCustomCreep(energy, "upgrader");
		}
	else if(totalWallUpgraders < minWallUpgraders){
	    name = Game.spawns.Spawn1.createCustomCreep(energy, "wallUpgrader");
	}
	else if(W18S21_harvester_total < W18S21_harvester){
			name = Game.spawns.Spawn1.createLongDistanceHarvester(energy,3,"W17S21","W18S21",0);
	}

	if (!(name < 0 || name == undefined)) {
			console.log("Spawned new creep: " + name);
	}
	else{}
};
