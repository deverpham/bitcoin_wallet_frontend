import { Injectable, OnInit } from '@angular/core';
import {StorageService} from './storage.service'
@Injectable({
  providedIn: 'root'
})
export class ShareService   {
  user = false;
  constructor(private storage: StorageService) { 
    this.user = this.storage.getUser();
  }

  updateUser(user) {
    this.user = user;
  }
}
