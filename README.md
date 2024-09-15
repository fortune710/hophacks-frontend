# immerXiv Frontend

## Overview
The frontend of **immerXiv** is built with Next.js, TypeScript, and Shadcn, utilizing REST APIs for seamless communication with the backend. The frontend provides a user-friendly interface that allows researchers to interact with arXiv data, visualize trends, and analyze research topics in real time.

## Features
- **Interactive Sentiment Analysis**: View real-time insights into research trends via dynamic keyword visualizations.
- **REST API Integration**: Connects to multiple APIs (arXiv, Reddit, Semantic Scholar, etc.) to retrieve and display relevant data.
- **Hot-or-Not Game**: An interactive feature that lets users upvote or downvote papers, providing feedback loops for the system.
- **Shadcn Components**: Utilizes modern and accessible components to enhance the user interface.

## Tech Stack
- **Next.js**: A React-based framework for building server-side rendered applications.
- **TypeScript**: Type-safe JavaScript for better code reliability and maintainability.
- **Shadcn**: A component library for building modern, accessible interfaces.
- **Auth0**: An authentication SDK for authenticating users.
- **REST APIs**: Fetches data from various APIs such as arXiv, Reddit, and Semantic Scholar.

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/immerxiv-frontend.git
   ```
2. Navigate to the project directory:

```bash
cd immerxiv-frontend
```

3. Install Dependencies
```bash
npm install
```
4. Set up your environment variables: Create a .env.local file and add the necessary API keys and configurations for the REST APIs.

```bash
NEXT_PUBLIC_API_KEY=your_api_key
AUTH0_SECRET='****'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='****'
AUTH0_CLIENT_ID='****'
AUTH0_CLIENT_SECRET='****'
```
5. Run the development server:

```bash
npm run dev
```
6. Open http://localhost:3000 to view the application in your browser.