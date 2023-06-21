import client from "./client";

export default class BaseApi {
  constructor(responsibleModel, subModel = '') {
    this.responsibleModel = responsibleModel;
    this.subModel = subModel;
  }

  load = (successCallback, failureCallback) => {
    client.get(this.responsibleModel)
          .then((res) => {
            if (res.ok)
              successCallback && successCallback(res.data)
            else
              failureCallback && failureCallback(res)
          })
  }
}