import prisma from "../../lib/prisma";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

export const getServerSideProps = async ({ params }) => {
  const alphaTwt = await prisma.alphaTwt.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
  });
  return {
    props: alphaTwt,
  };
};

export default function AlphaTwt(props) {
  console.log(props);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create AlphaTwt</title>
        <meta name="description" content="Generated by AlphaTwt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{props.title}</main>
    </div>
  );
}
