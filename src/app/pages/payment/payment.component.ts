import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  available: boolean;
}

interface PaymentDetails {
  // Payment Method
  paymentMethod: string;
  
  // Credit Card Details
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
  
  // Bank Transfer Details
  bankName: string;
  accountNumber: string;
  branchCode: string;
  accountHolderName: string;
  
  // EFT Details
  referenceNumber: string;
  
  // Billing Information
  billingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  
  // Contact Information
  email: string;
  phone: string;
  
  // Terms and Conditions
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

interface PaymentSummary {
  subtotal: number;
  vat: number;
  serviceFee: number;
  total: number;
  currency: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  // Payment data
  paymentDetails: PaymentDetails = {
    paymentMethod: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    bankName: '',
    accountNumber: '',
    branchCode: '',
    accountHolderName: '',
    referenceNumber: '',
    billingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: 'South Africa'
    },
    email: '',
    phone: '',
    acceptTerms: false,
    acceptMarketing: false
  };

  // Payment summary
  paymentSummary: PaymentSummary = {
    subtotal: 15000,
    vat: 2250,
    serviceFee: 500,
    total: 17750,
    currency: 'ZAR'
  };

  // Form state
  currentStep = 1;
  totalSteps = 3;
  isLoading = false;
  isProcessing = false;
  isCompleted = false;
  
  // Validation errors
  validationErrors: { [key: string]: string } = {};

  // Payment methods
  paymentMethods: PaymentMethod[] = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: 'credit-card',
      available: true
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: 'bank',
      available: true
    },
    {
      id: 'eft',
      name: 'Electronic Funds Transfer',
      description: 'Secure EFT payment',
      icon: 'transfer',
      available: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: 'paypal',
      available: false
    }
  ];

  // Months and years for expiry
  months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  years: string[] = [];
  countries = ['South Africa', 'United States', 'United Kingdom', 'Canada', 'Australia'];

  // Security features
  showCvv = false;
  isSecureConnection = true;

  ngOnInit(): void {
    // Generate years for expiry (current year + 10 years)
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push((currentYear + i).toString());
    }
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
      case 1: // Payment Method Selection
        if (!this.paymentDetails.paymentMethod) {
          this.validationErrors['paymentMethod'] = 'Please select a payment method';
          isValid = false;
        }
        break;

      case 2: // Payment Details
        if (this.paymentDetails.paymentMethod === 'credit-card') {
          if (!this.paymentDetails.cardNumber.trim()) {
            this.validationErrors['cardNumber'] = 'Card number is required';
            isValid = false;
          } else if (!this.isValidCardNumber(this.paymentDetails.cardNumber)) {
            this.validationErrors['cardNumber'] = 'Please enter a valid card number';
            isValid = false;
          }
          
          if (!this.paymentDetails.expiryMonth) {
            this.validationErrors['expiryMonth'] = 'Expiry month is required';
            isValid = false;
          }
          
          if (!this.paymentDetails.expiryYear) {
            this.validationErrors['expiryYear'] = 'Expiry year is required';
            isValid = false;
          }
          
          if (!this.paymentDetails.cvv.trim()) {
            this.validationErrors['cvv'] = 'CVV is required';
            isValid = false;
          } else if (!this.isValidCvv(this.paymentDetails.cvv)) {
            this.validationErrors['cvv'] = 'Please enter a valid CVV';
            isValid = false;
          }
          
          if (!this.paymentDetails.cardholderName.trim()) {
            this.validationErrors['cardholderName'] = 'Cardholder name is required';
            isValid = false;
          }
        } else if (this.paymentDetails.paymentMethod === 'bank-transfer') {
          if (!this.paymentDetails.bankName.trim()) {
            this.validationErrors['bankName'] = 'Bank name is required';
            isValid = false;
          }
          
          if (!this.paymentDetails.accountNumber.trim()) {
            this.validationErrors['accountNumber'] = 'Account number is required';
            isValid = false;
          }
          
          if (!this.paymentDetails.branchCode.trim()) {
            this.validationErrors['branchCode'] = 'Branch code is required';
            isValid = false;
          }
          
          if (!this.paymentDetails.accountHolderName.trim()) {
            this.validationErrors['accountHolderName'] = 'Account holder name is required';
            isValid = false;
          }
        } else if (this.paymentDetails.paymentMethod === 'eft') {
          if (!this.paymentDetails.referenceNumber.trim()) {
            this.validationErrors['referenceNumber'] = 'Reference number is required';
            isValid = false;
          }
        }
        break;

      case 3: // Billing & Confirmation
        if (!this.paymentDetails.email.trim()) {
          this.validationErrors['email'] = 'Email address is required';
          isValid = false;
        } else if (!this.isValidEmail(this.paymentDetails.email)) {
          this.validationErrors['email'] = 'Please enter a valid email address';
          isValid = false;
        }
        
        if (!this.paymentDetails.phone.trim()) {
          this.validationErrors['phone'] = 'Phone number is required';
          isValid = false;
        } else if (!this.isValidPhone(this.paymentDetails.phone)) {
          this.validationErrors['phone'] = 'Please enter a valid phone number';
          isValid = false;
        }
        
        if (!this.paymentDetails.billingAddress.street.trim()) {
          this.validationErrors['street'] = 'Street address is required';
          isValid = false;
        }
        
        if (!this.paymentDetails.billingAddress.city.trim()) {
          this.validationErrors['city'] = 'City is required';
          isValid = false;
        }
        
        if (!this.paymentDetails.billingAddress.postalCode.trim()) {
          this.validationErrors['postalCode'] = 'Postal code is required';
          isValid = false;
        }
        
        if (!this.paymentDetails.acceptTerms) {
          this.validationErrors['acceptTerms'] = 'You must accept the terms and conditions';
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

  isValidCardNumber(cardNumber: string): boolean {
    // Remove spaces and check if it's a valid card number
    const cleaned = cardNumber.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleaned);
  }

  isValidCvv(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv);
  }

  // Card number formatting
  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    this.paymentDetails.cardNumber = formattedValue;
  }

  // CVV toggle
  toggleCvvVisibility(): void {
    this.showCvv = !this.showCvv;
  }

  // Payment method selection
  selectPaymentMethod(methodId: string): void {
    this.paymentDetails.paymentMethod = methodId;
    this.clearValidationErrors();
  }

  // Payment processing
  processPayment(form: NgForm): void {
    if (this.isProcessing) return;

    if (!this.validateCurrentStep()) {
      return;
    }

    this.isProcessing = true;

    // Simulate payment processing
    setTimeout(() => {
      this.isProcessing = false;
      this.isCompleted = true;
      this.showNotification('Payment processed successfully!', 'success');
    }, 3000);
  }

  // Reset form
  resetPayment(): void {
    this.paymentDetails = {
      paymentMethod: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: '',
      bankName: '',
      accountNumber: '',
      branchCode: '',
      accountHolderName: '',
      referenceNumber: '',
      billingAddress: {
        street: '',
        city: '',
        postalCode: '',
        country: 'South Africa'
      },
      email: '',
      phone: '',
      acceptTerms: false,
      acceptMarketing: false
    };
    
    this.currentStep = 1;
    this.isCompleted = false;
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
      case 1: return 'Payment Method';
      case 2: return 'Payment Details';
      case 3: return 'Billing & Confirmation';
      default: return '';
    }
  }

  // Get step description
  getStepDescription(step: number): string {
    switch (step) {
      case 1: return 'Choose your preferred payment method';
      case 2: return 'Enter your payment information';
      case 3: return 'Review and confirm your payment';
      default: return '';
    }
  }

  // Get payment method icon
  getPaymentMethodIcon(methodId: string): string {
    switch (methodId) {
      case 'credit-card':
        return '💳';
      case 'bank-transfer':
        return '🏦';
      case 'eft':
        return '💸';
      case 'paypal':
        return '🅿️';
      default:
        return '💳';
    }
  }

  // Check if payment method is selected
  isPaymentMethodSelected(methodId: string): boolean {
    return this.paymentDetails.paymentMethod === methodId;
  }
}
