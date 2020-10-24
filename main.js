require("prototype.spawn")();
require("prototype.tower");
require("prototype.creep");

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
	var totalHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
	var totalBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
	var totalUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
	var totalWallUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'wallUpgrader');
	var totalRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');

	var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
	var name = undefined;

	if (totalHarvesters < minHarvesters) {
		/*name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
			{ role: 'harvester', isWorking: false});*/
		name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');

		if(name == ERR_NOT_ENOUGH_ENERGY && totalHarvesters == 0){
		    name = Game.spawns.Spawn1.createCustomCreep(Game.spawns.Spawn1.room.energyAvailable, "harvester");
		}
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

	if (!(name < 0 || name == undefined)) {
			console.log("Spawned new creep: " + name);
	}
	else{}
};