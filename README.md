NoteHub 📝

A simple notes application built with React, featuring search, pagination, and form validation.
Developed in two days as a practice project.

🚀 Key Features:

🔍 Search with Debounce — optimized input handling using use-debounce.

⚡ Data Fetching & Caching — powered by TanStack Query for server state management.

🪟 Portals — clean and accessible modal implementation with React Portals.

✅ Form Handling & Validation — using Formik with Yup for schema validation.

📄 Pagination — easy navigation through notes list with react-paginate.

🗑️ CRUD Operations — create, read, update, and delete notes via backend API.

🛠️ Tech Stack:

React + TypeScript

TanStack Query

Formik + Yup

Axios for API requests

React Portals

React Paginate

CSS Modules

📂 Project Structure
src/
 ├─ components/    # UI components (NoteList, Pagination, Modal, etc.)
 ├─ services/      # API requests (Axios)
 ├─ hooks/         # Custom hooks
 ├─ styles/        # CSS Modules
 └─ App.tsx        # Root component

⚙️ Installation & Setup

Clone the repo:

git clone https://github.com/your-username/notehub.git
cd notehub


Install dependencies:

npm install


Create a .env file and configure your API base URL:

VITE_API_URL=https://notehub-public.goit.study/api
VITE_API_TOKEN=your_token_here

⚠️ The token is provided when registering in Swagger. Without it, requests will fail.
Get the token here: https://notehub-public.goit.study/api/docs

Run the project:

npm run dev
