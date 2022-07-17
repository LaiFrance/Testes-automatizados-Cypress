import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableItem {
  name: string;
  id: number;
  cpf: string;
  cargo: string;
  cidade: string;
  estado: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableItem[] = [
  {id: 1, name: 'Laise' , cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"recife", estado:"Pernambuco" },
  {id: 2, name: 'Samuel', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"Betim", estado:"Minas Gerais" },
  {id: 3, name: 'Igor', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"São Paulo" },
  {id: 4, name: 'Amanda', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"Olinda", estado:"Pernambuco" },
  {id: 5, name: 'Alberto', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"Rio de Janeiro" },
  {id: 6, name: 'Maria', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"Brasília" },
  {id: 7, name: 'Aylla', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"recife", estado:"Pernambuco" },
  {id: 8, name: 'Victor', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"" },
  {id: 9, name: 'Danilo', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"Bahia" },
  {id: 10, name: 'Kerly', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"Maranhão" },
  {id: 11, name: 'Paulinha', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"Minas Gerais" },
  {id: 12, name: 'Ewerson', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"Patos", estado:"Paraíba" },
  {id: 13, name: 'Rafa', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"Minas Gerais" },
  {id: 14, name: 'Lucas', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"Bahia" },
  {id: 15, name: 'Breno', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"" },
  {id: 16, name: 'Hugo', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"Pernambuco" },
  {id: 17, name: 'Karla', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"" },
  {id: 18, name: 'Igor', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"" },
  {id: 19, name: 'Hanna', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"" },
  {id: 20, name: 'Carla', cpf:"xxx.xxx.xxx-xx", cargo:"Front-end", cidade:"", estado:"" },
];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]): TableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]): TableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'cidade': return compare(a.cidade, b.cidade, isAsc);
        case 'estado': return compare(a.estado, b.estado, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
