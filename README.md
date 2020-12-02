# Angular Pagination

This project created to support server-side pagination. once your api response is paginationed, this package once called allows you to make calls to the backend with page parameters.

## How it works

-   Install the package

-   Import it to your module `app.module.ts`

This enables you to call this package anywhere in your angular application.

Use this way

```<sm-server-pagination [pageSettings]="pageSettings" [pageSize]="pageSize" [page]="page" (paginationOutput)="setNewPage($event)" (dataToShow)="showMoreData($event)"></sm-server-pagination>```
## Set Your parameters

Lets take this as a sample response from an endpoint

```page_info: {page: 0, limit: 10, total: 27, total_pages: 3} users: [{id: 256, first_name: "", last_name: "", phone_number: "07034137663"}]```

```Javascript
const pageSettings = page_info // this is the page_info object reutned from the API 
const pageSize = 10 // This is basically your page limit, could be any value 
const page = page_info.page // This is the current page
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
