import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../types';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Input() header!: string;
  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirm: EventEmitter<Product> = new EventEmitter<Product>();

  // Custom validator to check for special characters
  specialCharsValidation(): ValidatorFn {
    return (control) => {
      const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );
      return hasSpecialChars ? { specialChars: true } : null;
    };
  }

  // Create a form group with the product form fields
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharsValidation()]],
    image: [''],
    price: ['', [Validators.required]],
    rating: [0],
  });

  onConfirm() {
    const { name, image, price, rating } = this.productForm.value;
    this.confirm.emit({
      name: name || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  ngOnChanges() {
    // Set the form values to the product values when the product changes
    this.productForm.patchValue(this.product);
  }
}
