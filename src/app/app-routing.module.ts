import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { PaiementComponent } from './paiement/paiement.component';
import { ContactComponent } from './contact/contact.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AgenceComponent } from './agence/agence.component';
import { FactureComponent } from './facture/facture.component';


const routes: Routes = [
  { path: 'client', component: ClientComponent },
  { path: 'client/paiement' ,component : PaiementComponent},
  { path: 'contact' ,component : ContactComponent},
  {path :'reservation',component : ReservationComponent},
  {path :'agence',component : AgenceComponent},
  {path : 'facture',component : FactureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }