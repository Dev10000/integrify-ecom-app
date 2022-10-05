import type { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import Banner from '../components/Banner';
// import Image from 'next/image';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.API_BASE_URL
    : 'http://localhost:4000';

type Products = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
};

export type ProductProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const Home: NextPage<ProductProps> = ({ products }) => (
  <div className="bg-gray-100">
    <Head>
      <title>eCom MERN Stack</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <main className="max-w-screen-2xl mx-auto">
      <Banner />

      <ProductFeed products={products} />
    </main>
  </div>
);

export default Home;

export const getServerSideProps = async () => {
  try {
    const response = await axios.get('/api/v1/products/');
    const products: Products[] = response.data;
    return {
      props: {
        products: products,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        products: [],
      },
    };
  }
};
