import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http'
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http'; 
import { RegisterComponent } from './register/register.component';
import { ServerService } from './server.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyANi8VD2Z7Vg7aH4qzFUzYwskRg3vkrprc'
    })
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
