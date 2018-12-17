import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/shared/student.model';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styles: [
    'input[type=text] { width: 100%; }'
  ]
})
export class StudentEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public active = false;
  public editForm: FormGroup = new FormGroup({
    'id': new FormControl(),
    'firstName': new FormControl('', Validators.required),
    'lastName': new FormControl('', Validators.required),
    'score': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]+')])),
  });

  @Input() public isNew = false;

  @Input() public set model(student: Student) {
    this.editForm.reset(student);

    this.active = student !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<Student> = new EventEmitter();

  public onSave(e): void {
      e.preventDefault();
      this.save.emit(this.editForm.value);
      this.active = false;
  }

  public onCancel(e): void {
      e.preventDefault();
      this.closeForm();
  }

  private closeForm(): void {
      this.active = false;
      this.cancel.emit();
  }
}
