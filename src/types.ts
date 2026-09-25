export type Category = 'React' | 'Node.js' | 'AI' | 'Docker' | 'GitHub' | 'Cloud';

export interface TechNote {
  id: string;
  title: string;
  category: Category;
  snippet?: string;
  content: string;
  createdAt: string;
  tags: string[];
}
