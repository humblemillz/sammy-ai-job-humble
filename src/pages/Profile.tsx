
import React from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ProfileHeader />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        </div>
        <ProfileForm />
      </main>
    </div>
  );
};

export default Profile;
