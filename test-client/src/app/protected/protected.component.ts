import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// interface Lesson {
//   l: string;
// }

interface Resp {
  lesson: string[],
  authData: any
}

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  lessons: string[];

  getLesson(){
    this.http.get<Resp>('http://localhost:4001/api/lessons')
      .subscribe(
        (res) => {
          this.lessons = res.lesson          
        }
      )
  }


}
