export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  category?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
}
