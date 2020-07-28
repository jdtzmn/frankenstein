import Head from 'next/head'
import Link from 'next/link'

function Index () {
  return (
    <>
      <Head>
        <title>Frankenstein Experiment</title>
      </Head>
      <h1>Frankenstein Experiment</h1>
      <p>An experiment with <a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">MutationObserver</a></p>
      <p>Modifying the DOM on the creation page updates the webpage for everyone</p>
      <br/>
      <Link href="/monster">
        <a>View the creation</a>
      </Link>
    </>
  );
}

export default Index;
