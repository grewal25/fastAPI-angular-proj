import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClubTableComponent } from './club-table/club-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [
    AppComponent,
    ClubTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NzTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
