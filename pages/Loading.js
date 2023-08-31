import { Circle } from "better-react-spinkit";
import Head from "next/head";

function loading() {
  return (
    //center element
    <div className="h-screen w-screen bg-slate-300 flex justify-center items-center">
      <Head>
        <title>Loading</title>
        <link rel="icon" href="/whatsapp.png" />
      </Head>
      <div className="flex flex-col items-center justify-center gap-2">
        <img
          src="/whatsapp.png"
          alt=""
          height={150}
          width={150}
          className="mb-3"
        />

        <Circle color="#25D366" size={60} />
      </div>
    </div>
  );
}

export default loading;
