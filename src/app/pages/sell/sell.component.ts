import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

interface VehicleListing {
  // Basic Information
  title: string;
  category: 'cars' | 'bikes' | 'leisure' | 'commercial';
  brand: string;
  model: string;
  year: number;
  price: number;
  condition: string;
  
  // Vehicle Details
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: string;
  color: string;
  bodyType: string;
  
  // Location & Contact
  location: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  
  // Description & Features
  description: string;
  features: string[];
  
  // Images
  images: string[];
  
  // Additional Info
  serviceHistory: boolean;
  accidentHistory: boolean;
  financingAvailable: boolean;
  warranty: boolean;
}

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css'
})
export class SellComponent implements OnInit {
  // Current year for validation
  currentYear = new Date().getFullYear();
  maxYear = new Date().getFullYear() + 1;

  // Form data
  vehicleData: VehicleListing = {
    title: '',
    category: 'cars',
    brand: '',
    model: '',
    year: this.currentYear,
    price: 0,
    condition: 'Used',
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Manual',
    engineSize: '',
    color: '',
    bodyType: '',
    location: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    description: '',
    features: [],
    images: [],
    serviceHistory: false,
    accidentHistory: false,
    financingAvailable: false,
    warranty: false
  };

  // Form state
  currentStep = 1;
  totalSteps = 4;
  isLoading = false;
  isSubmitted = false;
  
  // Validation errors
  validationErrors: { [key: string]: string } = {};

  // Options for dropdowns
  categories = [
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
    'Rolls-Royce', 'Aston Martin', 'McLaren', 'Bugatti', 'Koenigsegg',
    'Yamaha', 'Kawasaki', 'Ducati', 'Harley-Davidson', 'Triumph',
    'Winnebago', 'Fleetwood', 'Thor', 'Jayco', 'Forest River'
  ];

  conditions = ['New', 'Used', 'Certified Pre-owned', 'Damaged'];
  fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'LPG', 'CNG'];
  transmissions = ['Manual', 'Automatic', 'CVT', 'Semi-Automatic'];
  
  bodyTypes = [
    'Sedan', 'Hatchback', 'SUV', 'Coupe', 'Convertible', 'Wagon',
    'Pickup', 'Van', 'Truck', 'Motorcycle', 'Scooter', 'ATV',
    'Motorhome', 'Camper', 'Trailer', 'Bus'
  ];

  colors = [
    'White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green',
    'Yellow', 'Orange', 'Brown', 'Gold', 'Purple', 'Pink', 'Other'
  ];

  locations = [
    'Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth',
    'Bloemfontein', 'East London', 'Nelspruit', 'Polokwane', 'Kimberley'
  ];

  commonFeatures = [
    'Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Bluetooth',
    'Navigation System', 'Backup Camera', 'Leather Seats', 'Sunroof',
    'Heated Seats', 'Cruise Control', 'Keyless Entry', 'Remote Start',
    'Towing Package', '4WD/AWD', 'Alloy Wheels', 'Fog Lights',
    'Parking Sensors', 'USB Port', 'Auxiliary Input'
  ];

  // Image handling
  selectedImages: File[] = [];
  imagePreviewUrls: string[] = [];

  ngOnInit(): void {
    // Initialize any required data
  }

  // Step navigation
  nextStep(): void {
    if (this.validateCurrentStep()) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep = step;
    }
  }

  // Validation
  validateCurrentStep(): boolean {
    this.clearValidationErrors();
    let isValid = true;

    switch (this.currentStep) {
      case 1: // Basic Information
        if (!this.vehicleData.title.trim()) {
          this.validationErrors['title'] = 'Vehicle title is required';
          isValid = false;
        }
        if (!this.vehicleData.brand.trim()) {
          this.validationErrors['brand'] = 'Brand is required';
          isValid = false;
        }
        if (!this.vehicleData.model.trim()) {
          this.validationErrors['model'] = 'Model is required';
          isValid = false;
        }
        if (this.vehicleData.year < 1900 || this.vehicleData.year > this.maxYear) {
          this.validationErrors['year'] = 'Please enter a valid year';
          isValid = false;
        }
        if (this.vehicleData.price <= 0) {
          this.validationErrors['price'] = 'Price must be greater than 0';
          isValid = false;
        }
        break;

      case 2: // Vehicle Details
        if (this.vehicleData.mileage < 0) {
          this.validationErrors['mileage'] = 'Mileage cannot be negative';
          isValid = false;
        }
        if (!this.vehicleData.color.trim()) {
          this.validationErrors['color'] = 'Color is required';
          isValid = false;
        }
        if (!this.vehicleData.bodyType.trim()) {
          this.validationErrors['bodyType'] = 'Body type is required';
          isValid = false;
        }
        break;

      case 3: // Contact Information
        if (!this.vehicleData.contactName.trim()) {
          this.validationErrors['contactName'] = 'Contact name is required';
          isValid = false;
        }
        if (!this.vehicleData.contactPhone.trim()) {
          this.validationErrors['contactPhone'] = 'Contact phone is required';
          isValid = false;
        } else if (!this.isValidPhone(this.vehicleData.contactPhone)) {
          this.validationErrors['contactPhone'] = 'Please enter a valid phone number';
          isValid = false;
        }
        if (!this.vehicleData.contactEmail.trim()) {
          this.validationErrors['contactEmail'] = 'Contact email is required';
          isValid = false;
        } else if (!this.isValidEmail(this.vehicleData.contactEmail)) {
          this.validationErrors['contactEmail'] = 'Please enter a valid email address';
          isValid = false;
        }
        if (!this.vehicleData.location.trim()) {
          this.validationErrors['location'] = 'Location is required';
          isValid = false;
        }
        break;

      case 4: // Description & Images
        if (!this.vehicleData.description.trim()) {
          this.validationErrors['description'] = 'Description is required';
          isValid = false;
        } else if (this.vehicleData.description.length < 50) {
          this.validationErrors['description'] = 'Description must be at least 50 characters';
          isValid = false;
        }
        if (this.selectedImages.length === 0) {
          this.validationErrors['images'] = 'At least one image is required';
          isValid = false;
        }
        break;
    }

    return isValid;
  }

  clearValidationErrors(): void {
    this.validationErrors = {};
  }

  // Utility methods
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  // Image handling
  onImageSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (this.isValidImageFile(file)) {
          this.selectedImages.push(file);
          this.createImagePreview(file);
        }
      }
    }
  }

  isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  }

  createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrls.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
    this.imagePreviewUrls.splice(index, 1);
  }

  // Feature handling
  toggleFeature(feature: string): void {
    const index = this.vehicleData.features.indexOf(feature);
    if (index > -1) {
      this.vehicleData.features.splice(index, 1);
    } else {
      this.vehicleData.features.push(feature);
    }
  }

  isFeatureSelected(feature: string): boolean {
    return this.vehicleData.features.includes(feature);
  }

  // Form submission
  onSubmit(form: NgForm): void {
    if (this.isLoading) return;

    if (!this.validateCurrentStep()) {
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.isSubmitted = true;
      this.showNotification('Vehicle listing submitted successfully!', 'success');
      
      // Reset form after successful submission
      setTimeout(() => {
        this.resetForm();
      }, 3000);
    }, 2000);
  }

  resetForm(): void {
    this.vehicleData = {
      title: '',
      category: 'cars',
      brand: '',
      model: '',
      year: this.currentYear,
      price: 0,
      condition: 'Used',
      mileage: 0,
      fuelType: 'Petrol',
      transmission: 'Manual',
      engineSize: '',
      color: '',
      bodyType: '',
      location: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      description: '',
      features: [],
      images: [],
      serviceHistory: false,
      accidentHistory: false,
      financingAvailable: false,
      warranty: false
    };
    
    this.currentStep = 1;
    this.isSubmitted = false;
    this.selectedImages = [];
    this.imagePreviewUrls = [];
    this.clearValidationErrors();
  }

  // Notification system
  showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
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

    // Set background color based on type
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

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  // Format price for display
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(price);
  }

  // Get step title
  getStepTitle(step: number): string {
    switch (step) {
      case 1: return 'Basic Information';
      case 2: return 'Vehicle Details';
      case 3: return 'Contact Information';
      case 4: return 'Description & Images';
      default: return '';
    }
  }

  // Get step description
  getStepDescription(step: number): string {
    switch (step) {
      case 1: return 'Tell us about your vehicle';
      case 2: return 'Provide detailed specifications';
      case 3: return 'How can buyers reach you?';
      case 4: return 'Describe your vehicle and add photos';
      default: return '';
    }
  }
}
