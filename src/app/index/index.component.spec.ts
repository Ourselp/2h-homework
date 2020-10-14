import { ComponentFixture, TestBed} from '@angular/core/testing';
import { IndexComponent } from "./index.component";
import { BackendService } from "../backend.service";
import { AppRoutingModule } from "../app-routing.module";
import { of } from "rxjs";
import { By } from '@angular/platform-browser';

describe('IndexComponent', () => {
  let checkBackEnd;
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    checkBackEnd = jasmine.createSpyObj({
      tickets: of (
        [
        {
          id: 0,
          completed: false,
          assigneeId: 111,
          description: 'Install a monitor arm'
        },
        {
          id: 1,
          completed: false,
          assigneeId: 111,
          description: 'Move the desk to the new location'
        }, 
      ]),
      users: of (
        [
          {id: 111, name: 'Victor'}
        ]
      )
    });

    await TestBed.configureTestingModule({
      declarations: [IndexComponent],
      imports: [AppRoutingModule],
      providers: [
        {provide: BackendService, useValue: checkBackEnd},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Liste des tickets');
  });

  it('should get ticket and users from backend', () => {
    expect(checkBackEnd.tickets).toHaveBeenCalled();
    expect(checkBackEnd.users).toHaveBeenCalled();
  });

  it('should have div with button to create ticket', () => {
    const board = fixture.debugElement.query(By.css('.add-ticket')).nativeElement;
    expect(board.innerHTML).not.toBeNull();
    expect(board.innerHTML.length).toBeGreaterThan(0);
  })

  it('should open the modal to create ticket', () => {
    const board = fixture.debugElement.query(By.css('.add-ticket')).nativeElement;
    board.click();
    fixture.detectChanges();
    expect(board.innerHTML).toContain("modal-new-ticket");
  })
  
});
