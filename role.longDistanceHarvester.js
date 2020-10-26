module.exports = {
	run: function (creep) {
		if(creep.memory.isWorking == true && creep.store[RESOURCE_ENERGY] == 0){
			creep.memory.isWorking = false;
		}
		else if(creep.memory.isWorking == false && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
			creep.memory.isWorking = true;
		}

		if (creep.memory.isWorking) {
			if(creep.room.name == creep.memory.home) {
				var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
					filter: (s) => (s.structureType == STRUCTURE_SPAWN
											|| s.structureType == STRUCTURE_EXTENSION
											|| s.structureType == STRUCTURE_TOWER)
											&& s.energy < s.energyCapacity
				});

				if(structure == undefined) {
					structure = creep.room.storage;
				}

				if(structure != undefined){
					if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
						creep.moveTo(structure);
					}
				}
			}
			else {
				var exit = creep.room.findExitTo(creep.memory.home);
				creep.moveTo(creep.pos.findClosestByRange(exit));
			}
		}
		else {
			if(creep.room.name == creep.memory.target){
				var source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];
				if(creep.harvest(source) == ERR_NOT_IN_RANGE){
					creep.moveTo(source);
				}
			}
			else {
				var exit = creep.room.findExitTo(creep.memory.target);
				creep.moveTo(creep.pos.findClosestByRange(exit));
			}
		}
	}
};
