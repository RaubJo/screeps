var roles = {
	harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    wallUpgrader: require('role.wallUpgrader'),
    repairer: require('role.repairer'),
		miner: require('role.miner'),
		longDistanceHarvester: require('role.longDistanceHarvester'),
		hauler: require('role.hauler'),
		claimer: require('role.claimer')
};

Creep.prototype.doRole =
  function () {
    roles[this.memory.role].run(this);
  };

Creep.prototype.toggleIsWorking =
	function () {
  	if(this.memory.isWorking == true){
    		this.memory.isWorking = false;
  	}
  	else if(this.memory.isWorking == false){
  		this.memory.isWorking = true;
  	}
		else if(this.memory.isWorking == undefined) {
		console.log(this.name + ": (isWorking) not defined!");
		}
	};

Creep.prototype.getEnergy =
	function() {
		/*let resource = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
		if(resource != undefined){
			if(this.pickup(resource) == ERR_NOT_IN_RANGE){
				this.moveTo(resource);
			}
		}
		else {*/
			let container = this.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (s) => (s.structureType == STRUCTURE_CONTAINER
								|| s.structureType == STRUCTURE_STORAGE)
								&& s.store[RESOURCE_ENERGY] > 0
						});
			if(container != undefined){
				if(this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
					this.moveTo(container);
				}
			}
			else {
				let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
				if(this.harvest(source) == ERR_NOT_IN_RANGE){
					this.moveTo(source);
				}
			}
		//}
	}
