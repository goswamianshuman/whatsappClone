import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getRecipientEmail(users, user);

  return (
    <div onClick={enterChat} className="flex items-center cursor-pointer p-1 break-words hover:rounded-3xl hover:shadow-lg hover:bg-green-100 hover:shadow-neutral-400 ">
      {recipient ? (
        <Avatar src={recipient?.photoURL} className="m-2 mr-4 " />
      ) : (
        <Avatar className="m-2 mr-4 ">{recipientEmail[0]}</Avatar>
      )}
      <p>{recipientEmail}</p>
    </div>
  );
}

export default Chat;
