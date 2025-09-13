import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  title = 'Sign In';
  
  // Form data
  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };
  
  // UI state
  showPassword = false;
  isLoading = false;
  
  // Validation state
  validationErrors = {
    email: '',
    password: '',
    general: ''
  };
  
  // Toggle password visibility
  togglePassword(): void {
    this.showPassword = !this.showPassword;
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
      console.log('Login attempt:', this.loginData);
      
      // Simulate different scenarios
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo
      
      if (isSuccess) {
        // Handle remember me (only in browser)
        if (typeof localStorage !== 'undefined') {
          if (this.loginData.rememberMe) {
            localStorage.setItem('rememberedEmail', this.loginData.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
        }
        
        // Show success message (in real app, redirect to dashboard)
        this.showNotification('Login successful!', 'success');
        
        // Reset form
        this.loginData = {
          email: '',
          password: '',
          rememberMe: false
        };
        form.resetForm();
      } else {
        // Simulate login failure
        this.validationErrors.general = 'Invalid email or password. Please try again.';
        this.showNotification('Login failed. Please check your credentials.', 'error');
      }
      
      this.isLoading = false;
    }, 2000);
  }
  
  // Handle Google sign in
  signInWithGoogle(): void {
    if (this.isLoading) return;
    
    this.isLoading = true;
    
    // Simulate Google OAuth flow
    setTimeout(() => {
      console.log('Google sign in attempt');
      this.isLoading = false;
      this.showNotification('Google sign in successful!', 'success');
    }, 1500);
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
  
  // Custom validation methods
  validateForm(): boolean {
    let isValid = true;
    
    // Validate email
    if (!this.loginData.email.trim()) {
      this.validationErrors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.loginData.email)) {
      this.validationErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate password
    if (!this.loginData.password.trim()) {
      this.validationErrors.password = 'Password is required';
      isValid = false;
    } else if (this.loginData.password.length < 6) {
      this.validationErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    } else if (!this.isStrongPassword(this.loginData.password)) {
      this.validationErrors.password = 'Password must contain at least one letter and one number';
      isValid = false;
    }
    
    return isValid;
  }
  
  clearValidationErrors(): void {
    this.validationErrors = {
      email: '',
      password: '',
      general: ''
    };
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  isStrongPassword(password: string): boolean {
    // At least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLetter && hasNumber;
  }
  
  // Real-time validation
  onEmailChange(): void {
    if (this.loginData.email.trim() && !this.isValidEmail(this.loginData.email)) {
      this.validationErrors.email = 'Please enter a valid email address';
    } else {
      this.validationErrors.email = '';
    }
  }
  
  onPasswordChange(): void {
    if (this.loginData.password.trim() && this.loginData.password.length < 6) {
      this.validationErrors.password = 'Password must be at least 6 characters long';
    } else if (this.loginData.password.trim() && !this.isStrongPassword(this.loginData.password)) {
      this.validationErrors.password = 'Password must contain at least one letter and one number';
    } else {
      this.validationErrors.password = '';
    }
  }
  
  // Load remembered email on component init
  ngOnInit(): void {
    // Only access localStorage in browser
    if (typeof localStorage !== 'undefined') {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        this.loginData.email = rememberedEmail;
        this.loginData.rememberMe = true;
      }
    }
  }
}
