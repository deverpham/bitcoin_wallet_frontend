import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service'
import {BitcoinService} from '../services/bitcoin.service'
@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  constructor(
    private storage: StorageService,
    private bitcoin: BitcoinService) { }
  user = this.storage.getUser();
  balance = 0;
  lastTrade: any = false;
  ngOnInit() {
    this.bitcoin.getWalletInformation(this.user.wallet).then(result => this.proceed(result) );
  }
  proceed(walletInformation) {
    this.balance = walletInformation.balance/Math.pow(10,8);
    console.log(walletInformation);
    const trades = walletInformation.txs;
    if(trades.length > 0) {
        this.lastTrade = {};
        const lastTrade  = trades[0];
        const input = lastTrade.inputs[0];
        if(input.addresses[0] == walletInformation.address) {
          this.lastTrade.type = 'send'
          const outputs = lastTrade.outputs;
          outputs.map(output => {
            if(output.addresses[0] != walletInformation.address) {
              this.lastTrade.total = output.value/Math.pow(10,8)
              this.lastTrade.address = output.addresses[0]
            }
          })
        } else {
          this.lastTrade.type = 'received'
          const outputs = lastTrade.outputs;
          outputs.map(output => {
            if(output.addresses[0] == walletInformation.address) {
              this.lastTrade.total = output.value/Math.pow(10,8)
              this.lastTrade.address = input.addresses[0]
            }
          })
        }
        this.lastTrade.date = lastTrade.received;
        this.lastTrade.type == 'send' ? this.lastTrade.lable ='Received Address' : this.lastTrade.lable = 'Sender Address'
    }
  }
}
