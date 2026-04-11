# Task Manager

Task Manager is a modern task management web application designed to help users efficiently **organize, track, and manage** their daily tasks. Perfect for staying organized and getting things done effortlessly!

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Database:** MongoDB + Mongoose
- **Authentication:** BetterAuth

## Requirements

Before getting started, make sure you have the following installed:

- Node.js (v24 or higher)
- MongoDB

## Getting Started

### Option 1: Use the live version

```bash
https://task-manager-9g3s.vercel.app
```

### Option 2: Run locally

#### 1. Clone the repository

```bash
git clone https://github.com/RL08/TaskManager.git
cd task-manager
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Setup environment variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000 # Base URL of your app
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000 # Base URL of your app
```

#### 4. Run the development server

```bash
npm run dev
```

App will run at:

```
http://localhost:3000
```
