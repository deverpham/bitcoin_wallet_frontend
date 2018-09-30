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
  getTxsList(address) {
    return new Promise((resolve, reject) => {
      this
      .get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?limit=1000`)
      .then((result: any) =>  {
          const {txs} =result;
          resolve(txs)
        })
      .catch(reject)
    })
  }
  beautifyTxsList(txs, walletaddress) {
    const lists = [];
    txs.map(tx => {
        const trade: any = {}
        const input = tx.inputs[0];
        if(input.addresses[0] == walletaddress) {
          trade.type = 'send';
          const outputs = tx.outputs;
          outputs.map(output => {
            if(output.addresses[0] != walletaddress) {
              trade.total = output.value/Math.pow(10,8)
              trade.address = output.addresses[0]
            }
          })
        } else {
          
          trade.type = 'received'
          const outputs = tx.outputs;
          outputs.map(output => {
            if(output.addresses[0] == walletaddress) {
              trade.total = output.value/Math.pow(10,8)
              trade.address = input.addresses[0]
            }
          })
        }
        trade.date = tx.received;
        trade.confirmations = tx.confirmations;
        trade.hash =tx.hash;
        trade.block_height = tx.block_height
        lists.push(trade);
    })
    return lists;
  }
}
