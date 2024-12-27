import { Component, OnInit } from '@angular/core';
import { ContaService } from '../../../services/conta.service';
@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrl: './contas.component.css',
})
export class ContasComponent implements OnInit {
  visible: boolean = false;

  constructor(private contaService: ContaService) {}

  ngOnInit(): void {
    this.showUser();
  }

  showUser() {
    console.log('oi');
    this.contaService.getUsers().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  showDialog() {
    this.visible = true;
  }
}
