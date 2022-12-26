
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({children}) {
  return (
    <div className='layout'>
      <Head>
        <title>DCMUGEN</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <mian className='main-container'>
        {children}
      </mian>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}
