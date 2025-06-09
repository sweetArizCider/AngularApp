import { Component } from '@angular/core';
import { NavBar } from '@app/components/navBar/navBar';
import { InputComponent } from '@layouts/input/input';
import { ButtonComponent } from '@layouts/button/button';

@Component({
  selector: 'card-selector',
  templateUrl: './form.html',
  styleUrl: './form.css',
  imports: [NavBar, InputComponent, ButtonComponent],
})
export class FormView {
  name: string = 'Type something...';
}