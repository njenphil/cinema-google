import { encode } from "base-64"

// DARJA KEYS
const consumerKey = process.env.SAFARICOM_CONSUMER_KEY //"wldoOpvs4OqLKW7GalBmwcoc9k801RbM"
const consumerSecret = process.env.SAFARICOM_CONSUMER_SECRET //"O9MVaTdOkiZBsc14"

export const generateSafcomAccessToken = async () => {
  const accessTokenUrl = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

  //let headers = new Headers()
  //headers.set("Authorization", "Basic " + base64.encode(consumerKey + ":" + consumerSecret))

  const accessTokenRes = await fetch(accessTokenUrl, {
    headers: new Headers({
      Authorization: "Basic " + encode(consumerKey + ":" + consumerSecret),
      "Content-Type": "application/json"
    })
  })
  const accessTokenResults = await accessTokenRes.json()
  const accessToken = accessTokenResults.access_token
  return accessToken
}
