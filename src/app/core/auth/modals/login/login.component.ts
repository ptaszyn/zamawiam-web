import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { LoginRequest } from '../../shared/models/login-request';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @Input() register: Boolean;
  @ViewChild('f') public userFrm: NgForm;
  info: any;
  model: any = {};
  loginRequest: LoginRequest;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthorities()
    };
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  notPassMatch(): boolean {
    return !(this.model.password === this.model.confirmPassword);
  }

  resetForm(){
    this.userFrm.resetForm();
  }

  onSubmit() {
    this.loginRequest = new LoginRequest(
      this.model.email,
      this.model.password);
    if (this.register) {
      if(this.notPassMatch()) return;
      this.signUp();
    } else {
      this.signIn();
    }
  }

  signIn() {
    this.authService.signIn(this.loginRequest).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.email);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  signUp() {
    this.authService.signUp(this.loginRequest).subscribe(
      data => {
        this.signIn();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  ngAfterViewInit(): void {
    // Get the modal
    var modal = document.getElementById('id01');
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {      
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }


}
