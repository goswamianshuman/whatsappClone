import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Message({ user, message }) {
  const [userLogedIn] = useAuthState(auth);

  return (
    //container
    <div className="">
      {user === userLogedIn.email ? (
        <p className="w-fit p-4 rounded-md m-2.5 min-w-min relative text-right ml-auto bg-emerald-100">
          {message.message}
          <span className="text-gray-400 bottom-0.5 mr-1  text-xs absolute text-right right-0">
            {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
          </span>
        </p>
      ) : (
        <p className="w-fit p-4 rounded-md m-2.5 min-w-min relative text-left bg-slate-100">
          {message.message}
          <span className="text-gray-400 bottom-0.5 mr-1 text-xs absolute text-right right-0">
            {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
          </span>
        </p>
      )}
    </div>
  );
}

export default Message;
