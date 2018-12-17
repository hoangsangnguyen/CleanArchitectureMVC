import { BaseResponse } from '../shared/BaseResponse';
import { Student } from '../shared/student.model';

export class StudentListResponse implements BaseResponse {
    constructor(public success: boolean, public statusCode: number, public results: Student[]) {
    }
}
