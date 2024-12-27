import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContaService } from '../../../services/conta.service';
@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrl: './contas.component.css',
})
export class ContasComponent implements OnInit {
  visible: boolean = false;
  contaForm: FormGroup;

  constructor(private contaService: ContaService, private fb: FormBuilder) {
    this.contaForm = this.fb.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      tipo: ['', Validators.required],
      vencimento: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const contForm = this.contaForm.value;
    console.log(contForm);
    this.contaService.createConta(contForm).subscribe({
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
