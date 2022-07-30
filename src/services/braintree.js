import braintree from 'braintree';

export function BTGateway() {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: String(process.env.BRAINTREE_MERCHANT_ID),
    publicKey: String(process.env.BRAINTREE_PUBLIC_KEY),
    privateKey: String(process.env.BRAINTREE_PRIVATE_KEY)
  })
  return gateway
}
