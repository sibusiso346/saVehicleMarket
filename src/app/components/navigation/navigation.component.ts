import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  private resizeObserver?: ResizeObserver;

  ngOnInit() {
    // Listen for window resize events
    this.setupResizeListener();
  }

  ngOnDestroy() {
    // Clean up the resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const navElement = target.closest('.navbar');
    
    // Close menu if clicking outside the navigation
    if (!navElement && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  private setupResizeListener() {
    // Use ResizeObserver for better performance
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.checkScreenSize();
      });
      
      // Observe the document body for size changes
      this.resizeObserver.observe(document.body);
    }
  }

  private checkScreenSize() {
    // Check if screen is large enough (768px and above)
    if (window.innerWidth >= 768) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
