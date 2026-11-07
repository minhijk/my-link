export interface UserSocials {
  github?: string;
  instagram?: string;
  twitter?: string;
  email?: string;
}

export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl?: string;
  socials: UserSocials;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  order: number;
  description?: string;
  badge?: string | null;
  icon?: string;
  category?: string;
}

export interface LinkStoreState {
  profile: UserProfile;
  links: LinkItem[];
  resetToDefault: () => void;
  setProfile: (profile: Partial<UserProfile>) => void;
  setLinks: (links: LinkItem[]) => void;
}
