import Head from "next/head";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {
      auth.signInWithPopup(provider).catch(alert);
  };

  return (
    //container for login page
    <div className="h-screen w-screen bg-slate-300 flex flex-col items-center justify-center">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/whatsapp.png" />
      </Head>

      <div className="flex flex-col justify-center items-center bg-white w-1/5 h-3/5 gap-10  rounded-2xl hover:shadow-xl ">
        <img src="./whatsapp.png" alt="" className="h-64" />
        <Button onClick={signIn} variant="outline" className="w-5/6 ">
          Sign in with google
        </Button>
      </div>
    </div>
  );
}

export default Login;
