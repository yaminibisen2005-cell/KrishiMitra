/**
 * Mock profile service for retrieving and updating user profile data.
 */

export interface ProfileRecord {
  id: string;
  name: string;
  mobile: string;
  village?: string;
  district?: string;
  state?: string;
  preferredLanguage?: 'en' | 'hi' | 'mr';
  totalLandArea?: string;
  primaryCrops?: string[];
  soilType?: string;
}

const USERS_KEY = 'krishimitra_registered_users';

function readUsers(): ProfileRecord[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(list: ProfileRecord[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

export const profileService = {
  fetchByMobile(mobile: string) {
    return new Promise<ProfileRecord | null>((resolve) => {
      setTimeout(() => {
        const users = readUsers();
        const found = users.find((u) => u.mobile === mobile) || null;
        resolve(found);
      }, 700);
    });
  },

  fetchById(id: string) {
    return new Promise<ProfileRecord | null>((resolve) => {
      setTimeout(() => {
        const users = readUsers();
        const found = users.find((u) => u.id === id) || null;
        resolve(found);
      }, 700);
    });
  },

  updateProfile(id: string, updates: Partial<ProfileRecord>) {
    return new Promise<ProfileRecord>((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = readUsers();
          const idx = users.findIndex((u) => u.id === id);
          if (idx === -1) {
            reject(new Error('Profile not found'));
            return;
          }
          const updated = { ...users[idx], ...updates };
          users[idx] = updated;
          writeUsers(users);
          resolve(updated);
        } catch (err: any) {
          reject(new Error(err?.message || 'Failed to update profile'));
        }
      }, 900);
    });
  }
};
