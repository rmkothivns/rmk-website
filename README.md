<div align="center">
  <img src="public/assets/generated/logo.png" alt="Rudreshwar Mahadeo Kothi Logo" width="200"/>
  <h1>Rudreshwar Mahadeo Kothi</h1>
  <p><em>Heritage Haveli in the Heart of Varanasi • A Stay Guests Remember</em></p>
</div>

---

## 🌟 Overview

Welcome to the official web application repository for **Rudreshwar Mahadeo Kothi**, a premium heritage homestay located just 3 minutes away from the sacred Kashi Vishwanath Temple in Varanasi. 

This website is designed to provide potential guests with a stunning, immersive digital experience that reflects the warmth, spirituality, and historical richness of the physical property.

![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

## ✨ Key Features

- **Immersive Hero Experience:** Engaging landing sections with smooth entrance animations to capture the essence of Varanasi.
- **Dynamic Guest Reviews:** Live review aggregation directly embedded via Trustindex for Google, Booking.com, and Airbnb.
- **Direct Booking Inquiries:** Seamless "Contact Us" and "Inquire" forms connected via Web3Forms that send details instantly to the host's email.
- **High-Performance Routing:** Powered by `@tanstack/react-router` for lightning-fast, App-like page transitions without full page reloads.
- **Interactive Lightbox Gallery:** A beautiful, swipe-friendly image gallery showcasing the property's heritage architecture and modern amenities.
- **Fully Responsive & Accessible:** Carefully crafted using Tailwind CSS to look flawless on mobile, tablet, and desktop devices.
- **Beautiful Micro-Interactions:** Subtle hover states, smooth scroll effects, and fade-up animations powered by Framer Motion.

## 🛠️ Technology Stack

| Technology | Purpose |
| ---------- | ------- |
| **React 18** | Core UI library for component-based architecture |
| **Vite** | Ultra-fast frontend build tool and development server |
| **Tailwind CSS** | Utility-first CSS framework for rapid, responsive styling |
| **Framer Motion** | Production-ready declarative animation library |
| **TanStack Router** | Type-safe, high-performance routing |
| **Lucide React** | Beautiful, consistent iconography |
| **Web3Forms** | Backend-less contact form API integration |

## 🚀 Getting Started

To run this project locally, ensure you have [Node.js](https://nodejs.org/) installed, and then follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/PrabhatCodess/rmk-website.git
cd rmk-website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Your local development server will start at `http://localhost:5173/`. 

## 📁 Project Structure

```text
├── src/
│   └── frontend/
│       ├── public/         # Static assets, generated favicon, etc.
│       └── src/
│           ├── components/ # Reusable UI components (Home, Reviews, Blog, etc.)
│           ├── lib/        # Utility functions and configurations
│           ├── App.jsx     # Main application wrapper
│           ├── index.css   # Global Tailwind styles & custom CSS
│           └── main.jsx    # Application entry point & Router configuration
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite bundler configuration
└── vercel.json             # Vercel deployment configuration
```

## 🌐 Deployment

This application is configured for seamless deployment on **Vercel**. 
The `vercel.json` file ensures that all routes correctly redirect to `index.html` to support client-side routing via TanStack.

To deploy manually:
1. Push your code to GitHub.
2. Import the repository into your Vercel dashboard.
3. Ensure the Build Command is `npm run build` and Output Directory is `dist`.

## 📜 License

This project is licensed under the MIT License. All specific branding assets (Logos, Property Photos) are copyright of Rudreshwar Mahadeo Kothi.
