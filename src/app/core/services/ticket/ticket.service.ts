import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../core/config.service';
import { TicketModel } from '../../models/ticketModel/Ticket';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

    private apiUrl: string;

      constructor(private http: HttpClient, private configService: ConfigService) {
        this.apiUrl = this.configService.getApiUrl('Ticket'); // Use 'User' controller
      }

      addTicket(ticket: TicketModel) {
        debugger
        console.log('API URL:', `${this.apiUrl}/InsertTicket`);
          return this.http.post(`${this.apiUrl}/InsertTicket`, ticket);
      }

      loadTicketList(): Observable<any> {
        return this.http.get<any[]>(`${this.apiUrl}/GetAllTickets`);
      }

      getTicketById(ticketId: number): Observable<TicketModel> {
        return this.http.get<TicketModel>(`${this.apiUrl}/GetTicketById/${ticketId}`);
      }

      updateTicket(ticket: TicketModel): Observable<any> {
        return this.http.post<boolean>(`${this.apiUrl}/UpdateTicket/`, ticket);
      }

      deleteTicket(ticketId: number): Observable<any> {
        return this.http.delete<boolean>(`${this.apiUrl}/DeleteTicket/${ticketId}`);
      }

      getTicketTypes(): Observable<any> {
        return this.http.get<any[]>(`${this.apiUrl}/GetTicketTypes`);
      }
      
   
  
}
