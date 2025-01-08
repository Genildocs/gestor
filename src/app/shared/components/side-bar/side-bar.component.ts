import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  elementSidebar!: HTMLElement;
  constructor(
    private authService: AuthService,
    private layoutService: LayoutService,
    private el: ElementRef
  ) {}
  logout() {
    this.authService.logoutUser();
  }

  ngOnInit(): void {
    this.elementSidebar = this.el.nativeElement.querySelector('#sidebar');
  }

  toggleSidebar() {
    this.layoutService.toggleSidebar(this.elementSidebar);
  }
}
