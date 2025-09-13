import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  title = 'Sign Up';
  
  // Form data
  signupData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  };
  
  // UI state
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  
  // Validation state
  validationErrors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
    general: ''
  };
  
  ngOnInit(): void {
    // Component initialization
  }
  
  // Toggle password visibility
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  
  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  
  // Handle form submission
  onSubmit(form: NgForm): void {
    if (this.isLoading) return;
    
    // Clear previous validation errors
    this.clearValidationErrors();
    
    // Validate form
    if (!this.validateForm()) {
      return;
    }
    
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup attempt:', this.signupData);
      
      // Simulate different scenarios
      const isSuccess = Math.random() > 0.2; // 80% success rate for demo
      
      if (isSuccess) {
        this.showNotification('Account created successfully!', 'success');
        
        // Reset form
        this.signupData = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: false
        };
        form.resetForm();
      } else {
        // Simulate signup failure
        this.validationErrors.general = 'Email already exists. Please use a different email address.';
        this.showNotification('Signup failed. Please try again.', 'error');
      }
      
      this.isLoading = false;
    }, 2000);
  }
  
  // Custom validation methods
  validateForm(): boolean {
    let isValid = true;
    
    // Validate first name
    if (!this.signupData.firstName.trim()) {
      this.validationErrors.firstName = 'First name is required';
      isValid = false;
    } else if (this.signupData.firstName.trim().length < 2) {
      this.validationErrors.firstName = 'First name must be at least 2 characters long';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(this.signupData.firstName.trim())) {
      this.validationErrors.firstName = 'First name can only contain letters and spaces';
      isValid = false;
    }
    
    // Validate last name
    if (!this.signupData.lastName.trim()) {
      this.validationErrors.lastName = 'Last name is required';
      isValid = false;
    } else if (this.signupData.lastName.trim().length < 2) {
      this.validationErrors.lastName = 'Last name must be at least 2 characters long';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(this.signupData.lastName.trim())) {
      this.validationErrors.lastName = 'Last name can only contain letters and spaces';
      isValid = false;
    }
    
    // Validate email
    if (!this.signupData.email.trim()) {
      this.validationErrors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.signupData.email)) {
      this.validationErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate password
    if (!this.signupData.password.trim()) {
      this.validationErrors.password = 'Password is required';
      isValid = false;
    } else if (this.signupData.password.length < 8) {
      this.validationErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (!this.isStrongPassword(this.signupData.password)) {
      this.validationErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      isValid = false;
    }
    
    // Validate confirm password
    if (!this.signupData.confirmPassword.trim()) {
      this.validationErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (this.signupData.password !== this.signupData.confirmPassword) {
      this.validationErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    // Validate terms
    if (!this.signupData.terms) {
      this.validationErrors.terms = 'You must agree to the Terms of Service and Privacy Policy';
      isValid = false;
    }
    
    return isValid;
  }
  
  clearValidationErrors(): void {
    this.validationErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
      general: ''
    };
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  isStrongPassword(password: string): boolean {
    // At least one uppercase, one lowercase, and one number
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasUpperCase && hasLowerCase && hasNumber;
  }
  
  // Real-time validation
  onFirstNameChange(): void {
    if (this.signupData.firstName.trim() && this.signupData.firstName.trim().length < 2) {
      this.validationErrors.firstName = 'First name must be at least 2 characters long';
    } else if (this.signupData.firstName.trim() && !/^[a-zA-Z\s]+$/.test(this.signupData.firstName.trim())) {
      this.validationErrors.firstName = 'First name can only contain letters and spaces';
    } else {
      this.validationErrors.firstName = '';
    }
  }
  
  onLastNameChange(): void {
    if (this.signupData.lastName.trim() && this.signupData.lastName.trim().length < 2) {
      this.validationErrors.lastName = 'Last name must be at least 2 characters long';
    } else if (this.signupData.lastName.trim() && !/^[a-zA-Z\s]+$/.test(this.signupData.lastName.trim())) {
      this.validationErrors.lastName = 'Last name can only contain letters and spaces';
    } else {
      this.validationErrors.lastName = '';
    }
  }
  
  onEmailChange(): void {
    if (this.signupData.email.trim() && !this.isValidEmail(this.signupData.email)) {
      this.validationErrors.email = 'Please enter a valid email address';
    } else {
      this.validationErrors.email = '';
    }
  }
  
  onPasswordChange(): void {
    if (this.signupData.password.trim() && this.signupData.password.length < 8) {
      this.validationErrors.password = 'Password must be at least 8 characters long';
    } else if (this.signupData.password.trim() && !this.isStrongPassword(this.signupData.password)) {
      this.validationErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    } else {
      this.validationErrors.password = '';
    }
    
    // Also check confirm password if it has a value
    if (this.signupData.confirmPassword.trim()) {
      this.onConfirmPasswordChange();
    }
  }
  
  onConfirmPasswordChange(): void {
    if (this.signupData.confirmPassword.trim() && this.signupData.password !== this.signupData.confirmPassword) {
      this.validationErrors.confirmPassword = 'Passwords do not match';
    } else {
      this.validationErrors.confirmPassword = '';
    }
  }
  
  onTermsChange(): void {
    if (!this.signupData.terms) {
      this.validationErrors.terms = 'You must agree to the Terms of Service and Privacy Policy';
    } else {
      this.validationErrors.terms = '';
    }
  }
  
  // Show notification
  private showNotification(message: string, type: 'success' | 'error'): void {
    // Only show notifications in browser
    if (typeof document === 'undefined') return;
    
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
      border-radius: 12px;
      color: white;
      font-weight: 500;
      font-family: var(--font-primary);
      z-index: 1001;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      ${type === 'success' ? 'background: linear-gradient(135deg, #10b981 0%, #059669 100%);' : 'background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }
}
