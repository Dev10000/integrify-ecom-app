import type { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Banner from '../components/Banner';
// import Image from 'next/image';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';
import { axiosMongoApi } from '../utils/axios';

// axios.defaults.baseURL =
//   process.env.NODE_ENV === 'production'
//     ? process.env.NEXT_PUBLIC_MONGO_API_BASE_URL
//     : 'http://localhost:4000';

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

const Home: NextPage<ProductProps> = ({ products, page }) => {
  const router = useRouter();
  console.log('*ROUTER*: ', router);
  return (
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
      <div className="flex flex-grow justify-center p-5">
        <button
          disabled={page <= 0}
          type="button"
          onClick={() => {
            router.push({
              query: {
                ...router.query,
                page: page - 1,
              },
            });
          }}
          className="m-5"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => {
            router.push({
              // pathname: `${router.asPath}`,
              query: {
                ...router.query,
                page: page + 1,
              },
            });
          }}
          className="m-5"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (context: any) => {
  // Next.js trick, fix the header login Hello, user name refresh loading glitch
  const session = await getSession(context);
  const page: number = context.query.page ? context.query.page : 0;
  try {
    let response;
    if (context.query.category) {
      response = await axiosMongoApi.get(
        `/api/v1/products/categories/${encodeURIComponent(
          context.query.category,
        )}`,
        { params: { page: page } },
      );
    } else if (context.query.search) {
      response = await axiosMongoApi.get(
        `/api/v1/products/search/${encodeURIComponent(context.query.search)}`,
        { params: { page: page, limit: 27 } },
      );
    } else {
      response = await axiosMongoApi.get('/api/v1/products/', {
        params: { page: page },
      });
    }
    // const response = context.query.search;
    const products: Products[] = response.data;
    return {
      props: {
        products: products,
        session,
        page: +page,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        products: [],
        session,
        page: +page,
      },
    };
  }
};
