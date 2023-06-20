import client from "./client";

const endpoint = "/schools";

export const pullSchools = (successCallback, failureCallback) => {
  client.get(endpoint)
        .then((res) => {
          if (res.ok)
            successCallback && successCallback(res.data)
          else
            failureCallback && failureCallback(res)
        })
}

export default {
  pullSchools
}