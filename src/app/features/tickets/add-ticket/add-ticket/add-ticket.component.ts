import { Component, OnInit } from '@angular/core';
import { TicketModel } from 'src/app/core/models/ticketModel/Ticket';
import { TicketService } from 'src/app/core/services/ticket/ticket.service';


@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  ticket: TicketModel = {
    ticketTitle: '',
    ticketDescription: '',
    ticketCategory: 0,
    ticketPriority: 0
  };

  
    constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
 //    debugger
  }

  submitTicket() {
    debugger
    this.ticket.ticketTitle = this.ticket.ticketTitle.trim();
    this.ticket.ticketDescription = this.ticket.ticketDescription.trim();
    this.ticket.ticketCategory = this.ticket.ticketCategory;
    this.ticket.ticketPriority = this.ticket.ticketPriority;
    // This method will be called when the form is submitted
    // You can access the form data using this.ticket
    // For example, you can log it to the console or send it to a service

    this.ticketService.addTicket(this.ticket).subscribe({
      next: (res) => {
        console.log('Ticket submitted successfully:', res);
      },
      error: (err) => {
        console.error('Ticket submission failed:', err);
      }
    });

      

    

  // Example: this.ticketService.addTicket(this.ticket).subscribe(...)
}

}


