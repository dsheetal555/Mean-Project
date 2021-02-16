import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  private authStatusSub: Subscription;
  private errorMessage:Subscription;
  error :any;

  constructor(public authService: AuthService) {
    console.log("Hello")







  }

  ngOnInit() {
    this.errorMessage = this.authService.getLoginErrors().subscribe(
      errr => {
          this.error = errr.error.message;
          console.log("this.errorMessage--------------------",this.error);



        }
          );

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
        console.log("this.authStatusSub",this.isLoading)
      });



  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
