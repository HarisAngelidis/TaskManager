import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTasksComponent } from './myttasks.component';

describe('MyttasksComponent', () => {
  let component: MyTasksComponent;
  let fixture: ComponentFixture<MyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
