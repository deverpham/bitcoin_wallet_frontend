import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import {environment} from '../../environments/environment'
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
    let url = ''
    if(environment.node =='mainnet') {
      url = `https://api.blockcypher.com/v1/btc/main/addrs/${address}/full?limit=1`
    } else {
      url =`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?limit=1`
    }
    return this.get(url)
  }
  getTxsList(address) {
    let url  = '';
    if(environment.node =='mainnet') {
      url = `https://api.blockcypher.com/v1/btc/main/addrs/${address}/full?limit=1000`
    } else {
      url =`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?limit=1000`
    }
    return new Promise((resolve, reject) => {
      this
      .get(url)
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
