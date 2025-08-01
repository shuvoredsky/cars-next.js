// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl mt-4 text-gray-600">Page Not Found</h2>
      <p className="mt-2 text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
