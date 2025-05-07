import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrl: './modal-profile.component.css',
})
export class ModalProfileComponent implements OnInit {
  nome: string = 'John';
  email: string = 'john@example.com';
  isHovered: boolean = false;

  @Input('isVisible') isVisible!: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      this.isVisible
    ) {
      this.isVisible = false;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] && changes['isVisible'].currentValue) {
      this.carregarDadosUsuario();
    }
  }

  ngOnInit(): void {
    this.carregarDadosUsuario();
  }

  private carregarDadosUsuario(): void {
    const usuario = this.authService.getCurrentUser();
    if (usuario) {
      this.nome = usuario.nome || 'Usuário';
      this.email = usuario.email || '';
    }
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
    this.isVisible = false;
  }
}
