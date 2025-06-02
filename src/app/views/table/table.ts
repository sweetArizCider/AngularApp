import { TableComponent } from '@components/table/table'
import { NavBar } from '@components/navBar/navBar';
import { Component } from '@angular/core';

@Component({
  selector: 'table-view-selector',
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
  imports: [TableComponent, NavBar]
})

export class TableView {

}