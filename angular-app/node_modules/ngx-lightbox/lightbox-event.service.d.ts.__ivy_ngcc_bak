import { Observable } from 'rxjs';
export interface IEvent {
    id: number;
    data?: any;
}
export interface IAlbum {
    src: string;
    caption?: string;
    thumb: string;
}
export declare const LIGHTBOX_EVENT: {
    CHANGE_PAGE: number;
    CLOSE: number;
    OPEN: number;
    ZOOM_IN: number;
    ZOOM_OUT: number;
    ROTATE_LEFT: number;
    ROTATE_RIGHT: number;
};
export declare class LightboxEvent {
    private _lightboxEventSource;
    lightboxEvent$: Observable<Object>;
    constructor();
    broadcastLightboxEvent(event: any): void;
}
export declare class LightboxWindowRef {
    readonly nativeWindow: any;
}
