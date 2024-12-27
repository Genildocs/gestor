import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { ModalProfileComponent } from './modal-profile/modal-profile.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [SideBarComponent, HeaderComponent, ModalProfileComponent],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  exports: [SideBarComponent, HeaderComponent],
})
export class ComponentsModule {}
