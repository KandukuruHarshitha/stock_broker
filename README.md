# Stock Broker Client Web Dashboard

A modern, responsive web dashboard for stock broker clients, built with React and Vite. This application provides users with real-time stock data visualization, subscription management, and a secure authentication system.

## Features

-   **Authentication**: Secure login system for user access.
-   **Interactive Dashboard**: Visualize stock data with dynamic charts using Recharts.
-   **Subscription Management**: Manage user subscriptions and access levels.
-   **Responsive Design**: Fully responsive interface built with Tailwind CSS.
-   **Modern UI**: Clean and intuitive user interface with Lucide React icons.

## Tech Stack

-   **Core**: [React](https://react.dev/), [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **Charts**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Utilities**: [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd stock-broker-dashboard
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:
```bash
npm run build
```

### Previewing Production Build

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context for state management (Auth, Stock)
├── pages/          # Application pages (Login, Dashboard, Subscription)
├── App.jsx         # Main application component with routing
└── main.jsx        # Entry point
```

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the app for production.
-   `npm run lint`: Runs ESLint to check for code quality issues.
-   `npm run preview`: Previews the production build.
