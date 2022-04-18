import { DndEvent } from "./dnd-utils";
import { DndDraggableDirective } from "./dnd-draggable.directive";
import * as ɵngcc0 from '@angular/core';
export declare class DndHandleDirective {
    draggable: boolean;
    constructor(parent: DndDraggableDirective);
    onDragEvent(event: DndEvent): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<DndHandleDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<DndHandleDirective, "[dndHandle]", never, {}, {}, never>;
}

//# sourceMappingURL=dnd-handle.directive.d.ts.map