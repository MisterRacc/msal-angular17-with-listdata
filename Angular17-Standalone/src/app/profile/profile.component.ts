import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';

import { AuthService } from '../auth.service'; // ✅ Import the service


type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  displayName?: string,
  id?: string
};

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: [],
    standalone: true
})
export class ProfileComponent implements OnInit {
  profile: ProfileType | undefined;
  userEmail: string | null=null;
  userData: any | null=null;
  userToken: string | null=null;

  profilePicture: string | undefined; // ✅ Store profile picture

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getProfile(environment.apiConfig.uri);
    this.authService.email$.subscribe(email => {
      this.userEmail = email;
    });
    this.authService.user$.subscribe(user => {
      this.userData = user;
    });
    this.authService.token$.subscribe(token => {
      this.userToken = token;
    });
    console.log(this.userData);
    console.log(this.userToken);
    
    if (this.userData?.oid) {
      this.getProfilePicture(this.userData.oid, ''); // ✅ Fetch picture using OID
    }
    console.log(this.profilePicture);
  }

  getProfile(url: string) {
    this.http.get(url)
      .subscribe(profile => {
        this.profile = profile;
        console.log(profile);
      });
  }

  getProfilePicture(oid: string, token: string) {
    const url = `https://graph.microsoft.com/v1.0/me/photo/$value`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get(url, { headers, responseType: 'blob' }) // ✅ Fetch as blob
      .subscribe(response => {
        const objectURL = URL.createObjectURL(response);
        this.profilePicture = objectURL; // ✅ Set image URL
      }, error => {
        console.error("Error fetching profile picture:", error);
      });
  }
}
