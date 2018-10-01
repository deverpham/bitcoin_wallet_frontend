import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {routes, Guard} from './app.routes'
import {FormsModule} from '@angular/forms';
import { SendComponent } from './send/send.component';
import {HttpModule} from '@angular/http';
import { TxhistoryComponent } from './txhistory/txhistory.component';
import { RetypepasswordDirective } from './directives/retypepassword.directive';
import { AmountDirective } from './directives/amount.directive';
import { AddressDirective } from './directives/address.directive';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SendComponent,
    TxhistoryComponent,
    RetypepasswordDirective,
    AmountDirective,
    AddressDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    FormsModule,
    CommonModule,
    HttpModule
  ],
  providers: [Guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
