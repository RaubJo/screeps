var roles = {
	harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    wallUpgrader: require('role.wallUpgrader'),
    repairer: require('role.repairer')
};
module.exports = function() {
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
};
