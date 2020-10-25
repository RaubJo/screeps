/* =Description=
A miner will move to specified coordinates and then mine the given sourceId
until the carry part is full, then it will drop the mined energy onto a built
container where harvester creeps will then take the energy to a extension/spawn.

This creep must be able to harvest exactly the amount of energy in the source
that will respawn in the given tick time.

Owned sorces generate 3000 energy per 300 ticks. 3000/300 = 10 and a WORK part
can mine 2 energy per tick 10/2 = 5, therefore the miner must have 5 WORK parts.

body = [WORK,WORK,WORK,WORK,WORK,MOVE] = 550 energy
*/

/*
  memory = {
    isWorking = (False||True),
    role = "miner",
    sourceIndex = "5bbcabf49099fc012e6348e2",
    coordinates = [44,37]
  };
*/


module.exports = {
  run: function (creep) {

    if(creep.pos.x === creep.memory.coordinates[0] && creep.pos.y === creep.memory.coordinates[1]){
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      creep.harvest(source);
    }
    else {
      creep.moveTo(creep.memory.coordinates[0],creep.memory.coordinates[1]);
    }
  }
};
