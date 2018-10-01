import { Component, OnInit } from '@angular/core';
import {BitcoinService} from '../services/bitcoin.service'
import {ShareService} from '../services/share.service'
import {environment} from '../../environments/environment'
@Component({
  selector: 'app-txhistory',
  templateUrl: './txhistory.component.html',
  styleUrls: ['./txhistory.component.css']
})
export class TxhistoryComponent implements OnInit {
  detailUrl = ''
  txs =[]
  constructor(private bitcoin: BitcoinService, private share: ShareService) {
      if(environment.node == 'mainnet') {
        this.detailUrl  = 'https://live.blockcypher.com/btc/tx/'
      } else {
        this.detailUrl =  'https://live.blockcypher.com/btc-testnet/tx/'
      }
   }

  ngOnInit() {
    this.bitcoin.getTxsList(this.share.user.wallet)
      .then((txs: any) => {
        this.txs = this.bitcoin.beautifyTxsList(txs, this.share.user.wallet)
        console.log(this.txs[0])
      })
  }

}
