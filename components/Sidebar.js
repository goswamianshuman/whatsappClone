import { Avatar, Button, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MorevertIcon from "@mui/icons-material/MoreVert";
import Search from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import { useRouter } from "next/router";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userchatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userchatRef);
  const router = useRouter();

  const createChat = () => {
    const input = prompt(
      "please enter the email address for the user you wish to chat with"
    );

    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExist(input) &&
      input !== user.email
    ) {
      //we need to add teh chats into the db "chats"
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExist = (recipientEmail) =>
    !!chatsSnapshot?.docs.find((chat) =>
      chat.data().users.find((users) => user === recipientEmail?.length > 0)
    );

  return (
    //main container
    <div className=" border-r border-solid border-r-slate-300 h-screen w-72 overflow-y-scroll ">
      {/* header */}
      <div className="flex items-center justify-between w-full h-16 p-1 sticky bg-white top-0 z-10 border-b border-solid border-b-slate-100">
        <Avatar
          src={user.photoURL}
          onClick={() => {
            auth.signOut();
            router.push("/");
          }}
          className="hover:opacity-80 cursor-pointer"
        />

        {/* icons container */}
        <div className="flex items-center gap-1">
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MorevertIcon />
          </IconButton>
        </div>
      </div>

      {/* search components */}
      <div>
        {/* searchinputs */}
        <div className="flex items-center p-1">
          <Search />
          <input
            type="text"
            placeholder="Enter the chat name"
            className="flex-1 p-1 border-none outline-none "
          />
        </div>
        {/* search button */}
        <Button
          onClick={createChat}
          className="w-full text-black border-solid border-t border-b border-b-slate-100 border-t-slate-100"
        >
          Start a new chat
        </Button>
      </div>

      {/* chat section */}
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </div>
  );
}

export default Sidebar;
