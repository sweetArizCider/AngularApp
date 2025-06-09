import { Component, OnInit, signal } from '@angular/core';
import { ProductAttributes, ProductPayload } from '@app/api/models/products';
import { NavBar } from '@components/navBar/navBar';
import { getProducts, addProduct } from '@services/products/products.service';


@Component({
  selector: 'products-view-selector',
  templateUrl: './products.view.html',
  styleUrl: './products.view.css',
  imports: [NavBar],
})

export class ProductsView implements OnInit {
  products = signal<ProductAttributes[]>([]);
  isOpen = signal<boolean>(false);
  error = signal<string | null>(null);
  // todo: error handling bc its always true when Error

  // todo: styles on each product and modal

  // todo: structure better this . . . 😯

  async ngOnInit(): Promise<void> {
    this.products.set(await getProducts());
  }

  async createProduct(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const productPayload: ProductPayload = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price') as string),
      image_url: formData.get('image_url') as string,
    }

    try{
      await addProduct(productPayload);
      this.products.set(await getProducts());
      this.closeModal();
    }catch (error) {
      this.error.set(error as string);
    }
  }

  openModal() {
    this.isOpen.set(true);
  }

  closeModal() {
    this.isOpen.set(false);
  }
}