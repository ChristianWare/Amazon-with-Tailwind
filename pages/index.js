import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next Amazon</title>
        <meta name='description' content='Amazon Clone' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-3xl font-bold'>Hello!</h1>
    </div>
  );
}
