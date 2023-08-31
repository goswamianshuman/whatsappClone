import Head from "next/head";
import Sidebar from "../../components/sidebar";
import ChatScreen from "../../components/chatscreen";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat({ chat, messages }) {
   const [user] = useAuthState(auth);

  return ( 
    //container
    <div className="flex ">
      <Head>
        <title>Chat with {getRecipientEmail(chat.users,user)}</title>
        <link rel="icon" href="/whatsapp.png" />
      </Head>
      <Sidebar />

      {/*this is a chat container  */}
      <div className="flex-1 overflow-scroll h-screen scroll-m-0  ">
        <ChatScreen chat={chat} messages={messages}/>
      </div>
    </div>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  //PREP the messages on the server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  ///PREP the chats

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  }; 

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
