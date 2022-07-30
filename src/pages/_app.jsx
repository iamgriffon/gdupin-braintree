import { BraintreeProvider } from "../context/braintree"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <BraintreeProvider>
        <Component {...pageProps} />
      </BraintreeProvider>
    </>
  )
}

export default MyApp
