# Project Overview

This project is a web application built with React, TypeScript, and Vite. It allows users to create, view, and comment on posts. The application features a clean and responsive design, utilizing Tailwind CSS for styling.

## Features

- Create new posts
- View a list of recent posts
- View post details and comments
- Add comments to posts
- Responsive design for mobile and desktop

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Vite**: A fast build tool and development server.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: A promise-based HTTP client for making API requests.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/post-comment-service.git
   cd post-comment-service
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory and add your API base URL:

   ```env
   VITE_BASE_URL=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Usage

- **Home Page**: Displays a list of recent posts.
- **Create Post**: Allows users to create a new post.
- **Post Details**: Shows the details of a selected post along with comments.
- **Add Comment**: Users can add comments to posts.
