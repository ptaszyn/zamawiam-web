import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { LoginRequest } from '../../shared/models/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @Input() register: Boolean;
  
  info: any;
  form: any = {};
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

  signIn() {
    this.loginRequest = new LoginRequest(
      this.form.email,
      this.form.password);
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
    this.loginRequest = new LoginRequest(
      this.form.email,
      this.form.password);
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
