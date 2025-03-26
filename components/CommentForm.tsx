'use client';

import { useState } from 'react';
import { Comment } from '../lib/types';

export default function CommentForm({ postId }: { postId: string }) {
  const [text, setText] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, postId } as Partial<Comment>),
    });
    if (res.ok) {
      setText('');
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        placeholder="Сэтгэгдэл бичих"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Илгээх</button>
    </form>
  );
}