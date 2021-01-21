import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../../context/UserContext";

// import config from "./config";
import io from "socket.io-client";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import BottomBar from "../../BottomBar";
import "./Messager.css";



export default function Messager() {
  
  const socket = io("http://localhost:8080");

  const {userData, setUserData} = useContext(UserContext);

  const username = userData.user?.displayName;
  console.log(username);

  const [content, setContent] = useState("");
  const [chats, setChats] = useState([]);

  const scrollToBottom=()=> {
    const chat = document.getElementById("chat");
    chat.scrollTop = chat.scrollHeight;
  }

  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connection Established");
    });
    // Load the last 10 messages in the window.
    socket.on("init", (msg) => {
      let msgReversed = msg.reverse();
      console.log('msg:', msg);
      console.log('msgrev:', msgReversed)
      setChats((chat) => {
        console.log(1, chat);
        console.log(2, ...chats);
        return [...chat, ...msgReversed];
      });
      scrollToBottom();
    });

    // Update the chat if a new message is broadcasted.
    socket.on("push", (msg) => {
      console.log(msg);
      setChats((chat) => {
        console.log(chat);
        return [...chat, msg]; 
      });
      scrollToBottom();
     });
  
}, [])

// Save the message the user is typing in the input field.
const handleContent=(event) =>{
  setContent(event.target.value);
}

//
// function handleName(event) {
//   setUserData(() => {
//     if(!username) return {name: event.target.value}
//   });
// }

const handleName=(event) => {
  setUserData((userData) => ({
    ...userData,
    user: {
      ...userData.user,
      displayName: userData.user.displayName
    }
  }));
}

const handleSubmit=(event)=> {
  // Prevent the form to reload the current page.
  event.preventDefault();

  // Send the new message to the server.
  socket.emit("message", {
    author: username,
    channel_id: 'testing',
    content: content,
  });

  setChats((chat) =>
    // Update the chat with the user's message and remove the current message.
    [...chat, { author: username, content: event.target.value /*state.content*/}]
  );
  
  scrollToBottom();
}

return (
  <div className="App">
    <Paper id="chat" elevation={3}>
      {chats.map((el, index) => {
        return (
          <div key={index}>
            <Typography variant="caption" className="name">
              {el.name}
            </Typography>
            <Typography variant="body1" className="content">
              {el.content}
            </Typography>
          </div>
        );
      })}
    </Paper>
    <BottomBar
      content={content}
      handleContent={handleContent}
      handleName={handleName}
      handleSubmit={handleSubmit}
      name={username}
    />
  </div>
)}


//ref

// class Messager extends React.Component {

//   constructor(props) {
//     const {userData, setUserData} = useContext(UserContext);

//     let history = useHistory();

//     super(props,setUserData);

//     this.state = {
//       chat: [],
//       content: "",
//       name: userData.user ?  userData.user : "",
//     };
//   }

//   componentDidMount() {
    
//   }

//   // Always make sure the window is scrolled down to the last message.
//   scrollToBottom() {
//     const chat = document.getElementById("chat");
//     chat.scrollTop = chat.scrollHeight;
//   }

//   render() {
    // return (
    //   <div className="App">
    //     <Paper id="chat" elevation={3}>
    //       {this.state.chat.map((el, index) => {
    //         return (
    //           <div key={index}>
    //             <Typography variant="caption" className="name">
    //               {el.name}
    //             </Typography>
    //             <Typography variant="body1" className="content">
    //               {el.content}
    //             </Typography>
    //           </div>
    //         );
    //       })}
    //     </Paper>
    //     <BottomBar
    //       content={this.state.content}
    //       handleContent={this.handleContent.bind(this)}
    //       handleName={this.handleName.bind(this)}
    //       handleSubmit={this.handleSubmit.bind(this)}
    //       name={this.state.name}
    //     />
    //   </div>
//     );
//   }
// }

// export default Messager;

