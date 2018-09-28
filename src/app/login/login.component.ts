import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service'
import {Router} from '@angular/router';
import {ShareService} from '../services/share.service'
import {StorageService} from '../services/storage.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  user: User  =  {
    email: '',
    password: ''
  }
  constructor(
    private http: HttpService, 
    private router: Router,
    private storage: StorageService,
    private share: ShareService) { }
  
  ngOnInit() {
    if(this.storage.getUser()) {
      this.router.navigate(['/dashboard'])
    }
  }

  submit() {
    this.loading = true;
    this.http.post('/login', this.user)
      .then(result => {
        this.storage.saveUser(result);
        this.share.updateUser(result);
        this.loading = false;
        this.router.navigate(['dashboard'])
      })
  }

}

interface User {
  email: String,
  password: String
}
