import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: Http) { }
  private get(url) {
    return new Promise((resolve, reject) => {
        this.http
            .get(url)
            .toPromise()
            .then(response => {
                resolve(response.json())
            })
            .catch(err => {
                reject(err)
            })
    })
}
  getWalletInformation(address) {
    return this.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?limit=1`)
  }
}
