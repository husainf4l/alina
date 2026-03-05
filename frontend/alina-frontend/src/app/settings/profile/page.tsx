'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function EditProfilePage() {
  const [activeTab, setActiveTab] = useState<'basic' | 'professional' | 'account'>('basic');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    // Basic Info
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    bio: 'Professional web developer with 5+ years of experience',
    location: 'New York, USA',
    website: 'https://johndoe.com',
    
    // Professional Info
    title: 'Full Stack Developer',
    hourlyRate: 50,
    skills: ['React', 'Node.js', 'TypeScript'],
    languages: [{ name: 'English', level: 'Native' }, { name: 'Spanish', level: 'Intermediate' }],
    education: [{ degree: 'BS Computer Science', school: 'MIT', year: '2018' }],
    certifications: ['AWS Certified', 'Google Cloud Professional'],
    
    // Account Settings
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    emailNotifications: true,
    pushNotifications: true,
  });

  const handleSave = async () => {
    try {
      // Import profile service
      const { profileService } = await import('@/lib/api/services/profile.service');
      
      // Update profile
      await profileService.updateProfile({
        bio: formData.bio,
        skills: formData.skills, // Already an array
        // Other profile fields...
      });
      
      // Upload avatar if changed
      if (profileImage) {
        await profileService.uploadAvatar(profileImage);
      }
      
      // Upload cover image if changed
      if (coverImage) {
        await profileService.uploadCoverImage(coverImage);
      }
      
      // Show success message (would use toast)
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Error handling would show toast notification
    }
  };

  const handleImageUpload = (type: 'profile' | 'cover', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'profile') {
        setProfileImage(e.target.files[0]);
      } else {
        setCoverImage(e.target.files[0]);
      }
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-6">
              <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 hover:underline inline-block mb-4">
                ← Back to Dashboard
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border-2 border-gray-100 dark:border-gray-700">
              {/* Cover Image */}
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
                {coverImage && (
                  <img src={URL.createObjectURL(coverImage)} alt="Cover" className="w-full h-full object-cover" />
                )}
                <label className="absolute bottom-4 right-4 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg">
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload('cover', e)} className="hidden" />
                  Change Cover
                </label>
              </div>

              {/* Profile Image */}
              <div className="relative px-8 -mt-16 mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center text-white font-bold text-5xl overflow-hidden">
                    {profileImage ? (
                      <img src={URL.createObjectURL(profileImage)} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      formData.firstName.charAt(0)
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload('profile', e)} className="hidden" />
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-8 mb-6 flex gap-2 border-b border-gray-200 dark:border-gray-700">
                {(['basic', 'professional', 'account'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-semibold capitalize transition-all ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab} Info
                  </button>
                ))}
              </div>

              <div className="px-8 pb-8">
                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Username *
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Professional Info Tab */}
                {activeTab === 'professional' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        placeholder="e.g. Full Stack Developer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Hourly Rate ($)
                      </label>
                      <input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Skills
                      </label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-semibold flex items-center gap-2"
                          >
                            {skill}
                            <button onClick={() => removeSkill(skill)} className="hover:text-red-600">×</button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="new-skill"
                          className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                          placeholder="Add a skill..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addSkill((e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            const input = document.getElementById('new-skill') as HTMLInputElement;
                            addSkill(input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Languages
                      </label>
                      {formData.languages.map((lang, index) => (
                        <div key={index} className="flex gap-3 mb-2">
                          <input
                            type="text"
                            value={lang.name}
                            onChange={(e) => {
                              const languages = [...formData.languages];
                              languages[index].name = e.target.value;
                              setFormData({ ...formData, languages });
                            }}
                            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                            placeholder="Language"
                          />
                          <select
                            value={lang.level}
                            onChange={(e) => {
                              const languages = [...formData.languages];
                              languages[index].level = e.target.value;
                              setFormData({ ...formData, languages });
                            }}
                            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                          >
                            <option>Basic</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                            <option>Native</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Account Settings Tab */}
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                          <span className="text-gray-900 dark:text-white font-medium">Email Notifications</span>
                          <button
                            onClick={() => setFormData({ ...formData, emailNotifications: !formData.emailNotifications })}
                            className={`relative w-14 h-8 rounded-full transition-colors ${
                              formData.emailNotifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                              formData.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                          <span className="text-gray-900 dark:text-white font-medium">Push Notifications</span>
                          <button
                            onClick={() => setFormData({ ...formData, pushNotifications: !formData.pushNotifications })}
                            className={`relative w-14 h-8 rounded-full transition-colors ${
                              formData.pushNotifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                              formData.pushNotifications ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
                      <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link href="/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full">Cancel</Button>
                  </Link>
                  <Button onClick={handleSave} className="flex-1">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
