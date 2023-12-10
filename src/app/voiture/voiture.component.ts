// voiture.component.ts
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VoitureService } from '../voiture.service'; // Assurez-vous que le chemin est correct
import { Router } from '@angular/router';
import { FactureService } from '../facture.service'; 

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css']
})
export class VoitureComponent implements OnInit {
  voitureArray: { id: number, couleur:string; matricule: string; modele: string; prix_location: number; imageUrl:string;date_fab :Date  }[] = [];
  newVoiture: { id: number, couleur:string; matricule: string; modele: string; prix_location: number; imageUrl:string;date_fab :Date  } = { id: 0, couleur:'', matricule: '', modele: '', prix_location: 0,imageUrl:'',date_fab :new Date()  };

  constructor(
    private dataService: VoitureService, // Assurez-vous d'avoir un service VoitureService correspondant
    private factureService: FactureService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadVoitureData();
  }

  loadVoitureData() {
    this.dataService.getAllVoiture().subscribe(
      (data: any[]) => {
        console.log('Server response:', data);

        if (Array.isArray(data) && data.length > 0) {
          this.voitureArray = data.map((voiture: { id: number, couleur:string; matricule: string; modele: string; prix_location: number; imageUrl:string;date_fab :Date   }) => ({
            id: voiture.id,
            couleur: voiture.couleur,
            matricule: voiture.matricule ,
            modele: voiture.modele,
            prix_location: voiture.prix_location,
            imageUrl: voiture.imageUrl,
            date_fab: voiture.date_fab

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
    this.dataService.postData(this.newVoiture).subscribe(
      response => {
        console.log('Server response after save:', response);
        this.loadVoitureData();
        
        // Enregistrez les données de la voiture dans le service FactureService
        this.factureService.setVoitureData(response);
        
        // Naviguez vers le composant suivant (paiement)
        this.router.navigate(['/voiture']);
      },
      error => {
        console.error('Error saving data:', error);
      });

    // Reset the form
    this.resetForm();
  }

  private resetForm() {
    this.newVoiture = { id: 0, couleur:'', matricule: '', modele: '', prix_location: 0,imageUrl:'',date_fab :new Date() };
  }
}
