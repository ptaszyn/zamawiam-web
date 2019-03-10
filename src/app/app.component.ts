import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from './core/msg/notification.service';
import { LoginComponent } from './core/auth/modals/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(LoginComponent) public loginComponent: LoginComponent;
  title = 'zamawiam-web';
  username = sessionStorage.getItem('AuthUsername');
  i = 1;
  isErrorResponse = false;
  snacktext: string;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notifications.subscribe(notification => {
      if (notification.title.length > 0) {
        this.isErrorResponse = true;
        this.snacktext = notification.title;
        setTimeout(()=>{this.isErrorResponse = false}, 5000);
      }
    });
  }

  user(): string {
    if (this.username != null) {
      return this.username.substr(0, this.username.indexOf('@'));
    }
    return null;
  }
 
  signOut() {
    window.sessionStorage.clear();
    window.location.reload();
  }

  formReset(){
    this.loginComponent.resetForm();
  }

  myTopnavClick(): void {
    var x = document.getElementById("myTopnav");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }

}
