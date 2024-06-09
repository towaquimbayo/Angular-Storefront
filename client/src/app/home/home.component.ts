import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PaginatorModule,
    ButtonModule,
    ProductComponent,
    EditPopupComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;
  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 8;
  displayAddPopup: boolean = false;
  displayEditPopup: boolean = false;
  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  toggleAddPopup() {
    this.displayAddPopup = !this.displayAddPopup;
  }

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) return;
    this.deleteProduct(product.id);
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) return;
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
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
          this.resetPaginator();
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
          this.resetPaginator();
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
          this.resetPaginator();
        },
        error: (error) => console.error(error),
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
