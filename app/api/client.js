import { create } from "apisauce";
import { environment } from '../config/environment';

const apiClient = create({
  baseURL: environment.baseURL,
  headers: {'Authorization': `Token ${environment.apiKey}`}
});

export default apiClient;
