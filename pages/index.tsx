import type { NextPage } from "next";
import Head from "next/head";
import HomeContainer from "../containers/homeContainer";

const Home: NextPage = () => {
  console.log("Home");

  return (
    <>
      <Head>
        <title>Library Managerment</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <HomeContainer />
    </>
  );
};

export default Home;
