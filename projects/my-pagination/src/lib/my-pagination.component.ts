import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationModel } from './pagination.model';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'lib-sm-pagination',
  template: `
    <div class="pagination-box" *ngIf="pager.pages && pager.totalPages > 1">
    <div class="d-inline-flex align-items-center showing-box">
        <!-- <p>Showing</p> -->
        <div class="dropdown">
            <button class="btn text-secondary dropdown-toggle" type="button" id="currentPage" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{pageSettings.limit}}
            </button>
            <div class="dropdown-menu" aria-labelledby="currentPage">
              <a *ngFor="let each of xx" class="dropdown-item" style="cursor: pointer;" [routerLink]="['../', page, { pagesize: each }]" (click)="showMoreData(each)">{{each}}</a>
            </div>
        </div>
        <p>Showing {{page * pageSize + 1 - pageSize}} to {{page * pageSize}} out of {{pageSettings.total}}</p>
    </div>

    <nav >
        <ul class="pagination">
          <li class="page-item prev-btn" >
              <a class="page-link" [routerLink]="['../', page - 1, { pagesize: pageSize }]" [queryParams]="x" (click)="setNewPage(pager?.startPage)">
                <svg width="12" height="12" class="drop-down-icon normal-state">
                    <use xlink:href="assets/icon-sprite.svg#drop-down-icon"></use>
                </svg>
                <svg width="12" height="12" class="drop-down-icon hover-state">
                    <use xlink:href="assets/icon-sprite.svg#drop-down-icon-white"></use>
                </svg>
              </a>
          </li>
            <ng-container *ngIf='!greaterThan5'>
                <ng-container *ngFor="let page of pager.pages">
                    <li class="page-item" [ngClass]="{'active': pager?.currentPage === page}">
                        <a class="page-link" [routerLink]="['../', page + 1, { pagesize: pageSize }]" [queryParams]="x" (click)="setNewPage(page)">{{page + 1}}</a>
                    </li>
                </ng-container>
            </ng-container>

            <ng-container *ngIf="greaterThan5 && currentPage >= pager.totalPages - 3">
                <ng-container *ngFor="let page of [0,1,2]">
                    <li class="page-item" [ngClass]="{'active': pager?.currentPage === page}">
                        <a class="page-link" [routerLink]="['../', page + 1, { pagesize: pageSize }]" [queryParams]="x" (click)="setNewPage(page)">{{page + 1}}</a>
                    </li>
                </ng-container>
                <li class="page-item">
                    <span style="position: relative; bottom: -6px;">...</span>
                </li>
                <li class="page-item" [ngClass]="{'active': pager?.currentPage === pager.totalPages - 3}">
                    <a class="page-link" [routerLink]="['../', pager.totalPages - 2 , { pagesize: pageSize }]" [queryParams]="x" (click)="setNewPage(pager.totalPages - 2)">
                        {{pager.totalPages - 1}}
                    </a>
                </li>
                <li class="page-item" [ngClass]="{'active': pager?.currentPage === pager.totalPages - 2}">
                    <a class="page-link" [routerLink]="['../', pager.totalPages - 1 , { pagesize: pageSize }]" [queryParams]="x" (click)="setNewPage(pager.totalPages - 1)">
                        {{pager.totalPages}}
                    </a>
                </li>
            </ng-container>

            <ng-container *ngIf="lastCondition">
                <ng-container *ngFor="let page of [0,1,2]">
                    <li class="page-item" [ngClass]="{'active': pager?.currentPage === page}">
                        <a class="page-link" [routerLink]="['../', page + 1, { pagesize: pageSize }]" [queryParams]="x" (click)="setNewPage(page)">{{page + 1}}</a>
                    </li>
                </ng-container>
                <li class="page-item">
                    <span style="position: relative; bottom: -6px;">...</span>
                </li>
                <li class="page-item" [ngClass]="{'active': pager?.currentPage === midPage}">
                    <a class="page-link" [routerLink]="['../', midPage, { pagesize: pageSize }]" [queryParams]="x" (click)="setNewPage(midPage)">{{midPage}}</a>
                </li>
                <li class="page-item">
                    <span style="position: relative; bottom: -6px;">...</span>
                </li>
                <li class="page-item" [ngClass]="{'active': pager?.currentPage === pager.totalPages - 3}">
                    <a class="page-link" [routerLink]="['../', pager.totalPages - 2 , { pagesize: pageSize }]" [queryParams]="x" (click)="setNewPage(pager.totalPages - 2)">
                        {{pager.totalPages - 1}}
                    </a>
                </li>
                <li class="page-item" [ngClass]="{'active': pager?.currentPage === pager.totalPages - 2}">
                    <a class="page-link" [routerLink]="['../', pager.totalPages - 1 , { pagesize: pageSize }]" [queryParams]="x" (click)="setNewPage(pager.totalPages -1)">
                        {{pager.totalPages}}
                    </a>
                </li>
            </ng-container>
          <li class="page-item next-btn" >
            <a class="page-link" [routerLink]="['../', pager?.currentPage + 2, { pagesize: pageSize }]" [queryParams]="x" (click)="pager?.currentPage !== (pager?.totalPages - 1) && setNewPage(pager?.currentPage + 1)">
              <svg width="12" height="12" class="drop-down-icon normal-state">
                  <use xlink:href="assets/icon-sprite.svg#drop-down-icon"></use>
              </svg>
              <svg width="12" height="12" class="drop-down-icon hover-state">
                <use xlink:href="assets/icon-sprite.svg#drop-down-icon-white"></use>
            </svg>
            </a>
        </li>
        </ul>
    </nav>
</div>
  `,
  styles: [
    `
  .pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 8px; }

    .page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #39CDCC;
    background-color: #fff;
    border: 1px solid #dee2e6; }
    .page-link:hover {
      z-index: 2;
      color: #259493;
      text-decoration: none;
      background-color: #e9ecef;
      border-color: #dee2e6; }
    .page-link:focus {
      z-index: 2;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(57, 205, 204, 0.25); }

  .page-item:first-child .page-link {
    margin-left: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px; }
  .page-item:last-child .page-link {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px; }
  .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #39CDCC;
    border-color: #39CDCC; }
  .page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    cursor: auto;
    background-color: #fff;
    border-color: #dee2e6; }

    .pagination-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1.25rem; }
      @media (max-width: 575.98px) {
        .pagination-box {
          flex-direction: column-reverse;
          align-items: flex-start; } }
      .pagination-box .showing-box {
        position: relative;
        font-size: 0.875rem; }
        @media (max-width: 575.98px) {
          .pagination-box .showing-box {
            margin-top: 1rem; } }
        .pagination-box .showing-box .dropdown {
          margin: 0 0.625rem; }
          .pagination-box .showing-box .dropdown-toggle {
            background: rgba(33, 63, 125, 0.1);
            border-radius: 4px;
            font-size: 0.875rem;
            width: 80px;
            padding: 6px 0.75rem;
            justify-content: space-between; }
            .pagination-box .showing-box .dropdown-toggle:focus {
              box-shadow: 0 0 0 0.2rem rgba(33, 63, 125, 0.2); }
          .pagination-box .showing-box .dropdown-menu {
            height: auto;
            max-height: 120px;
            overflow-x: hidden;
            overflow-y: scroll;
            right: 0;
            padding: 1rem;
            background: #FFFFFF;
            border: 1px solid rgba(84, 95, 125, 0.06);
            box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.04);
            border-radius: 4px;
            box-sizing: border-box; }
            .pagination-box .showing-box .dropdown-menu a {
              padding-left: 0;
              padding-right: 0; }
          .pagination-box .showing-box .dropdown-item {
            padding: 0 1.25rem;
            margin-bottom: 0.625rem;
            width: 100%;
            font-size: 0.875rem;
            color: #213F7D; }
            .pagination-box .showing-box .dropdown-item:last-child {
              margin-bottom: 0; }
      .pagination-box .pagination {
        margin-bottom: 0; }
        .pagination-box .pagination .page-link {
          color: #545F7D;
          opacity: .6;
          background-color: transparent;
          border: none; }
          .pagination-box .pagination .page-link:hover {
            opacity: 1;
            font-weight: 500;
            color: #213F7D; }
        .pagination-box .pagination .active .page-link {
          opacity: 1; }
        .pagination-box .pagination .prev-btn, .pagination-box .pagination .next-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(33, 63, 125, 0.1);
          border-radius: 4px; }
          .pagination-box .pagination .prev-btn .page-link, .pagination-box .pagination .next-btn .page-link {
            opacity: 1; }
          .pagination-box .pagination .prev-btn .hover-state, .pagination-box .pagination .next-btn .hover-state {
            display: none; }
          .pagination-box .pagination .prev-btn:hover, .pagination-box .pagination .next-btn:hover {
            background-color: #213F7D; }
            .pagination-box .pagination .prev-btn:hover .normal-state, .pagination-box .pagination .next-btn:hover .normal-state {
              display: none; }
            .pagination-box .pagination .prev-btn:hover .hover-state, .pagination-box .pagination .next-btn:hover .hover-state {
              display: flex; }
        .pagination-box .pagination .prev-btn svg {
          transform: rotate(90deg); }
        .pagination-box .pagination .next-btn svg {
          transform: rotate(-90deg); }
    `
  ]
})
export class MyPaginationComponent implements OnInit, OnChanges {

  @Input() pageSettings: any;
  currentPage: any = 0;
  @Input() pageSize: any;
  @Input() page: any;

  paginationModel = new PaginationModel();
  pager: any = {};
  p = 1;
  xx: Array<number> = [10, 20, 50, 100];
  greaterThan5: any;
  midPage: any;
  lessThan15: any;
  config: any;
  equalToReverse: boolean;
  equalToReverse1: boolean;
  equalToReverse2: boolean;
  showMidNav: boolean;
  reverseGreaterThan5: boolean;
  otherSide: boolean;
  lastCondition: boolean;
  x = {};

  @Output() paginationOutput: any = new EventEmitter();
  @Output() dataToShow: any = new EventEmitter();

  constructor(private paginationService: PaginationService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.page = params.get('id') ? params.get('id') : 1;
      if (isNaN(this.page) || (this.page < 1) || this.page === undefined) { this.page = 1; }
      this.currentPage = this.page ? this.page - 1 : 0;
      console.log(this.currentPage);
      this.pageSize = params.get('pagesize');
      if (isNaN(this.pageSize) || (this.pageSize < 10) || this.pageSize === undefined) { this.pageSize = 10; }
    });

    this.route.queryParamMap.subscribe((p: any) => {
      this.x = p.params;
    });

    this.paginationModel.limit = this.pageSize ? this.pageSize : 100;

   }

   ngOnInit(): void {
    this.paginate();
  }

  ngOnChanges(): void {
    this.paginate();
  }

  paginate(): void {
    this.pager = this.paginationService.setPage(
      this.pageSettings.total_pages,
      this.currentPage,
      this.pageSettings.limit
    );

    this.greaterThan5 = this.pager.totalPages > 6 ? true : false;

    this.reverseGreaterThan5 = this.pager.reversePages.length <= 1 ? true : false;

    this.lastCondition = this.greaterThan5 && (this.currentPage < this.pager.totalPages - 3);

    this.lessThan15 = this.pager.totalPages < 15 ? true : false;

    this.midPage = Math.ceil(this.pager.totalPages / 2);

    this.equalToReverse = ((this.currentPage + 1) >= (this.pager.totalPages - 2) ||
    ((this.currentPage + 1) >=  (this.pager.totalPages - 1))) ? true : false;

    this.equalToReverse1 = ((this.currentPage) >=  (this.pager.totalPages - 1)) ? true : false;

    this.equalToReverse2 = ((this.currentPage) >= (this.pager.totalPages - 2)) ? true : false;

    this.showMidNav = (this.currentPage < this.midPage - 1) && (this.midPage >= 15) ? true : false;

    this.otherSide = (this.currentPage > this.midPage) ? true : false;
  }

  pageChanged(event): void {
    this.config.currentPage = event;
  }

  showMoreData(limit): void {
    this.paginationModel.limit = limit;
    this.dataToShow.emit(limit);
  }

  setNewPage(page): void {
    this.paginationService.pageChange.subscribe(res => { this.pager = res; });
    this.paginationOutput.emit(page);
  }

}
