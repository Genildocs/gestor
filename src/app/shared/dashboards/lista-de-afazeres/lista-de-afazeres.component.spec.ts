import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeAfazeresComponent } from './lista-de-afazeres.component';

describe('ListaDeAfazeresComponent', () => {
  let component: ListaDeAfazeresComponent;
  let fixture: ComponentFixture<ListaDeAfazeresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDeAfazeresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeAfazeresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
