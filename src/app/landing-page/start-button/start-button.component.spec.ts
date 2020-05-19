import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartButtonComponent } from './start-button.component';

describe('StartButtonComponent', () => {
  let component: StartButtonComponent;
  let fixture: ComponentFixture<StartButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartButtonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
