import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth, db } from "../firebase";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useRef, useState } from "react";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import Timeago from "timeago-react";

function chatscreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput(""); 
    scrolltoBottom();
  };

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getRecipientEmail(chat.users, user);

  const scrolltoBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  };

  return (
    //container
    <div>
      {/* header */}
      <div className="sticky bg-white flex z-50 top-0 p-3 h-20 items-center border-b-yellow-50">
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

        {/* header information */}
        <div className="ml-4 flex-1 ">
          <h3 className="text-xl font-bold  ">{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <Timeago datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active...</p>
          )}
        </div>

        {/* headericons */}
        <div>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* message container */}
      <div className="p-8 bg-red-100 min-h-screen">
        {/* show msgs a function */}
        {showMessages()}
        {/* endofmessage */}
        <div ref={endOfMessagesRef} className="mb-14"/>
      </div>

      {/* input container */}
      <form className="flex items-center p-3 sticky bottom-0 bg-white z-50">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        {/* input */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="enter text here"
          className="flex-1 items-center p-3 sticky bottom-0 bg-white z-50 "
        />
        <button hidden disabled={!input} onClick={sendMessage}>
          send Message
        </button>
        <MicIcon />
      </form>
    </div>
  );
}

export default chatscreen;
