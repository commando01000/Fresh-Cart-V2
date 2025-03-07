import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
  standalone: true
})
export class CutTextPipe implements PipeTransform {

  transform(text: string, limit?: number): unknown {
    return text.split(' ').slice(0, limit).join(' ') + '...';
  }

}
