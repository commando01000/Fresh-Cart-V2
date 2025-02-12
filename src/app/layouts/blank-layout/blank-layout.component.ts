import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css'],
})
export class BlankLayoutComponent {


  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
