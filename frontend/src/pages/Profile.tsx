import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/authContext';
import { profileService, ProfileRecord } from '../services/profileService';
import { useNavigate } from 'react-router-dom';

const LANGS = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'mr', label: 'मराठी' },
];

const CROPS = ['Soybean', 'Cotton', 'Wheat', 'Maize', 'Pulses'];

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      if (!user) return;
      const p = await profileService.fetchById(user.id);
      if (mounted) setProfile(p);
      setLoading(false);
    };
    load();
    return () => { mounted = false; };
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-bold">Not signed in</p>
          <button onClick={() => navigate('/login')} className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg">Go to Login</button>
        </div>
      </div>
    );
  }

  const handleChange = (key: keyof ProfileRecord, value: any) => {
    setProfile((p) => p ? { ...p, [key]: value } : p);
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const errs: Record<string,string> = {};
    if (!profile?.name || profile.name.trim().length === 0) errs.name = 'Name is required';
    if (!profile?.village || profile.village.trim().length === 0) errs.village = 'Village is required';
    if (!profile?.district || profile.district.trim().length === 0) errs.district = 'District is required';
    if (profile?.mobile && !/^[0-9]{10}$/.test(profile.mobile)) errs.mobile = 'Enter a valid 10-digit mobile number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!profile) return;
    if (!validate()) return;
    setSaving(true);
    try {
      // Use auth updateProfile to also refresh session name
      if (updateProfile) {
        await updateProfile(profile.id, profile as any);
      } else {
        await profileService.updateProfile(profile.id, profile as any);
      }
      setEditing(false);
      // feedback: simple navigate refresh area
    } catch (err: any) {
      setErrors({ general: err?.message || 'Failed to save' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold">Profile</h2>
        <div className="flex items-center gap-3">
          {!editing ? (
            <button onClick={() => setEditing(true)} className="px-4 py-2 bg-emerald-600 text-white rounded-xl">Edit Profile</button>
          ) : (
            <>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-emerald-600 text-white rounded-xl">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button onClick={() => { setEditing(false); setErrors({}); }} className="px-4 py-2 border rounded-xl">Cancel</button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 rounded-2xl p-6 border border-emerald-100 shadow-sm">
          <h3 className="font-bold mb-3">Basic Information</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold">Full Name</label>
              {editing ? (
                <input value={profile?.name || ''} onChange={(e) => handleChange('name', e.target.value)} className="w-full mt-1 p-2 rounded-lg border" />
              ) : (
                <p className="mt-1">{profile?.name || user.name}</p>
              )}
              {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-bold">Contact Number</label>
              {editing ? (
                <input value={profile?.mobile || ''} onChange={(e) => handleChange('mobile', e.target.value)} className="w-full mt-1 p-2 rounded-lg border" />
              ) : (
                <p className="mt-1">{profile?.mobile || user.mobile}</p>
              )}
              {errors.mobile && <p className="text-xs text-red-600">{errors.mobile}</p>}
            </div>

            <div>
              <label className="text-xs font-bold">Preferred Language</label>
              {editing ? (
                <select value={profile?.preferredLanguage || 'en'} onChange={(e) => handleChange('preferredLanguage', e.target.value)} className="w-full mt-1 p-2 rounded-lg border">
                  {LANGS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              ) : (
                <p className="mt-1">{profile?.preferredLanguage || 'English'}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold">Location (Village)</label>
              {editing ? (
                <input value={profile?.village || ''} onChange={(e) => handleChange('village', e.target.value)} className="w-full mt-1 p-2 rounded-lg border" />
              ) : (
                <p className="mt-1">{profile?.village}</p>
              )}
              {errors.village && <p className="text-xs text-red-600">{errors.village}</p>}
            </div>

            <div>
              <label className="text-xs font-bold">District / State</label>
              {editing ? (
                <div className="flex gap-2">
                  <input value={profile?.district || ''} onChange={(e) => handleChange('district', e.target.value)} placeholder="District" className="w-1/2 mt-1 p-2 rounded-lg border" />
                  <input value={profile?.state || ''} onChange={(e) => handleChange('state', e.target.value)} placeholder="State" className="w-1/2 mt-1 p-2 rounded-lg border" />
                </div>
              ) : (
                <p className="mt-1">{profile?.district}, {profile?.state}</p>
              )}
              {errors.district && <p className="text-xs text-red-600">{errors.district}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white/80 rounded-2xl p-6 border border-emerald-100 shadow-sm">
          <h3 className="font-bold mb-3">Farm Details</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold">Total Land Area</label>
              {editing ? (
                <input value={profile?.totalLandArea || ''} onChange={(e) => handleChange('totalLandArea', e.target.value)} placeholder="e.g. 2.5 acres" className="w-full mt-1 p-2 rounded-lg border" />
              ) : (
                <p className="mt-1">{profile?.totalLandArea || '—'}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold">Primary Crops</label>
              {editing ? (
                <select multiple value={profile?.primaryCrops || []} onChange={(e) => {
                  const opts = Array.from(e.target.selectedOptions).map(o => o.value);
                  handleChange('primaryCrops', opts);
                }} className="w-full mt-1 p-2 rounded-lg border">
                  {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : (
                <p className="mt-1">{(profile?.primaryCrops || []).join(', ') || '—'}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold">Soil Type</label>
              {editing ? (
                <input value={profile?.soilType || ''} onChange={(e) => handleChange('soilType', e.target.value)} placeholder="e.g. Loamy" className="w-full mt-1 p-2 rounded-lg border" />
              ) : (
                <p className="mt-1">{profile?.soilType || '—'}</p>
              )}
            </div>

            {errors.general && <p className="text-sm text-red-600">{errors.general}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
