import client from "./client";

const endpoint = "/schools";

export const pullSchools = () => {
  return new Promise((resolve, reject) => {
    client.get(endpoint, {kind: 1}).then((res) => {
        if (res.ok)
          resolve(res.data)
        else
          reject(res)
    })
  })
}

export default {
  pullSchools
}