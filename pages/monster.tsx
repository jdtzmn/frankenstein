import { useRef, useEffect } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import axios from 'axios';
import MutationsEmitter from '../src/MutationsEmitter';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
});

interface MonsterProps {
  innerHtml: string
}

export const getServerSideProps: GetServerSideProps<MonsterProps> = async () => {
  const response = await api.get<string>('/monster')
  const innerHtml: string = response.data

  return {
    props: {
      innerHtml
    }
  }
}

function Monster ({ innerHtml }: MonsterProps) {
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
      <div ref={rootDiv} dangerouslySetInnerHTML={{__html: innerHtml}} />
    </>
  );
}

export default Monster;
