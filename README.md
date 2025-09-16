# Career Counseling Chat Application

A professional career counseling chat application built with Next.js 14+, TypeScript, tRPC, and Prisma. Features real-time chat with AI-powered career guidance, session management, and user authentication.

## 🚀 Features

- **AI-Powered Career Counseling**: Intelligent responses for career transitions, job search, skill development, and more
- **Real-time Chat Interface**: Smooth messaging experience with typing indicators and message history
- **Session Management**: Create, manage, and track multiple counseling sessions
- **User Authentication**: Secure authentication with email/password using NextAuth.js
- **Analytics Dashboard**: Track your career counseling progress and session statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type-Safe API**: Full-stack type safety with tRPC and TypeScript

## 🛠 Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Backend**: tRPC v11, Prisma ORM, PostgreSQL
- **UI**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Authentication**: NextAuth.js (Credentials provider)
- **AI Integration**: OpenAI Chat Completions (fallback mock if `OPENAI_API_KEY` is not set)

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Neon for cloud)
- npm or yarn package manager
- SMTP server (for password reset emails, optional)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd career-chat-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/career_chat?schema=public"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key" # Generate with: openssl rand -base64 32
   NEXTAUTH_URL="http://localhost:3000"
   
   # OpenAI (for AI features)
   OPENAI_API_KEY="your-openai-api-key"
   # Optional: defaults to gpt-4o-mini if not provided
   OPENAI_MODEL="gpt-4o-mini"
   ```
   
   To generate a secure NEXTAUTH_SECRET, you can run:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Set up the database**
   ```bash
   # Install dependencies
   npm install
   
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed the database with initial data
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at http://localhost:3000
   
   ## 🔒 Authentication
   
   The application uses NextAuth.js (Credentials provider) for authentication with the following features:
   - Email/password authentication
   - Session management with JWT
   - Protected routes
   - Password reset (if email is configured)
   
   ### Available Routes:
   - `/login` - User login
   - `/signup` - Create a new account
   - `/forgot-password` - Request password reset
   - `/reset-password` - Reset password with token
   - `/dashboard` - Protected user dashboard
   
   ## 🛡️ Security
   
   - All routes except public ones are protected by default
   - Passwords are hashed using bcrypt
   - CSRF protection enabled
   - Secure HTTP-only cookies for session storage

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses the following main entities:

- **User**: User accounts and profiles
- **ChatSession**: Individual counseling sessions
- **Message**: Chat messages with role-based typing (USER/ASSISTANT/SYSTEM)
- **Account/Session**: NextAuth.js compatibility (for future use)

## 🤖 AI Integration

This app integrates directly with OpenAI Chat Completions using a focused system prompt tailored for career counseling.

- Real provider in `lib/ai/career-counselor.ts` using `fetch` to call the OpenAI API
- System prompt is concise and purpose-built for career guidance
- Contextual conversation history is included (recent messages window)
- Fallback to a safe mock response if `OPENAI_API_KEY` is not set (useful for local dev)
- Default model is `gpt-4o-mini` (configurable via `OPENAI_MODEL`)

## 🎯 Career Counseling Features

The AI counselor provides guidance on:

- **Career Transitions**: Strategic planning for field changes
- **Job Search**: Resume optimization, interview prep, networking
- **Skill Development**: Learning strategies and resource recommendations  
- **Salary Negotiation**: Compensation research and negotiation tactics
- **Work-Life Balance**: Stress management and boundary setting
- **Professional Growth**: Leadership development and advancement strategies

## 📱 Key Components

- **AuthGuard**: Protects routes and manages authentication state
- **SessionSidebar**: Manages chat sessions and user dashboard
- **ChatWindow**: Real-time messaging interface
- **ChatMessage**: Individual message display with role-based styling
- **UserDashboard**: Analytics and session statistics

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database (use npx commands)
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to local database (dev)
```

## 🚀 Deployment

The application is ready for deployment on Vercel:

1. Connect your repository to Vercel (public GitHub repo recommended)
2. Ensure Vercel uses npm (remove `pnpm-lock.yaml` if present); Install Command: `npm ci` (or `npm install`)
3. Environment variables to set in Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (e.g., https://your-app.vercel.app)
   - `OPENAI_API_KEY` (for AI responses)
   - `OPENAI_MODEL` (optional; defaults to `gpt-4o-mini`)
4. Prisma: `postinstall` runs `prisma generate` automatically. For production migrations, run `npx prisma migrate deploy`.
5. Deploy automatically on push to main branch

For database, consider using:
- **Neon**: Serverless PostgreSQL (recommended)
- **Supabase**: Full-stack platform with PostgreSQL
- **PlanetScale**: MySQL-compatible serverless database

## 🔮 Future Enhancements

* Add Together/OpenRouter provider options via env flags
* Add message pagination for long histories
* Real-time typing indicators and delivery states
Built with ❤️ using Next.js, TypeScript, and modern web technologies.
