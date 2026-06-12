/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserSession {
  id: string;
  name: string;
  mobile?: string;
  email?: string;
  role: 'user' | 'admin';
  loginTime: string;
}

export interface UserRecord {
  id: string;
  name: string;
  mobile: string;
  village: string;
  district: string;
  state: string;
  password?: string;
  role: 'user';
}

const KEYS = {
  USERS: 'krishimitra_registered_users',
  SESSION: 'krishimitra_active_session',
};

// Initial Farmer mock
const DEFAULT_FARMER: UserRecord = {
  id: 'f-001',
  name: 'Ramesh Kumawat',
  mobile: '9876543210',
  village: 'Pimpalgaon',
  district: 'Nashik',
  state: 'Maharashtra',
  password: 'farmer123',
  role: 'user',
};

// Initialize registered users in localStorage if needed
function getRegisteredUsers(): UserRecord[] {
  try {
    const raw = localStorage.getItem(KEYS.USERS);
    if (!raw) {
      localStorage.setItem(KEYS.USERS, JSON.stringify([DEFAULT_FARMER]));
      return [DEFAULT_FARMER];
    }
    return JSON.parse(raw);
  } catch {
    return [DEFAULT_FARMER];
  }
}

export const authService = {
  /**
   * Mock user registration
   */
  registerUser(user: Omit<UserRecord, 'id' | 'role'>): Promise<UserRecord> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = getRegisteredUsers();
          
          // Check if number already registered
          if (users.some((u) => u.mobile === user.mobile)) {
            reject(new Error('Mobile number is already registered.'));
            return;
          }

          const newUser: UserRecord = {
            ...user,
            id: `user-${Date.now()}`,
            role: 'user',
          };

          users.push(newUser);
          localStorage.setItem(KEYS.USERS, JSON.stringify(users));
          resolve(newUser);
        } catch (err: any) {
          reject(new Error(err.message || 'Registration failed.'));
        }
      }, 800); // simulation delay
    });
  },

  /**
   * Mock farmer user login
   */
  loginUser(mobile: string, password?: string): Promise<UserSession> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = getRegisteredUsers();
          const user = users.find((u) => u.mobile === mobile);

          if (!user) {
            reject(new Error('User not found. Please register first.'));
            return;
          }

          if (user.password !== password) {
            reject(new Error('Invalid password. Try again or reset.'));
            return;
          }

          const session: UserSession = {
            id: user.id,
            name: user.name,
            mobile: user.mobile,
            role: 'user',
            loginTime: new Date().toISOString(),
          };

          localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
          // track in sessions for admin statistics
          authService._trackActiveSession(session);
          resolve(session);
        } catch (err: any) {
          reject(new Error(err.message || 'Login failed.'));
        }
      }, 800);
    });
  },

  /**
   * Mock admin login
   */
  loginAdmin(email?: string, password?: string): Promise<UserSession> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email !== 'admin@krishimitra.com' || password !== 'admin123') {
          reject(new Error('Invalid Admin email or password alignment.'));
          return;
        }

        const session: UserSession = {
          id: 'admin-001',
          name: 'KrishiMitra Admin',
          email: email,
          role: 'admin',
          loginTime: new Date().toISOString(),
        };

        localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
        authService._trackActiveSession(session);
        resolve(session);
      }, 800);
    });
  },

  /**
   * Logout user
   */
  logout(): void {
    const currentSession = authService.getCurrentUser();
    if (currentSession) {
      authService._removeActiveSession(currentSession.id);
    }
    localStorage.removeItem(KEYS.SESSION);
  },

  /**
   * Get active user session
   */
  getCurrentUser(): UserSession | null {
    try {
      const raw = localStorage.getItem(KEYS.SESSION);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /**
   * Check if authenticated
   */
  isAuthenticated(): boolean {
    return authService.getCurrentUser() !== null;
  },

  /**
   * Get current user role
   */
  getRole(): 'user' | 'admin' | null {
    const user = authService.getCurrentUser();
    return user ? user.role : null;
  },

  /**
   * For Admin dashboard statistics
   */
  getTotalFarmersCount(): number {
    return getRegisteredUsers().length;
  },

  getActiveSessionsCount(): number {
    try {
      const active = localStorage.getItem('krishimitra_tracked_sessions');
      if (!active) return 1; // At least currently logged in admin or user
      const list = JSON.parse(active);
      return Math.max(1, list.length);
    } catch {
      return 1;
    }
  },

  _trackActiveSession(session: UserSession) {
    try {
      const active = localStorage.getItem('krishimitra_tracked_sessions');
      let list = active ? JSON.parse(active) : [];
      list = list.filter((s: any) => s.id !== session.id);
      list.push({ id: session.id, role: session.role, loginTime: session.loginTime });
      localStorage.setItem('krishimitra_tracked_sessions', JSON.stringify(list));
    } catch (_) {}
  },

  _removeActiveSession(id: string) {
    try {
      const active = localStorage.getItem('krishimitra_tracked_sessions');
      if (active) {
        let list = JSON.parse(active);
        list = list.filter((s: any) => s.id !== id);
        localStorage.setItem('krishimitra_tracked_sessions', JSON.stringify(list));
      }
    } catch (_) {}
  }
};
