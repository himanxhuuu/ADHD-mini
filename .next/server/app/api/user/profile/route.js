"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/user/profile/route";
exports.ids = ["app/api/user/profile/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fprofile%2Froute&page=%2Fapi%2Fuser%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fprofile%2Froute.ts&appDir=D%3A%5Cmini_adhd1%5Cmini_adhd%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cmini_adhd1%5Cmini_adhd&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fprofile%2Froute&page=%2Fapi%2Fuser%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fprofile%2Froute.ts&appDir=D%3A%5Cmini_adhd1%5Cmini_adhd%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cmini_adhd1%5Cmini_adhd&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_mini_adhd1_mini_adhd_app_api_user_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user/profile/route.ts */ \"(rsc)/./app/api/user/profile/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/profile/route\",\n        pathname: \"/api/user/profile\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/profile/route\"\n    },\n    resolvedPagePath: \"D:\\\\mini_adhd1\\\\mini_adhd\\\\app\\\\api\\\\user\\\\profile\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_mini_adhd1_mini_adhd_app_api_user_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/user/profile/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGcHJvZmlsZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdXNlciUyRnByb2ZpbGUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ1c2VyJTJGcHJvZmlsZSUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDbWluaV9hZGhkMSU1Q21pbmlfYWRoZCU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9RCUzQSU1Q21pbmlfYWRoZDElNUNtaW5pX2FkaGQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ1k7QUFDekY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mb2N1c2Zsb3cvP2YyM2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRDpcXFxcbWluaV9hZGhkMVxcXFxtaW5pX2FkaGRcXFxcYXBwXFxcXGFwaVxcXFx1c2VyXFxcXHByb2ZpbGVcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3VzZXIvcHJvZmlsZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VzZXIvcHJvZmlsZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdXNlci9wcm9maWxlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcbWluaV9hZGhkMVxcXFxtaW5pX2FkaGRcXFxcYXBwXFxcXGFwaVxcXFx1c2VyXFxcXHByb2ZpbGVcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3VzZXIvcHJvZmlsZS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fprofile%2Froute&page=%2Fapi%2Fuser%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fprofile%2Froute.ts&appDir=D%3A%5Cmini_adhd1%5Cmini_adhd%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cmini_adhd1%5Cmini_adhd&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/user/profile/route.ts":
/*!***************************************!*\
  !*** ./app/api/user/profile/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\n\n\nasync function GET() {\n    await (0,_lib_db__WEBPACK_IMPORTED_MODULE_1__.connectToDatabase)();\n    const claims = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_3__.getUserFromCookie)();\n    if (!claims) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Unauthorized\"\n    }, {\n        status: 401\n    });\n    const user = await _models_User__WEBPACK_IMPORTED_MODULE_2__.User.findById(claims.userId).select(\"-password\").lean();\n    if (!user) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"User not found\"\n    }, {\n        status: 404\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(user);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXIvcHJvZmlsZS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQztBQUNFO0FBQ1I7QUFDVTtBQUV2QyxlQUFlSTtJQUNwQixNQUFNSCwwREFBaUJBO0lBQ3ZCLE1BQU1JLFNBQVNGLDREQUFpQkE7SUFDaEMsSUFBSSxDQUFDRSxRQUFRLE9BQU9MLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7UUFBRUMsT0FBTztJQUFlLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBRS9FLE1BQU1DLE9BQU8sTUFBTVAsOENBQUlBLENBQUNRLFFBQVEsQ0FBQ0wsT0FBT00sTUFBTSxFQUFFQyxNQUFNLENBQUMsYUFBYUMsSUFBSTtJQUN4RSxJQUFJLENBQUNKLE1BQU0sT0FBT1QscURBQVlBLENBQUNNLElBQUksQ0FBQztRQUFFQyxPQUFPO0lBQWlCLEdBQUc7UUFBRUMsUUFBUTtJQUFJO0lBRS9FLE9BQU9SLHFEQUFZQSxDQUFDTSxJQUFJLENBQUNHO0FBQzNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZm9jdXNmbG93Ly4vYXBwL2FwaS91c2VyL3Byb2ZpbGUvcm91dGUudHM/MTZhYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcclxuaW1wb3J0IHsgY29ubmVjdFRvRGF0YWJhc2UgfSBmcm9tICdAL2xpYi9kYidcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJ0AvbW9kZWxzL1VzZXInXHJcbmltcG9ydCB7IGdldFVzZXJGcm9tQ29va2llIH0gZnJvbSAnQC9saWIvYXV0aCdcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XHJcbiAgYXdhaXQgY29ubmVjdFRvRGF0YWJhc2UoKVxyXG4gIGNvbnN0IGNsYWltcyA9IGdldFVzZXJGcm9tQ29va2llPHsgdXNlcklkOiBzdHJpbmcgfT4oKVxyXG4gIGlmICghY2xhaW1zKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KVxyXG4gIFxyXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKGNsYWltcy51c2VySWQpLnNlbGVjdCgnLXBhc3N3b3JkJykubGVhbigpXHJcbiAgaWYgKCF1c2VyKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VzZXIgbm90IGZvdW5kJyB9LCB7IHN0YXR1czogNDA0IH0pXHJcbiAgXHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHVzZXIpXHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNvbm5lY3RUb0RhdGFiYXNlIiwiVXNlciIsImdldFVzZXJGcm9tQ29va2llIiwiR0VUIiwiY2xhaW1zIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwidXNlciIsImZpbmRCeUlkIiwidXNlcklkIiwic2VsZWN0IiwibGVhbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user/profile/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearAuthCookie: () => (/* binding */ clearAuthCookie),\n/* harmony export */   getUserFromCookie: () => (/* binding */ getUserFromCookie),\n/* harmony export */   setAuthCookie: () => (/* binding */ setAuthCookie),\n/* harmony export */   signJwt: () => (/* binding */ signJwt),\n/* harmony export */   verifyJwt: () => (/* binding */ verifyJwt)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nconst JWT_SECRET = process.env.JWT_SECRET;\nconst COOKIE_NAME = \"focusflow_token\";\nfunction signJwt(payload, expiresIn = \"7d\") {\n    if (!JWT_SECRET) throw new Error(\"JWT_SECRET is not set. Add it to .env.local and restart the dev server.\");\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, JWT_SECRET, {\n        expiresIn\n    });\n}\nfunction verifyJwt(token) {\n    try {\n        if (!JWT_SECRET) return null;\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, JWT_SECRET);\n    } catch  {\n        return null;\n    }\n}\nfunction setAuthCookie(token) {\n    (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)().set(COOKIE_NAME, token, {\n        httpOnly: true,\n        secure: true,\n        sameSite: \"lax\",\n        path: \"/\",\n        maxAge: 60 * 60 * 24 * 7\n    });\n}\nfunction clearAuthCookie() {\n    (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)().set(COOKIE_NAME, \"\", {\n        httpOnly: true,\n        expires: new Date(0),\n        path: \"/\"\n    });\n}\nfunction getUserFromCookie() {\n    const token = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)().get(COOKIE_NAME)?.value;\n    if (!token) return null;\n    return verifyJwt(token);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE4QjtBQUNRO0FBRXRDLE1BQU1FLGFBQWFDLFFBQVFDLEdBQUcsQ0FBQ0YsVUFBVTtBQUN6QyxNQUFNRyxjQUFjO0FBRWIsU0FBU0MsUUFBUUMsT0FBZSxFQUFFQyxZQUFvQixJQUFJO0lBQy9ELElBQUksQ0FBQ04sWUFBWSxNQUFNLElBQUlPLE1BQU07SUFDakMsT0FBT1Qsd0RBQVEsQ0FBQ08sU0FBU0wsWUFBWTtRQUFFTTtJQUFVO0FBQ25EO0FBRU8sU0FBU0csVUFBbUJDLEtBQWE7SUFDOUMsSUFBSTtRQUNGLElBQUksQ0FBQ1YsWUFBWSxPQUFPO1FBQ3hCLE9BQU9GLDBEQUFVLENBQUNZLE9BQU9WO0lBQzNCLEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGO0FBRU8sU0FBU1ksY0FBY0YsS0FBYTtJQUN6Q1gscURBQU9BLEdBQUdjLEdBQUcsQ0FBQ1YsYUFBYU8sT0FBTztRQUNoQ0ksVUFBVTtRQUNWQyxRQUFRO1FBQ1JDLFVBQVU7UUFDVkMsTUFBTTtRQUNOQyxRQUFRLEtBQUssS0FBSyxLQUFLO0lBQ3pCO0FBQ0Y7QUFFTyxTQUFTQztJQUNkcEIscURBQU9BLEdBQUdjLEdBQUcsQ0FBQ1YsYUFBYSxJQUFJO1FBQUVXLFVBQVU7UUFBTU0sU0FBUyxJQUFJQyxLQUFLO1FBQUlKLE1BQU07SUFBSTtBQUNuRjtBQUVPLFNBQVNLO0lBQ2QsTUFBTVosUUFBUVgscURBQU9BLEdBQUd3QixHQUFHLENBQUNwQixjQUFjcUI7SUFDMUMsSUFBSSxDQUFDZCxPQUFPLE9BQU87SUFDbkIsT0FBT0QsVUFBYUM7QUFDdEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mb2N1c2Zsb3cvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJ1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gJ25leHQvaGVhZGVycydcblxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgYXMgc3RyaW5nIHwgdW5kZWZpbmVkXG5jb25zdCBDT09LSUVfTkFNRSA9ICdmb2N1c2Zsb3dfdG9rZW4nXG5cbmV4cG9ydCBmdW5jdGlvbiBzaWduSnd0KHBheWxvYWQ6IG9iamVjdCwgZXhwaXJlc0luOiBzdHJpbmcgPSAnN2QnKSB7XG4gIGlmICghSldUX1NFQ1JFVCkgdGhyb3cgbmV3IEVycm9yKCdKV1RfU0VDUkVUIGlzIG5vdCBzZXQuIEFkZCBpdCB0byAuZW52LmxvY2FsIGFuZCByZXN0YXJ0IHRoZSBkZXYgc2VydmVyLicpXG4gIHJldHVybiBqd3Quc2lnbihwYXlsb2FkLCBKV1RfU0VDUkVULCB7IGV4cGlyZXNJbiB9IGFzIGFueSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeUp3dDxUID0gYW55Pih0b2tlbjogc3RyaW5nKTogVCB8IG51bGwge1xuICB0cnkge1xuICAgIGlmICghSldUX1NFQ1JFVCkgcmV0dXJuIG51bGxcbiAgICByZXR1cm4gand0LnZlcmlmeSh0b2tlbiwgSldUX1NFQ1JFVCkgYXMgVFxuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdXRoQ29va2llKHRva2VuOiBzdHJpbmcpIHtcbiAgY29va2llcygpLnNldChDT09LSUVfTkFNRSwgdG9rZW4sIHtcbiAgICBodHRwT25seTogdHJ1ZSxcbiAgICBzZWN1cmU6IHRydWUsXG4gICAgc2FtZVNpdGU6ICdsYXgnLFxuICAgIHBhdGg6ICcvJyxcbiAgICBtYXhBZ2U6IDYwICogNjAgKiAyNCAqIDcsXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckF1dGhDb29raWUoKSB7XG4gIGNvb2tpZXMoKS5zZXQoQ09PS0lFX05BTUUsICcnLCB7IGh0dHBPbmx5OiB0cnVlLCBleHBpcmVzOiBuZXcgRGF0ZSgwKSwgcGF0aDogJy8nIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyRnJvbUNvb2tpZTxUID0gYW55PigpOiBUIHwgbnVsbCB7XG4gIGNvbnN0IHRva2VuID0gY29va2llcygpLmdldChDT09LSUVfTkFNRSk/LnZhbHVlXG4gIGlmICghdG9rZW4pIHJldHVybiBudWxsXG4gIHJldHVybiB2ZXJpZnlKd3Q8VD4odG9rZW4pXG59XG5cbiJdLCJuYW1lcyI6WyJqd3QiLCJjb29raWVzIiwiSldUX1NFQ1JFVCIsInByb2Nlc3MiLCJlbnYiLCJDT09LSUVfTkFNRSIsInNpZ25Kd3QiLCJwYXlsb2FkIiwiZXhwaXJlc0luIiwiRXJyb3IiLCJzaWduIiwidmVyaWZ5Snd0IiwidG9rZW4iLCJ2ZXJpZnkiLCJzZXRBdXRoQ29va2llIiwic2V0IiwiaHR0cE9ubHkiLCJzZWN1cmUiLCJzYW1lU2l0ZSIsInBhdGgiLCJtYXhBZ2UiLCJjbGVhckF1dGhDb29raWUiLCJleHBpcmVzIiwiRGF0ZSIsImdldFVzZXJGcm9tQ29va2llIiwiZ2V0IiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDatabase: () => (/* binding */ connectToDatabase)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function connectToDatabase() {\n    // For development/testing purposes, if MONGODB_URI is not set or invalid,\n    // we'll use a mock connection\n    if (!MONGODB_URI) {\n        console.warn(\"⚠️ MONGODB_URI is not set. Using mock database connection.\");\n        return null;\n    }\n    try {\n        if (cached.conn) return cached.conn;\n        if (!cached.promise) {\n            cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n                dbName: process.env.MONGODB_DB || \"focusflow\"\n            });\n        }\n        cached.conn = await cached.promise;\n        return cached.conn;\n    } catch (error) {\n        console.warn(\"⚠️ MongoDB connection failed. Using mock database connection.\");\n        console.error(\"MongoDB Error:\", error);\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztBQUUzQyxJQUFJRyxTQUFTLE9BQWdCSixRQUFRO0FBS3JDLElBQUksQ0FBQ0ksUUFBUTtJQUNYQSxTQUFTLE9BQWdCSixRQUFRLEdBQUc7UUFBRU0sTUFBTTtRQUFNQyxTQUFTO0lBQUs7QUFDbEU7QUFFTyxlQUFlQztJQUNwQiwwRUFBMEU7SUFDMUUsOEJBQThCO0lBQzlCLElBQUksQ0FBQ1AsYUFBYTtRQUNoQlEsUUFBUUMsSUFBSSxDQUFDO1FBQ2IsT0FBTztJQUNUO0lBRUEsSUFBSTtRQUNGLElBQUlOLE9BQU9FLElBQUksRUFBRSxPQUFPRixPQUFPRSxJQUFJO1FBQ25DLElBQUksQ0FBQ0YsT0FBT0csT0FBTyxFQUFFO1lBQ25CSCxPQUFPRyxPQUFPLEdBQUdQLHVEQUFnQixDQUFDQyxhQUFhO2dCQUM3Q1csUUFBUVYsUUFBUUMsR0FBRyxDQUFDVSxVQUFVLElBQUk7WUFDcEM7UUFDRjtRQUNBVCxPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztRQUNsQyxPQUFPSCxPQUFPRSxJQUFJO0lBQ3BCLEVBQUUsT0FBT1EsT0FBTztRQUNkTCxRQUFRQyxJQUFJLENBQ1Y7UUFFRkQsUUFBUUssS0FBSyxDQUFDLGtCQUFrQkE7UUFDaEMsT0FBTztJQUNUO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mb2N1c2Zsb3cvLi9saWIvZGIudHM/MWRmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcblxyXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbmxldCBjYWNoZWQgPSAoZ2xvYmFsIGFzIGFueSkubW9uZ29vc2UgYXMge1xyXG4gIGNvbm46IHR5cGVvZiBtb25nb29zZSB8IG51bGw7XHJcbiAgcHJvbWlzZTogUHJvbWlzZTx0eXBlb2YgbW9uZ29vc2U+IHwgbnVsbDtcclxufTtcclxuXHJcbmlmICghY2FjaGVkKSB7XHJcbiAgY2FjaGVkID0gKGdsb2JhbCBhcyBhbnkpLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0VG9EYXRhYmFzZSgpIHtcclxuICAvLyBGb3IgZGV2ZWxvcG1lbnQvdGVzdGluZyBwdXJwb3NlcywgaWYgTU9OR09EQl9VUkkgaXMgbm90IHNldCBvciBpbnZhbGlkLFxyXG4gIC8vIHdlJ2xsIHVzZSBhIG1vY2sgY29ubmVjdGlvblxyXG4gIGlmICghTU9OR09EQl9VUkkpIHtcclxuICAgIGNvbnNvbGUud2FybihcIuKaoO+4jyBNT05HT0RCX1VSSSBpcyBub3Qgc2V0LiBVc2luZyBtb2NrIGRhdGFiYXNlIGNvbm5lY3Rpb24uXCIpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgaWYgKGNhY2hlZC5jb25uKSByZXR1cm4gY2FjaGVkLmNvbm47XHJcbiAgICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XHJcbiAgICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwge1xyXG4gICAgICAgIGRiTmFtZTogcHJvY2Vzcy5lbnYuTU9OR09EQl9EQiB8fCBcImZvY3VzZmxvd1wiLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XHJcbiAgICByZXR1cm4gY2FjaGVkLmNvbm47XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUud2FybihcclxuICAgICAgXCLimqDvuI8gTW9uZ29EQiBjb25uZWN0aW9uIGZhaWxlZC4gVXNpbmcgbW9jayBkYXRhYmFzZSBjb25uZWN0aW9uLlwiXHJcbiAgICApO1xyXG4gICAgY29uc29sZS5lcnJvcihcIk1vbmdvREIgRXJyb3I6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJjYWNoZWQiLCJnbG9iYWwiLCJjb25uIiwicHJvbWlzZSIsImNvbm5lY3RUb0RhdGFiYXNlIiwiY29uc29sZSIsIndhcm4iLCJjb25uZWN0IiwiZGJOYW1lIiwiTU9OR09EQl9EQiIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst PreferencesSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    fontSize: {\n        type: String,\n        default: \"medium\"\n    },\n    backgroundColor: {\n        type: String,\n        default: \"#f8fafc\"\n    },\n    contrast: {\n        type: String,\n        default: \"normal\"\n    },\n    spacing: {\n        type: String,\n        default: \"normal\"\n    },\n    preferredMode: {\n        type: String,\n        enum: [\n            \"text\",\n            \"visual\",\n            \"audio\"\n        ],\n        default: \"text\"\n    },\n    speechSpeed: {\n        type: Number,\n        default: 1.0\n    },\n    animationEnabled: {\n        type: Boolean,\n        default: true\n    }\n}, {\n    _id: false\n});\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true,\n        lowercase: true\n    },\n    password: {\n        type: String,\n        required: true\n    },\n    role: {\n        type: String,\n        enum: [\n            \"Student\",\n            \"Parent\",\n            \"Educator\"\n        ],\n        required: true\n    },\n    adhdScore: {\n        type: Number,\n        min: 0,\n        max: 100\n    },\n    preferences: {\n        type: PreferencesSchema,\n        default: {}\n    }\n}, {\n    timestamps: true\n});\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNEQ7QUF5QjVELE1BQU1FLG9CQUFvQixJQUFJRCw0Q0FBTUEsQ0FBa0I7SUFDcERFLFVBQVU7UUFBRUMsTUFBTUM7UUFBUUMsU0FBUztJQUFTO0lBQzVDQyxpQkFBaUI7UUFBRUgsTUFBTUM7UUFBUUMsU0FBUztJQUFVO0lBQ3BERSxVQUFVO1FBQUVKLE1BQU1DO1FBQVFDLFNBQVM7SUFBUztJQUM1Q0csU0FBUztRQUFFTCxNQUFNQztRQUFRQyxTQUFTO0lBQVM7SUFDM0NJLGVBQWU7UUFBRU4sTUFBTUM7UUFBUU0sTUFBTTtZQUFDO1lBQVE7WUFBVTtTQUFRO1FBQUVMLFNBQVM7SUFBTztJQUNsRk0sYUFBYTtRQUFFUixNQUFNUztRQUFRUCxTQUFTO0lBQUk7SUFDMUNRLGtCQUFrQjtRQUFFVixNQUFNVztRQUFTVCxTQUFTO0lBQUs7QUFDbkQsR0FBRztJQUFFVSxLQUFLO0FBQU07QUFFaEIsTUFBTUMsYUFBYSxJQUFJaEIsNENBQU1BLENBQVE7SUFDbkNpQixNQUFNO1FBQUVkLE1BQU1DO1FBQVFjLFVBQVU7SUFBSztJQUNyQ0MsT0FBTztRQUFFaEIsTUFBTUM7UUFBUWMsVUFBVTtRQUFNRSxRQUFRO1FBQU1DLFdBQVc7SUFBSztJQUNyRUMsVUFBVTtRQUFFbkIsTUFBTUM7UUFBUWMsVUFBVTtJQUFLO0lBQ3pDSyxNQUFNO1FBQUVwQixNQUFNQztRQUFRTSxNQUFNO1lBQUM7WUFBVztZQUFVO1NBQVc7UUFBRVEsVUFBVTtJQUFLO0lBQzlFTSxXQUFXO1FBQUVyQixNQUFNUztRQUFRYSxLQUFLO1FBQUdDLEtBQUs7SUFBSTtJQUM1Q0MsYUFBYTtRQUFFeEIsTUFBTUY7UUFBbUJJLFNBQVMsQ0FBQztJQUFFO0FBQ3RELEdBQUc7SUFBRXVCLFlBQVk7QUFBSztBQUVmLE1BQU1DLE9BQXFCOUIsd0RBQWUsQ0FBQzhCLElBQUksSUFBSTlCLHFEQUFjLENBQVEsUUFBUWlCLFlBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mb2N1c2Zsb3cvLi9tb2RlbHMvVXNlci50cz82ZGM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50LCBNb2RlbCB9IGZyb20gJ21vbmdvb3NlJ1xyXG5cclxuZXhwb3J0IHR5cGUgVXNlclJvbGUgPSAnU3R1ZGVudCcgfCAnUGFyZW50JyB8ICdFZHVjYXRvcidcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlclByZWZlcmVuY2VzIHtcclxuICBmb250U2l6ZT86IHN0cmluZ1xyXG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZ1xyXG4gIGNvbnRyYXN0Pzogc3RyaW5nXHJcbiAgc3BhY2luZz86IHN0cmluZ1xyXG4gIHByZWZlcnJlZE1vZGU/OiAndGV4dCcgfCAndmlzdWFsJyB8ICdhdWRpbydcclxuICBzcGVlY2hTcGVlZD86IG51bWJlclxyXG4gIGFuaW1hdGlvbkVuYWJsZWQ/OiBib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVVzZXIgZXh0ZW5kcyBEb2N1bWVudCB7XHJcbiAgbmFtZTogc3RyaW5nXHJcbiAgZW1haWw6IHN0cmluZ1xyXG4gIHBhc3N3b3JkOiBzdHJpbmdcclxuICByb2xlOiBVc2VyUm9sZVxyXG4gIGFkaGRTY29yZT86IG51bWJlclxyXG4gIHByZWZlcmVuY2VzOiBVc2VyUHJlZmVyZW5jZXNcclxuICBjcmVhdGVkQXQ6IERhdGVcclxuICB1cGRhdGVkQXQ6IERhdGVcclxufVxyXG5cclxuY29uc3QgUHJlZmVyZW5jZXNTY2hlbWEgPSBuZXcgU2NoZW1hPFVzZXJQcmVmZXJlbmNlcz4oe1xyXG4gIGZvbnRTaXplOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogJ21lZGl1bScgfSxcclxuICBiYWNrZ3JvdW5kQ29sb3I6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnI2Y4ZmFmYycgfSxcclxuICBjb250cmFzdDogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdub3JtYWwnIH0sXHJcbiAgc3BhY2luZzogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6ICdub3JtYWwnIH0sXHJcbiAgcHJlZmVycmVkTW9kZTogeyB0eXBlOiBTdHJpbmcsIGVudW06IFsndGV4dCcsICd2aXN1YWwnLCAnYXVkaW8nXSwgZGVmYXVsdDogJ3RleHQnIH0sXHJcbiAgc3BlZWNoU3BlZWQ6IHsgdHlwZTogTnVtYmVyLCBkZWZhdWx0OiAxLjAgfSxcclxuICBhbmltYXRpb25FbmFibGVkOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IHRydWUgfSxcclxufSwgeyBfaWQ6IGZhbHNlIH0pXHJcblxyXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IFNjaGVtYTxJVXNlcj4oe1xyXG4gIG5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSwgbG93ZXJjYXNlOiB0cnVlIH0sXHJcbiAgcGFzc3dvcmQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxyXG4gIHJvbGU6IHsgdHlwZTogU3RyaW5nLCBlbnVtOiBbJ1N0dWRlbnQnLCAnUGFyZW50JywgJ0VkdWNhdG9yJ10sIHJlcXVpcmVkOiB0cnVlIH0sXHJcbiAgYWRoZFNjb3JlOiB7IHR5cGU6IE51bWJlciwgbWluOiAwLCBtYXg6IDEwMCB9LFxyXG4gIHByZWZlcmVuY2VzOiB7IHR5cGU6IFByZWZlcmVuY2VzU2NoZW1hLCBkZWZhdWx0OiB7fSB9LFxyXG59LCB7IHRpbWVzdGFtcHM6IHRydWUgfSlcclxuXHJcbmV4cG9ydCBjb25zdCBVc2VyOiBNb2RlbDxJVXNlcj4gPSBtb25nb29zZS5tb2RlbHMuVXNlciB8fCBtb25nb29zZS5tb2RlbDxJVXNlcj4oJ1VzZXInLCBVc2VyU2NoZW1hKVxyXG5cclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwiUHJlZmVyZW5jZXNTY2hlbWEiLCJmb250U2l6ZSIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0IiwiYmFja2dyb3VuZENvbG9yIiwiY29udHJhc3QiLCJzcGFjaW5nIiwicHJlZmVycmVkTW9kZSIsImVudW0iLCJzcGVlY2hTcGVlZCIsIk51bWJlciIsImFuaW1hdGlvbkVuYWJsZWQiLCJCb29sZWFuIiwiX2lkIiwiVXNlclNjaGVtYSIsIm5hbWUiLCJyZXF1aXJlZCIsImVtYWlsIiwidW5pcXVlIiwibG93ZXJjYXNlIiwicGFzc3dvcmQiLCJyb2xlIiwiYWRoZFNjb3JlIiwibWluIiwibWF4IiwicHJlZmVyZW5jZXMiLCJ0aW1lc3RhbXBzIiwiVXNlciIsIm1vZGVscyIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/User.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fuser%2Fprofile%2Froute&page=%2Fapi%2Fuser%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Fprofile%2Froute.ts&appDir=D%3A%5Cmini_adhd1%5Cmini_adhd%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cmini_adhd1%5Cmini_adhd&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();