import client from "./client";

const endpoint = "/schools";

export const pullSchools = () => {
  return new Promise((resolve, reject) => {
    client.get(endpoint, {kind: 1}).then((res) => {
        if (res.ok) {
          console.log('=== school api OK ==')
          resolve(res.data)
        }
        else {
          console.log('=== school api REJECT ==')
          reject(res)
        }
    })
  })
}

export default {
  pullSchools
}