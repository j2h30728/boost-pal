"use client";

import ErrorComponent from "@/components/common/error-component";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorComponent message={error.message} onReset={reset} />;
}
