import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { Product } from '../../../types';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @ViewChild('deleteBtn') deleteBtn: any;
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  truncateName(name: string) {
    return name.length > 16 ? name.slice(0, 16) + '...' : name;
  }

  editProduct() {
    this.edit.emit(this.product);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteBtn.nativeElement,
      message: 'Are you sure you want to delete this product?',
      accept: () => this.deleteProduct(),
    });
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }

  ngOnInit() {}
}
