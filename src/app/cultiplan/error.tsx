"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur dans CultiPlan!</h2>
      <pre className="text-left bg-white p-4 rounded shadow overflow-auto max-w-full text-red-800 text-sm mb-4">
        {error.message}
      </pre>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Réessayer
      </button>
    </div>
  );
}
