import {Routes, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {TxhistoryComponent} from './txhistory/txhistory.component'
import {SendComponent} from './send/send.component';
import {StorageService} from './services/storage.service';
import {Injectable} from '@angular/core'
import {Router} from '@angular/router';
@Injectable()
export class Guard implements CanActivate  {
    constructor(private storage: StorageService, private router: Router) {}
    canActivate() {
        if(!this.storage.getUser()) {
            this.router.navigate(['/login'])
            return false;
        }
        return true;
    }
}
export const routes : Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'login',
        component:   LoginComponent
    },
    {
        path: 'register',
        component:   RegisterComponent
    },
    {
        path: 'dashboard',
        canActivate : [Guard],
        children: [
            {
                path: 'send',
                component: SendComponent
            },
            {
                path: 'txhistory',
                component: TxhistoryComponent
            },
            {
                path: '',
                component: DashboardComponent,
            }
        ]
    }
]