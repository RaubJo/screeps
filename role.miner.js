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
    posx = creep.pos.x;
    posy = creep.pos.y;
    var target = new RoomPosition(creep.memory.coordinates[0],creep.memory.coordinates[1],'W17S21');



    if(posx != creep.memory.coordinates[0] && posy != creep.memory.coordinates[1]){
      const path = Game.rooms['W17S18'].findPath(creep.pos, target.pos);
      new RoomVisual('W1N1').poly(path, {stroke: '#fff', strokeWidth: .15,
      opacity: .2, lineStyle: 'dashed'});

      creep.move(path[0].direction);
    }
    else {
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      creep.harvest(source);
    }
  }
};
