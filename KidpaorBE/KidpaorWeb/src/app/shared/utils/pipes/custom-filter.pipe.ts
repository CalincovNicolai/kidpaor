import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {
  transform<T>(values: T[], filterValue: any, filterCallback: (a: T[], filterValue: any) => T[] ): T[] {
    if (!filterValue || !filterCallback) {
      return values;
    }
    return filterCallback(values, filterValue);
  }

}
