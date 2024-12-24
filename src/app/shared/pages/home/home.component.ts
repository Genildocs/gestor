import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  data: any;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getUser().subscribe((res) => {
      this.data = res;
      console.log(this.data.usersList[0]);
    });
  }
}
