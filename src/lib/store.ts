import { create } from "zustand";
import { persist } from "zustand/middleware";
import defaultData from "@/data/links.json";
import { LinkStoreState, UserProfile, LinkItem } from "@/types";

const initialProfile: UserProfile = defaultData.profile;
const initialLinks: LinkItem[] = defaultData.links as LinkItem[];

export const useLinkStore = create<LinkStoreState>()(
  persist(
    (set) => ({
      profile: initialProfile,
      links: initialLinks,
      resetToDefault: () =>
        set({
          profile: initialProfile,
          links: initialLinks,
        }),
      setProfile: (profileUpdate) =>
        set((state) => ({
          profile: { ...state.profile, ...profileUpdate },
        })),
      setLinks: (links) => set({ links }),
    }),
    {
      name: "mylink-storage",
    }
  )
);
