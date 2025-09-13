import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  // Form data
  resetData = {
    email: '',
    newPassword: '',
    confirmPassword: '',
    resetToken: ''
  };
  
  // UI state
  currentStep: 'email' | 'reset' | 'success' = 'email';
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  
  // Error messages
  errors = {
    email: '',
    newPassword: '',
    confirmPassword: '',
    general: ''
  };
  
  ngOnInit(): void {
    // Check if there's a reset token in the URL (only in browser)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        this.resetData.resetToken = token;
        this.currentStep = 'reset';
      }
    }
  }
  
  // Handle email submission
  onSubmitEmail(form: NgForm): void {
    if (this.isLoading) return;
    
    // Reset errors
    this.clearErrors();
    
    // Validate email
    if (!this.validateEmailStep()) {
      return;
    }
    
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password reset request:', this.resetData.email);
      this.isLoading = false;
      this.currentStep = 'success';
      this.showNotification('Password reset link sent to your email!', 'success');
    }, 2000);
  }
  
  // Handle password reset
  onSubmitReset(form: NgForm): void {
    if (this.isLoading) return;
    
    // Reset errors
    this.errors = { email: '', newPassword: '', confirmPassword: '', general: '' };
    
    // Validate new password
    if (!this.resetData.newPassword) {
      this.errors.newPassword = 'New password is required';
      return;
    }
    
    if (this.resetData.newPassword.length < 6) {
      this.errors.newPassword = 'Password must be at least 6 characters';
      return;
    }
    
    // Validate confirm password
    if (!this.resetData.confirmPassword) {
      this.errors.confirmPassword = 'Please confirm your password';
      return;
    }
    
    if (this.resetData.newPassword !== this.resetData.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
      return;
    }
    
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password reset with token:', this.resetData.resetToken);
      this.isLoading = false;
      this.currentStep = 'success';
      this.showNotification('Password reset successfully!', 'success');
      
      // Redirect to sign in after 3 seconds (only in browser)
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          window.location.href = '/signin';
        }, 3000);
      }
    }, 2000);
  }
  
  // Toggle password visibility
  togglePassword(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  
  // Go back to email step
  goBackToEmail(): void {
    this.currentStep = 'email';
    this.resetData = { email: '', newPassword: '', confirmPassword: '', resetToken: '' };
    this.errors = { email: '', newPassword: '', confirmPassword: '', general: '' };
  }
  
  // Resend reset email
  resendEmail(): void {
    this.currentStep = 'email';
    this.resetData = { email: '', newPassword: '', confirmPassword: '', resetToken: '' };
    this.errors = { email: '', newPassword: '', confirmPassword: '', general: '' };
  }
  
  // Validate email format
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Custom validation methods
  validateEmailStep(): boolean {
    let isValid = true;
    
    if (!this.resetData.email.trim()) {
      this.errors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.resetData.email)) {
      this.errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    return isValid;
  }
  
  validateResetStep(): boolean {
    let isValid = true;
    
    // Validate new password
    if (!this.resetData.newPassword.trim()) {
      this.errors.newPassword = 'New password is required';
      isValid = false;
    } else if (this.resetData.newPassword.length < 8) {
      this.errors.newPassword = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (!this.isStrongPassword(this.resetData.newPassword)) {
      this.errors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      isValid = false;
    }
    
    // Validate confirm password
    if (!this.resetData.confirmPassword.trim()) {
      this.errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (this.resetData.newPassword !== this.resetData.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    return isValid;
  }
  
  clearErrors(): void {
    this.errors = { email: '', newPassword: '', confirmPassword: '', general: '' };
  }
  
  
  isStrongPassword(password: string): boolean {
    // At least one uppercase, one lowercase, and one number
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasUpperCase && hasLowerCase && hasNumber;
  }
  
  // Real-time validation
  onEmailChange(): void {
    if (this.resetData.email.trim() && !this.isValidEmail(this.resetData.email)) {
      this.errors.email = 'Please enter a valid email address';
    } else {
      this.errors.email = '';
    }
  }
  
  onNewPasswordChange(): void {
    if (this.resetData.newPassword.trim() && this.resetData.newPassword.length < 8) {
      this.errors.newPassword = 'Password must be at least 8 characters long';
    } else if (this.resetData.newPassword.trim() && !this.isStrongPassword(this.resetData.newPassword)) {
      this.errors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    } else {
      this.errors.newPassword = '';
    }
    
    // Also check confirm password if it has a value
    if (this.resetData.confirmPassword.trim()) {
      this.onConfirmPasswordChange();
    }
  }
  
  onConfirmPasswordChange(): void {
    if (this.resetData.confirmPassword.trim() && this.resetData.newPassword !== this.resetData.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
    } else {
      this.errors.confirmPassword = '';
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
