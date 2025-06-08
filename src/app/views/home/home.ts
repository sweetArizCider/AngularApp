import { Component } from '@angular/core';

import { NavBar } from '@app/components/navBar/navBar';
import { TableComponent } from '@app/components/table/table';

@Component({
  selector: 'home-selector',
  styleUrl: 'home.css',
  templateUrl: 'home.html',
  imports: [NavBar, TableComponent],
})

export class Home {

}
