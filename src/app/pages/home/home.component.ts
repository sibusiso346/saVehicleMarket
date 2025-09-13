import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  location: string;
  image: string;
  condition?: string;
  rating: number;
  views: number;
}

interface LeisureVehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  capacity: number;
  fuelType: string;
  location: string;
  image: string;
  type: string;
  rating: number;
  views: number;
}

interface CustomerReview {
  id: number;
  name: string;
  location: string;
  text: string;
  avatar: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'SA Vehicle Market';
  subtitle = 'Find Your Perfect Vehicle';

  recentCars: Car[] = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Corolla Cross',
      year: 2023,
      price: 8500,
      mileage: 15000,
      transmission: 'Automatic',
      location: 'Cape Town',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop&crop=center',
      rating: 4.8,
      views: 1247
    },
    {
      id: 2,
      make: 'BMW',
      model: 'X3',
      year: 2022,
      price: 12500,
      mileage: 25000,
      transmission: 'Automatic',
      location: 'Johannesburg',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center',
      rating: 4.6,
      views: 2156
    },
    {
      id: 3,
      make: 'Volkswagen',
      model: 'Polo',
      year: 2023,
      price: 7200,
      mileage: 8000,
      transmission: 'Manual',
      location: 'Durban',
      image: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop&crop=center',
      rating: 4.7,
      views: 1834
    },
    {
      id: 4,
      make: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2022,
      price: 15800,
      mileage: 18000,
      transmission: 'Automatic',
      location: 'Pretoria',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop&crop=center',
      rating: 4.9,
      views: 3421
    }
  ];

  excellentConditionCars: Car[] = [
    {
      id: 5,
      make: 'Audi',
      model: 'A4',
      year: 2023,
      price: 18500,
      mileage: 5000,
      transmission: 'Automatic',
      location: 'Cape Town',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&crop=center',
      condition: 'Excellent',
      rating: 4.9,
      views: 2891
    },
    {
      id: 6,
      make: 'Lexus',
      model: 'IS 300',
      year: 2022,
      price: 22000,
      mileage: 12000,
      transmission: 'Automatic',
      location: 'Johannesburg',
      image: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop&crop=center',
      condition: 'Excellent',
      rating: 4.8,
      views: 3456
    },
    {
      id: 7,
      make: 'Porsche',
      model: 'Macan',
      year: 2023,
      price: 35000,
      mileage: 8000,
      transmission: 'Automatic',
      location: 'Durban',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center',
      condition: 'Excellent',
      rating: 4.9,
      views: 4123
    },
    {
      id: 8,
      make: 'Range Rover',
      model: 'Evoque',
      year: 2022,
      price: 28000,
      mileage: 15000,
      transmission: 'Automatic',
      location: 'Pretoria',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop&crop=center',
      condition: 'Excellent',
      rating: 4.7,
      views: 2678
    }
  ];

  leisureVehicles: LeisureVehicle[] = [
    {
      id: 9,
      make: 'Toyota',
      model: 'Hilux Double Cab',
      year: 2023,
      price: 12500,
      capacity: 5,
      fuelType: 'Diesel',
      location: 'Cape Town',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&h=350&fit=crop&crop=center',
      type: 'Pickup',
      rating: 4.8,
      views: 1987
    },
    {
      id: 10,
      make: 'Ford',
      model: 'Ranger Wildtrak',
      year: 2022,
      price: 15800,
      capacity: 5,
      fuelType: 'Diesel',
      location: 'Johannesburg',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=350&fit=crop&crop=center',
      type: 'Pickup',
      rating: 4.6,
      views: 2234
    }
  ];

  customerReviews: CustomerReview[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'Cape Town',
      text: 'Excellent service! Found my dream car within a week. The team was professional and the verification process gave me complete peace of mind.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Johannesburg',
      text: 'SA Vehicle Market made selling my car so easy. The platform is user-friendly and I got a fair price quickly. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Amanda Williams',
      location: 'Durban',
      text: 'Outstanding customer support throughout the entire process. The vehicle inspection was thorough and transparent. Will definitely use again!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];


  // Business hours check
  isBusinessHours(): boolean {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();
    
    // Monday to Friday: 8 AM to 6 PM
    if (day >= 1 && day <= 5) {
      return hour >= 8 && hour < 18;
    }
    // Saturday: 9 AM to 4 PM
    if (day === 6) {
      return hour >= 9 && hour < 16;
    }
    // Sunday: Closed
    return false;
  }

  // Copy to clipboard functionality
  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.showNotification('Email copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy: ', err);
      this.showNotification('Failed to copy email', 'error');
    }
  }

  // Make phone call
  makeCall(phoneNumber: string): void {
    window.open(`tel:${phoneNumber}`, '_self');
  }

  // Open map
  openMap(): void {
    const address = '123 Vehicle Street, Johannesburg, 2000, South Africa';
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  }


  // Open social media
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


  // Show notification
  private showNotification(message: string, type: 'success' | 'error'): void {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}
