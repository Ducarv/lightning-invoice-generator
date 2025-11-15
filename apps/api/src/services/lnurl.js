// address, i.e. "user@domain.com"
async function addressToUrl(address) {
  const regex = /^([^@]+)@([^@]+)$/
  const addressParts = address.match(regex)

  const username = addressParts[1];
  const domain = addressParts[2];

  return `https://${domain}/.well-known/lnurlp/${username}`
}

// url: https://${domain}/.well-known/lnurlp/${username}
async function generatePaymentRequest(url) {
  const amountMilliSatoshi = 10000

  const validURL = new URL(url)
  const LNURLPay = await fetch(validURL)
  const LNURLPayJSON = await LNURLPay.json()

  const urlWithAmount = new URL(`${LNURLPayJSON.callback}?amount=${amountMilliSatoshi}`)
  const callbackUrl = urlWithAmount.href
  const response = await fetch(callbackUrl)
  
  const paymentResquest = await response.json()
  
  return paymentResquest.pr
}

async function main() {
  const url = await addressToUrl("ducarv@bipa.app");
  const pr = await generatePaymentRequest(url);
  console.log(pr);
}

main();