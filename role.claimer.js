/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('template');
* mod.thing == 'a thing'; // true
*/

module.exports = {
  run: function(creep) {
    if(creep.room.name == creep.memory.target){
      if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE){
        creep.moveTo(creep.room.controller);
      }
    }
    else {
      let exit = creep.pos.findExitTo(creep.memory.target);
      creep.moveTo(exit);
    }
  }
};
