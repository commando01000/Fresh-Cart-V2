import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent {}
