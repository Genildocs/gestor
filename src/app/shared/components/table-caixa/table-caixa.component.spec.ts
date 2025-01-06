import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCaixaComponent } from './table-caixa.component';

describe('TableCaixaComponent', () => {
  let component: TableCaixaComponent;
  let fixture: ComponentFixture<TableCaixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCaixaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
