import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ManipularDomService } from '../../services/manipular-dom.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  currentStateSideBar!: boolean;
  constructor(
    private authService: AuthService,
    private manipularDomService: ManipularDomService
  ) {
    this.manipularDomService.getStateSideBar().subscribe((state) => {
      this.currentStateSideBar = state;
    });
  }
  logout() {
    this.authService.logoutUser();
  }

  ngOnInit(): void {}

  toggleSidebar() {
    this.manipularDomService.updateStateSideBar(!this.currentStateSideBar);
  }
}
