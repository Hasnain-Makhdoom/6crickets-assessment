import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {

  private readonly apiUrl = '/api/deadline';

  constructor(private http: HttpClient) {}

  getDeadline(): Observable<{ secondsLeft: number }> {
    return this.http.get<{ secondsLeft: number }>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Failed to fetch deadline:', error);
        return throwError(() => new Error('Failed to fetch deadline.'));
      })
    );
  }
}
