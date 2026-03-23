"use client";

import { Button } from "@/shared/ui/button";
import { useEffect } from "react";

type Props = { error: Error & { digest?: string }; reset: () => void };

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 className="text-xl font-semibold mb-4">エラーが発生しました</h2>
      <p className="text-muted-foreground mb-6">ページの読み込みに失敗しました。</p>
      <Button onClick={reset}>再試行</Button>
    </div>
  );
}
