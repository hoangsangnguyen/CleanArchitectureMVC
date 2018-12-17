import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { StudentService } from '../student-list/student.service';
import { Student } from './student.model';
import { IStudentList } from '../student-list/IStudentList';

@Injectable()
export class DataStorageService implements IStudentList {
  
  constructor(private http: Http, private studentService: StudentService) {}

  private domain = "https://localhost:5001/api/";

  async getStudents() {
    await this.http.get(this.domain + 'student')
      .map(
        (response: Response) => {
          const students: Student[] = response.json();
          return students;
        }
      )
      .subscribe(
        (students: Student[]) => {
          this.studentService.setStudents(students);
        }
      );
  }

  async getStudent(id: number) {
     this.http.get(this.domain + `student/${id}`)
    .map(
      (response: Response) => {
        const student: Student = response.json();
        return student;
      }
    )
    .subscribe(
      (student: Student) => {
        return student;
      }
    );
  }
 

  async createStudent(student: Student){
    await this.http.post(this.domain + '/student', student)
      .subscribe(
        (response : Response) => {
          if (response.status == 201) {
            this.studentService.onSuccess();
            this.getStudents();
          } else {
            this.studentService.onFailure(response.statusText);
          }
        }
      );
  }

  async updateStudent(student: Student){
    await this.http.put(this.domain + `/student/${student.Id}`, student)
      .subscribe(
        (response : Response) => {
          if (response.status == 200) {
            this.studentService.onSuccess();
            this.getStudents();
          } else {
            this.studentService.onFailure(response.statusText);
          }
        }
      );
  }
  async deleteStudent(id: number){
    await this.http.delete(this.domain + `/student/${id}`)
      .subscribe(
        (response : Response) => {
          if (response.status == 200) {
            this.studentService.onSuccess();
            this.getStudents();
          } else {
            this.studentService.onFailure(response.statusText);
          }
        }
      );
  }

}
