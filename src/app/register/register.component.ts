import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service'
import {Router} from '@angular/router';
import {StorageService} from '../services/storage.service'
import {ShareService} from '../services/share.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private http: HttpService,
    private router: Router,
    private storage: StorageService,
    private share: ShareService) { }
  loading = false;
  user:User = {
    email :'',
    phone_number: '',
    password: '',
    re_password : ''
  }

  submit() {
    this.loading = true;
    this.http.post('/register', this.user)
      .then(result => {
        this.storage.saveUser(result)
        this.share.updateUser(result)
        this.loading = false;
        this.router.navigate(['/dashboard'])
      })
  }

  ngOnInit() {
    
    if(this.storage.getUser()) {
      this.router.navigate(['/dashboard'])
    }
  }

  
}
interface User { 
  email: String,
  password: String,
  re_password:String,
  phone_number: String
}
