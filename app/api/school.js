import client from "./client";

const endpoint = "/schools";

export const pullUniversities = () => {
  return new Promise((resolve, reject) => {
    client.get(endpoint, {kind: 1}).then((res) => {
        if (res.ok) {
          console.log('=== school api OK ==')
          resolve(res)
        }
        else {
          console.log('=== school api REJECT ==')
          reject(res)
        }
    })
  })
}

export default {
  pullUniversities
}