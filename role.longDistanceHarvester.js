module.exports = {
	run: function (creep) {
		if(creep.memory.isWorking == true && creep.store[RESOURCE_ENERGY] == 0){
			creep.memory.isWorking = false;
		}
		else if(creep.memory.isWorking == false && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
			creep.memory.isWorking = true;
		}

		if (!creep.memory.isWorking) {

		}
		else {

		}
	}
};
