import {create} from 'apisauce';
import {decode as atob, encode as btoa} from 'base-64';
import { environment } from '../config/environment';

const api = create({
  baseURL: environment.apiUrl,
  headers: {
    'Authorization': 'Basic ' + btoa(`${environment['username']}:${environment['password']}`)
  }
});

export default api;
