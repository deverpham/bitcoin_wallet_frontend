import { Injectable } from '@angular/core';
import {MockService} from './mock.service';
import {environment} from '../environments/environment'
import { Http, RequestOptions, Headers, ResponseContentType, RequestOptionsArgs } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private mock: MockService, private http: Http) { }
  private initUrl(url) {
      return environment.backendUrl + url;
  }
  post(url, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.mock.API['post'][url])
      }, 300)
    })
  }
  postToBackend(url, data, token = false) {
    var headers= new Headers({})
      if(!token) {
        headers= new Headers({
          "Content-Type": "application/json",
          "Accept": "application/json"
      });
    } else {
      headers = new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `bearer ${token}`
      })
    }
    return new Promise((resolve, reject) => {
        this.http
            .post(this.initUrl(url), data, { headers })
            .toPromise()
            .then(response => {
                resolve(response.json())
            })
            .catch(err => {
                reject(err)
            })
    })
}
getToBackend(url, token = false) {
  var headers= new Headers({})
    if(!token) {
      headers= new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json"
    });
  } else {
    headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `bearer ${token}`
    })
  }
  return new Promise((resolve, reject) => {
      this.http
          .get(this.initUrl(url), { headers })
          .toPromise()
          .then(response => {
              resolve(response.json())
          })
          .catch(err => {
              reject(err)
          })
  })
}
  get(url) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.mock.API['get'][url])
      }, 300)
    })
  }
}
