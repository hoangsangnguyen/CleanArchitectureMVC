import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Student } from '../shared/student.model';
import { IStudentList } from './IStudentList';
import { OnRequestListener, ResponseNotify } from '../shared/OnRequestListener';
import { Response, Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StudentListResponse } from './dto/StudentListResponse';
import { StudentResponse } from './dto/StudentResponse';
import { NotificationService } from '@progress/kendo-angular-notification';

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

    constructor(private http: HttpClient, private notificationService: NotificationService) {
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
                        this.showSuccessNotification('Create student successful');
                    } else {
                        this.onFailure(response['results']);
                        this.showErrorNotification('Create student failed');
                    }
                }
            );
    }

    async getStudents() {
        console.log('Before loading students');
        await this.http.get<StudentListResponse>(this.url + 'student')
            .toPromise().then((response: StudentListResponse) => {
                console.log('Student ' + JSON.stringify(response));
                this.setStudents(response['results']);
            });
        console.log('After loading students');
    }

    async getStudent(id: number) {
        let student: any;
        await this.http.get(this.url + `student/${id}`)
            .toPromise().then((response: StudentResponse) => {
                console.log('Student ' + JSON.stringify(response));
                student = response['results'];
            });
        return student;
    }

    async updateStudent(student: Student) {
        console.log('Student save ' + student['id']);
        const id = student['id'];
        await this.http.put(this.url + `student/${id}`, JSON.stringify(student), httpOptions)
            .subscribe(
                (response: Response) => {
                    if (response['success'] === true) {
                        this.onSuccess();
                        this.showSuccessNotification('Update student successful');
                    } else {
                        this.onFailure(response['results']);
                        this.showErrorNotification('Update student failed');
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
                        this.showSuccessNotification('Delete student successful');
                    } else {
                        this.onFailure(response['results']);
                        this.showErrorNotification('Delete student failed');
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

    showSuccessNotification (content: string) {
        this.notificationService.show({
            content: content,
            animation: { type: 'slide', duration: 500 },
            position: { horizontal: 'right', vertical: 'bottom' },
            type: { style: 'success', icon: true },
        });
    }

    showErrorNotification (content: string) {
        this.notificationService.show({
            content: content,
            animation: { type: 'slide', duration: 500 },
            position: { horizontal: 'right', vertical: 'bottom' },
            type: { style: 'error', icon: true },
        });
    }
}
