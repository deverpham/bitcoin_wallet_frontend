import { Injectable } from '@angular/core';
import {MockService} from './mock.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private mock: MockService) { }
  post(url, data) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.mock.API['post'][url])
      }, 300)
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
