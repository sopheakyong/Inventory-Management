import { NgZone } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IPlayerApiScriptOptions, IPlayerOutputs, IPlayerSize } from './models';
import * as ɵngcc0 from '@angular/core';
export declare function win(): Window & typeof globalThis;
export declare function YouTubeRef(): typeof YT;
export declare function YouTubePlayerRef(): typeof YT.Player;
export declare const defaultSizes: {
    height: number;
    width: number;
};
export declare class YoutubePlayerService {
    private zone;
    api: ReplaySubject<any>;
    private ytApiLoaded;
    constructor(zone: NgZone);
    loadPlayerApi(options: IPlayerApiScriptOptions): void;
    setupPlayer(elementId: string, outputs: IPlayerOutputs, sizes: IPlayerSize, videoId: string, playerVars: YT.PlayerVars): void;
    play(player: YT.Player): void;
    pause(player: YT.Player): void;
    playVideo(media: any, player: YT.Player): void;
    isPlaying(player: YT.Player): boolean;
    createPlayer(elementId: string, outputs: IPlayerOutputs, sizes: IPlayerSize, videoId?: string, playerVars?: YT.PlayerVars): YT.Player;
    toggleFullScreen(player: YT.Player, isFullScreen: boolean | null | undefined): void;
    generateUniqueId(): string;
    private createApi;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<YoutubePlayerService, never>;
}

//# sourceMappingURL=ngx-youtube-player.service.d.ts.map