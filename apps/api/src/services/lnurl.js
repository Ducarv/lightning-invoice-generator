// address, i.e. "user@domain.com"
function addressToUrl(address) {
  const regex = /^([^@]+)@([^@]+)$/
  const addressParts = address.match(regex)

  const username = addressParts[1];
  const domain = addressParts[2];

  return `https://${domain}/.well-known/lnurlp/${username}`
}



console.log(addressToUrl("ducarv@bipa.app"))