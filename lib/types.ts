export interface Post {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
    comments: Comment[];
  }
  
  export interface Comment {
    id: string;
    text: string;
    createdAt: string;
    postId: string;
  }