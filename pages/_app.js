import Layout from '../components/layout'
import '../styles/globals.css'
import SEO from '../components/seo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <SEO route={'/'} title={'Spotgen'} description={'Search for your favorite artists and get valuable insights on them'} />
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}

export default MyApp
