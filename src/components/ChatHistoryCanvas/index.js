import { MessageListItem } from '@twilio/flex-ui';
import React from 'react';

// It is recommended to keep components stateless and use redux for managing states
const ChatHistoryCanvas = (props) => {
  console.log("ChatHistoryCanvas", props)

  const createChatBubbles = () => {
    const chat = props.transcript.messages.map(message => {
      return (<tr>
        <span>{message.origin}</span><br />
        <span>{message.body}</span>
      </tr >
      )
    })

    return <table>{chat}</table>
  }

  return (
    createChatBubbles()
  );
};


export default ChatHistoryCanvas;
