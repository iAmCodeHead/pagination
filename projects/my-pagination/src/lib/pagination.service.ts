import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  pageUpdate = new BehaviorSubject<any>({});

  pageChange = this.pageUpdate.asObservable();

  constructor() { }

  changePage(newPage): void {
    this.pageUpdate.next(newPage);
  }

  getPager(total, currentPage, itemPerPage): object {

    const totalPage = Math.ceil(total / itemPerPage);
    if (currentPage < 0) {
      currentPage = 0;
    }

    if (currentPage > totalPage) {
      currentPage = totalPage;
    }

    let startPage: number;
    let endPage: number;
    if (totalPage <= 5) {
        startPage = 0;
        endPage = totalPage;
    } else {
        if (currentPage <= 3) {
            startPage = 0;
            endPage = 5;
        } else if (currentPage + 2 >= totalPage) {
            startPage = totalPage - 5;
            endPage = totalPage;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = Math.min(startIndex + itemPerPage - 1, total - 1);

    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(k => startPage + k);

    let reversePages = [];
    let ratioMargin = totalPage - pages[pages.length - 1];

    let i = 1;

    while (ratioMargin > 0 && reversePages.length < 2) {

      reversePages.push(totalPage - i);
      i++;
      ratioMargin--;
    }

    reversePages = reversePages.reverse();

    pages.pop();

    return {
        totalItems: total,
        currentPage: Number(currentPage),
        itemPerPage,
        totalPages: totalPage,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages,
        reversePages
    };
  }

  setPage = (total, currentPage, itemPerPage) => {
    const t = total * itemPerPage;
    return this.getPager(t, currentPage, itemPerPage);
  }

  setNewCurrentPage = (changeToNewCurrentPage, currentPage , callback) => {

    if (Number(changeToNewCurrentPage) === currentPage) {
      return;
    }
    currentPage = changeToNewCurrentPage;
    callback(currentPage);
  }
}
