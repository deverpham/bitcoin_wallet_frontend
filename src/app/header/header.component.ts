import { Component, OnInit, OnChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {StorageService} from '../services/storage.service'
import {ShareService} from '../services/share.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private storage: StorageService, 
    private router: Router, 
    private change: ChangeDetectorRef,
    public share: ShareService) { }

  logout() {
    this.storage.destroyUser();
    this.share.updateUser(false);
    this.change.detectChanges();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    console.log(this.share.user)
  }
}
