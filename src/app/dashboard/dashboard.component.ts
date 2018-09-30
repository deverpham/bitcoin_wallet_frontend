import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service'
import {BitcoinService} from '../services/bitcoin.service';
import * as filter from 'loopback-filters';
import * as shuffle from 'shuffle-array';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpService, private bitcoin : BitcoinService) { }
  txs: any =  [];
  totalUsers: any = 0;
  btcSent:any = 0;
  onlines:any = 0;
  ngOnInit() {
    this.http.get('/analytics')
      .then((result:any ) => {
        this.totalUsers = result.registers
        this.btcSent  = result.btcSent;
        this.onlines = result.onlines;
        this.getTxs(result.wallets);
      })
  }
  getTxs(users) {
    Promise.all(users.map(user => {
      return new Promise(resolve => {
        this.bitcoin.getTxsList(user.wallet)
        .then(txs => {
          resolve(this.bitcoin.beautifyTxsList(txs, user.wallet))
        })
      })
    })).then(txss => {
      const txsArray = [];
      txss.map((txs: any) => {
        if(txs.length > 0) {
          txs.map((tx: any) => {
            txsArray.push(tx)
          })
        }
      });
      this.txs = filter(shuffle(txsArray), {
        limit: 10
      });
    })
  }


}
