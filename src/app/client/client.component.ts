// client.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clientArray: { id: number, nom: string; email: string; adresse: string; tel: string; }[] = [];
  newClient: { id: number; nom: string; email: string; adresse: string; tel: string; } = { id: 0, nom: '', email: '', adresse: '', tel: '' };
  

  constructor(private dataService: ClientService ,private router: Router) { }

  ngOnInit(): void {
    this.loadClientData();
  }

  loadClientData() {
    this.dataService.getAllClient().subscribe(
      (data: any[]) => {
        console.log('Server response:', data);

        if (Array.isArray(data) && data.length > 0) {
          this.clientArray = data.map((client: { id: number, nom: string; email: string; adresse: string; tel: string  }) => ({
            id: client.id,
            nom: client.nom,
            email: client.email || 'N/A',
            adresse: client.adresse,
            tel: client.tel,
          }));
        } else {
          console.warn('Data is not an array or is empty:', data);
        }
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onSubmit() {
    this.dataService.postData(this.newClient).subscribe(
      response => {
        console.log('Server response after save:', response);
        this.loadClientData();
        // Navigate to the payment page
      this.router.navigate(['/client/paiement']);
      },
      error => {
        console.error('Error saving data:', error);
      });

    // Reset the form
    this.resetForm();
  }

  private resetForm() {
    this.newClient = { id: 0, nom: '', email: '', adresse: '', tel: '' };
  }
}
