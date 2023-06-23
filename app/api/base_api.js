import client from "./client";

export default class BaseApi {
  constructor(responsibleModel, subModel = '') {
    this.responsibleModel = responsibleModel;
    this.subModel = subModel;
  }

  load = (page, successCallback, failureCallback) => {
    client.get(this.responsibleModel, {page: page})
          .then((res) => {
            if (res.ok)
              successCallback && successCallback(res.data)
            else
              failureCallback && failureCallback(res)
          })
  }
}