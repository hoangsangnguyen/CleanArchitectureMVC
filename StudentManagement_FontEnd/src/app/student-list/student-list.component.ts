import { Component, OnInit, OnDestroy } from '@angular/core';
import { Student } from '../shared/student.model';
import { Subscription } from 'rxjs/Subscription';
import { StudentService } from './student.service';
import { Router } from '@angular/router';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs/Observable';
import {process, State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit, OnDestroy {

  students: Student[];
  subscription: Subscription;

  public gridView: GridDataResult;
  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: []
    }
  };
  pageSize = 10;

  public editDataItem: Student;
  public isNew: boolean;

  constructor(private studentService: StudentService,
    private router: Router) { }

  async ngOnInit() {
    this.subscription = this.studentService.studentsChanged
      .subscribe(
        (students: Student[]) => {
          this.students = students;
          this.loadItems();

        }
      );

    await this.studentService.getStudents();
    console.log('Load students');

    this.loadItems();

  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.loadItems();
  }

  public addHandler() {
    this.editDataItem = new Student(null, null, null, null);
    this.isNew = true;
  }

  public editHandler({ dataItem }) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }

  public cancelHandler() {
    this.editDataItem = undefined;
  }

  public async saveHandler(student: Student) {
    if (this.isNew) {
      await this.studentService.createStudent(student);
    } else {
      await this.studentService.updateStudent(student);
    }
    this.editDataItem = undefined;
  }

  public async removeHandler({ dataItem }) {
    console.log('Delete ' + JSON.stringify(dataItem));
    await this.studentService.deleteStudent(dataItem['id']);
  }

  public pageChange(event: PageChangeEvent): void {
    this.gridState.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    if (this.students !== undefined) {
      this.gridView = process(this.students, this.gridState);
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
