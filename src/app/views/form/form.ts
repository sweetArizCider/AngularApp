import { Component } from '@angular/core';
import { NavBar } from '@app/components/navBar/navBar';
import { InputComponent } from '@app/layouts/input/input';
import { ButtonComponent } from '@app/layouts/button/button';

@Component({
  selector: 'card-selector',
  templateUrl: './form.html',
  styleUrl: './form.css',
  imports: [NavBar, InputComponent, ButtonComponent],
})
export class FormView {
  name: string = 'Type something...';
}