import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {
  isYearly = false;
  openFAQ = -1;

  subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        'Browse up to 50 vehicles',
        'Basic search filters',
        'Contact sellers directly',
        'Email support',
        'Mobile app access'
      ]
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 99,
      period: 'month',
      description: 'Great for regular buyers',
      features: [
        'Unlimited vehicle browsing',
        'Advanced search filters',
        'Price alerts',
        'Vehicle history reports',
        'Priority customer support',
        'Save favorite vehicles',
        'Compare vehicles side-by-side'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 199,
      period: 'month',
      description: 'Best for serious buyers',
      popular: true,
      features: [
        'Everything in Basic',
        'Exclusive premium listings',
        'Personal vehicle consultant',
        'Financing assistance',
        'Insurance quotes',
        'Vehicle inspection reports',
        'Extended warranty options',
        'VIP customer support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 499,
      period: 'month',
      description: 'For dealers and businesses',
      features: [
        'Everything in Premium',
        'Dealer dashboard',
        'Bulk listing management',
        'Advanced analytics',
        'Custom branding',
        'API access',
        'Dedicated account manager',
        'White-label solutions'
      ]
    }
  ];

  comparisonFeatures = [
    { name: 'Vehicle Listings', key: 'listings' },
    { name: 'Search Filters', key: 'filters' },
    { name: 'Price Alerts', key: 'alerts' },
    { name: 'History Reports', key: 'reports' },
    { name: 'Customer Support', key: 'support' },
    { name: 'Mobile App', key: 'mobile' },
    { name: 'Financing Help', key: 'financing' },
    { name: 'Insurance Quotes', key: 'insurance' },
    { name: 'Vehicle Inspection', key: 'inspection' },
    { name: 'API Access', key: 'api' }
  ];

  faqs: FAQ[] = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. There are no cancellation fees, and you\'ll continue to have access to premium features until the end of your current billing period.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment system.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! All paid plans come with a 30-day free trial. You can explore all premium features without any commitment. No credit card required to start your trial.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.'
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer: 'If you exceed your plan limits, we\'ll notify you and offer options to upgrade or purchase additional capacity. We never cut off your access without warning.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied with our service, contact our support team for a full refund.'
    }
  ];

  getPrice(plan: SubscriptionPlan): number {
    if (plan.id === 'free') return 0;
    return this.isYearly ? Math.round(plan.price * 12 * 0.8) : plan.price;
  }

  getSavings(plan: SubscriptionPlan): number {
    if (plan.id === 'free') return 0;
    const monthlyPrice = plan.price;
    const yearlyPrice = Math.round(plan.price * 12 * 0.8);
    return (monthlyPrice * 12) - yearlyPrice;
  }

  onToggleChange(): void {
    // Toggle animation or any other logic
  }

  selectPlan(plan: SubscriptionPlan): void {
    if (plan.id === 'free') {
      // Handle free plan selection
      console.log('Selected free plan');
    } else {
      // Handle paid plan selection
      console.log(`Selected ${plan.name} plan for R${this.getPrice(plan)}/${plan.period}`);
    }
  }

  isFeatureAvailable(planId: string, featureKey: string): boolean {
    const featureMap: { [key: string]: { [key: string]: boolean } } = {
      free: {
        listings: true,
        filters: true,
        alerts: false,
        reports: false,
        support: true,
        mobile: true,
        financing: false,
        insurance: false,
        inspection: false,
        api: false
      },
      basic: {
        listings: true,
        filters: true,
        alerts: true,
        reports: true,
        support: true,
        mobile: true,
        financing: false,
        insurance: false,
        inspection: false,
        api: false
      },
      premium: {
        listings: true,
        filters: true,
        alerts: true,
        reports: true,
        support: true,
        mobile: true,
        financing: true,
        insurance: true,
        inspection: true,
        api: false
      },
      enterprise: {
        listings: true,
        filters: true,
        alerts: true,
        reports: true,
        support: true,
        mobile: true,
        financing: true,
        insurance: true,
        inspection: true,
        api: true
      }
    };

    return featureMap[planId]?.[featureKey] || false;
  }

  getFeatureValue(planId: string, featureKey: string): string {
    if (this.isFeatureAvailable(planId, featureKey)) {
      return '✓';
    }
    return '✗';
  }

  toggleFAQ(index: number): void {
    this.openFAQ = this.openFAQ === index ? -1 : index;
  }

  scrollToPricing(): void {
    const pricingSection = document.querySelector('.pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  contactSupport(): void {
    // Handle contact support action
    console.log('Contact support clicked');
  }
}
