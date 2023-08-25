import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { UserInterface } from 'src/app/user-interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  items: MenuItem[] | undefined;
  userNameLogin: string | undefined;
  passwordLogin: string | undefined;
  userName: string | undefined;
  password: string | undefined;
  formGroupLogin!: FormGroup;
  fistName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  dob: string | undefined;
  telephone: string | undefined;
  formGroupSingIn!: FormGroup;
  activeItem: MenuItem | undefined;
  formType: any;
  dataUser!: UserInterface[];
  // messages!: Message[];


  constructor(private _userService: AuthService, private router: Router, private _fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      { label: 'Login', icon: 'pi pi-user' },
      { label: 'Sign Up', icon: 'pi pi-user-plus' }
    ];
    this.activeItem = this.items[0];
    this.formType = "Login";
    this.formGroupLogin = new FormGroup({
      userNameLogin: new FormControl(),
      passwordLogin: new FormControl()
    });
    this.formGroupSingIn = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
      fistName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      dob: new FormControl(),
      telephone: new FormControl()
    });
    this.getUserList();

  }
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    this.formType = event.label;
  }
  accountVerification() {
    // this.getUserList();
    console.log(this.formGroupLogin.value.userName);
    console.log(this.dataUser);
    const result = this.dataUser.find(item => {
      if (item.userName === this.formGroupLogin.value.userNameLogin && item.password === this.formGroupLogin.value.passwordLogin) {
        return true
      } else {
        return false;
      }
    });
    if (result) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Success' });
      // alert("");
      this.router.navigate(['/home']);
    } else {
      // alert("");
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login fail!' });
    }
  }
  getUserList() {
    this._userService.getUserList().subscribe({
      next: (res) => {
        this.dataUser = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  addUserForm() {
    console.log(this.formGroupSingIn.value);

    if (this.formGroupSingIn.value.userName != undefined && this.formGroupSingIn.value.password != undefined) {
      this._userService.addUser(this.formGroupSingIn.value).subscribe({
        next: (val: any) => {
        },
        error: (err: any) => {
          console.error(err)
        }
      });
      // console.log(this.formGroupSingIn.value);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Create User Success' });
      this.getUserList();
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Create User Fail!' });
    }

  }

  navigate(type: string) {
    this.formType = type;
  }
}
