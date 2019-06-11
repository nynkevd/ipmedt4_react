import React from 'react';

const UnreadMessageCount = (props) => {
  // Als het aantal ongelezen berichten niet 0 is wordt er laten zien hoeveel ongelezen bercihten er zijn
  return props.unreadMessages > 0 &&
      <span className="unreadMessageCount">
        <p className="unreadMessageCount__text">
          {props.unreadMessages}
        </p>
      </span>
}

export default UnreadMessageCount;
