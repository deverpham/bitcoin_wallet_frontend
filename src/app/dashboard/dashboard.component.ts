import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service'
import {BitcoinService} from '../services/bitcoin.service';
import * as filter from 'loopback-filters';
import * as shuffle from 'shuffle-array';
import {ShareService} from '../services/share.service'
import {environment} from '../../environments/environment'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: HttpService,
     private bitcoin : BitcoinService,
     private share: ShareService) {
        if(environment.node == 'mainnet') {
          this.detailUrl  = 'https://live.blockcypher.com/btc/tx/'
        } else {
          this.detailUrl =  'https://live.blockcypher.com/btc-testnet/tx/'
        }
      }
  txs: any =  [];
  detailUrl = ''
  totalUsers: any = 0;
  btcSent:any = 0;
  onlines:any = 0;
  ngOnInit() {
    this.http.getToBackend('/analytics', this.share.user.token)
      .then((result:any ) => {
        this.totalUsers = result.payload.total
        this.btcSent  = 0;
        this.onlines = 0;
        this.getTxs(result.payload.wallets);
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
