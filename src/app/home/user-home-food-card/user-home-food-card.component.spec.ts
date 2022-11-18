import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeFoodCardComponent } from './user-home-food-card.component';

describe('UserHomeFoodCardComponent', () => {
  let component: UserHomeFoodCardComponent;
  let fixture: ComponentFixture<UserHomeFoodCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHomeFoodCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeFoodCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
