module.exports = {
	run: function (creep) {
		if(creep.memory.isWorking == true && creep.store[RESOURCE_ENERGY] == 0){
			creep.memory.isWorking = false;
		}
		else if(creep.memory.isWorking == false && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
			creep.memory.isWorking = true;
		}


		if(creep.memory.isWorking){
			var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (s) => s.hits < s.hitsMax && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)
				});
			if(creep.repair(target) == ERR_NOT_IN_RANGE){
				creep.moveTo(target);
			}
		}
		else {
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if(creep.harvest(source) == ERR_NOT_IN_RANGE){
				creep.moveTo(source);
			}
		}
	}
};
