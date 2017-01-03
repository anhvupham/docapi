import { MessageService } from './services/message.service';
import { MainModule } from './main/main.module';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent,  } from './main/main.component';
import { LogoutDialog, ConfirmDialog, DeleteDialog } from './main/dialog/dialog.component';
import { app_routing } from './app.router';
import { AuthGuard } from './services/gaurd.service';
import 'hammerjs';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [ 
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    LogoutDialog,
    ConfirmDialog,
    DeleteDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    app_routing,
    MainModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard, AuthService, MessageService],
  bootstrap: [AppComponent],
  entryComponents: [LogoutDialog, ConfirmDialog, DeleteDialog]
})
export class AppModule { }
