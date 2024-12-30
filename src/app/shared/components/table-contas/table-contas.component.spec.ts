import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContasComponent } from './table-contas.component';

describe('TableContasComponent', () => {
  let component: TableContasComponent;
  let fixture: ComponentFixture<TableContasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableContasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
