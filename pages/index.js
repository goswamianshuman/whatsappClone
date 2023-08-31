import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Whatsapp by anshuman</title>
        <link rel="icon" href="/whatsapp.png" />
      </Head>

       <Sidebar/>
    </div>
  )
}
