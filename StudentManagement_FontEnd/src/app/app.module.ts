import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { DataStorageService } from './shared/data-storage.service';
import { StudentListComponent } from './student-list/student-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentService } from './student-list/student.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentEditComponent } from './student-list/student-edit/student-edit.component';
import { DialogModule } from '@progress/kendo-angular-dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    StudentListComponent,
    StudentEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule, 
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    DialogModule
  ],
  providers: [StudentService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
