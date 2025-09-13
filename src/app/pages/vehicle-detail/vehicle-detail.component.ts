import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Vehicle {
  id: number;
  title: string;
  category: 'cars' | 'bikes' | 'leisure' | 'commercial';
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: string;
  location: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  seller: {
    name: string;
    type: 'dealer' | 'private';
    rating: number;
  };
  views: number;
  postedDate: string;
}

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css'
})
export class VehicleDetailComponent implements OnInit {
  vehicle: Vehicle | null = null;
  vehicleId: string | null = null;
  showContactForm = false;
  
  // Image modal properties
  showImageModal = false;
  currentModalImage = '';
  currentImageIndex = 0;
  
  // Sample vehicle data (includes both browse-vehicles and home page vehicles)
  private vehicles: Vehicle[] = [
    {
      id: 1,
      title: '2022 Toyota Corolla Cross',
      category: 'cars',
      brand: 'Toyota',
      model: 'Corolla Cross',
      year: 2022,
      price: 450000,
      mileage: 15000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      condition: 'Used',
      location: 'Johannesburg',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1562140227-14d2b2b4c3c7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'
      ],
      description: 'Well-maintained Toyota Corolla Cross with low mileage. Perfect for city driving. This vehicle has been serviced regularly and comes with a full service history. The interior is in excellent condition with no signs of wear and tear. The exterior has been well cared for with regular washing and waxing.',
      features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Bluetooth', 'USB Port', 'Cruise Control', 'Backup Camera'],
      seller: { name: 'AutoDealer SA', type: 'dealer', rating: 4.8 },
      views: 1250,
      postedDate: '2024-09-10'
    },
    {
      id: 2,
      title: '2023 BMW X3 xDrive30i',
      category: 'cars',
      brand: 'BMW',
      model: 'X3',
      year: 2023,
      price: 850000,
      mileage: 8000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      condition: 'Used',
      location: 'Cape Town',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop'
      ],
      description: 'Luxury SUV with premium features and excellent performance. This BMW X3 offers the perfect combination of luxury, performance, and practicality. The xDrive all-wheel drive system provides excellent traction in all weather conditions.',
      features: ['Leather Seats', 'Sunroof', 'Navigation', 'Backup Camera', 'Heated Seats', 'Wireless Charging', 'Apple CarPlay', 'Android Auto'],
      seller: { name: 'BMW Premium', type: 'dealer', rating: 4.9 },
      views: 2100,
      postedDate: '2024-09-08'
    },
    {
      id: 3,
      title: '2021 Honda CBR600RR',
      category: 'bikes',
      brand: 'Honda',
      model: 'CBR600RR',
      year: 2021,
      price: 180000,
      mileage: 12000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      condition: 'Used',
      location: 'Durban',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'
      ],
      description: 'High-performance sports bike in excellent condition. This CBR600RR is perfect for track days and weekend rides. The bike has been well maintained with regular oil changes and chain maintenance.',
      features: ['ABS', 'LED Lights', 'Digital Display', 'Quick Shifter', 'Traction Control', 'Launch Control', 'Slipper Clutch'],
      seller: { name: 'John Smith', type: 'private', rating: 4.5 },
      views: 890,
      postedDate: '2024-09-12'
    },
    {
      id: 4,
      title: '2020 Ford Ranger Wildtrak',
      category: 'commercial',
      brand: 'Ford',
      model: 'Ranger',
      year: 2020,
      price: 650000,
      mileage: 45000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      condition: 'Used',
      location: 'Pretoria',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'
      ],
      description: 'Powerful pickup truck perfect for work and adventure. The Wildtrak variant offers premium features and excellent off-road capability. This vehicle is perfect for both business and recreational use.',
      features: ['4WD', 'Towing Package', 'Bed Liner', 'Running Boards', 'Fog Lights', 'Lane Keep Assist', 'Blind Spot Monitoring', 'Adaptive Cruise Control'],
      seller: { name: 'Ford Commercial', type: 'dealer', rating: 4.7 },
      views: 1650,
      postedDate: '2024-09-05'
    },
    {
      id: 5,
      title: '2023 Mercedes-Benz Sprinter',
      category: 'commercial',
      brand: 'Mercedes-Benz',
      model: 'Sprinter',
      year: 2023,
      price: 750000,
      mileage: 25000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      condition: 'Used',
      location: 'Johannesburg',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'
      ],
      description: 'Reliable commercial van for business use. The Sprinter offers excellent fuel economy and reliability for commercial applications. Perfect for delivery services, tradesmen, or small businesses.',
      features: ['High Roof', 'Load Area', 'Side Door', 'Rear Door', 'Air Conditioning', 'Bluetooth', 'USB Ports', 'Cargo Tie-downs'],
      seller: { name: 'Commercial Vehicles SA', type: 'dealer', rating: 4.6 },
      views: 980,
      postedDate: '2024-09-07'
    },
    {
      id: 6,
      title: '2022 Yamaha YZF-R1',
      category: 'bikes',
      brand: 'Yamaha',
      model: 'YZF-R1',
      year: 2022,
      price: 220000,
      mileage: 5000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      condition: 'Used',
      location: 'Cape Town',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop'
      ],
      description: 'Track-ready superbike with advanced electronics. The YZF-R1 is Yamaha\'s flagship sportbike with cutting-edge technology and race-inspired performance. Perfect for experienced riders who demand the best.',
      features: ['Traction Control', 'Launch Control', 'Quick Shifter', 'LED Lights', 'Digital Dash', 'Ride Modes', 'Wheelie Control', 'Slide Control'],
      seller: { name: 'Bike World', type: 'dealer', rating: 4.8 },
      views: 1450,
      postedDate: '2024-09-09'
    },
    {
      id: 7,
      title: '2021 Winnebago Travato',
      category: 'leisure',
      brand: 'Winnebago',
      model: 'Travato',
      year: 2021,
      price: 1200000,
      mileage: 18000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      condition: 'Used',
      location: 'Durban',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop'
      ],
      description: 'Compact motorhome perfect for weekend getaways. The Travato offers all the comforts of home in a compact, easy-to-drive package. Perfect for couples or small families who love to travel.',
      features: ['Kitchen', 'Bathroom', 'Sleeping Area', 'Generator', 'Solar Panels', 'Fresh Water Tank', 'Gray Water Tank', 'LP Gas System'],
      seller: { name: 'RV Adventures', type: 'dealer', rating: 4.9 },
      views: 2100,
      postedDate: '2024-09-06'
    },
    {
      id: 8,
      title: '2023 Audi A4 Quattro',
      category: 'cars',
      brand: 'Audi',
      model: 'A4',
      year: 2023,
      price: 720000,
      mileage: 12000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      condition: 'Used',
      location: 'Johannesburg',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
      ],
      description: 'Luxury sedan with quattro all-wheel drive. The Audi A4 Quattro combines luxury, performance, and advanced technology in a sophisticated package. Perfect for those who demand the best in automotive excellence.',
      features: ['Quattro AWD', 'Virtual Cockpit', 'B&O Sound', 'Leather Seats', 'Panoramic Sunroof', 'Wireless Charging', 'Apple CarPlay', 'Android Auto'],
      seller: { name: 'Audi Centre', type: 'dealer', rating: 4.8 },
      views: 1800,
      postedDate: '2024-09-11'
    },
    // Additional vehicles from home page (these will have different IDs)
    {
      id: 9,
      title: '2023 Toyota Hilux Double Cab',
      category: 'commercial',
      brand: 'Toyota',
      model: 'Hilux Double Cab',
      year: 2023,
      price: 650000,
      mileage: 15000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      condition: 'Used',
      location: 'Cape Town',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop'
      ],
      description: 'Reliable pickup truck perfect for work and adventure. The Hilux Double Cab offers excellent payload capacity and off-road capability.',
      features: ['4WD', 'Towing Package', 'Bed Liner', 'Running Boards', 'Fog Lights', 'Bluetooth', 'Air Conditioning'],
      seller: { name: 'Toyota Commercial', type: 'dealer', rating: 4.8 },
      views: 1987,
      postedDate: '2024-09-13'
    },
    {
      id: 10,
      title: '2022 Ford Ranger Wildtrak',
      category: 'commercial',
      brand: 'Ford',
      model: 'Ranger Wildtrak',
      year: 2022,
      price: 750000,
      mileage: 25000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      condition: 'Used',
      location: 'Johannesburg',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop'
      ],
      description: 'Powerful pickup truck perfect for work and adventure. The Wildtrak variant offers premium features and excellent off-road capability.',
      features: ['4WD', 'Towing Package', 'Bed Liner', 'Running Boards', 'Fog Lights', 'Lane Keep Assist', 'Blind Spot Monitoring', 'Adaptive Cruise Control'],
      seller: { name: 'Ford Commercial', type: 'dealer', rating: 4.6 },
      views: 2234,
      postedDate: '2024-09-12'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.vehicleId = params.get('id');
      if (this.vehicleId) {
        this.loadVehicle(parseInt(this.vehicleId));
      }
    });
  }

  loadVehicle(id: number): void {
    this.vehicle = this.vehicles.find(v => v.id === id) || null;
    if (!this.vehicle) {
      this.router.navigate(['/browse-vehicles']);
    } else {
      // Increment view count when vehicle is viewed
      this.vehicle.views++;
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(price);
  }

  formatMileage(mileage: number): string {
    return new Intl.NumberFormat('en-ZA').format(mileage) + ' km';
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'cars': return '🚗';
      case 'bikes': return '🏍️';
      case 'leisure': return '🚐';
      case 'commercial': return '🚛';
      default: return '🚗';
    }
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'cars': return 'Cars';
      case 'bikes': return 'Bikes';
      case 'leisure': return 'Leisure Vehicles';
      case 'commercial': return 'Commercial Vehicles';
      default: return 'Vehicle';
    }
  }

  toggleContactForm(): void {
    this.showContactForm = !this.showContactForm;
  }

  goBack(): void {
    this.router.navigate(['/browse-vehicles']);
  }

  getDaysPosted(dateString: string): number {
    const postedDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  generateStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';
    return stars.padEnd(5, '☆');
  }

  // Image modal methods
  openImageModal(imageUrl: string, imageIndex: number): void {
    this.currentModalImage = imageUrl;
    this.currentImageIndex = imageIndex;
    this.showImageModal = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeImageModal(): void {
    this.showImageModal = false;
    document.body.style.overflow = 'auto'; // Restore background scrolling
  }

  previousImage(): void {
    if (this.currentImageIndex > 0 && this.vehicle) {
      this.currentImageIndex--;
      this.currentModalImage = this.vehicle.gallery[this.currentImageIndex];
    }
  }

  nextImage(): void {
    if (this.vehicle && this.currentImageIndex < this.vehicle.gallery.length - 1) {
      this.currentImageIndex++;
      this.currentModalImage = this.vehicle.gallery[this.currentImageIndex];
    }
  }
}
