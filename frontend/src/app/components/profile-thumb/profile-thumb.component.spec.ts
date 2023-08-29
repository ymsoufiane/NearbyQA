import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileThumbComponent } from './profile-thumb.component';

describe('ProfileThumbComponent', () => {
  let component: ProfileThumbComponent;
  let fixture: ComponentFixture<ProfileThumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileThumbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
