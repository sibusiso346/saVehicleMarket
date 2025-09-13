import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop&crop=center'
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
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center'
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
      image: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop&crop=center'
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
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop&crop=center'
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
      condition: 'Excellent'
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
      condition: 'Excellent'
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
      condition: 'Excellent'
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
      condition: 'Excellent'
    }
  ];
}
