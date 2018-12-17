import { Student } from "../shared/student.model";

export interface IStudentList {
    getStudents(): void;
    getStudent(id: number);
    createStudent(student: Student): void;
    updateStudent(student: Student): void;
    deleteStudent(id: number): void;
  }