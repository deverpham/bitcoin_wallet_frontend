import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  API = API
  constructor() { }

}

const API  = {
  post: {
    '/login' : {
      email : 'deverpham@gmail.com',
      id : 1,
      wallet: 'mxGMBuZgS3ysHkRBySVmZZjLS3iR1j5dqi',
      token: '123459asd56asd654asd6',
      expired: 1238489
    },
    '/register' : {
      email : 'deverpham@gmail.com',
      id : 1,
      wallet: 'mxGMBuZgS3ysHkRBySVmZZjLS3iR1j5dqi',
      token: '123459asd56asd654asd6',
      expired: 1238489
    }
  }
}
