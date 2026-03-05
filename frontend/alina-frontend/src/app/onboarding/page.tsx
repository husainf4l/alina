'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'buyer' | 'seller' | 'both' | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const categories = [
    { name: 'Graphics & Design', icon: '🎨' },
    { name: 'Digital Marketing', icon: '📈' },
    { name: 'Writing & Translation', icon: '✍️' },
    { name: 'Video & Animation', icon: '🎬' },
    { name: 'Programming & Tech', icon: '💻' },
    { name: 'Business', icon: '💼' },
  ];

  const skillsList = [
    'React', 'Node.js', 'Python', 'UI/UX Design', 'Graphic Design',
    'SEO', 'Content Writing', 'Video Editing', 'Social Media Marketing',
    'WordPress', 'Mobile Development', 'Data Analysis'
  ];

  const handleInterestToggle = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSkillToggle = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleComplete = async () => {
    try {
      // Import profile service
      const { profileService } = await import('@/lib/api/services/profile.service');
      
      // Update profile with onboarding data
      await profileService.updateProfile({
        bio: '', // Would have from form if we had that field
        skills: skills,
        // Map interests and userType to backend fields
        // In a real implementation, backend would have onboarding endpoint
      });
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      // Error handling would show toast notification
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
        <div className="max-w-3xl w-full">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    step >= s ? 'bg-white text-blue-600' : 'bg-white/30 text-white'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-white' : 'bg-white/30'}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-white text-sm font-semibold">
              <span>User Type</span>
              <span>Interests</span>
              <span>Skills</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl">
            {/* Step 1: User Type */}
            {step === 1 && (
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Alina! 👋</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Let's get you started. How do you plan to use Alina?</p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <button
                    onClick={() => setUserType('buyer')}
                    className={`p-8 rounded-3xl border-2 transition-all ${
                      userType === 'buyer'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <div className="text-5xl mb-4">🛍️</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Buyer</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">I want to hire freelancers</p>
                  </button>

                  <button
                    onClick={() => setUserType('seller')}
                    className={`p-8 rounded-3xl border-2 transition-all ${
                      userType === 'seller'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <div className="text-5xl mb-4">💼</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Seller</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">I want to offer my services</p>
                  </button>

                  <button
                    onClick={() => setUserType('both')}
                    className={`p-8 rounded-3xl border-2 transition-all ${
                      userType === 'both'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <div className="text-5xl mb-4">🤝</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Both</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">I want to buy and sell</p>
                  </button>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!userType}
                  className="px-12"
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Interests */}
            {step === 2 && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What are you interested in?</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Select the categories that match your interests (select at least 2)</p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handleInterestToggle(category.name)}
                      className={`p-6 rounded-2xl border-2 transition-all text-left ${
                        interests.includes(category.name)
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                      }`}
                    >
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">{category.name}</h3>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="px-8"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={interests.length < 2}
                    className="flex-1"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Skills */}
            {step === 3 && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What are your skills?</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {userType === 'seller' || userType === 'both' 
                    ? 'Select the skills you can offer (select at least 3)'
                    : "Select the skills you're looking for (optional)"}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8 justify-center">
                  {skillsList.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`px-6 py-3 rounded-2xl border-2 font-semibold transition-all ${
                        skills.includes(skill)
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="px-8"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleComplete}
                    disabled={(userType === 'seller' || userType === 'both') && skills.length < 3}
                    className="flex-1"
                  >
                    Get Started 🚀
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-white hover:underline font-semibold"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
