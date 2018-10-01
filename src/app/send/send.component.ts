import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service'
import {BitcoinService} from '../services/bitcoin.service'
import {HttpService} from '../http.service'
import {ShareService} from '../services/share.service'
@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  constructor(
    private storage: StorageService,
    private bitcoin: BitcoinService,
    private api: HttpService,
    private share: ShareService) { }
  showError = false;
  showResult = false;
  loading=  false;
  error = {
    message: ''
  };
  result = {
    message: ''
  }
  user = this.storage.getUser();
  balance = 0;
  lastTrade: any = false;
  sendData = {
    address: '',
    amount : ''
  }
  ngOnInit() {
    this.bitcoin.getWalletInformation(this.user.wallet).then(result => this.proceed(result) );
  }
    copyToClipboard = str => {
      const el = document.createElement('textarea'); 
      el.value = str;                                 
      el.setAttribute('readonly', '');                
      el.style.position = 'absolute';                 
      el.style.left = '-9999px';                      
      document.body.appendChild(el);                  
      const selected =            
        document.getSelection().rangeCount > 0       
          ? document.getSelection().getRangeAt(0)     
          : false;                                   
      el.select();                                    
      document.execCommand('copy');                   
      document.body.removeChild(el);                  
      if (selected) {                                
        document.getSelection().removeAllRanges();    
        document.getSelection().addRange(selected);  
      }
  };
  proceed(walletInformation) {
    this.balance = walletInformation.final_balance/Math.pow(10,8);
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
    } else {
      this.lastTrade = {}
    }
  }
  send() {
    this.loading = true;
    this.api 
    .postToBackend('/send', {
      to: this.sendData.address,
      amount: this.sendData.amount
    }, this.share.user.token)
    .then(result => {
      this.loading = false;
      this.showResult = true;
      this.result.message = 'successfully';
      console.log(result)
    })
    .catch(err => {
      this.loading= false;
      this.showError = true;
      if(err.status == 401) {
        this.error.message = 'user token expired'
      } else {
        const ResponseObject = JSON.parse(err._body).payload;
        if('response' in ResponseObject) {
        this.error.message =ResponseObject.response.text;
        } else {
          this.error.message = ResponseObject;
        }
      }
    })
  }
}
