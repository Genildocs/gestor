import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ManipularDomService } from '../../services/manipular-dom.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isVisible: boolean = false;
  currentState!: boolean;

  constructor(private manipularDomService: ManipularDomService) {
    this.manipularDomService.getStateSideBar().subscribe((state) => {
      this.currentState = state;
    });
  }

  modalVisble() {
    this.isVisible = !this.isVisible;
  }

  toggleSidebar() {
    this.manipularDomService.updateStateSideBar(!this.currentState);
  }
}
