import client from "./client";

export default class BaseApi {
  constructor(responsibleModel, subModel = '') {
    this.responsibleModel = responsibleModel;
    this.subModel = subModel;
  }

  load = (page, updatedAt, successCallback, failureCallback) => {
    client.get(this.responsibleModel, {page: page, updated_at: updatedAt})
          .then((res) => {
            if (res.ok)
              successCallback && successCallback(res.data)
            else
              failureCallback && failureCallback(res)
          })
  }
}