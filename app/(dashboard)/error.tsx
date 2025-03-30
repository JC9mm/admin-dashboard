'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="p-4 md:p-6">
      <div className="mb-8 space-y-4">
        <h1 className="font-semibold text-lg md:text-2xl">
          Please complete setup
        </h1>
        <p>
          Inside the Vercel Postgres dashboard, create a table based on the
          schema defined in this repository.
        </p>
        <pre className="my-4 px-3 py-4 bg-black text-white rounded-lg max-w-2xl overflow-scroll flex text-wrap">
          <code>
            {`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  username VARCHAR(255)
);`}
          </code>
        </pre>
        <p>Insert a row for testing:</p>
        <pre className="my-4 px-3 py-4 bg-black text-white rounded-lg max-w-2xl overflow-scroll flex text-wrap">
          <code>
            {`INSERT INTO users (id, email, name, username) VALUES (1, 'me@site.com', 'Me', 'username');`}
          </code>
        </pre>
        {process.env.NODE_ENV !== 'production' && (
          <div className="mt-8">
            <h2 className="font-semibold text-lg md:text-2xl">Error Details</h2>
            <pre className="my-4 px-3 py-4 bg-red-100 text-red-800 rounded-lg max-w-2xl overflow-scroll flex text-wrap">
              <code>{error.message}</code>
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
