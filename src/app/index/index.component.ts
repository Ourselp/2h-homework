import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { Ticket } from 'src/interfaces/ticket.interface';
import { User } from 'src/interfaces/user.interface';
import { BackendService } from '../backend.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public usersGroupedById: Map<number, User> = new Map();
  public tickets: Ticket[] = [];
  public ticketSelected: any;
  public loading = true;
  public loadingSaving = false;
  public users: User[];
  public newTicket: any;

  // Font awesome icon
  faCoffee = faCoffee;
  faPlus = faPlus;

  constructor(private router: Router, private readonly backendService: BackendService) { }

  async ngOnInit() {
    this.newTicket = this.resetTicket();
    this.backendService.tickets().subscribe(tickets => {
      this.loading = false;
      this.tickets = tickets;
    });;

    await this.getUsers();
    this.ticketSelected = this.tickets[0];
  }

  async getUsers() {
    this.backendService.users().subscribe(
      (users) => {
        this.users = users;
        console.log(this.users);
      },
      (e) => {
        console.log(e);
      }
    );
  }

  getTicket (ticket) {
    this.ticketSelected = ticket;
    if (ticket.assigneeId) {
      this.ticketSelected.user = this.users.find((x: any) => x.id = ticket.assigneeId).name;
    }
  }

  updateStatusTicket(ticket) {
    this.loadingSaving = true;
    console.log(!ticket.completed);
    this.backendService.complete(ticket.id, !ticket.completed).subscribe(updatedTicket => {
        ticket.completed = updatedTicket.completed;
        this.loadingSaving = false;
    })
  }

  addTicket() {
    this.loading = true;
    this.backendService.newTicket({description: this.newTicket.description }).subscribe(
      (ticket) => {
        this.loading = false;
      },
      (e) => {
        console.log(e);
      }
    )
  }

  resetTicket() {
    return this.newTicket = {
      assigneeId: null,
      description: '',
    }
  }
}
