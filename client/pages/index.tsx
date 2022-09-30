import type { NextPage } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
import Header from '../components/Header';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>eCom MERN Stack</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
  </div>
);

export default Home;
