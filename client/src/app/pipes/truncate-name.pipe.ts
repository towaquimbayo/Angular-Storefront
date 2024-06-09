import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true,
})
// Truncate the name of a product
export class TruncateNamePipe implements PipeTransform {
  transform(value: string, maxLength: number = 16): string {
    return value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
  }
}
