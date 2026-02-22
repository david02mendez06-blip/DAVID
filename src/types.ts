export type Screen = 'home' | 'identity' | 'catalog' | 'blog' | 'contact';

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  features: string[];
  icon: string;
}
