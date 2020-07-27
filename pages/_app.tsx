import { AppProps } from 'next/app'
import axios from 'axios';
import { SWRConfig } from 'swr'

export const api = axios.create({
  baseURL: '/api'
});

export const fetcher = async (url: string) => {
  const response = await api.get(url)
  return response.data
}

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 10000,
        fetcher
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default App