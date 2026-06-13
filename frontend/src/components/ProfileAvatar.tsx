import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../auth/authContext';

export default function ProfileAvatar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <button
      onClick={() => navigate('/profile')}
      title="Profile"
      className="flex items-center gap-2 p-2 rounded-xl hover:bg-emerald-50 transition outline-none focus:ring-2 focus:ring-emerald-500/20"
    >
      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm border border-emerald-200 shadow-sm">
        {user?.name ? user.name.split(' ').map(n => n[0]).slice(0,2).join('') : <User className="w-4 h-4" />}
      </div>
    </button>
  );
}
