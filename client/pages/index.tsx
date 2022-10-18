import type { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import Banner from '../components/Banner';
// import Image from 'next/image';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_BASE_URL
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

export const getServerSideProps = async (context: any) => {
  console.log('context', context);
  console.log('context###################:', context.query.category);
  try {
    let response;
    if (context.query.category) {
      response = await axios.get(
        `/api/v1/products/categories/${encodeURIComponent(
          context.query.category,
        )}`,
      );
    } else if (context.query.search) {
      response = await axios.get(
        `/api/v1/products/search/${encodeURIComponent(context.query.search)}`,
      );
    } else {
      response = await axios.get('/api/v1/products/');
    }
    // const response = context.query.search;
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
