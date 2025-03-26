'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '../../../lib/types';

export default function NewPost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, imageUrl } as Partial<Post>),
    });
    if (res.ok) router.push('/posts');
  };

  return (
    <div className="container">
      <h1>Шинэ Пост</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Гарчиг"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Агуулга"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Зургийн URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Оруулах</button>
      </form>
    </div>
  );
}