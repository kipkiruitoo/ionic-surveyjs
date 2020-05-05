import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TinderUiComponent } from './tinder-ui.component';

describe('TinderUiComponent', () => {
  let component: TinderUiComponent;
  let fixture: ComponentFixture<TinderUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinderUiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TinderUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
