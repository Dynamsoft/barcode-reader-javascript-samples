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





function HelloWorldComponent_span_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading Library...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function HelloWorldComponent_app_barcode_scanner_8_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "app-barcode-scanner", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("appendMessage", function HelloWorldComponent_app_barcode_scanner_8_Template_app_barcode_scanner_appendMessage_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r2.appendMessage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class HelloWorldComponent {
    constructor() {
        this.bShowScanner = false;
        this.resultValue = "";
        this.libLoaded = false;
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //Load the library on page load to speed things up.
            try {
                //DBR.BarcodeReader._bUseFullFeature = true;
                yield _dbr__WEBPACK_IMPORTED_MODULE_1__["default"].BarcodeScanner.loadWasm();
                this.libLoaded = true;
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
    appendMessage(str) {
        console.log(str);
        this.resultValue = str;
    }
}
HelloWorldComponent.ɵfac = function HelloWorldComponent_Factory(t) { return new (t || HelloWorldComponent)(); };
HelloWorldComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: HelloWorldComponent, selectors: [["app-hello-world"]], decls: 9, vars: 3, consts: [[1, "helloWorld"], [3, "click"], ["type", "text", "readonly", "true", "placeholder", "The Barcode Result", 1, "Input-text", 3, "value"], ["id", "scannerUI"], ["style", "font-size:x-large", 4, "ngIf"], [3, "appendMessage", 4, "ngIf"], [2, "font-size", "x-large"], [3, "appendMessage"]], template: function HelloWorldComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Dynamsoft Barcode Reader Hello World Sample for Angular");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HelloWorldComponent_Template_button_click_3_listener() { return ctx.showScanner(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Start Barcode Scanner");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, HelloWorldComponent_span_7_Template, 2, 0, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, HelloWorldComponent_app_barcode_scanner_8_Template, 1, 0, "app-barcode-scanner", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.resultValue);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.libLoaded);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.bShowScanner);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _barcode_scanner_barcode_scanner_component__WEBPACK_IMPORTED_MODULE_4__["BarcodeScannerComponent"]], styles: [".helloWorld[_ngcontent-%COMP%] {\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      overflow: hidden;\r\n      width: 100vw;\r\n      height: 90vh;\r\n      color: #455A64;\r\n    }\r\n\r\n    #scannerUI[_ngcontent-%COMP%] {\r\n      margin: 5vmin auto;\r\n      text-align: center;\r\n      font-size: medium;\r\n      height: 50vh;\r\n      width: 90vw;\r\n    }\r\n\r\n    .Input-text[_ngcontent-%COMP%] {\r\n      display: block;\r\n      margin: 0;\r\n      padding: 0.4rem 0.8rem;\r\n      color: inherit;\r\n      width: 90%;\r\n      border: none;\r\n      font-size: 1.5rem;\r\n      border-radius: 0.2rem;\r\n      text-align: center;\r\n    }\r\n\r\n    .Input-text[_ngcontent-%COMP%]::placeholder {\r\n      color: #B0BEC5;\r\n    }\r\n\r\n    .Input-text[_ngcontent-%COMP%]:focus {\r\n      outline: none;\r\n      box-shadow: 0.1rem 0.4rem 0.8rem #5e35b1;\r\n    }\r\n\r\n    button[_ngcontent-%COMP%] {\r\n      font-size: 1.5rem;\r\n      margin-bottom: 5vmin;\r\n    }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbGxvLXdvcmxkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IklBQUk7TUFDRSxhQUFhO01BQ2Isc0JBQXNCO01BQ3RCLG1CQUFtQjtNQUNuQix1QkFBdUI7TUFDdkIsZ0JBQWdCO01BQ2hCLFlBQVk7TUFDWixZQUFZO01BQ1osY0FBYztJQUNoQjs7SUFFQTtNQUNFLGtCQUFrQjtNQUNsQixrQkFBa0I7TUFDbEIsaUJBQWlCO01BQ2pCLFlBQVk7TUFDWixXQUFXO0lBQ2I7O0lBRUE7TUFDRSxjQUFjO01BQ2QsU0FBUztNQUNULHNCQUFzQjtNQUN0QixjQUFjO01BQ2QsVUFBVTtNQUNWLFlBQVk7TUFDWixpQkFBaUI7TUFDakIscUJBQXFCO01BQ3JCLGtCQUFrQjtJQUNwQjs7SUFFQTtNQUNFLGNBQWM7SUFDaEI7O0lBRUE7TUFDRSxhQUFhO01BQ2Isd0NBQXdDO0lBQzFDOztJQUVBO01BQ0UsaUJBQWlCO01BQ2pCLG9CQUFvQjtJQUN0QiIsImZpbGUiOiJoZWxsby13b3JsZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiICAgIC5oZWxsb1dvcmxkIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgIHdpZHRoOiAxMDB2dztcclxuICAgICAgaGVpZ2h0OiA5MHZoO1xyXG4gICAgICBjb2xvcjogIzQ1NUE2NDtcclxuICAgIH1cclxuXHJcbiAgICAjc2Nhbm5lclVJIHtcclxuICAgICAgbWFyZ2luOiA1dm1pbiBhdXRvO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xyXG4gICAgICBoZWlnaHQ6IDUwdmg7XHJcbiAgICAgIHdpZHRoOiA5MHZ3O1xyXG4gICAgfVxyXG5cclxuICAgIC5JbnB1dC10ZXh0IHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgcGFkZGluZzogMC40cmVtIDAuOHJlbTtcclxuICAgICAgY29sb3I6IGluaGVyaXQ7XHJcbiAgICAgIHdpZHRoOiA5MCU7XHJcbiAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC5JbnB1dC10ZXh0OjpwbGFjZWhvbGRlciB7XHJcbiAgICAgIGNvbG9yOiAjQjBCRUM1O1xyXG4gICAgfVxyXG5cclxuICAgIC5JbnB1dC10ZXh0OmZvY3VzIHtcclxuICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgYm94LXNoYWRvdzogMC4xcmVtIDAuNHJlbSAwLjhyZW0gIzVlMzViMTtcclxuICAgIH1cclxuXHJcbiAgICBidXR0b24ge1xyXG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogNXZtaW47XHJcbiAgICB9XHJcbiJdfQ== */"] });


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

dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__["default"].BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.1.3/dist/";
// Please visit https://www.dynamsoft.com/customer/license/trialLicense to get a trial license
dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__["default"].BarcodeReader.organizationID = "200001";
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
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, consts: [["alt", "logo", "src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==", 2, "height", "5vmin"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-hello-world");
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
                        this.appendMessage.emit(result.barcodeFormatString + ': ' + result.barcodeText);
                    }
                };
                yield this.scanner.open();
            }
            catch (ex) {
                this.appendMessage.emit(ex.message);
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
BarcodeScannerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: BarcodeScannerComponent, selectors: [["app-barcode-scanner"]], outputs: { appendMessage: "appendMessage" }, decls: 9, vars: 0, consts: [["v-once", "", 1, "component-barcode-scanner"], ["viewBox", "0 0 1792 1792", 1, "dbrScanner-bg-loading"], ["d", "M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z"], ["viewBox", "0 0 2048 1792", 1, "dbrScanner-bg-camera", 2, "display", "none"], ["d", "M1024 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"], ["playsinline", "true", 1, "dbrScanner-video"], [1, "dbrScanner-cvs-drawarea"], [1, "dbrScanner-cvs-scanarea"], [1, "dbrScanner-scanlight", 2, "display", "none"]], template: function BarcodeScannerComponent_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, styles: [".component-barcode-scanner[_ngcontent-%COMP%]{width:100%;height:100%;min-width:640px;min-height:480px;background:#fff;position:relative;resize:both;}\r\n.dbrScanner-bg-loading[_ngcontent-%COMP%]{animation:1s linear infinite dbrScanner-rotate;width:40%;height:40%;position:absolute;margin:auto;left:0;top:0;right:0;bottom:0;fill:#aaa;}\r\n.dbrScanner-bg-camera[_ngcontent-%COMP%]{width:40%;height:40%;position:absolute;margin:auto;left:0;top:0;right:0;bottom:0;fill:#aaa;}\r\n.dbrScanner-video[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;left:0;top:0;}\r\n.dbrScanner-cvs-drawarea[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;left:0;top:0;}\r\n.dbrScanner-cvs-scanarea[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;left:0;top:0;}\r\n.dbrScanner-scanlight[_ngcontent-%COMP%]{width:100%;height:3%;position:absolute;animation:3s infinite dbrScanner-scanlight;border-radius:50%;box-shadow:0px 0px 2vw 1px #00e5ff;background:#fff;}\r\n.dbrScanner-sel-camera[_ngcontent-%COMP%]{margin:0 auto;position:absolute;left:0;top:0;}\r\n.dbrScanner-sel-resolution[_ngcontent-%COMP%]{position:absolute;left:0;top:20px;}\r\n@keyframes dbrScanner-rotate{from{transform:rotate(0turn);}to{transform:rotate(1turn);}}\r\n@keyframes dbrScanner-scanlight{from{top:0;}to{top:97%;}}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJCQUEyQixVQUFVLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDO0FBQ2pJLHVCQUF1Qiw4Q0FBOEMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0FBQ2pLLHNCQUFzQixTQUFTLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0FBQ2pILGtCQUFrQixVQUFVLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDeEUseUJBQXlCLFVBQVUsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUMvRSx5QkFBeUIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQy9FLHNCQUFzQixVQUFVLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLDBDQUEwQyxDQUFDLGlCQUFpQixDQUFDLGtDQUFrQyxDQUFDLGVBQWUsQ0FBQztBQUM3Syx1QkFBdUIsYUFBYSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDcEUsMkJBQTJCLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDN0QsNkJBQTZCLEtBQUssdUJBQXVCLENBQUMsQ0FBQyxHQUFHLHVCQUF1QixDQUFDLENBQUM7QUFDdkYsZ0NBQWdDLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyIsImZpbGUiOiJiYXJjb2RlLXNjYW5uZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb21wb25lbnQtYmFyY29kZS1zY2FubmVye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7bWluLXdpZHRoOjY0MHB4O21pbi1oZWlnaHQ6NDgwcHg7YmFja2dyb3VuZDojZmZmO3Bvc2l0aW9uOnJlbGF0aXZlO3Jlc2l6ZTpib3RoO31cclxuLmRiclNjYW5uZXItYmctbG9hZGluZ3thbmltYXRpb246MXMgbGluZWFyIGluZmluaXRlIGRiclNjYW5uZXItcm90YXRlO3dpZHRoOjQwJTtoZWlnaHQ6NDAlO3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbjphdXRvO2xlZnQ6MDt0b3A6MDtyaWdodDowO2JvdHRvbTowO2ZpbGw6I2FhYTt9XHJcbi5kYnJTY2FubmVyLWJnLWNhbWVyYXt3aWR0aDo0MCU7aGVpZ2h0OjQwJTtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW46YXV0bztsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtib3R0b206MDtmaWxsOiNhYWE7fVxyXG4uZGJyU2Nhbm5lci12aWRlb3t3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt9XHJcbi5kYnJTY2FubmVyLWN2cy1kcmF3YXJlYXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt9XHJcbi5kYnJTY2FubmVyLWN2cy1zY2FuYXJlYXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt9XHJcbi5kYnJTY2FubmVyLXNjYW5saWdodHt3aWR0aDoxMDAlO2hlaWdodDozJTtwb3NpdGlvbjphYnNvbHV0ZTthbmltYXRpb246M3MgaW5maW5pdGUgZGJyU2Nhbm5lci1zY2FubGlnaHQ7Ym9yZGVyLXJhZGl1czo1MCU7Ym94LXNoYWRvdzowcHggMHB4IDJ2dyAxcHggIzAwZTVmZjtiYWNrZ3JvdW5kOiNmZmY7fVxyXG4uZGJyU2Nhbm5lci1zZWwtY2FtZXJhe21hcmdpbjowIGF1dG87cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDowO31cclxuLmRiclNjYW5uZXItc2VsLXJlc29sdXRpb257cG9zaXRpb246YWJzb2x1dGU7bGVmdDowO3RvcDoyMHB4O31cclxuQGtleWZyYW1lcyBkYnJTY2FubmVyLXJvdGF0ZXtmcm9te3RyYW5zZm9ybTpyb3RhdGUoMHR1cm4pO310b3t0cmFuc2Zvcm06cm90YXRlKDF0dXJuKTt9fVxyXG5Aa2V5ZnJhbWVzIGRiclNjYW5uZXItc2NhbmxpZ2h0e2Zyb217dG9wOjA7fXRve3RvcDo5NyU7fX1cclxuIl19 */"] });


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