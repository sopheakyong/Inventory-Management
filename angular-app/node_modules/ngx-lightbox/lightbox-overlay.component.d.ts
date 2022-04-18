import { AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { LightboxEvent } from './lightbox-event.service';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<LightboxOverlayComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<LightboxOverlayComponent, "[lb-overlay]", never, { "options": "options"; "cmpRef": "cmpRef"; }, {}, never, never>;
}

//# sourceMappingURL=lightbox-overlay.component.d.ts.map