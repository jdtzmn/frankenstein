import { useRef, useEffect } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import useSWR from 'swr'
import MutationsEmitter from '../src/MutationsEmitter';
import { api } from './_app'
import { getContent } from '../src/database';

interface MonsterProps {
  innerHtml: string
}

export const getServerSideProps: GetServerSideProps<MonsterProps> = async () => {
  const innerHtml: string = await getContent()

  return {
    props: {
      innerHtml
    }
  }
}

function Monster (props: MonsterProps) {
  const initialInnerHtml = props.innerHtml
  const { data: innerHtml } = useSWR('/monster', undefined, { initialData: initialInnerHtml })
  const rootDiv = useRef(null)

  useEffect(() => {
    const observer = new MutationsEmitter(rootDiv.current)

    observer.on('mutation', () => {
      api.post('/monster', {
        update: rootDiv.current.innerHTML
      });
    });

    return function cleanup() {
      observer.stop()
    };
  });

  return (
    <>
      <Head>
        <title>Frankenstein's Monster</title>
      </Head>
      <div id="root" ref={rootDiv} dangerouslySetInnerHTML={{__html: innerHtml}} />
    </>
  );
}

export default Monster;
