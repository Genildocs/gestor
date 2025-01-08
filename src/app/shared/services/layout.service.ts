import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private renderer: Renderer2;
  private sidebarState = new BehaviorSubject<boolean>(false); //controla o estado da sidebar

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleSidebar(element: HTMLElement): void {
    const isSidebarVisible = this.sidebarState.getValue();
    this.sidebarState.next(!isSidebarVisible);
    if (isSidebarVisible) {
      this.renderer.removeClass(element, 'showSidebar');
    } else {
      this.renderer.addClass(element, 'showSidebar');
    }
  }

  getSidebarState() {
    return this.sidebarState.asObservable(); // Permite que os componentes ouçam o estado
  }
}
