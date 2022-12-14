(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\project_test\dynamsoft\barcode-reader-javascript-samples\1.hello-world\3.read-video-angular\src\main.ts */"zUnb");


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
/* harmony import */ var dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dynamsoft-javascript-barcode */ "+Usd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _barcode_scanner_barcode_scanner_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../barcode-scanner/barcode-scanner.component */ "gFWJ");
/* harmony import */ var _img_decode_img_decode_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../img-decode/img-decode.component */ "yjda");

 // import side effects. The license, engineResourcePath, so on.





function HelloWorldComponent_app_video_decode_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-video-decode");
} }
function HelloWorldComponent_app_img_decode_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-img-decode");
} }
const _c0 = function (a1) { return { "margin-right": "10px", "background-color": a1 }; };
const _c1 = function (a0) { return { "background-color": a0 }; };
class HelloWorldComponent {
    constructor() {
        this.bShowScanner = true;
        this.bShowImgDecode = false;
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // Load the library on page load to speed things up.
            try {
                yield dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_2__["BarcodeScanner"].loadWasm();
            }
            catch (ex) {
                let errMsg;
                if (ex.message.includes("network connection error")) {
                    errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
                }
                else {
                    errMsg = ex.message || ex;
                }
                console.error(errMsg);
                alert(errMsg);
            }
        });
    }
    showScanner() {
        this.bShowScanner = true;
        this.bShowImgDecode = false;
    }
    showImgDecode() {
        this.bShowScanner = false;
        this.bShowImgDecode = true;
    }
}
HelloWorldComponent.ɵfac = function HelloWorldComponent_Factory(t) { return new (t || HelloWorldComponent)(); };
HelloWorldComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: HelloWorldComponent, selectors: [["app-hello-world"]], decls: 12, vars: 8, consts: [[1, "helloWorld"], ["alt", "logo", "src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==", 2, "height", "25px"], [1, "btn-group"], [3, "ngStyle", "click"], [1, "container"], [4, "ngIf"]], template: function HelloWorldComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Hello World for Angular");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HelloWorldComponent_Template_button_click_5_listener() { return ctx.showScanner(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Video Decode");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HelloWorldComponent_Template_button_click_7_listener() { return ctx.showImgDecode(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Image Decode");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, HelloWorldComponent_app_video_decode_10_Template, 1, 0, "app-video-decode", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, HelloWorldComponent_app_img_decode_11_Template, 1, 0, "app-img-decode", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](4, _c0, ctx.bShowScanner ? "rgb(255,174,55)" : "white"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](6, _c1, !ctx.bShowScanner ? "rgb(255,174,55)" : "white"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.bShowScanner);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.bShowImgDecode);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _barcode_scanner_barcode_scanner_component__WEBPACK_IMPORTED_MODULE_5__["VideoDecodeComponent"], _img_decode_img_decode_component__WEBPACK_IMPORTED_MODULE_6__["ImgDecodeComponent"]], styles: [".helloWorld[_ngcontent-%COMP%] {\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n      overflow: hidden;\r\n      width: 100%;\r\n      height: 100%;\r\n      color: #455A64;\r\n    }\r\n\r\n    button[_ngcontent-%COMP%] {\r\n      font-size: 1.5rem;\r\n      margin: 1.5vh 0;\r\n      border: 1px solid black;\r\n      background-color: white;\r\n      color: black;\r\n    }\r\n\r\n    span[_ngcontent-%COMP%] {\r\n      font-size: 0.8rem;\r\n    }\r\n\r\n    .bigger[_ngcontent-%COMP%] {\r\n      font-size: large;\r\n      margin-bottom: 2%;\r\n    }\r\n\r\n    .container[_ngcontent-%COMP%] {\r\n      margin: 2vmin auto;\r\n      text-align: center;\r\n      font-size: medium;\r\n      \r\n      width: 80vw;\r\n    }\r\n\r\n    h1[_ngcontent-%COMP%] {\r\n      font-size: 1.5em;\r\n    }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbGxvLXdvcmxkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IklBQUk7TUFDRSxhQUFhO01BQ2Isc0JBQXNCO01BQ3RCLG1CQUFtQjtNQUNuQix1QkFBdUI7TUFDdkIsZ0JBQWdCO01BQ2hCLFdBQVc7TUFDWCxZQUFZO01BQ1osY0FBYztJQUNoQjs7SUFFQTtNQUNFLGlCQUFpQjtNQUNqQixlQUFlO01BQ2YsdUJBQXVCO01BQ3ZCLHVCQUF1QjtNQUN2QixZQUFZO0lBQ2Q7O0lBRUE7TUFDRSxpQkFBaUI7SUFDbkI7O0lBRUE7TUFDRSxnQkFBZ0I7TUFDaEIsaUJBQWlCO0lBQ25COztJQUVBO01BQ0Usa0JBQWtCO01BQ2xCLGtCQUFrQjtNQUNsQixpQkFBaUI7TUFDakIsa0JBQWtCO01BQ2xCLFdBQVc7SUFDYjs7SUFFQTtNQUNFLGdCQUFnQjtJQUNsQiIsImZpbGUiOiJoZWxsby13b3JsZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiICAgIC5oZWxsb1dvcmxkIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgIGNvbG9yOiAjNDU1QTY0O1xyXG4gICAgfVxyXG5cclxuICAgIGJ1dHRvbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xyXG4gICAgICBtYXJnaW46IDEuNXZoIDA7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgICAgY29sb3I6IGJsYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHNwYW4ge1xyXG4gICAgICBmb250LXNpemU6IDAuOHJlbTtcclxuICAgIH1cclxuXHJcbiAgICAuYmlnZ2VyIHtcclxuICAgICAgZm9udC1zaXplOiBsYXJnZTtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMiU7XHJcbiAgICB9XHJcblxyXG4gICAgLmNvbnRhaW5lciB7XHJcbiAgICAgIG1hcmdpbjogMnZtaW4gYXV0bztcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBmb250LXNpemU6IG1lZGl1bTtcclxuICAgICAgLyogaGVpZ2h0OiA0MHZoOyAqL1xyXG4gICAgICB3aWR0aDogODB2dztcclxuICAgIH1cclxuXHJcbiAgICBoMSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS41ZW07XHJcbiAgICB9XHJcbiJdfQ== */"] });


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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dynamsoft-javascript-barcode */ "+Usd");

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "license" as shown below.
 */
dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__["BarcodeReader"].license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAwLWRicl9qc19zYW1wbGVzIiwib3JnYW5pemF0aW9uSUQiOiIyMDAwMDAifQ==';
/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=9.6.0&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */
dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_0__["BarcodeReader"].engineResourcePath = 'https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@9.6.0/dist/';


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
/* harmony import */ var _img_decode_img_decode_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img-decode/img-decode.component */ "yjda");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"],
        _hello_world_hello_world_component__WEBPACK_IMPORTED_MODULE_2__["HelloWorldComponent"],
        _barcode_scanner_barcode_scanner_component__WEBPACK_IMPORTED_MODULE_3__["VideoDecodeComponent"],
        _img_decode_img_decode_component__WEBPACK_IMPORTED_MODULE_4__["ImgDecodeComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]] }); })();


/***/ }),

/***/ "gFWJ":
/*!**************************************************************!*\
  !*** ./src/app/barcode-scanner/barcode-scanner.component.ts ***!
  \**************************************************************/
/*! exports provided: VideoDecodeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoDecodeComponent", function() { return VideoDecodeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dynamsoft-javascript-barcode */ "+Usd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class VideoDecodeComponent {
    constructor() {
        this.pScanner = null;
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const scanner = yield (this.pScanner = dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_1__["BarcodeScanner"].createInstance());
                yield scanner.setUIElement(document.querySelector('.component-barcode-scanner'));
                scanner.onFrameRead = (results) => {
                    for (const result of results) {
                        console.log(result.barcodeText);
                    }
                };
                scanner.onUniqueRead = (txt, result) => {
                    alert(txt);
                };
                yield scanner.open();
            }
            catch (ex) {
                let errMsg;
                if (ex.message.includes("network connection error")) {
                    errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
                }
                else {
                    errMsg = ex.message || ex;
                }
                console.error(errMsg);
                alert(errMsg);
            }
        });
    }
    ngOnDestroy() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.pScanner) {
                (yield this.pScanner).destroyContext();
                console.log('BarcodeScanner Component Unmount');
            }
        });
    }
}
VideoDecodeComponent.ɵfac = function VideoDecodeComponent_Factory(t) { return new (t || VideoDecodeComponent)(); };
VideoDecodeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: VideoDecodeComponent, selectors: [["app-video-decode"]], decls: 32, vars: 0, consts: [[1, "component-barcode-scanner"], ["viewBox", "0 0 1792 1792", 1, "dce-bg-loading"], ["d", "M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z"], ["viewBox", "0 0 2048 1792", 1, "dce-bg-camera"], ["d", "M1024 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"], [1, "dce-video-container"], [1, "dce-scanarea"], [1, "dce-scanlight"], [1, "div-select-container"], [1, "dce-sel-camera"], [1, "dce-sel-resolution"], [1, "dbr-msg-poweredby"], ["viewBox", "0 0 94 17"], ["d", "M0.9,14V4.3h2.3c0.6,0,1,0.1,1.4,0.3c0.3,0.2,0.6,0.5,0.7,0.9s0.2,0.8,0.2,1.4c0,0.5-0.1,0.9-0.2,1.3 C5.1,8.5,4.9,8.8,4.5,9.1C4.2,9.3,3.7,9.4,3.2,9.4H1.8V14H0.9z M1.8,8.7h1.2c0.4,0,0.7-0.1,1-0.2S4.3,8.2,4.4,8 c0.1-0.3,0.2-0.6,0.2-1.1c0-0.5,0-0.9-0.1-1.2C4.3,5.4,4.2,5.2,3.9,5.1S3.4,5,2.9,5H1.8V8.7z"], ["d", "M8.1,14.1c-0.5,0-0.8-0.1-1.1-0.3s-0.5-0.5-0.6-0.9s-0.2-0.9-0.2-1.4V9.6c0-0.6,0.1-1,0.2-1.4 C6.5,7.8,6.7,7.5,7,7.3S7.6,7,8.1,7C8.6,7,9,7.1,9.2,7.3s0.5,0.5,0.6,0.9C9.9,8.5,9.9,9,9.9,9.6v1.9c0,0.6-0.1,1-0.2,1.4 c-0.1,0.4-0.3,0.7-0.6,0.9S8.6,14.1,8.1,14.1z M8.1,13.4c0.3,0,0.5-0.1,0.7-0.2C8.9,13,9,12.8,9,12.5c0-0.3,0-0.6,0-1v-2 c0-0.4,0-0.7,0-1C9,8.2,8.9,8,8.8,7.9C8.6,7.7,8.4,7.6,8.1,7.6c-0.3,0-0.5,0.1-0.7,0.2C7.3,8,7.2,8.2,7.2,8.5c0,0.3-0.1,0.6-0.1,1 v2c0,0.4,0,0.7,0.1,1c0,0.3,0.1,0.5,0.3,0.7C7.6,13.4,7.8,13.4,8.1,13.4z"], ["d", "M12,14l-1.1-6.9h0.7l0.9,5.8l1.1-5.8h0.8l1.1,5.8l0.8-5.8H17L15.9,14H15l-1.1-5.6L12.8,14H12z"], ["d", "M19.8,14.1c-0.4,0-0.8-0.1-1.1-0.3s-0.5-0.5-0.6-0.9c-0.1-0.4-0.2-0.9-0.2-1.6V9.6c0-0.7,0.1-1.2,0.2-1.6 c0.1-0.4,0.3-0.7,0.6-0.8C19,7,19.3,7,19.8,7c0.5,0,0.9,0.1,1.1,0.3c0.3,0.2,0.4,0.5,0.5,0.9c0.1,0.4,0.1,1,0.1,1.6v0.6h-2.8v1.2 c0,0.4,0,0.8,0.1,1.1c0.1,0.3,0.2,0.4,0.3,0.6s0.3,0.2,0.6,0.2c0.2,0,0.3,0,0.5-0.1c0.1-0.1,0.3-0.2,0.3-0.4s0.1-0.5,0.1-0.8v-0.5 h0.9V12c0,0.6-0.1,1.1-0.4,1.5S20.4,14.1,19.8,14.1z M18.8,9.9h1.9V9.4c0-0.4,0-0.7-0.1-0.9c0-0.3-0.1-0.5-0.3-0.6S20,7.6,19.8,7.6 c-0.2,0-0.4,0.1-0.6,0.2c-0.1,0.1-0.3,0.3-0.3,0.6c-0.1,0.3-0.1,0.7-0.1,1.1V9.9z"], ["d", "M22.8,14V7.1h0.9V8c0.2-0.4,0.5-0.6,0.8-0.8C24.8,7.1,25,7,25.3,7c0,0,0,0,0.1,0s0.1,0,0.1,0v0.9 c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.2,0-0.2,0c-0.3,0-0.5,0.1-0.7,0.2c-0.2,0.1-0.4,0.3-0.6,0.6V14H22.8z"], ["d", "M28,14.1c-0.4,0-0.8-0.1-1.1-0.3s-0.5-0.5-0.6-0.9c-0.1-0.4-0.2-0.9-0.2-1.6V9.6c0-0.7,0.1-1.2,0.2-1.6 c0.1-0.4,0.3-0.7,0.6-0.8C27.3,7,27.6,7,28,7c0.5,0,0.9,0.1,1.1,0.3c0.3,0.2,0.4,0.5,0.5,0.9c0.1,0.4,0.1,1,0.1,1.6v0.6H27v1.2 c0,0.4,0,0.8,0.1,1.1c0.1,0.3,0.2,0.4,0.3,0.6s0.3,0.2,0.6,0.2c0.2,0,0.3,0,0.5-0.1c0.1-0.1,0.3-0.2,0.3-0.4s0.1-0.5,0.1-0.8v-0.5 h0.9V12c0,0.6-0.1,1.1-0.4,1.5S28.7,14.1,28,14.1z M27,9.9H29V9.4c0-0.4,0-0.7-0.1-0.9c0-0.3-0.1-0.5-0.3-0.6S28.3,7.6,28,7.6 c-0.2,0-0.4,0.1-0.6,0.2c-0.1,0.1-0.3,0.3-0.3,0.6C27.1,8.6,27,9,27,9.5V9.9z"], ["d", "M32.6,14.1c-0.6,0-1-0.2-1.3-0.7c-0.3-0.4-0.4-1.2-0.4-2.2V9.9c0-0.6,0-1.1,0.1-1.6c0.1-0.4,0.2-0.8,0.5-1 c0.2-0.2,0.6-0.4,1-0.4C32.8,7,33,7,33.2,7.1c0.2,0.1,0.4,0.3,0.5,0.4V4.3h0.9V14h-0.9v-0.5c-0.1,0.2-0.3,0.3-0.5,0.4 C33,14,32.8,14.1,32.6,14.1z M32.7,13.4c0.2,0,0.4,0,0.5-0.1c0.2-0.1,0.3-0.2,0.5-0.3V8.1c-0.1-0.1-0.3-0.2-0.4-0.3 c-0.2-0.1-0.4-0.2-0.6-0.2c-0.4,0-0.6,0.2-0.8,0.5S31.8,9,31.8,9.6v1.6c0,0.5,0,0.9,0.1,1.2c0.1,0.3,0.1,0.6,0.3,0.7 C32.3,13.3,32.5,13.4,32.7,13.4z"], ["d", "M40.5,14.1c-0.3,0-0.5-0.1-0.7-0.2c-0.2-0.1-0.4-0.3-0.5-0.4V14h-0.9V4.3h0.9v3.4c0.1-0.2,0.3-0.3,0.5-0.5 C40.1,7,40.3,7,40.6,7C41,7,41.2,7,41.4,7.2c0.2,0.2,0.4,0.4,0.5,0.6c0.1,0.3,0.2,0.6,0.2,0.9s0.1,0.7,0.1,1v1.5 c0,0.6,0,1.1-0.1,1.5c-0.1,0.4-0.3,0.8-0.5,1C41.3,14,41,14.1,40.5,14.1z M40.4,13.4c0.3,0,0.5-0.1,0.6-0.3 c0.1-0.2,0.2-0.4,0.3-0.8s0.1-0.7,0.1-1.2V9.7c0-0.5,0-0.8-0.1-1.1S41.1,8,41,7.9c-0.1-0.2-0.3-0.2-0.6-0.2c-0.2,0-0.4,0.1-0.6,0.2 c-0.2,0.1-0.3,0.2-0.5,0.4v4.7c0.1,0.1,0.3,0.3,0.5,0.4C40,13.4,40.2,13.4,40.4,13.4z"], ["d", "M43.2,15.7V15c0.4,0,0.7,0,0.9-0.1c0.2-0.1,0.3-0.1,0.4-0.3c0.1-0.1,0.1-0.2,0.1-0.4c0-0.1,0-0.3-0.1-0.5 c0-0.2-0.1-0.4-0.2-0.6L43,7.1h0.9l1.2,5.9l1.2-5.9h0.9l-1.7,7.4c-0.1,0.3-0.2,0.5-0.3,0.7c-0.2,0.2-0.4,0.3-0.6,0.4 c-0.3,0.1-0.6,0.1-1,0.1H43.2z"], ["d", "M50.6,14V4.3h2.1c0.7,0,1.2,0.1,1.6,0.4c0.4,0.2,0.6,0.6,0.8,1c0.2,0.4,0.2,0.9,0.2,1.5V11 c0,0.6-0.1,1.1-0.2,1.6s-0.4,0.8-0.8,1S53.5,14,52.8,14H50.6z M51.5,13.3h1.2c0.5,0,0.9-0.1,1.1-0.3s0.4-0.5,0.5-0.9 s0.1-0.8,0.1-1.3V7.2c0-0.5,0-0.9-0.1-1.2s-0.2-0.6-0.5-0.8S53.2,5,52.7,5h-1.2V13.3z"], ["d", "M56.5,15.7V15c0.4,0,0.7,0,0.9-0.1c0.2-0.1,0.3-0.1,0.4-0.3c0.1-0.1,0.1-0.2,0.1-0.4c0-0.1,0-0.3-0.1-0.5 c0-0.2-0.1-0.4-0.2-0.6l-1.4-6.1h0.9l1.2,5.9l1.2-5.9h0.9l-1.7,7.4c-0.1,0.3-0.2,0.5-0.3,0.7s-0.4,0.3-0.6,0.4s-0.6,0.1-1,0.1H56.5 z"], ["d", "M61.3,14V7.1h0.9v0.7c0.2-0.2,0.5-0.4,0.8-0.6C63.2,7,63.5,7,63.8,7C64,7,64.2,7,64.4,7.1s0.3,0.3,0.4,0.5 c0.1,0.2,0.1,0.5,0.1,0.8V14H64V8.6c0-0.4-0.1-0.6-0.2-0.8c-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.4,0.1-0.6,0.2s-0.4,0.3-0.6,0.5V14 H61.3z"], ["d", "M67.4,14.1c-0.3,0-0.5-0.1-0.7-0.2c-0.2-0.1-0.4-0.3-0.5-0.6C66,13.1,66,12.8,66,12.6c0-0.4,0.1-0.7,0.2-0.9 s0.3-0.5,0.5-0.7c0.2-0.2,0.5-0.4,0.9-0.6c0.4-0.2,0.8-0.4,1.3-0.6V9.3c0-0.4,0-0.8-0.1-1c-0.1-0.2-0.1-0.4-0.3-0.5 c-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.3,0-0.5,0.1c-0.1,0.1-0.3,0.2-0.3,0.4c-0.1,0.2-0.1,0.4-0.1,0.7V9l-0.9,0 c0-0.7,0.2-1.2,0.5-1.6C66.8,7.1,67.3,7,68,7c0.6,0,1.1,0.2,1.3,0.6c0.3,0.4,0.4,1,0.4,1.7v3.4c0,0.1,0,0.3,0,0.5 c0,0.2,0,0.4,0,0.5c0,0.2,0,0.3,0,0.4h-0.8c0-0.2-0.1-0.3-0.1-0.5c0-0.2,0-0.3-0.1-0.5c-0.1,0.3-0.3,0.5-0.5,0.7 S67.7,14.1,67.4,14.1z M67.6,13.4c0.2,0,0.3,0,0.5-0.1c0.1-0.1,0.3-0.2,0.4-0.3s0.2-0.3,0.3-0.4v-2.2c-0.3,0.2-0.6,0.3-0.9,0.5 c-0.2,0.1-0.4,0.3-0.6,0.4c-0.2,0.1-0.3,0.3-0.3,0.5s-0.1,0.4-0.1,0.6c0,0.4,0.1,0.6,0.2,0.8C67.2,13.3,67.4,13.4,67.6,13.4z"], ["d", "M70.9,14V7.1h0.8v0.7c0.2-0.3,0.5-0.5,0.8-0.6c0.3-0.1,0.6-0.2,0.9-0.2c0.2,0,0.5,0.1,0.7,0.2s0.3,0.4,0.4,0.7 c0.2-0.3,0.5-0.5,0.8-0.7c0.3-0.2,0.6-0.2,0.9-0.2c0.2,0,0.4,0,0.6,0.1s0.3,0.3,0.4,0.5c0.1,0.2,0.2,0.5,0.2,0.9V14h-0.8V8.6 c0-0.4-0.1-0.7-0.2-0.8s-0.3-0.2-0.5-0.2c-0.2,0-0.4,0.1-0.7,0.2S74.7,8,74.5,8.3c0,0,0,0.1,0,0.1s0,0.1,0,0.1V14h-0.8V8.6 c0-0.4-0.1-0.7-0.2-0.8c-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.4,0.1-0.7,0.2c-0.2,0.1-0.4,0.3-0.6,0.5V14H70.9z"], ["d", "M80.2,14.1c-0.6,0-1-0.2-1.3-0.5c-0.3-0.4-0.5-0.8-0.6-1.4l0.7-0.2c0,0.5,0.2,0.9,0.4,1.2 c0.2,0.2,0.5,0.4,0.8,0.4c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.2-0.4,0.2-0.7c0-0.2-0.1-0.5-0.2-0.7c-0.1-0.2-0.4-0.5-0.6-0.7l-0.9-0.8 c-0.3-0.3-0.5-0.5-0.7-0.8c-0.2-0.3-0.2-0.6-0.2-0.9c0-0.3,0.1-0.6,0.2-0.8c0.1-0.2,0.3-0.4,0.6-0.5C79.5,7,79.8,7,80.2,7 c0.5,0,0.9,0.2,1.2,0.5c0.3,0.3,0.4,0.8,0.4,1.3L81.2,9c0-0.3-0.1-0.6-0.1-0.8s-0.2-0.4-0.3-0.5c-0.1-0.1-0.3-0.1-0.5-0.1 c-0.3,0-0.5,0.1-0.6,0.2c-0.2,0.1-0.2,0.4-0.2,0.6c0,0.2,0,0.4,0.1,0.6c0.1,0.2,0.2,0.3,0.4,0.5l1,0.9c0.2,0.2,0.4,0.3,0.6,0.5 c0.2,0.2,0.3,0.4,0.4,0.6c0.1,0.2,0.2,0.5,0.2,0.8c0,0.4-0.1,0.7-0.2,0.9c-0.1,0.2-0.4,0.4-0.6,0.6C80.9,14,80.6,14.1,80.2,14.1z"], ["d", "M84.7,14.1c-0.5,0-0.8-0.1-1.1-0.3c-0.3-0.2-0.5-0.5-0.6-0.9s-0.2-0.9-0.2-1.4V9.6c0-0.6,0.1-1,0.2-1.4 c0.1-0.4,0.3-0.7,0.6-0.9C83.9,7.1,84.3,7,84.7,7c0.5,0,0.9,0.1,1.1,0.3s0.5,0.5,0.6,0.9c0.1,0.4,0.2,0.9,0.2,1.4v1.9 c0,0.6-0.1,1-0.2,1.4s-0.3,0.7-0.6,0.9S85.2,14.1,84.7,14.1z M84.7,13.4c0.3,0,0.5-0.1,0.7-0.2c0.1-0.2,0.2-0.4,0.3-0.7 c0-0.3,0-0.6,0-1v-2c0-0.4,0-0.7,0-1c0-0.3-0.1-0.5-0.3-0.7c-0.1-0.2-0.4-0.2-0.7-0.2c-0.3,0-0.5,0.1-0.7,0.2 c-0.1,0.2-0.2,0.4-0.3,0.7c0,0.3-0.1,0.6-0.1,1v2c0,0.4,0,0.7,0.1,1c0,0.3,0.1,0.5,0.3,0.7C84.2,13.4,84.4,13.4,84.7,13.4z"], ["d", "M88.2,14V7.7h-0.9V7.1h0.9V6.3c0-0.3,0-0.6,0.1-0.9c0.1-0.3,0.2-0.5,0.4-0.6c0.2-0.2,0.5-0.2,0.8-0.2 c0.1,0,0.2,0,0.4,0c0.1,0,0.2,0,0.3,0.1v0.6c-0.1,0-0.2,0-0.2,0c-0.1,0-0.2,0-0.2,0c-0.3,0-0.4,0.1-0.5,0.2s-0.1,0.4-0.1,0.8v0.8 h1.1v0.6h-1.1V14H88.2z"], ["d", "M92.7,14.1c-0.3,0-0.6-0.1-0.8-0.2s-0.3-0.3-0.4-0.5c-0.1-0.2-0.1-0.5-0.1-0.8V7.6h-0.9V7.1h0.9V4.9h0.9v2.1 h1.2v0.6h-1.2v4.8c0,0.3,0,0.6,0.1,0.7c0.1,0.1,0.2,0.2,0.5,0.2c0.1,0,0.2,0,0.2,0s0.2,0,0.3,0V14c-0.1,0-0.2,0-0.4,0.1 C92.9,14.1,92.8,14.1,92.7,14.1z"]], template: function VideoDecodeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "path", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "svg", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "select", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "svg", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "path", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "path", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "path", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "path", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "path", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](19, "path", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "path", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "path", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](22, "path", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](23, "path", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "path", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](25, "path", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](26, "path", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](27, "path", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](28, "path", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](29, "path", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](30, "path", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](31, "path", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, styles: [".component-barcode-scanner[_ngcontent-%COMP%]{width:100%;height:100%;min-height:480px;background:#eee;position:relative;resize:both;}\r\n.dce-bg-loading[_ngcontent-%COMP%]{display:none;animation:1s linear infinite dce-rotate;width:40%;height:40%;position:absolute;margin:auto;left:0;top:0;right:0;bottom:0;fill:#aaa;}\r\n.dce-bg-camera[_ngcontent-%COMP%]{display:none;width:40%;height:40%;position:absolute;margin:auto;left:0;top:0;right:0;bottom:0;fill:#aaa;}\r\n.dce-video-container[_ngcontent-%COMP%]{position:absolute;left:0;top:0;width:100%;height:100%;}\r\n.dce-scanarea[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;left:0;top:0;}\r\n.dce-scanlight[_ngcontent-%COMP%]{display:none;width:100%;height:3%;position:absolute;animation:3s infinite dce-scanlight;border-radius:50%;box-shadow:0px 0px 2vw 1px #00e5ff;background:#fff;}\r\n.div-select-container[_ngcontent-%COMP%]{position:absolute;left:0;top:0;}\r\n.dce-sel-camera[_ngcontent-%COMP%]{display:block;}\r\n.dce-sel-resolution[_ngcontent-%COMP%]{display:block;margin-top:5px;}\r\n.dbr-msg-poweredby[_ngcontent-%COMP%]{position:absolute;left:50%;bottom:10%;transform:translateX(-50%);}\r\n.dbr-msg-poweredby[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {height:max(3vmin,17px);fill:#FFFFFF;}\r\n@keyframes dce-rotate{from{transform:rotate(0turn);}to{transform:rotate(1turn);}}\r\n@keyframes dce-scanlight{from{top:0;}to{top:97%;}}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJCQUEyQixVQUFVLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7QUFDdkksZ0JBQWdCLFlBQVksQ0FBQyx1Q0FBdUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0FBQ2hLLGVBQWUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7QUFDdkgscUJBQXFCLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztBQUMzRSxjQUFjLFVBQVUsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNwRSxlQUFlLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLG1DQUFtQyxDQUFDLGlCQUFpQixDQUFDLGtDQUFrQyxDQUFDLGVBQWUsQ0FBQztBQUM1SyxzQkFBc0IsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNyRCxnQkFBZ0IsYUFBYSxDQUFDO0FBQzlCLG9CQUFvQixhQUFhLENBQUMsY0FBYyxDQUFDO0FBQ2pELG1CQUFtQixpQkFBaUIsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLDBCQUEwQixDQUFDO0FBQ3BGLHdCQUF3QixzQkFBc0IsQ0FBQyxZQUFZLENBQUM7QUFDNUQsc0JBQXNCLEtBQUssdUJBQXVCLENBQUMsQ0FBQyxHQUFHLHVCQUF1QixDQUFDLENBQUM7QUFDaEYseUJBQXlCLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyIsImZpbGUiOiJiYXJjb2RlLXNjYW5uZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb21wb25lbnQtYmFyY29kZS1zY2FubmVye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7LyogbWluLXdpZHRoOjY0MHB4OyAqL21pbi1oZWlnaHQ6NDgwcHg7YmFja2dyb3VuZDojZWVlO3Bvc2l0aW9uOnJlbGF0aXZlO3Jlc2l6ZTpib3RoO31cclxuLmRjZS1iZy1sb2FkaW5ne2Rpc3BsYXk6bm9uZTthbmltYXRpb246MXMgbGluZWFyIGluZmluaXRlIGRjZS1yb3RhdGU7d2lkdGg6NDAlO2hlaWdodDo0MCU7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luOmF1dG87bGVmdDowO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7ZmlsbDojYWFhO31cclxuLmRjZS1iZy1jYW1lcmF7ZGlzcGxheTpub25lO3dpZHRoOjQwJTtoZWlnaHQ6NDAlO3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbjphdXRvO2xlZnQ6MDt0b3A6MDtyaWdodDowO2JvdHRvbTowO2ZpbGw6I2FhYTt9XHJcbi5kY2UtdmlkZW8tY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO31cclxuLmRjZS1zY2FuYXJlYXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt9XHJcbi5kY2Utc2NhbmxpZ2h0e2Rpc3BsYXk6bm9uZTt3aWR0aDoxMDAlO2hlaWdodDozJTtwb3NpdGlvbjphYnNvbHV0ZTthbmltYXRpb246M3MgaW5maW5pdGUgZGNlLXNjYW5saWdodDtib3JkZXItcmFkaXVzOjUwJTtib3gtc2hhZG93OjBweCAwcHggMnZ3IDFweCAjMDBlNWZmO2JhY2tncm91bmQ6I2ZmZjt9XHJcbi5kaXYtc2VsZWN0LWNvbnRhaW5lcntwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7fVxyXG4uZGNlLXNlbC1jYW1lcmF7ZGlzcGxheTpibG9jazt9XHJcbi5kY2Utc2VsLXJlc29sdXRpb257ZGlzcGxheTpibG9jazttYXJnaW4tdG9wOjVweDt9XHJcbi5kYnItbXNnLXBvd2VyZWRieXtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjUwJTtib3R0b206MTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpO31cclxuLmRici1tc2ctcG93ZXJlZGJ5IHN2ZyB7aGVpZ2h0Om1heCgzdm1pbiwxN3B4KTtmaWxsOiNGRkZGRkY7fVxyXG5Aa2V5ZnJhbWVzIGRjZS1yb3RhdGV7ZnJvbXt0cmFuc2Zvcm06cm90YXRlKDB0dXJuKTt9dG97dHJhbnNmb3JtOnJvdGF0ZSgxdHVybik7fX1cclxuQGtleWZyYW1lcyBkY2Utc2NhbmxpZ2h0e2Zyb217dG9wOjA7fXRve3RvcDo5NyU7fX1cclxuIl19 */"] });


/***/ }),

/***/ "yjda":
/*!****************************************************!*\
  !*** ./src/app/img-decode/img-decode.component.ts ***!
  \****************************************************/
/*! exports provided: ImgDecodeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImgDecodeComponent", function() { return ImgDecodeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dynamsoft-javascript-barcode */ "+Usd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class ImgDecodeComponent {
    constructor() {
        this.pReader = null;
        this.decodeImg = (e) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const reader = yield (this.pReader = this.pReader || dynamsoft_javascript_barcode__WEBPACK_IMPORTED_MODULE_1__["BarcodeReader"].createInstance());
                const results = yield reader.decode(e.target.files[0]);
                for (const result of results) {
                    alert(result.barcodeText);
                }
                if (!results.length) {
                    alert('No barcode found');
                }
            }
            catch (ex) {
                let errMsg;
                if (ex.message.includes("network connection error")) {
                    errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
                }
                else {
                    errMsg = ex.message || ex;
                }
                console.error(errMsg);
                alert(errMsg);
            }
            e.target.value = '';
        });
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () { });
    }
    ngOnDestroy() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.pReader) {
                (yield this.pReader).destroyContext();
                console.log('ImgDecode Component Unmount');
            }
        });
    }
}
ImgDecodeComponent.ɵfac = function ImgDecodeComponent_Factory(t) { return new (t || ImgDecodeComponent)(); };
ImgDecodeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ImgDecodeComponent, selectors: [["app-img-decode"]], decls: 2, vars: 0, consts: [[1, "ImgDecode"], ["type", "file", 3, "change"]], template: function ImgDecodeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ImgDecodeComponent_Template_input_change_1_listener($event) { return ctx.decodeImg($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, styles: [".ImgDecode[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  width: 100%;\r\n  height: 90%;\r\n  border: 1px solid black\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltZy1kZWNvZGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxXQUFXO0VBQ1g7QUFDRiIsImZpbGUiOiJpbWctZGVjb2RlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuSW1nRGVjb2RlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiA5MCU7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2tcclxufSJdfQ== */"] });


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