"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMainConfig = exports.setRendererRect = exports.updateCurrentDocument = exports.previousDocument = exports.nextDocument = exports.setDocumentLoading = exports.setAllDocuments = exports.SET_MAIN_CONFIG = exports.SET_RENDERER_RECT = exports.UPDATE_CURRENT_DOCUMENT = exports.PREVIOUS_DOCUMENT = exports.NEXT_DOCUMENT = exports.SET_DOCUMENT_LOADING = exports.SET_ALL_DOCUMENTS = void 0;
exports.SET_ALL_DOCUMENTS = "SET_ALL_DOCUMENTS";
exports.SET_DOCUMENT_LOADING = "SET_DOCUMENT_LOADING";
exports.NEXT_DOCUMENT = "NEXT_DOCUMENT";
exports.PREVIOUS_DOCUMENT = "PREVIOUS_DOCUMENT";
exports.UPDATE_CURRENT_DOCUMENT = "UPDATE_CURRENT_DOCUMENT";
exports.SET_RENDERER_RECT = "SET_RENDERER_RECT";
exports.SET_MAIN_CONFIG = "SET_MAIN_CONFIG";
var setAllDocuments = function (documents, initialActiveDocument) { return ({
    type: exports.SET_ALL_DOCUMENTS,
    documents: documents,
    initialActiveDocument: initialActiveDocument,
}); };
exports.setAllDocuments = setAllDocuments;
var setDocumentLoading = function (value) { return ({
    type: exports.SET_DOCUMENT_LOADING,
    value: value,
}); };
exports.setDocumentLoading = setDocumentLoading;
var nextDocument = function () { return ({ type: exports.NEXT_DOCUMENT }); };
exports.nextDocument = nextDocument;
var previousDocument = function () { return ({
    type: exports.PREVIOUS_DOCUMENT,
}); };
exports.previousDocument = previousDocument;
var updateCurrentDocument = function (document) { return ({ type: exports.UPDATE_CURRENT_DOCUMENT, document: document }); };
exports.updateCurrentDocument = updateCurrentDocument;
var setRendererRect = function (rect) { return ({
    type: exports.SET_RENDERER_RECT,
    rect: rect,
}); };
exports.setRendererRect = setRendererRect;
var setMainConfig = function (config) { return ({
    type: exports.SET_MAIN_CONFIG,
    config: config,
}); };
exports.setMainConfig = setMainConfig;
