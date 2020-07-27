import Head from 'next/head'
import Link from 'next/link'

function Index () {
  return (
    <>
      <Head>
        <title>Frankenstein Experiment</title>
      </Head>
      <h1>Frankenstein Experiment</h1>
      <Link href="/monster">
        <a>View the creation</a>
      </Link>
    </>
  );
}

export default Index;
