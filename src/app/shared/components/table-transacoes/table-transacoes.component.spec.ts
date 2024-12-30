import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTransacoesComponent } from './table-transacoes.component';

describe('TableTransacoesComponent', () => {
  let component: TableTransacoesComponent;
  let fixture: ComponentFixture<TableTransacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableTransacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
