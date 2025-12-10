export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  title: string;
  description: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Kanika Singh",
    location: "Chennai",
    rating: 5,
    title:
      "Loving the Prestige Omega Deluxe – Heats Fast, Cooks Even, Cleans Easy!",
    description:
      "This Prestige Omega Deluxe Granite cookware set is very good! The pan heats up super fast and cooks everything evenly. Also the cleanup...",
  },
  {
    id: 2,
    name: "Sneha Joshi",
    location: "Hyderabad",
    rating: 5,
    title: "Healthy and Crispy food without guilt",
    description:
      "The Prestige Nutrifry Digital Air Fryer is like a magic box for crispy, healthy food! With easy-to-use settings and a big basket, you can...",
  },
  {
    id: 3,
    name: "Sikha Jain",
    location: "Kolkata",
    rating: 4,
    title: "Style, Safety & Simplicity in One Gas Stove!",
    description:
      "The Prestige Vectra gas stove is like a stylish and practical kitchen helper. Its sleek glass top is easy to clean, while the sturdy...",
  },
  {
    id: 4,
    name: "Sikha Jain",
    location: "Kolkata",
    rating: 3,
    title: "Style, Safety & Simplicity in One Gas Stove!",
    description:
      "The Prestige Vectra gas stove is like a stylish and practical kitchen helper. Its sleek glass top is easy to clean, while the sturdy...",
  },
  {
    id: 5,
    name: "Sikha Jain",
    location: "Kolkata",
    rating: 1,
    title: "Style, Safety & Simplicity in One Gas Stove!",
    description:
      "The Prestige Vectra gas stove is like a stylish and practical kitchen helper. Its sleek glass top is easy to clean, while the sturdy...",
  },
];

export default reviews;
