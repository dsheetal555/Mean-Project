import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  isLoading = false;
  private authStatusSub: Subscription;
  private errorMessage:Subscription;
  error :any;

  constructor(public authService: AuthService) {}

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
      }
    );
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log("heloooooooooo")
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
