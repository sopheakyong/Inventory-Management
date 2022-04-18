import { AfterViewInit, ElementRef, EventEmitter, NgZone, OnDestroy, Renderer2 } from "@angular/core";
import { DndDragImageOffsetFunction, DndEvent } from "./dnd-utils";
import { DndHandleDirective } from "./dnd-handle.directive";
import { EffectAllowed } from "./dnd-types";
import * as ɵngcc0 from '@angular/core';
export declare class DndDragImageRefDirective {
    constructor(parent: DndDraggableDirective, elementRef: ElementRef);
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<DndDragImageRefDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<DndDragImageRefDirective, "[dndDragImageRef]", never, {}, {}, never>;
}
export declare class DndDraggableDirective implements AfterViewInit, OnDestroy {
    private elementRef;
    private renderer;
    private ngZone;
    dndDraggable: any;
    dndEffectAllowed: EffectAllowed;
    dndType?: string;
    dndDraggingClass: string;
    dndDraggingSourceClass: string;
    dndDraggableDisabledClass: string;
    dndDragImageOffsetFunction: DndDragImageOffsetFunction;
    readonly dndStart: EventEmitter<DragEvent>;
    readonly dndDrag: EventEmitter<DragEvent>;
    readonly dndEnd: EventEmitter<DragEvent>;
    readonly dndMoved: EventEmitter<DragEvent>;
    readonly dndCopied: EventEmitter<DragEvent>;
    readonly dndLinked: EventEmitter<DragEvent>;
    readonly dndCanceled: EventEmitter<DragEvent>;
    draggable: boolean;
    private dndHandle?;
    private dndDragImageElementRef?;
    private dragImage;
    private isDragStarted;
    private readonly dragEventHandler;
    dndDisableIf: boolean;
    dndDisableDragIf: boolean;
    constructor(elementRef: ElementRef, renderer: Renderer2, ngZone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onDragStart(event: DndEvent): boolean;
    onDrag(event: DragEvent): void;
    onDragEnd(event: DragEvent): void;
    registerDragHandle(handle: DndHandleDirective | undefined): void;
    registerDragImage(elementRef: ElementRef | undefined): void;
    private determineDragImage;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<DndDraggableDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<DndDraggableDirective, "[dndDraggable]", never, { "dndEffectAllowed": "dndEffectAllowed"; "dndDraggingClass": "dndDraggingClass"; "dndDraggingSourceClass": "dndDraggingSourceClass"; "dndDraggableDisabledClass": "dndDraggableDisabledClass"; "dndDragImageOffsetFunction": "dndDragImageOffsetFunction"; "dndDisableIf": "dndDisableIf"; "dndDisableDragIf": "dndDisableDragIf"; "dndDraggable": "dndDraggable"; "dndType": "dndType"; }, { "dndStart": "dndStart"; "dndDrag": "dndDrag"; "dndEnd": "dndEnd"; "dndMoved": "dndMoved"; "dndCopied": "dndCopied"; "dndLinked": "dndLinked"; "dndCanceled": "dndCanceled"; }, never>;
}

//# sourceMappingURL=dnd-draggable.directive.d.ts.map