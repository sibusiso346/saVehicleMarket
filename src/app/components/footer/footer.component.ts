import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-section">
            <div class="footer-logo">
              <h3>SA Vehicle Market</h3>
              <p>South Africa's premier online marketplace for buying and selling vehicles.</p>
            </div>
            <div class="social-links">
              <a href="#" class="social-link facebook" (click)="openSocial('facebook')">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="social-link twitter" (click)="openSocial('twitter')">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="social-link instagram" (click)="openSocial('instagram')">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                </svg>
              </a>
              <a href="#" class="social-link linkedin" (click)="openSocial('linkedin')">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><a href="#" (click)="scrollToSection('recent-cars')">Browse Cars</a></li>
              <li><a href="#" (click)="scrollToSection('excellent-condition')">Premium Cars</a></li>
              <li><a href="#" (click)="scrollToSection('leisure-vehicles')">Leisure Vehicles</a></li>
              <li><a href="#" (click)="scrollToSection('about')">About Us</a></li>
              <li><a href="#" (click)="scrollToSection('reviews')">Reviews</a></li>
              <li><a href="#" (click)="scrollToSection('contact')">Contact</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Services</h4>
            <ul class="footer-links">
              <li><a href="#">Sell Your Car</a></li>
              <li><a href="#">Car Valuation</a></li>
              <li><a href="#">Vehicle Inspection</a></li>
              <li><a href="#">Financing</a></li>
              <li><a href="#">Insurance</a></li>
              <li><a href="#">Trade-in</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Support</h4>
            <ul class="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Live Chat</a></li>
              <li><a href="#">Contact Support</a></li>
              <li><a href="#">Report Issue</a></li>
              <li><a href="#">Feedback</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Legal</h4>
            <ul class="footer-links">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Disclaimer</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">User Agreement</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Contact Info</h4>
            <div class="contact-info">
              <div class="contact-item">
                <svg class="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                </svg>
                <div>
                  <p>123 Vehicle Street</p>
                  <p>Johannesburg, 2000</p>
                  <p>South Africa</p>
                </div>
              </div>
              <div class="contact-item">
                <svg class="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06679 2.16708 8.43376 2.48353C8.80073 2.79999 9.03996 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>
                  <p>+27 11 123 4567</p>
                  <p>+27 21 987 6543</p>
                </div>
              </div>
              <div class="contact-item">
                <svg class="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>
                  <p>info@savmarket.co.za</p>
                  <p>support@savmarket.co.za</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p>&copy; 2024 SA Vehicle Market. All rights reserved.</p>
            <div class="footer-bottom-links">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Cookies</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      padding: 3rem 0 0;
      margin-top: 4rem;
    }

    .footer-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .footer-main {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1.5fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h4 {
      font-family: var(--font-heading);
      font-size: var(--text-lg);
      font-weight: var(--font-bold);
      margin-bottom: 1rem;
      color: #f1f5f9;
    }

    .footer-logo h3 {
      font-family: var(--font-heading);
      font-size: var(--text-2xl);
      font-weight: var(--font-bold);
      margin-bottom: 0.5rem;
      color: #f1f5f9;
    }

    .footer-logo p {
      font-family: var(--font-primary);
      font-size: var(--text-sm);
      color: #cbd5e1;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }

    .social-links {
      display: flex;
      gap: 0.75rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .social-link svg {
      width: 20px;
      height: 20px;
    }

    .social-link.facebook {
      background: #1877f2;
    }

    .social-link.twitter {
      background: #1da1f2;
    }

    .social-link.instagram {
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    }

    .social-link.linkedin {
      background: #0077b5;
    }

    .social-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links li {
      margin-bottom: 0.5rem;
    }

    .footer-links a {
      font-family: var(--font-primary);
      font-size: var(--text-sm);
      color: #cbd5e1;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #f1f5f9;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .contact-icon {
      width: 20px;
      height: 20px;
      color: #94a3b8;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    .contact-item p {
      font-family: var(--font-primary);
      font-size: var(--text-sm);
      color: #cbd5e1;
      margin: 0;
      line-height: 1.4;
    }

    .footer-bottom {
      border-top: 1px solid #475569;
      padding: 1.5rem 0;
    }

    .footer-bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-bottom p {
      font-family: var(--font-primary);
      font-size: var(--text-sm);
      color: #94a3b8;
      margin: 0;
    }

    .footer-bottom-links {
      display: flex;
      gap: 1.5rem;
    }

    .footer-bottom-links a {
      font-family: var(--font-primary);
      font-size: var(--text-sm);
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-bottom-links a:hover {
      color: #cbd5e1;
    }

    /* Responsive Design */
    @media (max-width: 1200px) {
      .footer-main {
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        gap: 1.5rem;
      }
      
      .footer-section:last-child {
        grid-column: 1 / -1;
        margin-top: 1rem;
      }
    }

    @media (max-width: 900px) {
      .footer-main {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1.5rem;
      }
      
      .footer-section:first-child {
        grid-column: 1 / -1;
        margin-bottom: 1rem;
      }
      
      .footer-section:last-child {
        grid-column: 1 / -1;
        margin-top: 1rem;
      }
    }

    @media (max-width: 768px) {
      .footer {
        padding: 2rem 0 0;
      }
      
      .footer-content {
        padding: 0 1.5rem;
      }
      
      .footer-main {
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
      }
      
      .footer-section:first-child {
        grid-column: 1 / -1;
        margin-bottom: 1rem;
      }
      
      .footer-section:last-child {
        grid-column: 1 / -1;
        margin-top: 1rem;
      }
      
      .footer-bottom-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .footer {
        padding: 1.5rem 0 0;
      }
      
      .footer-content {
        padding: 0 1rem;
      }
      
      .footer-main {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .footer-section:first-child {
        grid-column: 1;
        margin-bottom: 0;
      }
      
      .footer-section:last-child {
        grid-column: 1;
        margin-top: 0;
      }
      
      .social-links {
        justify-content: center;
      }
      
      .footer-bottom-links {
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
      }
    }
  `]
})
export class FooterComponent {
  openSocial(platform: string): void {
    const urls = {
      facebook: 'https://facebook.com/savmarket',
      twitter: 'https://twitter.com/savmarket',
      instagram: 'https://instagram.com/savmarket',
      linkedin: 'https://linkedin.com/company/savmarket'
    };

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank');
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
