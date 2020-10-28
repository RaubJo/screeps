var roleRepairer = require('role.repairer');

module.exports = {
	run: function (creep) {
		if(creep.memory.isWorking == true && creep.store[RESOURCE_ENERGY] == 0){
			creep.memory.isWorking = false;
		}
		else if(creep.memory.isWorking == false && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
			creep.memory.isWorking = true;
		}
		if (creep.memory.isWorking) {
			var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			if (constructionSite != undefined) {
				if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
					creep.moveTo(constructionSite);
				}
			}
			else {
				roleRepairer.run(creep);
			}
		}
		else {
		  creep.getEnergy();
		}
	}
};
