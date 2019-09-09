import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../domain/project';

@Pipe({
  name: 'projectfilter'
})
export class ProjectfilterPipe implements PipeTransform {

  transform(items: Project[], searchText: string): any[] {
    // console.log('items ### - ' + items);
    // console.log('project name search text ### - ' + searchText);

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.projectName.toLocaleLowerCase().includes(searchText);
    });
  }
}
