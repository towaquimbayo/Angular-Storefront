import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
// Prepend a dollar sign to the value
export class PricePipe implements PipeTransform {
  transform(value: string): string {
    return `$${value}`;
  }
}
