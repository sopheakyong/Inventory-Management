import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { YoutubePlayerService, defaultSizes } from './ngx-youtube-player.service';
let YoutubePlayerComponent = class YoutubePlayerComponent {
    constructor(playerService, elementRef, renderer) {
        this.playerService = playerService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.videoId = '';
        this.height = defaultSizes.height;
        this.width = defaultSizes.width;
        /**
         * @description sets the protocol by the navigator object
         * if there is no window, it sets a default http protocol
         * unless the protocol is set from outside
         */
        this.protocol = this.getProtocol();
        this.playerVars = {};
        // player created and initialized - sends instance of the player
        this.ready = new EventEmitter();
        // state change: send the YT event with its state
        this.change = new EventEmitter();
    }
    ngAfterContentInit() {
        const htmlId = this.playerService.generateUniqueId();
        const playerSize = { height: this.height, width: this.width };
        const container = this.renderer.selectRootElement('#yt-player-ngx-component');
        this.renderer.setAttribute(container, 'id', htmlId);
        this.playerService.loadPlayerApi({
            protocol: this.protocol
        });
        this.playerService.setupPlayer(htmlId, {
            change: this.change,
            ready: this.ready
        }, playerSize, this.videoId, this.playerVars);
    }
    getProtocol() {
        const hasWindow = window && window.location;
        const protocol = hasWindow
            ? window.location.protocol.replace(':', '')
            : 'http';
        return protocol;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], YoutubePlayerComponent.prototype, "videoId", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YoutubePlayerComponent.prototype, "height", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YoutubePlayerComponent.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], YoutubePlayerComponent.prototype, "protocol", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], YoutubePlayerComponent.prototype, "playerVars", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], YoutubePlayerComponent.prototype, "ready", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], YoutubePlayerComponent.prototype, "change", void 0);
YoutubePlayerComponent = __decorate([
    Component({
        changeDetection: ChangeDetectionStrategy.OnPush,
        selector: 'youtube-player',
        template: `
    <div id="yt-player-ngx-component"></div>
  `
    }),
    __metadata("design:paramtypes", [YoutubePlayerService,
        ElementRef,
        Renderer2])
], YoutubePlayerComponent);
export { YoutubePlayerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXlvdXR1YmUtcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC15b3V0dWJlLXBsYXllci9zcmMvbGliL25neC15b3V0dWJlLXBsYXllci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixZQUFZLEVBQ2IsTUFBTSw4QkFBOEIsQ0FBQztBQVN0QyxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQWlCakMsWUFDUyxhQUFtQyxFQUNsQyxVQUFzQixFQUN0QixRQUFtQjtRQUZwQixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBbkJwQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsV0FBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDN0IsVUFBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDcEM7Ozs7V0FJRztRQUNNLGFBQVEsR0FBVyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsZUFBVSxHQUFrQixFQUFFLENBQUM7UUFFeEMsZ0VBQWdFO1FBQ3RELFVBQUssR0FBRyxJQUFJLFlBQVksRUFBYSxDQUFDO1FBQ2hELGlEQUFpRDtRQUN2QyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7SUFNbkQsQ0FBQztJQUVKLGtCQUFrQjtRQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDckQsTUFBTSxVQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQy9DLDBCQUEwQixDQUMzQixDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztZQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQzVCLE1BQU0sRUFDTjtZQUNFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsRUFDRCxVQUFVLEVBQ1YsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsVUFBVSxDQUNoQixDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUM1QyxNQUFNLFFBQVEsR0FBRyxTQUFTO1lBQ3hCLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUMzQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ1gsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGLENBQUE7QUFuRFU7SUFBUixLQUFLLEVBQUU7O3VEQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7O3NEQUE4QjtBQUM3QjtJQUFSLEtBQUssRUFBRTs7cURBQTRCO0FBTTNCO0lBQVIsS0FBSyxFQUFFOzt3REFBdUM7QUFDdEM7SUFBUixLQUFLLEVBQUU7OzBEQUFnQztBQUc5QjtJQUFULE1BQU0sRUFBRTs7cURBQXVDO0FBRXRDO0lBQVQsTUFBTSxFQUFFOztzREFBNkM7QUFmM0Msc0JBQXNCO0lBUGxDLFNBQVMsQ0FBQztRQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsUUFBUSxFQUFFOztHQUVUO0tBQ0YsQ0FBQztxQ0FtQndCLG9CQUFvQjtRQUN0QixVQUFVO1FBQ1osU0FBUztHQXBCbEIsc0JBQXNCLENBb0RsQztTQXBEWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgWW91dHViZVBsYXllclNlcnZpY2UsXG4gIGRlZmF1bHRTaXplc1xufSBmcm9tICcuL25neC15b3V0dWJlLXBsYXllci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ3lvdXR1YmUtcGxheWVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGlkPVwieXQtcGxheWVyLW5neC1jb21wb25lbnRcIj48L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBZb3V0dWJlUGxheWVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBJbnB1dCgpIHZpZGVvSWQgPSAnJztcbiAgQElucHV0KCkgaGVpZ2h0ID0gZGVmYXVsdFNpemVzLmhlaWdodDtcbiAgQElucHV0KCkgd2lkdGggPSBkZWZhdWx0U2l6ZXMud2lkdGg7XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb24gc2V0cyB0aGUgcHJvdG9jb2wgYnkgdGhlIG5hdmlnYXRvciBvYmplY3RcbiAgICogaWYgdGhlcmUgaXMgbm8gd2luZG93LCBpdCBzZXRzIGEgZGVmYXVsdCBodHRwIHByb3RvY29sXG4gICAqIHVubGVzcyB0aGUgcHJvdG9jb2wgaXMgc2V0IGZyb20gb3V0c2lkZVxuICAgKi9cbiAgQElucHV0KCkgcHJvdG9jb2w6IHN0cmluZyA9IHRoaXMuZ2V0UHJvdG9jb2woKTtcbiAgQElucHV0KCkgcGxheWVyVmFyczogWVQuUGxheWVyVmFycyA9IHt9O1xuXG4gIC8vIHBsYXllciBjcmVhdGVkIGFuZCBpbml0aWFsaXplZCAtIHNlbmRzIGluc3RhbmNlIG9mIHRoZSBwbGF5ZXJcbiAgQE91dHB1dCgpIHJlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcjxZVC5QbGF5ZXI+KCk7XG4gIC8vIHN0YXRlIGNoYW5nZTogc2VuZCB0aGUgWVQgZXZlbnQgd2l0aCBpdHMgc3RhdGVcbiAgQE91dHB1dCgpIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8WVQuUGxheWVyRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHBsYXllclNlcnZpY2U6IFlvdXR1YmVQbGF5ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBjb25zdCBodG1sSWQgPSB0aGlzLnBsYXllclNlcnZpY2UuZ2VuZXJhdGVVbmlxdWVJZCgpO1xuICAgIGNvbnN0IHBsYXllclNpemUgPSB7IGhlaWdodDogdGhpcy5oZWlnaHQsIHdpZHRoOiB0aGlzLndpZHRoIH07XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5yZW5kZXJlci5zZWxlY3RSb290RWxlbWVudChcbiAgICAgICcjeXQtcGxheWVyLW5neC1jb21wb25lbnQnXG4gICAgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShjb250YWluZXIsICdpZCcsIGh0bWxJZCk7XG4gICAgdGhpcy5wbGF5ZXJTZXJ2aWNlLmxvYWRQbGF5ZXJBcGkoe1xuICAgICAgcHJvdG9jb2w6IHRoaXMucHJvdG9jb2xcbiAgICB9KTtcbiAgICB0aGlzLnBsYXllclNlcnZpY2Uuc2V0dXBQbGF5ZXIoXG4gICAgICBodG1sSWQsXG4gICAgICB7XG4gICAgICAgIGNoYW5nZTogdGhpcy5jaGFuZ2UsXG4gICAgICAgIHJlYWR5OiB0aGlzLnJlYWR5XG4gICAgICB9LFxuICAgICAgcGxheWVyU2l6ZSxcbiAgICAgIHRoaXMudmlkZW9JZCxcbiAgICAgIHRoaXMucGxheWVyVmFyc1xuICAgICk7XG4gIH1cblxuICBnZXRQcm90b2NvbCgpIHtcbiAgICBjb25zdCBoYXNXaW5kb3cgPSB3aW5kb3cgJiYgd2luZG93LmxvY2F0aW9uO1xuICAgIGNvbnN0IHByb3RvY29sID0gaGFzV2luZG93XG4gICAgICA/IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbC5yZXBsYWNlKCc6JywgJycpXG4gICAgICA6ICdodHRwJztcbiAgICByZXR1cm4gcHJvdG9jb2w7XG4gIH1cbn1cbiJdfQ==