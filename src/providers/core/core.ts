import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CoreProvider {

  public token= '';
  public server = '' ;

  public  API_ENDPOINT = {
      API_REST_ENDPOINT: '/ppm/rest/v1',
      API_XOG_ENDPOINT:  '/niku/xog',
      API_AUTHENTICATE : '/ppm/rest/v1/auth/login',
      API_PROJECTS: '/ppm/rest/v1/projects',
      API_RESOURCES: '/ppm/rest/v1/resources',
      API_TASKS: '/ppm/rest/v1/tasks'
  };

  constructor(public http: Http) {
    console.log('Hello CoreProvider Provider');
  }

  //return http post response
  xogHttp(data){
      let serverUrl = this.server + this.API_ENDPOINT.API_XOG_ENDPOINT;
      let headers = new Headers();
      headers.append('Content-Type' , 'text/xml');
      return  this.http.post(serverUrl, data, {headers:headers});
  }

  //return http post response
  authenticate(url, data){
      let serverUrl = url + this.API_ENDPOINT.API_AUTHENTICATE; //this.SERVER_URL().API_URL;
      let headers = new Headers();

      headers.append('Content-Type' , 'application/json');
      headers.append('Authorization', data);

      return  this.http.post(serverUrl,'', {headers:headers});
  }

  get(url){
      let serverUrl =  this.server; //this.SERVER_URL().API_URL;
      let headers = new Headers();

      headers.append('Content-Type' , 'application/json');
      headers.append('authToken', this.token);

      console.log(serverUrl + url);
      console.log(this.token);

      return  this.http.get(serverUrl + url, {headers: headers});
  }

  //return http post response
  post(url, data){
      let serverUrl =  this.server; //this.SERVER_URL().API_URL;
      let headers = new Headers();

      headers.append('Content-Type' , 'application/json');
      headers.append('authToken', this.token);

      return  this.http.post(serverUrl + url, data, {headers:headers});
  }

  //return http post response
  put(url){
      let serverUrl =  this.server;
      let headers = new Headers();

      console.log('token', this.token);
      console.log('url', serverUrl + url);

      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('authToken', this.token);

      return  this.http.put(serverUrl + url, '', {headers:headers});
  }

  //return http post response
  delete(url, data){
      let serverUrl =  this.server;
      let headers = new Headers();

      headers.append('Content-Type' , 'application/json');
      headers.append('authToken', this.token);
      return  this.http.delete(serverUrl + url, {headers:headers} );
  }

  //Manage Storage to Session
  setStorage(key, value){
      localStorage[key] = value;
  }
  getStorage(key, defaultValue) {
      return localStorage[key] || defaultValue;
  }
  setStoreObject(key, value) {
      localStorage[key] = JSON.stringify(value);
  }
  getStoreObject(key) {
      return JSON.parse(localStorage[key] || '{}');
  }

}
