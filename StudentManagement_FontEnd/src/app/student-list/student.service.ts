import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Student } from '../shared/student.model';
import { IStudentList } from './IStudentList';
import { OnRequestListener, ResponseNotify } from '../shared/OnRequestListener';
import { Response, Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StudentListResponse } from './StudentListResponse';

const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
    })
};

@Injectable()
export class StudentService implements IStudentList, OnRequestListener {

    url = 'http://localhost:59146/api/';

    studentsChanged = new Subject<Student[]>();
    requestStatusChanged = new Subject<ResponseNotify>();

    private students: Student[];

    private headerDict = {
        'Access-Control-Allow-Origin': '*'
    }

    private requestOptions = {
        headers: new Headers(this.headerDict)
    };

    constructor(private http: HttpClient) {
    }

    setStudents(students: Student[]) {
        this.students = students;
        this.studentsChanged.next(this.students.slice());
    }

    async createStudent(student: Student) {
        console.log('Create student ' + JSON.stringify(student));
        await this.http.post(this.url + 'student', student)
            .subscribe(
                (response: Response) => {
                    console.log('Create student response : ' + JSON.stringify(response));
                    if (response['success'] === true) {
                        this.onSuccess();
                    } else {
                        this.onFailure(response['results']);
                    }
                }
            );
    }

    async getStudents() {
        await this.http.get<StudentListResponse>(this.url + 'student')
            .subscribe(
                (response: StudentListResponse) => {
                    console.log('Student ' + JSON.stringify(response));
                    this.setStudents(response['results']);
                }
            );
    }

    async getStudent(id: number) {
        this.http.get(this.url + `student/${id}`)
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

    async updateStudent(student: Student) {
        console.log('Student save ' + student['id']);
        const id = student['id'];
        await this.http.put(this.url + `student/${id}`, JSON.stringify(student), httpOptions)
            .subscribe(
                (response: Response) => {
                    if (response['success'] === true) {
                        this.onSuccess();
                    } else {
                        this.onFailure(response['results']);
                    }
                }
            );
    }

    async deleteStudent(id: number) {
        await this.http.delete(this.url + `student/${id}`)
            .subscribe(
                (response: Response) => {
                    if (response['success'] === true) {
                        this.onSuccess();
                    } else {
                        this.onFailure(response['results']);
                    }
                }
            );
    }

    async onSuccess() {
        const response = new ResponseNotify(true, null);
        await this.getStudents();
        this.requestStatusChanged.next(response);
    }

    onFailure(errorMessage: string): void {
        const response = new ResponseNotify(false, errorMessage);
        this.requestStatusChanged.next(response);
    }
}
