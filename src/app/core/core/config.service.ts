import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private baseUrl = 'https://localhost:7028/api'; // Base URL for API

  getApiUrl(controller: string): string {
    return `${this.baseUrl}/${controller}`;
  }
}
