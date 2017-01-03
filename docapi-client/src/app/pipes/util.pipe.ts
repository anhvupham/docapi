import { List } from 'immutable';
import { Observable } from 'rxjs';
import { Route } from './../models/route.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRoute'
})
export class FilterRoute implements PipeTransform {
  transform(value: List<Route>, args: string): any {
    if (!args) return Observable.of(value);
    
    let result = value.filter((item: Route) => (item.path.indexOf(args) > -1 || item.method.toLowerCase() == args));

    return Observable.of(result).debounceTime(300);
  }
}

@Pipe({
  name: 'reverse'
})
export class Reverse implements PipeTransform {
  transform(value: Array<any>) {
    if (!value) return value;
    return value.reverse();
  }
}