import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { ScrollToOffsetMap, ScrollToTarget } from './scroll-to-config.interface';
import { ScrollToAnimationEasing } from './scroll-to-easing.interface';
import { ScrollToEvent } from './scroll-to-event.interface';
import { ScrollToService } from './scroll-to.service';
export declare class ScrollToDirective implements AfterViewInit {
    private elementRef;
    private scrollToService;
    private renderer2;
    ngxScrollTo: ScrollToTarget;
    ngxScrollToEvent: ScrollToEvent;
    ngxScrollToDuration: number;
    ngxScrollToEasing: ScrollToAnimationEasing;
    ngxScrollToOffset: number;
    ngxScrollToOffsetMap: ScrollToOffsetMap;
    private options;
    constructor(elementRef: ElementRef, scrollToService: ScrollToService, renderer2: Renderer2);
    /**
     * Angular Lifecycle Hook - After View Init
     *
     * @todo Implement Subscription for Events
     *
     * @returns void
     */
    ngAfterViewInit(): void;
}
