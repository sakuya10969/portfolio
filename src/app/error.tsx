'use client';

import { Button } from '@/shared/ui/button';
import { useEffect } from 'react';

type Props = { error: Error & { digest?: string }; reset: () => void };

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <h2 className="mb-4 text-xl font-semibold">エラーが発生しました</h2>
      <p className="text-muted-foreground mb-6">ページの読み込みに失敗しました。</p>
      <Button onClick={reset}>再試行</Button>
    </div>
  );
}
