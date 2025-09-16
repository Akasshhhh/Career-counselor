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
- **AI Integration**: Placeholder service (ready for OpenAI/Together/OpenRouter)

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Neon for cloud)
- npm or yarn package manager
- SMTP server (for password reset emails, optional)

## 🚀 Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd career-chat-app
   \`\`\`

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
   
   # Email (optional, for password reset)
   EMAIL_SERVER="smtp://username:password@smtp.example.com:587"
   EMAIL_FROM="noreply@yourdomain.com"
   
   # OpenAI (for AI features)
   OPENAI_API_KEY="your-openai-api-key"
   OPENAI_MODEL="gpt-4"
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
   npx prisma migrate dev --name init
   
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

<!-- Demo authentication section removed: the app now requires real sign-up/sign-in via NextAuth credentials. -->

## 📊 Database Schema

The application uses the following main entities:

- **User**: User accounts and profiles
- **ChatSession**: Individual counseling sessions
- **Message**: Chat messages with role-based typing (USER/ASSISTANT/SYSTEM)
- **Account/Session**: NextAuth.js compatibility (for future use)

## 🤖 AI Integration

Currently uses enhanced rule-based responses for career counseling. The system is designed to easily integrate with OpenAI's API:

- Placeholder AI service in `lib/ai/career-counselor.ts`
- Ready for OpenAI GPT-4 integration
- Contextual conversation history
- Specialized career counseling prompts

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

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
\`\`\`

## 🚀 Deployment

The application is ready for deployment on Vercel:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

For database, consider using:
- **Neon**: Serverless PostgreSQL (recommended)
- **Supabase**: Full-stack platform with PostgreSQL
- **PlanetScale**: MySQL-compatible serverless database

## 🔮 Future Enhancements

- [ ] OpenAI GPT-4 integration for advanced AI responses
- [ ] NextAuth.js with multiple providers (Google, GitHub, etc.)
- [ ] Real-time messaging with WebSockets
- [ ] File upload for resume analysis
- [ ] Calendar integration for scheduling sessions
- [ ] Email notifications and reminders
- [ ] Advanced analytics and reporting
- [ ] Mobile app with React Native

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
