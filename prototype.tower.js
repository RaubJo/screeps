StructureTower.prototype.defend =
	function() {
		var target = this.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
		if(target != undefined){
			this.attack(target);
		}
	}
