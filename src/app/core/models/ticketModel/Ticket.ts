
import { ITicketModel } from "./Iticket";

export class TicketModel implements ITicketModel {
    ticketTitle: string;
    ticketDescription: string;
    ticketCategory: number;
    ticketPriority: number;
    constructor(
    ticketTitle: string,
    ticketDescription: string,
    ticketCategory: number,
    ticketPriority: number, 
    ) {
           this.ticketTitle = ticketTitle;
              this.ticketDescription = ticketDescription;
                this.ticketCategory = ticketCategory;
                this.ticketPriority = ticketPriority;   
    }

    // You can add additional methods if necessary
}
