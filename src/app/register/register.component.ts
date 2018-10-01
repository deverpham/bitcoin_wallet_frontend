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
  showError = false;
  error = {
    message: ''
  }
  user:User = {
    email :'',
    phonenumber: '',
    password: '',
    re_password : ''
  }

  submit() {
    this.loading = true;
    this.http.postToBackend('/register', this.user)
      .then((result: any) => {
        const user = result.payload;
        this.storage.saveUser(user)
        this.share.updateUser(user)
        this.loading = false;
        this.router.navigate(['/dashboard'])
      })
      .catch(err => {
        console.log(err.status)
        if(err.status == 422) {
          this.showError = true;
          this.loading = false;
          this.error.message = "Please enter required field"
        }  else {
          this.showError = true;
          this.loading  = false;
          this.error.message = JSON.parse(err._body).payload;
        }
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
  phonenumber: String
}
