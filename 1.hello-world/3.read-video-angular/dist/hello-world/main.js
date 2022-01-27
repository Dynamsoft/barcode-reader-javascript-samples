(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\GitHub\dynamsoft\barcode-reader-javascript-samples-demo\1.hello-world\3.read-video-angular\src\main.ts */"zUnb");


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
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h1");
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
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _barcode_scanner_barcode_scanner_component__WEBPACK_IMPORTED_MODULE_4__["BarcodeScannerComponent"]], styles: [".helloWorld[_ngcontent-%COMP%] {\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      overflow: hidden;\r\n      width: 100%;\r\n      height: 100%;\r\n      color: #455A64;\r\n    }\r\n\r\n    button[_ngcontent-%COMP%] {\r\n      font-size: 1.5rem;\r\n      margin-bottom: 2vh;\r\n    }\r\n\r\n    span[_ngcontent-%COMP%] {\r\n      font-size: 0.8rem;\r\n    }\r\n\r\n    .latest-result[_ngcontent-%COMP%] {\r\n      display: block;\r\n      margin: 0;\r\n      padding: 0.4rem 0.8rem;\r\n      color: inherit;\r\n      width: 80vw;\r\n      border: none;\r\n      font-size: 1rem;\r\n      border-radius: 0.2rem;\r\n      text-align: center;\r\n    }\r\n\r\n    .latest-result[_ngcontent-%COMP%]::placeholder {\r\n      color: #B0BEC5;\r\n    }\r\n\r\n    .latest-result[_ngcontent-%COMP%]:focus {\r\n      outline: none;\r\n      box-shadow: 0.1rem 0.4rem 0.8rem #5e35b1;\r\n    }\r\n\r\n    #results[_ngcontent-%COMP%] {\r\n      border: 1px dashed grey;\r\n      overflow: auto;\r\n      width: 80vw;\r\n      padding: 2vmin;\r\n      margin-bottom: 3vh;\r\n      height: 15vh;\r\n    }\r\n\r\n    #results[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\r\n      padding: 0;\r\n      margin: 0;\r\n      list-style: none;\r\n      text-align: left;\r\n      font-size: 0.8rem;\r\n    }\r\n\r\n    .resultText[_ngcontent-%COMP%] {\r\n      color: #cE5E04\r\n    }\r\n\r\n    .bigger[_ngcontent-%COMP%] {\r\n      font-size: large;\r\n      margin-bottom: 2%;\r\n    }\r\n\r\n    #UIElement[_ngcontent-%COMP%] {\r\n      margin: 2vmin auto;\r\n      text-align: center;\r\n      font-size: medium;\r\n      height: 40vh;\r\n      width: 80vw;\r\n    }\r\n\r\n    h1[_ngcontent-%COMP%] {\r\n      font-size: 1.5em;\r\n    }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbGxvLXdvcmxkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IklBQUk7TUFDRSxhQUFhO01BQ2Isc0JBQXNCO01BQ3RCLG1CQUFtQjtNQUNuQix1QkFBdUI7TUFDdkIsZ0JBQWdCO01BQ2hCLFdBQVc7TUFDWCxZQUFZO01BQ1osY0FBYztJQUNoQjs7SUFFQTtNQUNFLGlCQUFpQjtNQUNqQixrQkFBa0I7SUFDcEI7O0lBRUE7TUFDRSxpQkFBaUI7SUFDbkI7O0lBRUE7TUFDRSxjQUFjO01BQ2QsU0FBUztNQUNULHNCQUFzQjtNQUN0QixjQUFjO01BQ2QsV0FBVztNQUNYLFlBQVk7TUFDWixlQUFlO01BQ2YscUJBQXFCO01BQ3JCLGtCQUFrQjtJQUNwQjs7SUFFQTtNQUNFLGNBQWM7SUFDaEI7O0lBRUE7TUFDRSxhQUFhO01BQ2Isd0NBQXdDO0lBQzFDOztJQUVBO01BQ0UsdUJBQXVCO01BQ3ZCLGNBQWM7TUFDZCxXQUFXO01BQ1gsY0FBYztNQUNkLGtCQUFrQjtNQUNsQixZQUFZO0lBQ2Q7O0lBRUE7TUFDRSxVQUFVO01BQ1YsU0FBUztNQUNULGdCQUFnQjtNQUNoQixnQkFBZ0I7TUFDaEIsaUJBQWlCO0lBQ25COztJQUVBO01BQ0U7SUFDRjs7SUFFQTtNQUNFLGdCQUFnQjtNQUNoQixpQkFBaUI7SUFDbkI7O0lBRUE7TUFDRSxrQkFBa0I7TUFDbEIsa0JBQWtCO01BQ2xCLGlCQUFpQjtNQUNqQixZQUFZO01BQ1osV0FBVztJQUNiOztJQUVBO01BQ0UsZ0JBQWdCO0lBQ2xCIiwiZmlsZSI6ImhlbGxvLXdvcmxkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIgICAgLmhlbGxvV29ybGQge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgY29sb3I6ICM0NTVBNjQ7XHJcbiAgICB9XHJcblxyXG4gICAgYnV0dG9uIHtcclxuICAgICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDJ2aDtcclxuICAgIH1cclxuXHJcbiAgICBzcGFuIHtcclxuICAgICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLmxhdGVzdC1yZXN1bHQge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBwYWRkaW5nOiAwLjRyZW0gMC44cmVtO1xyXG4gICAgICBjb2xvcjogaW5oZXJpdDtcclxuICAgICAgd2lkdGg6IDgwdnc7XHJcbiAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwLjJyZW07XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuXHJcbiAgICAubGF0ZXN0LXJlc3VsdDo6cGxhY2Vob2xkZXIge1xyXG4gICAgICBjb2xvcjogI0IwQkVDNTtcclxuICAgIH1cclxuXHJcbiAgICAubGF0ZXN0LXJlc3VsdDpmb2N1cyB7XHJcbiAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgIGJveC1zaGFkb3c6IDAuMXJlbSAwLjRyZW0gMC44cmVtICM1ZTM1YjE7XHJcbiAgICB9XHJcblxyXG4gICAgI3Jlc3VsdHMge1xyXG4gICAgICBib3JkZXI6IDFweCBkYXNoZWQgZ3JleTtcclxuICAgICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgICAgIHdpZHRoOiA4MHZ3O1xyXG4gICAgICBwYWRkaW5nOiAydm1pbjtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogM3ZoO1xyXG4gICAgICBoZWlnaHQ6IDE1dmg7XHJcbiAgICB9XHJcblxyXG4gICAgI3Jlc3VsdHMgdWwge1xyXG4gICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5yZXN1bHRUZXh0IHtcclxuICAgICAgY29sb3I6ICNjRTVFMDRcclxuICAgIH1cclxuXHJcbiAgICAuYmlnZ2VyIHtcclxuICAgICAgZm9udC1zaXplOiBsYXJnZTtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMiU7XHJcbiAgICB9XHJcblxyXG4gICAgI1VJRWxlbWVudCB7XHJcbiAgICAgIG1hcmdpbjogMnZtaW4gYXV0bztcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBmb250LXNpemU6IG1lZGl1bTtcclxuICAgICAgaGVpZ2h0OiA0MHZoO1xyXG4gICAgICB3aWR0aDogODB2dztcclxuICAgIH1cclxuXHJcbiAgICBoMSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS41ZW07XHJcbiAgICB9XHJcbiJdfQ== */"] });


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
/* harmony import */ var dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dynamsoft-javascript-barcode */ "qQmn");

/** LICENSE ALERT - README
 * The library requires a license to work, you use the API organizationID to tell the program where to fetch your license.
 * If the Organizaion ID is not specified, a 7-day (public) trial license will be used by default which is the case in this sample.
 * Note that network connection is required for this license to work.
 */
/* When using your own license, uncomment the following line and specify your Organization ID. */
dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__["default"].organizationID = "200000";
dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__["default"].handshakeCode = "200000-dbr_js_samples";
/* If you don't have a license yet, you can request a trial on this page: https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=samples */
/* For more information, please refer to https://www.dynamsoft.com/license-server/docs/about/licensefaq.html?ver=latest#how-to-use-a-trackable-license. */
/* The API "productKeys" is an alternative way to license the library, the major difference is that it does not require a network. Contact support@dynamsoft.com for more information. */
// DBR.productKeys = "YOUR-PRODUCT-KEY";
/** LICENSE ALERT - THE END */
dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__["default"].BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.7/dist/";
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
/* harmony import */ var _dbr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dbr */ "QmJJ");




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
                this.pScanner = this.pScanner || _dbr__WEBPACK_IMPORTED_MODULE_2__["default"].BarcodeScanner.createInstance();
                let scanner = yield this.pScanner;
                if (this.bDestroyed) {
                    scanner.destroy();
                    return;
                }
                this.elementRef.nativeElement.appendChild(scanner.getUIElement());
                document.getElementsByClassName("dce-btn-close")[0].style.display = "none";
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
BarcodeScannerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: BarcodeScannerComponent, selectors: [["app-barcode-scanner"]], outputs: { appendMessage: "appendMessage" }, decls: 1, vars: 0, template: function BarcodeScannerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div");
    } }, encapsulation: 2 });


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