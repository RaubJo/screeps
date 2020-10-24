var listOfRoles = ['harvester', 'upgrader', 'builder', 'wallUpgrader', 'repairer'];

module.exports = function() {

    StructureSpawn.prototype.createCustomCreep =
    function (energy, roleName) {
        // create a balanced body as big as possible with the given energy
        var numberOfParts = Math.floor(energy / 200);
        // make sure the creep is not too big (more than 50 parts)
        numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
        var body = [];
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }

        // create creep with the created body and the given role
        return this.spawnCreep(body, roleName + '_' + Game.time, { memory: { role: roleName, isWorking: false }});
    };

    StructureSpawn.prototype.createLongDistanceHarvester =
    function (energy, workParts, home, target, sourceIndex) {
        var body = [];
        for(let i = 0; i < workParts; i++){
            body.push(WORK);
        }

        energy -= 150 * workParts;

        var numberOfParts = Math.floor(energy / 100);
        numberOfParts = Math.min(numberOfParts, Math.floor((50 - workParts * 2) /2));
        for(let i = 0; i < numberOfParts; i++){
            body.push(CARRY);
        }
        for(let i = 0; i < numberOfParts + workParts; i++){
            body.push(MOVE);
        }

        return this.spawnCreep(body, roleName + '_' + Game.time, { memory: {
            role: 'longDistanceHarvester',
            home: home,
            target: target,
            sourceIndex: sourceIndex,
            isWorking: false
        }});
    };

    StructureSpawn.prototype.createMiner =
    function (x, y) {
      var body = [WORK,WORK,WORK,WORK,WORK,MOVE,MOVE];
      var roleName = "miner";

      return this.spawnCreep(body, roleName + "_" + Game.time, { memory: {
        role: 'miner',
        coordinates: [x,y]
        sourceIndex: undefined,
        isWorking: false
      }})
    }
};
