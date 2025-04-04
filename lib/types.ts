export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string; // ISO тэмдэгт мөр хэлбэртэй тул нийцтэй
  tags?: string[];
  comments: Comment[];
  authorId: string; // Нэмсэн
  author?: {
    // Нэмсэн
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string; // ISO тэмдэгт мөр хэлбэртэй тул нийцтэй
  postId: string;
  authorId: string; // Нэмсэн
  author?: {
    // Нэмсэн
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}
