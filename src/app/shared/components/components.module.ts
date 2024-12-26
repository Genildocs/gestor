import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { ModalProfileComponent } from './modal-profile/modal-profile.component';

@NgModule({
  declarations: [SideBarComponent, HeaderComponent, ModalProfileComponent],
  imports: [CommonModule],
  exports: [SideBarComponent, HeaderComponent],
})
export class ComponentsModule {}
