import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  { path: '', component: AppComponent,
    children: [
      { path: 'tickets', component: IndexComponent },
      // { path: 'tickets/:id', component: IndexComponent }, // Routing dans le cas ou on crée une page de détails d'un ticket en passant en paramètre l'ID
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
