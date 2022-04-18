import { AfterContentInit, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { YoutubePlayerService } from './ngx-youtube-player.service';
import * as ɵngcc0 from '@angular/core';
export declare class YoutubePlayerComponent implements AfterContentInit {
    playerService: YoutubePlayerService;
    private elementRef;
    private renderer;
    videoId: string;
    height: number;
    width: number;
    /**
     * @description sets the protocol by the navigator object
     * if there is no window, it sets a default http protocol
     * unless the protocol is set from outside
     */
    protocol: string;
    playerVars: YT.PlayerVars;
    ready: EventEmitter<YT.Player>;
    change: EventEmitter<YT.PlayerEvent>;
    constructor(playerService: YoutubePlayerService, elementRef: ElementRef, renderer: Renderer2);
    ngAfterContentInit(): void;
    getProtocol(): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<YoutubePlayerComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<YoutubePlayerComponent, "youtube-player", never, { "videoId": "videoId"; "height": "height"; "width": "width"; "protocol": "protocol"; "playerVars": "playerVars"; }, { "ready": "ready"; "change": "change"; }, never, never>;
}

//# sourceMappingURL=ngx-youtube-player.component.d.ts.map