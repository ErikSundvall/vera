import {
  Component, EventEmitter, OnInit, Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RoleType } from '../models/RoleType';
import { User } from '../models/User';
import { Person } from '../models/Person';
import { UserType } from '../models/UserType';
import { ServerService } from '../services/server.service';
import { SpinnerOverlayComponent } from '../spinner-overlay/spinner-overlay.component';

interface Role {
  value: RoleType;
  viewValue: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  roles: Role[] = [
    { value: RoleType.AssistingNurse, viewValue: 'USK' },
    { value: RoleType.Nurse, viewValue: 'SSK' },
    { value: RoleType.Doctor, viewValue: 'LÄK' },
    { value: RoleType.Administrator, viewValue: 'Admin' },
  ]

  @Output() logInClick = new EventEmitter<any>();

  selectedRole: RoleType;

  userName = new FormControl('', [Validators.required, Validators.nullValidator])

  roleControl = new FormControl('', [Validators.required, Validators.nullValidator]);

  constructor(private serverService: ServerService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async logIn() {
    // Spinner overlay
    const dialogRef: MatDialogRef<SpinnerOverlayComponent> = this.dialog.open(SpinnerOverlayComponent,
      {
        panelClass: 'transparent',
        disableClose: true
      });
    await this.delay(1000);
    console.log(`Selected role:${this.selectedRole}`);
    console.log(`Selected username:${this.userName.value}`);



    this.serverService.getId().subscribe(() => {
      const id = 0;
      const fname = this.userName.value;
      const lname = '';
      const person = new Person(id, fname, lname);
      person.setRoleType(this.selectedRole);
      const user = new User(id, person, UserType.Editor);
    },
    (error) => {
      dialogRef.close();
    },
    () => {
      dialogRef.close();
    });
  }

  getUsernameErrorMessage() {
    if (this.userName.hasError('required')) {
      return 'Du måste skriva in ett användarnamn.';
    }
  }

  getSelectorErrorMessage() {
    if (this.userName.hasError('required')) {
      return 'Du måste välja en roll.';
    }
  }

  getButtonDisabled() {
    return !this.userName.value || !this.selectedRole;
  }
}
