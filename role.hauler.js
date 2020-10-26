var roleBuilder = require("role.builder");

module.exports = {
	run: function (creep) {
		if(creep.memory.isWorking == true && creep.store[RESOURCE_ENERGY] == 0){
			creep.memory.isWorking = false;
		}
		else if(creep.memory.isWorking == false && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
			creep.memory.isWorking = true;
		}

		if (!creep.memory.isWorking) {
			if(creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES) == undefined){
				var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
					filter: (s) => s.structureType == STRUCTURE_CONTAINER
									|| s.structureType  == STRUCTURE_STORAGE
									&& s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY)
				});
				if (creep.withdraw(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			}
			else {
				if(creep.pickup(FIND_DROPPED_RESOURCES) == ERR_NOT_IN_RANGE){
					creep.moveTo(FIND_DROPPED_RESOURCES);
				}
			}

		}
		else {
			var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (s) => (s.structureType == STRUCTURE_TOWER
							 || s.structureType == STRUCTURE_EXTENSION
							 || s.structureType == STRUCTURE_SPAWN)
							 && s.store[RESOURCE_ENERGY] < s.store.getCapacity(RESOURCE_ENERGY)
			});
			if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(structure);
			}
			if(structure != undefined){
				if(structure.store[RESOURCE_ENERGY] == structure.store.getCapacity()){
					roleBuilder.run(creep);
				}
			}
		}
	}
};
