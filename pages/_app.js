import Layout from '../components/layout'
import '../styles/globals.css'
import SEO from '../components/seo'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
       <SEO route={'/'} title={'Spotgen'} description={'Search for your favorite artists and get valuable insights on them'} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
