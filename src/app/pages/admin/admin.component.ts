import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface VehicleImage {
  id: string;
  url: string;
  alt: string;
  category: 'front' | 'left' | 'side' | 'dashboard' | 'back' | 'interior' | 'engine' | 'other';
  rating: number;
  notes: string;
}

interface VehicleListing {
  id: string;
  title: string;
  category: 'cars' | 'bikes' | 'leisure' | 'commercial';
  brand: string;
  model: string;
  year: number;
  price: number;
  condition: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  location: string;
  description: string;
  seller: {
    name: string;
    email: string;
    phone: string;
  };
  images: VehicleImage[];
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  submittedDate: Date;
  reviewedDate?: Date;
  reviewedBy?: string;
  overallRating: number;
  adminNotes: string;
}

interface AdminStats {
  totalListings: number;
  pendingListings: number;
  approvedListings: number;
  rejectedListings: number;
  underReviewListings: number;
  averageRating: number;
  todayReviews: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  // Current view state
  currentView: 'dashboard' | 'pending' | 'approved' | 'rejected' | 'all' = 'dashboard';
  selectedVehicle: VehicleListing | null = null;
  isReviewModalOpen = false;
  
  // Photo zoom modal
  showPhotoModal = false;
  selectedPhoto: VehicleImage | null = null;
  zoomLevel = 1;
  panX = 0;
  panY = 0;
  isDragging = false;
  dragStartX = 0;
  dragStartY = 0;
  
  // Math reference for template
  Math = Math;
  
  // Filter and search
  searchQuery = '';
  statusFilter = 'all';
  categoryFilter = 'all';
  dateFilter = 'all';
  
  // Admin stats
  adminStats: AdminStats = {
    totalListings: 0,
    pendingListings: 0,
    approvedListings: 0,
    rejectedListings: 0,
    underReviewListings: 0,
    averageRating: 0,
    todayReviews: 0
  };

  // Sample vehicle listings data
  vehicleListings: VehicleListing[] = [
    {
      id: '1',
      title: '2020 Toyota Corolla Cross',
      category: 'cars',
      brand: 'Toyota',
      model: 'Corolla Cross',
      year: 2020,
      price: 350000,
      condition: 'Used',
      mileage: 45000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      color: 'White',
      location: 'Johannesburg',
      description: 'Well-maintained Toyota Corolla Cross with full service history. Single owner, no accidents.',
      seller: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+27 11 123 4567'
      },
      images: [
        {
          id: '1-1',
          url: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
          alt: 'Front view',
          category: 'front',
          rating: 0,
          notes: ''
        },
        {
          id: '1-2',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Left view',
          category: 'left',
          rating: 0,
          notes: ''
        },
        {
          id: '1-3',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Side view',
          category: 'side',
          rating: 0,
          notes: ''
        },
        {
          id: '1-4',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Dashboard view',
          category: 'dashboard',
          rating: 0,
          notes: ''
        },
        {
          id: '1-5',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Back view',
          category: 'back',
          rating: 0,
          notes: ''
        },
        {
          id: '1-6',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Interior view',
          category: 'interior',
          rating: 0,
          notes: ''
        },
        {
          id: '1-7',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Engine view',
          category: 'engine',
          rating: 0,
          notes: ''
        },
        {
          id: '1-8',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Wheel view',
          category: 'other',
          rating: 0,
          notes: ''
        },
        {
          id: '1-9',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Trunk view',
          category: 'other',
          rating: 0,
          notes: ''
        },
        {
          id: '1-10',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Additional view',
          category: 'other',
          rating: 0,
          notes: ''
        }
      ],
      status: 'pending',
      submittedDate: new Date('2024-01-15'),
      overallRating: 0,
      adminNotes: ''
    },
    {
      id: '2',
      title: '2019 BMW X3',
      category: 'cars',
      brand: 'BMW',
      model: 'X3',
      year: 2019,
      price: 520000,
      condition: 'Used',
      mileage: 38000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      color: 'Black',
      location: 'Cape Town',
      description: 'Luxury BMW X3 with premium features. Excellent condition, regularly serviced.',
      seller: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+27 21 987 6543'
      },
      images: [
        {
          id: '2-1',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Front view',
          category: 'front',
          rating: 0,
          notes: ''
        },
        {
          id: '2-2',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Left view',
          category: 'left',
          rating: 0,
          notes: ''
        },
        {
          id: '2-3',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Side view',
          category: 'side',
          rating: 0,
          notes: ''
        },
        {
          id: '2-4',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Dashboard view',
          category: 'dashboard',
          rating: 0,
          notes: ''
        },
        {
          id: '2-5',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Back view',
          category: 'back',
          rating: 0,
          notes: ''
        },
        {
          id: '2-6',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Interior view',
          category: 'interior',
          rating: 0,
          notes: ''
        },
        {
          id: '2-7',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Engine view',
          category: 'engine',
          rating: 0,
          notes: ''
        },
        {
          id: '2-8',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Wheel view',
          category: 'other',
          rating: 0,
          notes: ''
        },
        {
          id: '2-9',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Trunk view',
          category: 'other',
          rating: 0,
          notes: ''
        },
        {
          id: '2-10',
          url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
          alt: 'Additional view',
          category: 'other',
          rating: 0,
          notes: ''
        }
      ],
      status: 'pending',
      submittedDate: new Date('2024-01-14'),
      overallRating: 0,
      adminNotes: ''
    },
    {
      id: '3',
      title: '2021 Honda CBR600RR',
      category: 'bikes',
      brand: 'Honda',
      model: 'CBR600RR',
      year: 2021,
      price: 180000,
      condition: 'Used',
      mileage: 12000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      color: 'Red',
      location: 'Durban',
      description: 'Sport bike in excellent condition. Low mileage, well maintained.',
      seller: {
        name: 'Mike Wilson',
        email: 'mike.w@email.com',
        phone: '+27 31 456 7890'
      },
      images: [
        {
          id: '3-1',
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
          alt: 'Front view',
          category: 'front',
          rating: 0,
          notes: ''
        },
        {
          id: '3-2',
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
          alt: 'Left view',
          category: 'left',
          rating: 0,
          notes: ''
        },
        {
          id: '3-3',
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
          alt: 'Side view',
          category: 'side',
          rating: 0,
          notes: ''
        },
        {
          id: '3-4',
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
          alt: 'Dashboard view',
          category: 'dashboard',
          rating: 0,
          notes: ''
        },
        {
          id: '3-5',
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
          alt: 'Back view',
          category: 'back',
          rating: 0,
          notes: ''
        },
        {
          id: '3-6',
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
          alt: 'Interior view',
          category: 'interior',
          rating: 0,
          notes: ''
        },
        {
          id: '3-7',
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
          alt: 'Engine view',
          category: 'engine',
          rating: 0,
          notes: ''
        },
        {
          id: '3-8',
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
          alt: 'Wheel view',
          category: 'other',
          rating: 0,
          notes: ''
        },
        {
          id: '3-9',
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
          alt: 'Trunk view',
          category: 'other',
          rating: 0,
          notes: ''
        },
        {
          id: '3-10',
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
          alt: 'Additional view',
          category: 'other',
          rating: 0,
          notes: ''
        }
      ],
      status: 'approved',
      submittedDate: new Date('2024-01-10'),
      reviewedDate: new Date('2024-01-12'),
      reviewedBy: 'Admin User',
      overallRating: 4.5,
      adminNotes: 'Excellent condition, high-quality photos'
    }
  ];

  // Filtered listings
  filteredListings: VehicleListing[] = [];

  // Rating options
  ratingOptions = [
    { value: 1, label: 'Poor' },
    { value: 2, label: 'Fair' },
    { value: 3, label: 'Good' },
    { value: 4, label: 'Very Good' },
    { value: 5, label: 'Excellent' }
  ];

  // Image categories
  imageCategories = [
    { value: 'front', label: 'Front View' },
    { value: 'left', label: 'Left View' },
    { value: 'side', label: 'Side View' },
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'back', label: 'Back View' },
    { value: 'interior', label: 'Interior' },
    { value: 'engine', label: 'Engine' },
    { value: 'other', label: 'Other' }
  ];

  ngOnInit(): void {
    this.calculateStats();
    this.filterListings();
  }

  // View management
  setView(view: 'dashboard' | 'pending' | 'approved' | 'rejected' | 'all'): void {
    this.currentView = view;
    this.filterListings();
  }

  // Filter and search
  filterListings(): void {
    let filtered = [...this.vehicleListings];

    // Apply status filter
    if (this.currentView !== 'dashboard' && this.currentView !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.status === this.currentView);
    }

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(vehicle => 
        vehicle.title.toLowerCase().includes(query) ||
        vehicle.brand.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query) ||
        vehicle.seller.name.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (this.categoryFilter !== 'all') {
      filtered = filtered.filter(vehicle => vehicle.category === this.categoryFilter);
    }

    // Apply date filter
    if (this.dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (this.dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(vehicle => vehicle.submittedDate >= filterDate);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(vehicle => vehicle.submittedDate >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(vehicle => vehicle.submittedDate >= filterDate);
          break;
      }
    }

    this.filteredListings = filtered;
  }

  onSearchChange(): void {
    this.filterListings();
  }

  onFilterChange(): void {
    this.filterListings();
  }

  // Vehicle review
  openReviewModal(vehicle: VehicleListing): void {
    this.selectedVehicle = { ...vehicle };
    this.isReviewModalOpen = true;
  }

  closeReviewModal(): void {
    this.isReviewModalOpen = false;
    this.selectedVehicle = null;
  }

  // Image rating
  rateImage(imageId: string, rating: number): void {
    if (this.selectedVehicle) {
      const image = this.selectedVehicle.images.find(img => img.id === imageId);
      if (image) {
        image.rating = rating;
        this.calculateOverallRating();
      }
    }
  }

  updateImageNotes(imageId: string, notes: string): void {
    if (this.selectedVehicle) {
      const image = this.selectedVehicle.images.find(img => img.id === imageId);
      if (image) {
        image.notes = notes;
      }
    }
  }

  calculateOverallRating(): void {
    if (this.selectedVehicle && this.selectedVehicle.images.length > 0) {
      const totalRating = this.selectedVehicle.images.reduce((sum, img) => sum + img.rating, 0);
      this.selectedVehicle.overallRating = totalRating / this.selectedVehicle.images.length;
    }
  }

  // Vehicle actions
  approveVehicle(): void {
    if (this.selectedVehicle) {
      this.selectedVehicle.status = 'approved';
      this.selectedVehicle.reviewedDate = new Date();
      this.selectedVehicle.reviewedBy = 'Current Admin';
      
      // Update in main array
      const index = this.vehicleListings.findIndex(v => v.id === this.selectedVehicle!.id);
      if (index !== -1) {
        this.vehicleListings[index] = { ...this.selectedVehicle };
      }
      
      this.showNotification('Vehicle approved successfully!', 'success');
      this.closeReviewModal();
      this.calculateStats();
      this.filterListings();
    }
  }

  rejectVehicle(): void {
    if (this.selectedVehicle) {
      this.selectedVehicle.status = 'rejected';
      this.selectedVehicle.reviewedDate = new Date();
      this.selectedVehicle.reviewedBy = 'Current Admin';
      
      // Update in main array
      const index = this.vehicleListings.findIndex(v => v.id === this.selectedVehicle!.id);
      if (index !== -1) {
        this.vehicleListings[index] = { ...this.selectedVehicle };
      }
      
      this.showNotification('Vehicle rejected', 'info');
      this.closeReviewModal();
      this.calculateStats();
      this.filterListings();
    }
  }

  markUnderReview(): void {
    if (this.selectedVehicle) {
      this.selectedVehicle.status = 'under-review';
      this.selectedVehicle.reviewedDate = new Date();
      this.selectedVehicle.reviewedBy = 'Current Admin';
      
      // Update in main array
      const index = this.vehicleListings.findIndex(v => v.id === this.selectedVehicle!.id);
      if (index !== -1) {
        this.vehicleListings[index] = { ...this.selectedVehicle };
      }
      
      this.showNotification('Vehicle marked for review', 'info');
      this.closeReviewModal();
      this.calculateStats();
      this.filterListings();
    }
  }

  // Statistics
  calculateStats(): void {
    this.adminStats = {
      totalListings: this.vehicleListings.length,
      pendingListings: this.vehicleListings.filter(v => v.status === 'pending').length,
      approvedListings: this.vehicleListings.filter(v => v.status === 'approved').length,
      rejectedListings: this.vehicleListings.filter(v => v.status === 'rejected').length,
      underReviewListings: this.vehicleListings.filter(v => v.status === 'under-review').length,
      averageRating: this.calculateAverageRating(),
      todayReviews: this.getTodayReviews()
    };
  }

  calculateAverageRating(): number {
    const reviewedVehicles = this.vehicleListings.filter(v => v.overallRating > 0);
    if (reviewedVehicles.length === 0) return 0;
    
    const totalRating = reviewedVehicles.reduce((sum, v) => sum + v.overallRating, 0);
    return Math.round((totalRating / reviewedVehicles.length) * 10) / 10;
  }

  getTodayReviews(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.vehicleListings.filter(v => 
      v.reviewedDate && v.reviewedDate >= today
    ).length;
  }

  // Utility methods
  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      case 'under-review': return '#3b82f6';
      default: return '#6b7280';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending': return 'Pending';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'under-review': return 'Under Review';
      default: return 'Unknown';
    }
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'cars': return 'Cars';
      case 'bikes': return 'Bikes';
      case 'leisure': return 'Leisure Vehicles';
      case 'commercial': return 'Commercial Vehicles';
      default: return 'Unknown';
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(price);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  getImageCategoryLabel(category: string): string {
    const cat = this.imageCategories.find(c => c.value === category);
    return cat ? cat.label : 'Other';
  }

  getRatingLabel(rating: number): string {
    const ratingOption = this.ratingOptions.find(r => r.value === rating);
    return ratingOption ? ratingOption.label : 'Not Rated';
  }

  // Notification system
  showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      maxWidth: '400px',
      wordWrap: 'break-word'
    });

    switch (type) {
      case 'success':
        notification.style.backgroundColor = '#10b981';
        break;
      case 'error':
        notification.style.backgroundColor = '#ef4444';
        break;
      case 'info':
        notification.style.backgroundColor = '#3b82f6';
        break;
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  // Photo zoom modal methods
  openPhotoModal(photo: VehicleImage): void {
    this.selectedPhoto = photo;
    this.showPhotoModal = true;
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
    document.body.style.overflow = 'hidden';
  }

  closePhotoModal(): void {
    this.showPhotoModal = false;
    this.selectedPhoto = null;
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    document.body.style.overflow = 'auto';
  }

  zoomIn(): void {
    this.zoomLevel = Math.min(this.zoomLevel * 1.5, 5);
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(this.zoomLevel / 1.5, 0.5);
  }

  resetZoom(): void {
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
  }

  onMouseDown(event: MouseEvent): void {
    if (this.zoomLevel > 1) {
      this.isDragging = true;
      this.dragStartX = event.clientX - this.panX;
      this.dragStartY = event.clientY - this.panY;
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging && this.zoomLevel > 1) {
      this.panX = event.clientX - this.dragStartX;
      this.panY = event.clientY - this.dragStartY;
    }
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    if (event.deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.showPhotoModal) {
      switch (event.key) {
        case 'Escape':
          this.closePhotoModal();
          break;
        case '+':
        case '=':
          this.zoomIn();
          break;
        case '-':
          this.zoomOut();
          break;
        case '0':
          this.resetZoom();
          break;
      }
    }
  }
}
