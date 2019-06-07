// Bestand voor methodes die in meerdere componenten gebruikt worden

function getRoomName(room, currentUser){
  //De roomname is standaard de naam van de room
  var roomName = room.name

  // Als het een prive chat is, wordt de naam van de room de naam van de andere gebruiker waarmee je chat
  if(room.customData !== undefined){
    roomName = room.customData.userIds.filter(
      id => id !== currentUser.id
    )[0]
  }
  return roomName;
}

export {getRoomName}
