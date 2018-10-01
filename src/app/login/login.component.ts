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
  showError = false;
  error = { 
    message: ''
  }
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
    this.http.postToBackend('/login', this.user)
      .then((result: any) => {
        const user = result.payload;
        this.storage.saveUser(user);
        this.share.updateUser(user);
        this.loading = false;
        this.router.navigate(['dashboard'])
      })
      .catch(err => {
          this.loading = false;
          this.showError = true;
          this.error.message = JSON.parse(err._body).payload;
      })
  }

}

interface User {
  email: String,
  password: String
}
