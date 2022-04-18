import { AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { LightboxEvent } from './lightbox-event.service';
export declare class LightboxOverlayComponent implements AfterViewInit, OnDestroy {
    private _elemRef;
    private _rendererRef;
    private _lightboxEvent;
    private _documentRef;
    options: any;
    cmpRef: any;
    classList: any;
    private _subscription;
    constructor(_elemRef: ElementRef, _rendererRef: Renderer2, _lightboxEvent: LightboxEvent, _documentRef: Document);
    close(): void;
    ngAfterViewInit(): void;
    onResize(): void;
    ngOnDestroy(): void;
    private _sizeOverlay;
    private _onReceivedEvent;
    private _end;
    private _getOverlayWidth;
    private _getOverlayHeight;
}
