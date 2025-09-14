# Student Feedback Application

A full-stack web application where students can sign up, log in, submit feedback on courses, and manage their profiles. The app includes admin functionalities for managing users, courses, and viewing analytics.

# How to Run the Student Feedback Web App

1. Install Node.js 18 or higher (check with: node -v). 
   If you don’t have it, download it from https://nodejs.org and install.

2. Open a terminal in the project folder.

3. Install dependencies:
   npm install

4. Start the development server:
   npm run dev

5. Open your browser and go to:
   http://localhost:3000

6. Log in using default credentials or create a new account:
   Admin:    admin@example.com / Admin123!
   Student:  john@example.com / Student123!

7. (Optional) To run in production mode:
   npm run build
   npm run start
   Then open http://localhost:3000 again.


### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. **Clone or download** the project files

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**:
   bash
   npm run dev
   
  

5. **Open your browser** and navigate to `http://localhost:3000`

## Features

### Authentication & Authorization
- **Signup/Login** with email and password
- **Password validation** (minimum 8 characters, 1 special character, 1 number)
- **JWT-based authentication**
- **Role-based access control** (Student and Admin roles)

### Student Features
- **Submit feedback** on courses with ratings (1-5) and messages
- **View and manage** their own feedback (edit/delete)
- **Profile management** with personal information updates
- **Password change** functionality

### Admin Features
- **Admin dashboard** with analytics and user management
- **View all feedback** with filtering options
- **User management** (block/unblock, delete users)
- **Course management** (add/edit/delete courses)
- **Export feedback** data to CSV


### Default Login Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `Admin123!`

**Student Account:**
- Email: `john@example.com`
- Password: `Student123!`

**Or create a new account** using the signup form.

## Usage Instructions

### For Students

1. **Sign up** or **log in** with your credentials
2. **Submit feedback**:
   - Navigate to the feedback section
   - Select a course from the dropdown
   - Provide a rating (1-5 stars) and message
   - Click submit
3. **Manage feedback**:
   - View your submitted feedback
   - Edit or delete existing feedback
4. **Update profile**:
   - Go to profile page
   - Update personal information
   - Change password if needed

### For Admins

1. **Log in** with admin credentials
2. **Dashboard overview**:
   - View total students and feedback count
   - See feedback trends and analytics
3. **Manage users**:
   - View all registered students
   - Block/unblock user accounts
   - Delete users if necessary
4. **Manage courses**:
   - Add new courses
   - Edit existing course information
   - Delete courses
5. **View feedback**:
   - See all student feedback
   - Filter by course, rating, or student
   - Export data to CSV




