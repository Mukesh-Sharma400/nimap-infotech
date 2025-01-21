import { filter } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  headingText: string = 'Product Master';
  buttonText: string = 'Add Product';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateText();
    });

    this.updateText();
  }

  navigateToOtherRoute() {
    const currentRoute = this.router.url;

    if (currentRoute === '/') {
      this.router.navigate(['/categories']);
    } else if (currentRoute === '/categories') {
      this.router.navigate(['/']);
    }

    this.updateText();
  }

  updateText() {
    const currentRoute = this.router.url;

    if (currentRoute === '/') {
      this.headingText = 'Product Master';
      this.buttonText = 'Go to Categories';
    } else if (currentRoute === '/categories') {
      this.headingText = 'Category Master';
      this.buttonText = 'Go to Products';
    }
  }
}
