import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

      this.form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
    }

  ngOnInit() {
  }

  login(){
    const val = this.form.value

    if (val.email && val.password){
      this.authService.login(val.email, val.password)
        .subscribe(
          () => {
            console.log('user logged in')
            this.router.navigateByUrl("/")
          }
        )
    }
  }


}
