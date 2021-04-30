(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\GitHub\2.dbr\dbr-browser-samples\1.hello-world\3.read-video-angular\src\main.ts */"zUnb");


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
                //DBR.BarcodeReader._bUseFullFeature = true;
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
                this.resultValue = "Error Occurred! Check the error message in 'All results'!";
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
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Hello World Sample for Angular");
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

dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__["default"].BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.2.3/dist/";
// Please visit https://www.dynamsoft.com/customer/license/trialLicense to get a trial license
dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__["default"].BarcodeReader.organizationID = "100448235";
// DBR.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
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
        this.scanner = null;
        this.appendMessage = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                this.scanner = this.scanner || (yield dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_2__["default"].BarcodeScanner.createInstance());
                if (this.bDestroyed) {
                    this.scanner.destroy();
                    return;
                }
                this.scanner.setUIElement(this.elementRef.nativeElement);
                this.scanner.onFrameRead = results => {
                    for (let result of results) {
                        this.appendMessage.emit({ format: result.barcodeFormatString, text: result.barcodeText, type: "result" });
                        if (result.barcodeText.indexOf("Attention(exceptionCode") !== -1) {
                            this.appendMessage.emit({ msg: result.exception.message, type: "error" });
                        }
                    }
                };
                yield this.scanner.open();
            }
            catch (ex) {
                this.appendMessage.emit({ msg: ex.message, type: "error" });
                console.error(ex);
            }
        });
    }
    ngOnDestroy() {
        this.bDestroyed = true;
        if (this.scanner) {
            this.scanner.destroy();
        }
    }
}
BarcodeScannerComponent.ɵfac = function BarcodeScannerComponent_Factory(t) { return new (t || BarcodeScannerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])); };
BarcodeScannerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: BarcodeScannerComponent, selectors: [["app-barcode-scanner"]], outputs: { appendMessage: "appendMessage" }, decls: 11, vars: 0, consts: [["v-once", "", 1, "component-barcode-scanner"], ["viewBox", "0 0 1792 1792", 1, "dbrScanner-bg-loading"], ["d", "M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z"], ["viewBox", "0 0 2048 1792", 1, "dbrScanner-bg-camera", 2, "display", "none"], ["d", "M1024 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"], ["playsinline", "true", 1, "dbrScanner-video"], [1, "dbrScanner-cvs-drawarea"], [1, "dbrScanner-cvs-scanarea"], [1, "dbrScanner-scanlight", 2, "display", "none"], [2, "position", "absolute", "left", "50%", "bottom", "3%", "padding", "0 5px", "margin", "0", "font-family", "Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif", "line-height", "18px", "font-size", "12px", "color", "white", "background-color", "rgba(0,0,0,.3)", "border-radius", "8px", "transform", "translateX(-50%)"]], template: function BarcodeScannerComponent_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Powered by Dynamsoft");
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