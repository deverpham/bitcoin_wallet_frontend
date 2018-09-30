import { Component, OnInit } from '@angular/core';
import {BitcoinService} from '../services/bitcoin.service'
import {ShareService} from '../services/share.service'
@Component({
  selector: 'app-txhistory',
  templateUrl: './txhistory.component.html',
  styleUrls: ['./txhistory.component.css']
})
export class TxhistoryComponent implements OnInit {
  txs =[]
  constructor(private bitcoin: BitcoinService, private share: ShareService) { }

  ngOnInit() {
    this.bitcoin.getTxsList(this.share.user.wallet)
      .then((txs: any) => {
        this.txs = this.bitcoin.beautifyTxsList(txs, this.share.user.wallet)
        console.log(this.txs[0])
      })
  }

}
