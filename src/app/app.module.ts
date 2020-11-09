import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogUserprofileComponent } from './dialog-userprofile/dialog-userprofile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatTabsModule } from '@angular/material/tabs';
import { DialogGistComponent } from './dialog-gist/dialog-gist.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogUserprofileComponent,
    DialogGistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTabsModule
  ], 
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogUserprofileComponent]
})
export class AppModule { }
