# Full Stack Chat Application

A real-time chat application built with Next.js, Firebase, and modern web technologies. This application enables users to communicate in real-time, manage their profiles, and engage in private conversations.

## Features

- Real-time messaging using Firebase
- User authentication and authorization
- Private chat rooms
- User profile management
- Modern and responsive UI
- Secure data handling

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Firebase (Firestore, Authentication)
- **Styling**: CSS Modules
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
cd fullstack-chatapp
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Copy your Firebase configuration
   - Create a `.env.local` file and add your Firebase config

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the root directory and add the following:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
