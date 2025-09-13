import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

interface SearchFilters {
  category: string;
  brand: string;
  model: string;
  minPrice: number | null;
  maxPrice: number | null;
  minYear: number | null;
  maxYear: number | null;
  fuelType: string;
  transmission: string;
  condition: string;
  location: string;
  minMileage: number | null;
  maxMileage: number | null;
}

@Component({
  selector: 'app-browse-vehicles',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './browse-vehicles.component.html',
  styleUrl: './browse-vehicles.component.css'
})
export class BrowseVehiclesComponent implements OnInit {
  // Search and filter state
  searchQuery = '';
  selectedCategory = 'all';
  showAdvancedSearch = false;
  sortBy = 'newest';
  
  // Filter state
  filters: SearchFilters = {
    category: 'all',
    brand: '',
    model: '',
    minPrice: null,
    maxPrice: null,
    minYear: null,
    maxYear: null,
    fuelType: '',
    transmission: '',
    condition: '',
    location: '',
    minMileage: null,
    maxMileage: null
  };

  // Filter options
  categories = [
    { value: 'all', label: 'All Vehicles' },
    { value: 'cars', label: 'Cars' },
    { value: 'bikes', label: 'Bikes' },
    { value: 'leisure', label: 'Leisure Vehicles' },
    { value: 'commercial', label: 'Commercial Vehicles' }
  ];

  brands = [
    'Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen',
    'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Lexus', 'Infiniti',
    'Chevrolet', 'Dodge', 'Jeep', 'Ram', 'GMC', 'Cadillac', 'Lincoln',
    'Acura', 'Genesis', 'Mitsubishi', 'Suzuki', 'Isuzu', 'Land Rover',
    'Jaguar', 'Porsche', 'Ferrari', 'Lamborghini', 'Maserati', 'Bentley',
    'Rolls-Royce', 'Aston Martin', 'McLaren', 'Bugatti', 'Koenigsegg'
  ];

  fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'LPG', 'CNG'];
  transmissions = ['Manual', 'Automatic', 'CVT', 'Semi-Automatic'];
  conditions = ['New', 'Used', 'Certified Pre-owned', 'Damaged'];
  locations = [
    'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth',
    'Bloemfontein', 'East London', 'Nelspruit', 'Polokwane', 'Kimberley'
  ];

  // Vehicle data
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;

  ngOnInit(): void {
    this.loadVehicles();
    this.applyFilters();
  }

  loadVehicles(): void {
    // Sample vehicle data
    this.vehicles = [
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
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
        description: 'Well-maintained Toyota Corolla Cross with low mileage. Perfect for city driving.',
        features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Bluetooth'],
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
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
        description: 'Luxury SUV with premium features and excellent performance.',
        features: ['Leather Seats', 'Sunroof', 'Navigation', 'Backup Camera', 'Heated Seats'],
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
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        description: 'High-performance sports bike in excellent condition.',
        features: ['ABS', 'LED Lights', 'Digital Display', 'Quick Shifter', 'Traction Control'],
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
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop',
        description: 'Powerful pickup truck perfect for work and adventure.',
        features: ['4WD', 'Towing Package', 'Bed Liner', 'Running Boards', 'Fog Lights'],
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
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',
        description: 'Reliable commercial van for business use.',
        features: ['High Roof', 'Load Area', 'Side Door', 'Rear Door', 'Air Conditioning'],
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
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop',
        description: 'Track-ready superbike with advanced electronics.',
        features: ['Traction Control', 'Launch Control', 'Quick Shifter', 'LED Lights', 'Digital Dash'],
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
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        description: 'Compact motorhome perfect for weekend getaways.',
        features: ['Kitchen', 'Bathroom', 'Sleeping Area', 'Generator', 'Solar Panels'],
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
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
        description: 'Luxury sedan with quattro all-wheel drive.',
        features: ['Quattro AWD', 'Virtual Cockpit', 'B&O Sound', 'Leather Seats', 'Panoramic Sunroof'],
        seller: { name: 'Audi Centre', type: 'dealer', rating: 4.8 },
        views: 1800,
        postedDate: '2024-09-11'
      }
    ];
  }

  // Search and filter methods
  onSearch(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.filters.category = this.selectedCategory;
    this.applyFilters();
  }

  toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  applyFilters(): void {
    let filtered = [...this.vehicles];

    // Text search
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(vehicle =>
        vehicle.title.toLowerCase().includes(query) ||
        vehicle.brand.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query) ||
        vehicle.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (this.filters.category && this.filters.category !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.category === this.filters.category);
    }

    // Brand filter
    if (this.filters.brand) {
      filtered = filtered.filter(vehicle => vehicle.brand === this.filters.brand);
    }

    // Price range
    if (this.filters.minPrice !== null) {
      filtered = filtered.filter(vehicle => vehicle.price >= this.filters.minPrice!);
    }
    if (this.filters.maxPrice !== null) {
      filtered = filtered.filter(vehicle => vehicle.price <= this.filters.maxPrice!);
    }

    // Year range
    if (this.filters.minYear !== null) {
      filtered = filtered.filter(vehicle => vehicle.year >= this.filters.minYear!);
    }
    if (this.filters.maxYear !== null) {
      filtered = filtered.filter(vehicle => vehicle.year <= this.filters.maxYear!);
    }

    // Other filters
    if (this.filters.fuelType) {
      filtered = filtered.filter(vehicle => vehicle.fuelType === this.filters.fuelType);
    }
    if (this.filters.transmission) {
      filtered = filtered.filter(vehicle => vehicle.transmission === this.filters.transmission);
    }
    if (this.filters.condition) {
      filtered = filtered.filter(vehicle => vehicle.condition === this.filters.condition);
    }
    if (this.filters.location) {
      filtered = filtered.filter(vehicle => vehicle.location === this.filters.location);
    }

    // Mileage range
    if (this.filters.minMileage !== null) {
      filtered = filtered.filter(vehicle => vehicle.mileage >= this.filters.minMileage!);
    }
    if (this.filters.maxMileage !== null) {
      filtered = filtered.filter(vehicle => vehicle.mileage <= this.filters.maxMileage!);
    }

    // Sort results
    this.sortVehicles(filtered);
    
    this.filteredVehicles = filtered;
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  sortVehicles(vehicles: Vehicle[]): void {
    switch (this.sortBy) {
      case 'newest':
        vehicles.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case 'oldest':
        vehicles.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
        break;
      case 'price-low':
        vehicles.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        vehicles.sort((a, b) => b.price - a.price);
        break;
      case 'year-new':
        vehicles.sort((a, b) => b.year - a.year);
        break;
      case 'year-old':
        vehicles.sort((a, b) => a.year - b.year);
        break;
      case 'mileage-low':
        vehicles.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'mileage-high':
        vehicles.sort((a, b) => b.mileage - a.mileage);
        break;
    }
  }

  onSortChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.filters = {
      category: 'all',
      brand: '',
      model: '',
      minPrice: null,
      maxPrice: null,
      minYear: null,
      maxYear: null,
      fuelType: '',
      transmission: '',
      condition: '',
      location: '',
      minMileage: null,
      maxMileage: null
    };
    this.applyFilters();
  }

  // Pagination
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredVehicles.length / this.itemsPerPage);
  }

  getPaginatedVehicles(): Vehicle[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredVehicles.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Utility methods
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
    const cat = this.categories.find(c => c.value === category);
    return cat ? cat.label : 'Vehicle';
  }
}
