import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../componnets/product/product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  onProductOutput(product: Product) {
    console.log(product);
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => console.error(error),
      });
  }

  addProduct(product: Product) {
    this.productsService
      .addProduct('http://localhost:3000/clothes', product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => console.error(error),
      });
  }

  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => console.error(error),
      });
  }

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => console.error(error),
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
