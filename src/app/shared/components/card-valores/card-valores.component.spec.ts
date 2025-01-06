import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardValoresComponent } from './card-valores.component';

describe('CardValoresComponent', () => {
  let component: CardValoresComponent;
  let fixture: ComponentFixture<CardValoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardValoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardValoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
