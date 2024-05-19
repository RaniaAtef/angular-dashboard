import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api';
  private userDataSubject: BehaviorSubject<{ data: User } | null> =
    new BehaviorSubject<{ data: User } | null>(null);
  userData$: BehaviorSubject<{ data: User } | null> = this.userDataSubject;
  constructor(private http: HttpClient) {}

  getUsers(page: number) {
    return this.http.get<{ data: User[]; total_pages: number }>(
      `${this.apiUrl}/users?page=${page}`
    );
  }

  getUserDetails(id: number) {
    return this.http.get<{ data: User }>(`${this.apiUrl}/users/${id}`);
  }

  getUser(id: number) {
    // return

    const res = this.http
      .get<{ data: User }>(`${this.apiUrl}/users/${id}`)
      .pipe(
        tap((user) => {
          this.userDataSubject.next(user);
        })
      );
    console.log(res);
    return res;
  }
}
