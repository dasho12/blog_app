import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>Тавтай морил!</h1>
      <Link href="/posts">Бүх постыг харах</Link>
      <br />
      <Link href="/posts/new">Шинэ пост нэмэх</Link>
    </div>
  );
}