# Apex Learning 

Apex Learning  is a modern, high-performance web application built with **Next.js 16** and **React 19**. It serves as the frontend for the Apex Learning platform, providing a seamless and interactive experience for tutors and students.

---

## 🔗 Project Links
- **Frontend Live URL**: [https://apexlearning-edu.vercel.app/](https://apexlearning-edu.vercel.app/)
- **Backend Live URL**: [https://apexlearning-server.vercel.app/](https://apexlearning-server.vercel.app/)
- **Frontend GitHub**: [https://github.com/Rafiul29/apexlearning-client.git](https://github.com/Rafiul29/apexlearning-client.git)
- **Backend GitHub**: [https://github.com/Rafiul29/apexlearning-server.git](https://github.com/Rafiul29/apexlearning-server.git)

---

## 🚀 Key Features

- **Tutor Management**: Discover and book top-rated tutors.
- **Availability Scheduling**: Dynamic availability management for tutors.
- **Category Browsing**: Explore courses and tutors by category.
- **Responsive Dashboard**: Specialized dashboards for users and admins.
- **Real-time Notifications**: Instant feedback using Sonner.
- **Modern UI/UX**: Built with Radix UI and Tailwind CSS 4 for a premium feel.
- **Role-Based Access**: Specialized interfaces for **Admin**, **Tutor**, and **Student**.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [TanStack Form](https://tanstack.com/form) & [Zod](https://zod.dev/)
- **Tables**: [TanStack Table](https://tanstack.com/table)
- **Auth**: [Better Auth](https://www.better-auth.com/)
- **State Management**: [React Hook Form](https://react-hook-form.com/) & [SWR/Fetch]

## 🏗️ Next.js Implementation

This project leverages the latest Next.js features for optimal performance:

- **Server Components**: Used by default for data fetching to reduce client-side JavaScript.
- **Client Components**: Used for interactive elements (forms, buttons, charts).
- **Server Actions**: Located in the `@/actions` directory, handling mutations, data synchronization, and validation without manual API calls.

## ⚡ Next.js Caching Implementation

We implement a sophisticated caching strategy using Next.js **Data Cache** and **Tag-based Revalidation**:

- **Predictable Fetching**: Data fetching is handled in `@/services` using the native `fetch` API.
- **Cache Tags**: Every fetch request is tagged (e.g., `tags: ["Categories"]`).
- **On-demand Revalidation**: When data is modified via Server Actions, we use `revalidateTag("TagName")` to purge the specific cache and ensure users see the latest data instantly.

```typescript
// Example: Revalidating after an update
revalidateTag("Categories");
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+ 
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file based on `.env.example`.

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛡️ Best Practices

- **Atomic Design**: Components are kept small and reusable.
- **Type Safety**: Full TypeScript integration across the entire codebase.
- **Performance**: Optimized images and fonts using Next.js built-in components.

---
Built with ❤️ by Apex Learning Team
- **Review**: Student feedback for tutor sessions.

---

## 📝 License
This project is [ISC](./LICENSE) licensed.
