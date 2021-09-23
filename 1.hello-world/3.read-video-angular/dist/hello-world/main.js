(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\GitHub\2.dbr\dbr-browser-samples-source\1.hello-world\3.read-video-angular\src\main.ts */"zUnb");


/***/ }),

/***/ "68dY":
/*!******************************************************!*\
  !*** ./src/app/hello-world/hello-world.component.ts ***!
  \******************************************************/
/*! exports provided: HelloWorldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelloWorldComponent", function() { return HelloWorldComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _dbr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dbr */ "QmJJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _barcode_scanner_barcode_scanner_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../barcode-scanner/barcode-scanner.component */ "gFWJ");





const _c0 = ["scrollMe"];
function HelloWorldComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading Library...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HelloWorldComponent_app_barcode_scanner_7_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "app-barcode-scanner", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("appendMessage", function HelloWorldComponent_app_barcode_scanner_7_Template_app_barcode_scanner_appendMessage_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r4.appendMessage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HelloWorldComponent_li_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r6.text);
} }
class HelloWorldComponent {
    constructor() {
        this.resultItems = [];
        this.bShowScanner = false;
        this.resultValue = "";
        this.libLoaded = false;
    }
    ngAfterViewChecked() {
        this.scrollToBottom();
    }
    scrollToBottom() {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) { }
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //Load the library on page load to speed things up.
            try {
                yield _dbr__WEBPACK_IMPORTED_MODULE_1__["default"].BarcodeScanner.loadWasm();
                this.libLoaded = true;
                this.showScanner();
            }
            catch (ex) {
                alert(ex.message);
                throw ex;
            }
        });
    }
    showScanner() {
        this.bShowScanner = true;
    }
    hideScanner() {
        this.bShowScanner = false;
    }
    appendMessage(message) {
        switch (message.type) {
            case "result":
                this.resultValue = message.format + ": " + message.text;
                this.resultItems.push({ type: message.format + ": ", text: message.text });
                break;
            case "error":
                this.resultValue = message.msg;
                this.resultItems.push({ type: "Error: ", text: message.msg });
                break;
            default: break;
        }
    }
}
HelloWorldComponent.ɵfac = function HelloWorldComponent_Factory(t) { return new (t || HelloWorldComponent)(); };
HelloWorldComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: HelloWorldComponent, selectors: [["app-hello-world"]], viewQuery: function HelloWorldComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.myScrollContainer = _t.first);
    } }, decls: 16, vars: 4, consts: [[1, "helloWorld"], ["alt", "logo", "src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==", 2, "height", "25px"], ["type", "text", "readonly", "true", "placeholder", "The Last Read Barcode", 1, "latest-result", 3, "value"], ["id", "UIElement"], ["style", "font-size:x-large", 4, "ngIf"], [3, "appendMessage", 4, "ngIf"], [2, "float", "left"], ["id", "results"], ["scrollMe", ""], [4, "ngFor", "ngForOf"], [2, "font-size", "x-large"], [3, "appendMessage"], [1, "resultText"]], template: function HelloWorldComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Hello World for Angular");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, HelloWorldComponent_span_6_Template, 2, 0, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, HelloWorldComponent_app_barcode_scanner_7_Template, 1, 0, "app-barcode-scanner", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "All Results:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, HelloWorldComponent_li_15_Template, 5, 2, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.resultValue);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.libLoaded);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.bShowScanner);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.resultItems);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _barcode_scanner_barcode_scanner_component__WEBPACK_IMPORTED_MODULE_4__["BarcodeScannerComponent"]], styles: [".helloWorld[_ngcontent-%COMP%] {\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      overflow: hidden;\r\n      width: 100%;\r\n      height: 100%;\r\n      color: #455A64;\r\n    }\r\n\r\n    button[_ngcontent-%COMP%] {\r\n      font-size: 1.5rem;\r\n      margin-bottom: 2vh;\r\n    }\r\n\r\n    span[_ngcontent-%COMP%] {\r\n      font-size: 0.8rem;\r\n    }\r\n\r\n    .latest-result[_ngcontent-%COMP%] {\r\n      display: block;\r\n      margin: 0;\r\n      padding: 0.4rem 0.8rem;\r\n      color: inherit;\r\n      width: 80vw;\r\n      border: none;\r\n      font-size: 1rem;\r\n      border-radius: 0.2rem;\r\n      text-align: center;\r\n    }\r\n\r\n    .latest-result[_ngcontent-%COMP%]::placeholder {\r\n      color: #B0BEC5;\r\n    }\r\n\r\n    .latest-result[_ngcontent-%COMP%]:focus {\r\n      outline: none;\r\n      box-shadow: 0.1rem 0.4rem 0.8rem #5e35b1;\r\n    }\r\n\r\n    #results[_ngcontent-%COMP%] {\r\n      border: 1px dashed grey;\r\n      overflow: auto;\r\n      width: 80vw;\r\n      padding: 2vmin;\r\n      margin-bottom: 3vh;\r\n      height: 15vh;\r\n    }\r\n\r\n    #results[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\r\n      padding: 0;\r\n      margin: 0;\r\n      list-style: none;\r\n      text-align: left;\r\n      font-size: 0.8rem;\r\n    }\r\n\r\n    .resultText[_ngcontent-%COMP%] {\r\n      color: #cE5E04\r\n    }\r\n\r\n    .bigger[_ngcontent-%COMP%] {\r\n      font-size: large;\r\n      margin-bottom: 2%;\r\n    }\r\n\r\n    #UIElement[_ngcontent-%COMP%] {\r\n      margin: 2vmin auto;\r\n      text-align: center;\r\n      font-size: medium;\r\n      height: 40vh;\r\n      width: 80vw;\r\n    }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbGxvLXdvcmxkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IklBQUk7TUFDRSxhQUFhO01BQ2Isc0JBQXNCO01BQ3RCLG1CQUFtQjtNQUNuQix1QkFBdUI7TUFDdkIsZ0JBQWdCO01BQ2hCLFdBQVc7TUFDWCxZQUFZO01BQ1osY0FBYztJQUNoQjs7SUFFQTtNQUNFLGlCQUFpQjtNQUNqQixrQkFBa0I7SUFDcEI7O0lBRUE7TUFDRSxpQkFBaUI7SUFDbkI7O0lBRUE7TUFDRSxjQUFjO01BQ2QsU0FBUztNQUNULHNCQUFzQjtNQUN0QixjQUFjO01BQ2QsV0FBVztNQUNYLFlBQVk7TUFDWixlQUFlO01BQ2YscUJBQXFCO01BQ3JCLGtCQUFrQjtJQUNwQjs7SUFFQTtNQUNFLGNBQWM7SUFDaEI7O0lBRUE7TUFDRSxhQUFhO01BQ2Isd0NBQXdDO0lBQzFDOztJQUVBO01BQ0UsdUJBQXVCO01BQ3ZCLGNBQWM7TUFDZCxXQUFXO01BQ1gsY0FBYztNQUNkLGtCQUFrQjtNQUNsQixZQUFZO0lBQ2Q7O0lBRUE7TUFDRSxVQUFVO01BQ1YsU0FBUztNQUNULGdCQUFnQjtNQUNoQixnQkFBZ0I7TUFDaEIsaUJBQWlCO0lBQ25COztJQUVBO01BQ0U7SUFDRjs7SUFFQTtNQUNFLGdCQUFnQjtNQUNoQixpQkFBaUI7SUFDbkI7O0lBRUE7TUFDRSxrQkFBa0I7TUFDbEIsa0JBQWtCO01BQ2xCLGlCQUFpQjtNQUNqQixZQUFZO01BQ1osV0FBVztJQUNiIiwiZmlsZSI6ImhlbGxvLXdvcmxkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgICAgLmhlbGxvV29ybGQge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgY29sb3I6ICM0NTVBNjQ7XHJcbiAgICB9XHJcblxyXG4gICAgYnV0dG9uIHtcclxuICAgICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDJ2aDtcclxuICAgIH1cclxuXHJcbiAgICBzcGFuIHtcclxuICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLmxhdGVzdC1yZXN1bHQge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBwYWRkaW5nOiAwLjRyZW0gMC44cmVtO1xyXG4gICAgICBjb2xvcjogaW5oZXJpdDtcclxuICAgICAgd2lkdGg6IDgwdnc7XHJcbiAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwLjJyZW07XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuXHJcbiAgICAubGF0ZXN0LXJlc3VsdDo6cGxhY2Vob2xkZXIge1xyXG4gICAgICBjb2xvcjogI0IwQkVDNTtcclxuICAgIH1cclxuXHJcbiAgICAubGF0ZXN0LXJlc3VsdDpmb2N1cyB7XHJcbiAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAuMXJlbSAwLjRyZW0gMC44cmVtICM1ZTM1YjE7XHJcbiAgICB9XHJcblxyXG4gICAgI3Jlc3VsdHMge1xyXG4gICAgICBib3JkZXI6IDFweCBkYXNoZWQgZ3JleTtcclxuICAgICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgICAgIHdpZHRoOiA4MHZ3O1xyXG4gICAgICBwYWRkaW5nOiAydm1pbjtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogM3ZoO1xyXG4gICAgICBoZWlnaHQ6IDE1dmg7XHJcbiAgICB9XHJcblxyXG4gICAgI3Jlc3VsdHMgdWwge1xyXG4gICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5yZXN1bHRUZXh0IHtcclxuICAgICAgY29sb3I6ICNjRTVFMDRcclxuICAgIH1cclxuXHJcbiAgICAuYmlnZ2VyIHtcclxuICAgICAgZm9udC1zaXplOiBsYXJnZTtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMiU7XHJcbiAgICB9XHJcblxyXG4gICAgI1VJRWxlbWVudCB7XHJcbiAgICAgIG1hcmdpbjogMnZtaW4gYXV0bztcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBmb250LXNpemU6IG1lZGl1bTtcclxuICAgICAgaGVpZ2h0OiA0MHZoO1xyXG4gICAgICB3aWR0aDogODB2dztcclxuICAgIH1cclxuIl19 */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "QmJJ":
/*!************************!*\
  !*** ./src/app/dbr.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dynamsoft-javascript-barcode */ "bHga");

/** LICENSE ALERT - README
 * The library requires a license to work. If no license is specified, a 7-day built-in
 * trial license will be used by default which is the case in this sample.
 * Note that network connection is required for this built-in license to work.
 */
/* When using your own license, uncomment the following line and specify your own license string. */
// DBR.initLicense("DLS2eyJvcmdhbml6YXR****");
/** If you don't have a license yet, you can request a trial on this page:
 * https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=sample
 * or, you can purchase a license on this page:
 * https://www.dynamsoft.com/store/dynamsoft-barcode-reader/#js?product=dbr&package=js&utm_source=sample
 */
/** LICENSE ALERT - THE END */
dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__["default"].BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.6.1/dist/";
/* harmony default export */ __webpack_exports__["default"] = (dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _hello_world_hello_world_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hello-world/hello-world.component */ "68dY");


class AppComponent {
    constructor() {
        this.title = 'hello-world';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-hello-world");
    } }, directives: [_hello_world_hello_world_component__WEBPACK_IMPORTED_MODULE_1__["HelloWorldComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _hello_world_hello_world_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hello-world/hello-world.component */ "68dY");
/* harmony import */ var _barcode_scanner_barcode_scanner_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./barcode-scanner/barcode-scanner.component */ "gFWJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"],
        _hello_world_hello_world_component__WEBPACK_IMPORTED_MODULE_2__["HelloWorldComponent"],
        _barcode_scanner_barcode_scanner_component__WEBPACK_IMPORTED_MODULE_3__["BarcodeScannerComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]] }); })();


/***/ }),

/***/ "gFWJ":
/*!**************************************************************!*\
  !*** ./src/app/barcode-scanner/barcode-scanner.component.ts ***!
  \**************************************************************/
/*! exports provided: BarcodeScannerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarcodeScannerComponent", function() { return BarcodeScannerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dynamsoft-javascript-barcode */ "bHga");




class BarcodeScannerComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.bDestroyed = false;
        this.pScanner = null;
        this.appendMessage = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                this.pScanner = this.pScanner || dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_2__["default"].BarcodeScanner.createInstance();
                let scanner = yield this.pScanner;
                if (this.bDestroyed) {
                    scanner.destroy();
                    return;
                }
                this.elementRef.nativeElement.appendChild(scanner.getUIElement());
                scanner.onFrameRead = results => {
                    for (let result of results) {
                        this.appendMessage.emit({ format: result.barcodeFormatString, text: result.barcodeText, type: "result" });
                        if (result.barcodeText.indexOf("Attention(exceptionCode") !== -1) {
                            this.appendMessage.emit({ msg: result.exception.message, type: "error" });
                        }
                    }
                };
                yield scanner.open();
            }
            catch (ex) {
                this.appendMessage.emit({ msg: ex.message, type: "error" });
                console.error(ex);
            }
        });
    }
    ngOnDestroy() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.bDestroyed = true;
            if (this.pScanner) {
                (yield this.pScanner).destroy();
            }
        });
    }
}
BarcodeScannerComponent.ɵfac = function BarcodeScannerComponent_Factory(t) { return new (t || BarcodeScannerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])); };
BarcodeScannerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: BarcodeScannerComponent, selectors: [["app-barcode-scanner"]], outputs: { appendMessage: "appendMessage" }, decls: 32, vars: 0, consts: [["v-once", "", 1, "component-barcode-scanner"], ["viewBox", "0 0 1792 1792", 1, "dbrScanner-bg-loading", 2, "display", "none", "animation", "1s linear infinite dbrScanner-rotate", "width", "40%", "height", "40%", "position", "absolute", "margin", "auto", "left", "0", "top", "0", "right", "0", "bottom", "0", "fill", "#aaa"], ["d", "M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z"], ["viewBox", "0 0 2048 1792", 1, "dbrScanner-bg-camera", 2, "display", "none", "width", "40%", "height", "40%", "position", "absolute", "margin", "auto", "left", "0", "top", "0", "right", "0", "bottom", "0", "fill", "#aaa"], ["d", "M1024 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"], ["playsinline", "true", 1, "dbrScanner-video", 2, "width", "100%", "height", "100%", "position", "absolute", "left", "0", "top", "0"], [1, "dbrScanner-cvs-drawarea", 2, "width", "100%", "height", "100%", "position", "absolute", "left", "0", "top", "0"], [1, "dbrScanner-cvs-scanarea", 2, "width", "100%", "height", "100%", "position", "absolute", "left", "0", "top", "0"], [1, "dbrScanner-scanlight", 2, "display", "none", "width", "100%", "height", "3%", "position", "absolute", "animation", "3s infinite dbrScanner-scanlight", "border-radius", "50%", "box-shadow", "0px 0px 2vw 1px #00e5ff", "background", "#fff", "user-select", "none"], [1, "dbrScanner-sel-camera", 2, "margin", "0 auto", "position", "absolute", "left", "0", "top", "0"], [1, "dbrScanner-sel-resolution", 2, "position", "absolute", "left", "0", "top", "20px"], [1, "dbrScanner-msg-poweredby", 2, "position", "absolute", "left", "50%", "bottom", "10%", "transform", "translateX(-50%)"], ["viewBox", "0 0 94 17", 2, "height", "max(3vmin,17px)", "fill", "#FFFFFF"], ["d", "M0.9,14V4.3h2.3c0.6,0,1,0.1,1.4,0.3c0.3,0.2,0.6,0.5,0.7,0.9s0.2,0.8,0.2,1.4c0,0.5-0.1,0.9-0.2,1.3\n\t\tC5.1,8.5,4.9,8.8,4.5,9.1C4.2,9.3,3.7,9.4,3.2,9.4H1.8V14H0.9z M1.8,8.7h1.2c0.4,0,0.7-0.1,1-0.2S4.3,8.2,4.4,8\n\t\tc0.1-0.3,0.2-0.6,0.2-1.1c0-0.5,0-0.9-0.1-1.2C4.3,5.4,4.2,5.2,3.9,5.1S3.4,5,2.9,5H1.8V8.7z"], ["d", "M8.1,14.1c-0.5,0-0.8-0.1-1.1-0.3s-0.5-0.5-0.6-0.9s-0.2-0.9-0.2-1.4V9.6c0-0.6,0.1-1,0.2-1.4\n\t\tC6.5,7.8,6.7,7.5,7,7.3S7.6,7,8.1,7C8.6,7,9,7.1,9.2,7.3s0.5,0.5,0.6,0.9C9.9,8.5,9.9,9,9.9,9.6v1.9c0,0.6-0.1,1-0.2,1.4\n\t\tc-0.1,0.4-0.3,0.7-0.6,0.9S8.6,14.1,8.1,14.1z M8.1,13.4c0.3,0,0.5-0.1,0.7-0.2C8.9,13,9,12.8,9,12.5c0-0.3,0-0.6,0-1v-2\n\t\tc0-0.4,0-0.7,0-1C9,8.2,8.9,8,8.8,7.9C8.6,7.7,8.4,7.6,8.1,7.6c-0.3,0-0.5,0.1-0.7,0.2C7.3,8,7.2,8.2,7.2,8.5c0,0.3-0.1,0.6-0.1,1\n\t\tv2c0,0.4,0,0.7,0.1,1c0,0.3,0.1,0.5,0.3,0.7C7.6,13.4,7.8,13.4,8.1,13.4z"], ["d", "M12,14l-1.1-6.9h0.7l0.9,5.8l1.1-5.8h0.8l1.1,5.8l0.8-5.8H17L15.9,14H15l-1.1-5.6L12.8,14H12z"], ["d", "M19.8,14.1c-0.4,0-0.8-0.1-1.1-0.3s-0.5-0.5-0.6-0.9c-0.1-0.4-0.2-0.9-0.2-1.6V9.6c0-0.7,0.1-1.2,0.2-1.6\n\t\tc0.1-0.4,0.3-0.7,0.6-0.8C19,7,19.3,7,19.8,7c0.5,0,0.9,0.1,1.1,0.3c0.3,0.2,0.4,0.5,0.5,0.9c0.1,0.4,0.1,1,0.1,1.6v0.6h-2.8v1.2\n\t\tc0,0.4,0,0.8,0.1,1.1c0.1,0.3,0.2,0.4,0.3,0.6s0.3,0.2,0.6,0.2c0.2,0,0.3,0,0.5-0.1c0.1-0.1,0.3-0.2,0.3-0.4s0.1-0.5,0.1-0.8v-0.5\n\t\th0.9V12c0,0.6-0.1,1.1-0.4,1.5S20.4,14.1,19.8,14.1z M18.8,9.9h1.9V9.4c0-0.4,0-0.7-0.1-0.9c0-0.3-0.1-0.5-0.3-0.6S20,7.6,19.8,7.6\n\t\tc-0.2,0-0.4,0.1-0.6,0.2c-0.1,0.1-0.3,0.3-0.3,0.6c-0.1,0.3-0.1,0.7-0.1,1.1V9.9z"], ["d", "M22.8,14V7.1h0.9V8c0.2-0.4,0.5-0.6,0.8-0.8C24.8,7.1,25,7,25.3,7c0,0,0,0,0.1,0s0.1,0,0.1,0v0.9\n\t\tc-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.2,0-0.2,0c-0.3,0-0.5,0.1-0.7,0.2c-0.2,0.1-0.4,0.3-0.6,0.6V14H22.8z"], ["d", "M28,14.1c-0.4,0-0.8-0.1-1.1-0.3s-0.5-0.5-0.6-0.9c-0.1-0.4-0.2-0.9-0.2-1.6V9.6c0-0.7,0.1-1.2,0.2-1.6\n\t\tc0.1-0.4,0.3-0.7,0.6-0.8C27.3,7,27.6,7,28,7c0.5,0,0.9,0.1,1.1,0.3c0.3,0.2,0.4,0.5,0.5,0.9c0.1,0.4,0.1,1,0.1,1.6v0.6H27v1.2\n\t\tc0,0.4,0,0.8,0.1,1.1c0.1,0.3,0.2,0.4,0.3,0.6s0.3,0.2,0.6,0.2c0.2,0,0.3,0,0.5-0.1c0.1-0.1,0.3-0.2,0.3-0.4s0.1-0.5,0.1-0.8v-0.5\n\t\th0.9V12c0,0.6-0.1,1.1-0.4,1.5S28.7,14.1,28,14.1z M27,9.9H29V9.4c0-0.4,0-0.7-0.1-0.9c0-0.3-0.1-0.5-0.3-0.6S28.3,7.6,28,7.6\n\t\tc-0.2,0-0.4,0.1-0.6,0.2c-0.1,0.1-0.3,0.3-0.3,0.6C27.1,8.6,27,9,27,9.5V9.9z"], ["d", "M32.6,14.1c-0.6,0-1-0.2-1.3-0.7c-0.3-0.4-0.4-1.2-0.4-2.2V9.9c0-0.6,0-1.1,0.1-1.6c0.1-0.4,0.2-0.8,0.5-1\n\t\tc0.2-0.2,0.6-0.4,1-0.4C32.8,7,33,7,33.2,7.1c0.2,0.1,0.4,0.3,0.5,0.4V4.3h0.9V14h-0.9v-0.5c-0.1,0.2-0.3,0.3-0.5,0.4\n\t\tC33,14,32.8,14.1,32.6,14.1z M32.7,13.4c0.2,0,0.4,0,0.5-0.1c0.2-0.1,0.3-0.2,0.5-0.3V8.1c-0.1-0.1-0.3-0.2-0.4-0.3\n\t\tc-0.2-0.1-0.4-0.2-0.6-0.2c-0.4,0-0.6,0.2-0.8,0.5S31.8,9,31.8,9.6v1.6c0,0.5,0,0.9,0.1,1.2c0.1,0.3,0.1,0.6,0.3,0.7\n\t\tC32.3,13.3,32.5,13.4,32.7,13.4z"], ["d", "M40.5,14.1c-0.3,0-0.5-0.1-0.7-0.2c-0.2-0.1-0.4-0.3-0.5-0.4V14h-0.9V4.3h0.9v3.4c0.1-0.2,0.3-0.3,0.5-0.5\n\t\tC40.1,7,40.3,7,40.6,7C41,7,41.2,7,41.4,7.2c0.2,0.2,0.4,0.4,0.5,0.6c0.1,0.3,0.2,0.6,0.2,0.9s0.1,0.7,0.1,1v1.5\n\t\tc0,0.6,0,1.1-0.1,1.5c-0.1,0.4-0.3,0.8-0.5,1C41.3,14,41,14.1,40.5,14.1z M40.4,13.4c0.3,0,0.5-0.1,0.6-0.3\n\t\tc0.1-0.2,0.2-0.4,0.3-0.8s0.1-0.7,0.1-1.2V9.7c0-0.5,0-0.8-0.1-1.1S41.1,8,41,7.9c-0.1-0.2-0.3-0.2-0.6-0.2c-0.2,0-0.4,0.1-0.6,0.2\n\t\tc-0.2,0.1-0.3,0.2-0.5,0.4v4.7c0.1,0.1,0.3,0.3,0.5,0.4C40,13.4,40.2,13.4,40.4,13.4z"], ["d", "M43.2,15.7V15c0.4,0,0.7,0,0.9-0.1c0.2-0.1,0.3-0.1,0.4-0.3c0.1-0.1,0.1-0.2,0.1-0.4c0-0.1,0-0.3-0.1-0.5\n\t\tc0-0.2-0.1-0.4-0.2-0.6L43,7.1h0.9l1.2,5.9l1.2-5.9h0.9l-1.7,7.4c-0.1,0.3-0.2,0.5-0.3,0.7c-0.2,0.2-0.4,0.3-0.6,0.4\n\t\tc-0.3,0.1-0.6,0.1-1,0.1H43.2z"], ["d", "M50.6,14V4.3h2.1c0.7,0,1.2,0.1,1.6,0.4c0.4,0.2,0.6,0.6,0.8,1c0.2,0.4,0.2,0.9,0.2,1.5V11\n\t\tc0,0.6-0.1,1.1-0.2,1.6s-0.4,0.8-0.8,1S53.5,14,52.8,14H50.6z M51.5,13.3h1.2c0.5,0,0.9-0.1,1.1-0.3s0.4-0.5,0.5-0.9\n\t\ts0.1-0.8,0.1-1.3V7.2c0-0.5,0-0.9-0.1-1.2s-0.2-0.6-0.5-0.8S53.2,5,52.7,5h-1.2V13.3z"], ["d", "M56.5,15.7V15c0.4,0,0.7,0,0.9-0.1c0.2-0.1,0.3-0.1,0.4-0.3c0.1-0.1,0.1-0.2,0.1-0.4c0-0.1,0-0.3-0.1-0.5\n\t\tc0-0.2-0.1-0.4-0.2-0.6l-1.4-6.1h0.9l1.2,5.9l1.2-5.9h0.9l-1.7,7.4c-0.1,0.3-0.2,0.5-0.3,0.7s-0.4,0.3-0.6,0.4s-0.6,0.1-1,0.1H56.5\n\t\tz"], ["d", "M61.3,14V7.1h0.9v0.7c0.2-0.2,0.5-0.4,0.8-0.6C63.2,7,63.5,7,63.8,7C64,7,64.2,7,64.4,7.1s0.3,0.3,0.4,0.5\n\t\tc0.1,0.2,0.1,0.5,0.1,0.8V14H64V8.6c0-0.4-0.1-0.6-0.2-0.8c-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.4,0.1-0.6,0.2s-0.4,0.3-0.6,0.5V14\n\t\tH61.3z"], ["d", "M67.4,14.1c-0.3,0-0.5-0.1-0.7-0.2c-0.2-0.1-0.4-0.3-0.5-0.6C66,13.1,66,12.8,66,12.6c0-0.4,0.1-0.7,0.2-0.9\n\t\ts0.3-0.5,0.5-0.7c0.2-0.2,0.5-0.4,0.9-0.6c0.4-0.2,0.8-0.4,1.3-0.6V9.3c0-0.4,0-0.8-0.1-1c-0.1-0.2-0.1-0.4-0.3-0.5\n\t\tc-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.3,0-0.5,0.1c-0.1,0.1-0.3,0.2-0.3,0.4c-0.1,0.2-0.1,0.4-0.1,0.7V9l-0.9,0\n\t\tc0-0.7,0.2-1.2,0.5-1.6C66.8,7.1,67.3,7,68,7c0.6,0,1.1,0.2,1.3,0.6c0.3,0.4,0.4,1,0.4,1.7v3.4c0,0.1,0,0.3,0,0.5\n\t\tc0,0.2,0,0.4,0,0.5c0,0.2,0,0.3,0,0.4h-0.8c0-0.2-0.1-0.3-0.1-0.5c0-0.2,0-0.3-0.1-0.5c-0.1,0.3-0.3,0.5-0.5,0.7\n\t\tS67.7,14.1,67.4,14.1z M67.6,13.4c0.2,0,0.3,0,0.5-0.1c0.1-0.1,0.3-0.2,0.4-0.3s0.2-0.3,0.3-0.4v-2.2c-0.3,0.2-0.6,0.3-0.9,0.5\n\t\tc-0.2,0.1-0.4,0.3-0.6,0.4c-0.2,0.1-0.3,0.3-0.3,0.5s-0.1,0.4-0.1,0.6c0,0.4,0.1,0.6,0.2,0.8C67.2,13.3,67.4,13.4,67.6,13.4z"], ["d", "M70.9,14V7.1h0.8v0.7c0.2-0.3,0.5-0.5,0.8-0.6c0.3-0.1,0.6-0.2,0.9-0.2c0.2,0,0.5,0.1,0.7,0.2s0.3,0.4,0.4,0.7\n\t\tc0.2-0.3,0.5-0.5,0.8-0.7c0.3-0.2,0.6-0.2,0.9-0.2c0.2,0,0.4,0,0.6,0.1s0.3,0.3,0.4,0.5c0.1,0.2,0.2,0.5,0.2,0.9V14h-0.8V8.6\n\t\tc0-0.4-0.1-0.7-0.2-0.8s-0.3-0.2-0.5-0.2c-0.2,0-0.4,0.1-0.7,0.2S74.7,8,74.5,8.3c0,0,0,0.1,0,0.1s0,0.1,0,0.1V14h-0.8V8.6\n\t\tc0-0.4-0.1-0.7-0.2-0.8c-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.4,0.1-0.7,0.2c-0.2,0.1-0.4,0.3-0.6,0.5V14H70.9z"], ["d", "M80.2,14.1c-0.6,0-1-0.2-1.3-0.5c-0.3-0.4-0.5-0.8-0.6-1.4l0.7-0.2c0,0.5,0.2,0.9,0.4,1.2\n\t\tc0.2,0.2,0.5,0.4,0.8,0.4c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.2-0.4,0.2-0.7c0-0.2-0.1-0.5-0.2-0.7c-0.1-0.2-0.4-0.5-0.6-0.7l-0.9-0.8\n\t\tc-0.3-0.3-0.5-0.5-0.7-0.8c-0.2-0.3-0.2-0.6-0.2-0.9c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.6-0.5C79.5,7,79.8,7,80.2,7\n\t\tc0.5,0,0.9,0.2,1.2,0.5c0.3,0.3,0.4,0.8,0.4,1.3L81.2,9c0-0.3-0.1-0.6-0.1-0.8s-0.2-0.4-0.3-0.5c-0.1-0.1-0.3-0.1-0.5-0.1\n\t\tc-0.3,0-0.5,0.1-0.6,0.2c-0.2,0.1-0.2,0.4-0.2,0.6c0,0.2,0,0.4,0.1,0.6c0.1,0.2,0.2,0.3,0.4,0.5l1,0.9c0.2,0.2,0.4,0.3,0.6,0.5\n\t\tc0.2,0.2,0.3,0.4,0.4,0.6c0.1,0.2,0.2,0.5,0.2,0.8c0,0.4-0.1,0.7-0.2,0.9c-0.1,0.2-0.4,0.4-0.6,0.6C80.9,14,80.6,14.1,80.2,14.1z"], ["d", "M84.7,14.1c-0.5,0-0.8-0.1-1.1-0.3c-0.3-0.2-0.5-0.5-0.6-0.9s-0.2-0.9-0.2-1.4V9.6c0-0.6,0.1-1,0.2-1.4\n\t\tc0.1-0.4,0.3-0.7,0.6-0.9C83.9,7.1,84.3,7,84.7,7c0.5,0,0.9,0.1,1.1,0.3s0.5,0.5,0.6,0.9c0.1,0.4,0.2,0.9,0.2,1.4v1.9\n\t\tc0,0.6-0.1,1-0.2,1.4s-0.3,0.7-0.6,0.9S85.2,14.1,84.7,14.1z M84.7,13.4c0.3,0,0.5-0.1,0.7-0.2c0.1-0.2,0.2-0.4,0.3-0.7\n\t\tc0-0.3,0-0.6,0-1v-2c0-0.4,0-0.7,0-1c0-0.3-0.1-0.5-0.3-0.7c-0.1-0.2-0.4-0.2-0.7-0.2c-0.3,0-0.5,0.1-0.7,0.2\n\t\tc-0.1,0.2-0.2,0.4-0.3,0.7c0,0.3-0.1,0.6-0.1,1v2c0,0.4,0,0.7,0.1,1c0,0.3,0.1,0.5,0.3,0.7C84.2,13.4,84.4,13.4,84.7,13.4z"], ["d", "M88.2,14V7.7h-0.9V7.1h0.9V6.3c0-0.3,0-0.6,0.1-0.9c0.1-0.3,0.2-0.5,0.4-0.6c0.2-0.2,0.5-0.2,0.8-0.2\n\t\tc0.1,0,0.2,0,0.4,0c0.1,0,0.2,0,0.3,0.1v0.6c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.2,0c-0.3,0-0.4,0.1-0.5,0.2s-0.1,0.4-0.1,0.8v0.8\n\t\th1.1v0.6h-1.1V14H88.2z"], ["d", "M92.7,14.1c-0.3,0-0.6-0.1-0.8-0.2s-0.3-0.3-0.4-0.5c-0.1-0.2-0.1-0.5-0.1-0.8V7.6h-0.9V7.1h0.9V4.9h0.9v2.1\n\t\th1.2v0.6h-1.2v4.8c0,0.3,0,0.6,0.1,0.7c0.1,0.1,0.2,0.2,0.5,0.2c0.1,0,0.2,0,0.2,0s0.2,0,0.3,0V14c-0.1,0-0.2,0-0.4,0.1\n\t\tC92.9,14.1,92.8,14.1,92.7,14.1z"]], template: function BarcodeScannerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "path", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "svg", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "video", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "canvas", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "select", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "svg", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "path", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "path", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "path", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "path", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "path", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "path", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "path", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](21, "path", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](22, "path", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "path", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](24, "path", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](25, "path", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](26, "path", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](27, "path", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](28, "path", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](29, "path", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](30, "path", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](31, "path", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, styles: [".component-barcode-scanner[_ngcontent-%COMP%]{width:100%;height:100%;background:#fff;position:relative;resize:both;}\r\n.dbrScanner-bg-loading[_ngcontent-%COMP%]{animation:1s linear infinite dbrScanner-rotate;width:40%;height:40%;position:absolute;margin:auto;left:0;top:0;right:0;bottom:0;fill:#aaa;}\r\n.dbrScanner-bg-camera[_ngcontent-%COMP%]{width:40%;height:40%;position:absolute;margin:auto;left:0;top:0;right:0;bottom:0;fill:#aaa;}\r\n.dbrScanner-video[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;left:0;top:0;}\r\n.dbrScanner-cvs-drawarea[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;left:0;top:0;}\r\n.dbrScanner-cvs-scanarea[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;left:0;top:0;}\r\n.dbrScanner-scanlight[_ngcontent-%COMP%]{width:100%;height:3%;position:absolute;animation:3s infinite dbrScanner-scanlight;border-radius:50%;box-shadow:0px 0px 2vw 1px #00e5ff;background:#fff;}\r\n.dbrScanner-sel-camera[_ngcontent-%COMP%]{margin:0 auto;position:absolute;left:0;top:0;}\r\n.dbrScanner-sel-resolution[_ngcontent-%COMP%]{position:absolute;left:0;top:20px;}\r\n@keyframes dbrScanner-rotate{from{transform:rotate(0turn);}to{transform:rotate(1turn);}}\r\n@keyframes dbrScanner-scanlight{from{top:0;}to{top:97%;}}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJCQUEyQixVQUFVLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7QUFDaEcsdUJBQXVCLDhDQUE4QyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7QUFDakssc0JBQXNCLFNBQVMsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7QUFDakgsa0JBQWtCLFVBQVUsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUN4RSx5QkFBeUIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQy9FLHlCQUF5QixVQUFVLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDL0Usc0JBQXNCLFVBQVUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsMENBQTBDLENBQUMsaUJBQWlCLENBQUMsa0NBQWtDLENBQUMsZUFBZSxDQUFDO0FBQzdLLHVCQUF1QixhQUFhLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNwRSwyQkFBMkIsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUM3RCw2QkFBNkIsS0FBSyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsdUJBQXVCLENBQUMsQ0FBQztBQUN2RixnQ0FBZ0MsS0FBSyxLQUFLLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDIiwiZmlsZSI6ImJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbXBvbmVudC1iYXJjb2RlLXNjYW5uZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kOiNmZmY7cG9zaXRpb246cmVsYXRpdmU7cmVzaXplOmJvdGg7fVxyXG4uZGJyU2Nhbm5lci1iZy1sb2FkaW5ne2FuaW1hdGlvbjoxcyBsaW5lYXIgaW5maW5pdGUgZGJyU2Nhbm5lci1yb3RhdGU7d2lkdGg6NDAlO2hlaWdodDo0MCU7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOmF1dG87bGVmdDowO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7ZmlsbDojYWFhO31cclxuLmRiclNjYW5uZXItYmctY2FtZXJhe3dpZHRoOjQwJTtoZWlnaHQ6NDAlO3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbjphdXRvO2xlZnQ6MDt0b3A6MDtyaWdodDowO2JvdHRvbTowO2ZpbGw6I2FhYTt9XHJcbi5kYnJTY2FubmVyLXZpZGVve3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO31cclxuLmRiclNjYW5uZXItY3ZzLWRyYXdhcmVhe3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO31cclxuLmRiclNjYW5uZXItY3ZzLXNjYW5hcmVhe3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO31cclxuLmRiclNjYW5uZXItc2NhbmxpZ2h0e3dpZHRoOjEwMCU7aGVpZ2h0OjMlO3Bvc2l0aW9uOmFic29sdXRlO2FuaW1hdGlvbjozcyBpbmZpbml0ZSBkYnJTY2FubmVyLXNjYW5saWdodDtib3JkZXItcmFkaXVzOjUwJTtib3gtc2hhZG93OjBweCAwcHggMnZ3IDFweCAjMDBlNWZmO2JhY2tncm91bmQ6I2ZmZjt9XHJcbi5kYnJTY2FubmVyLXNlbC1jYW1lcmF7bWFyZ2luOjAgYXV0bztwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7fVxyXG4uZGJyU2Nhbm5lci1zZWwtcmVzb2x1dGlvbntwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjIwcHg7fVxyXG5Aa2V5ZnJhbWVzIGRiclNjYW5uZXItcm90YXRle2Zyb217dHJhbnNmb3JtOnJvdGF0ZSgwdHVybik7fXRve3RyYW5zZm9ybTpyb3RhdGUoMXR1cm4pO319XHJcbkBrZXlmcmFtZXMgZGJyU2Nhbm5lci1zY2FubGlnaHR7ZnJvbXt0b3A6MDt9dG97dG9wOjk3JTt9fVxyXG4iXX0= */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map