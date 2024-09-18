"use client";

import ErrorComponent from "@/components/common/error-component";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="relative bg-white max-w-screen-sm mx-auto">
        <ErrorComponent message={error.message} onReset={reset} />
      </body>
    </html>
  );
}
