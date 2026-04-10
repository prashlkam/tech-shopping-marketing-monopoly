
import React, { useState } from 'react';

interface AuthFormProps {
  onLogin: (username: string, password: string) => { success: boolean; error?: string };
  onRegister: (username: string, password: string, displayName: string) => { success: boolean; error?: string };
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onRegister }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (isLoginMode) {
      const result = onLogin(username, password);
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setIsSubmitting(false);
        return;
      }
      const result = onRegister(username, password, displayName);
      if (!result.success) {
        setError(result.error || 'Registration failed');
      }
    }
    setIsSubmitting(false);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError(null);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl border border-cyan-500/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-400 tracking-widest mb-2">Tech Monopoly</h1>
          <p className="text-gray-400 text-sm">
            {isLoginMode ? 'Sign in to play' : 'Create an account'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-cyan-400 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-400"
              placeholder="Enter username"
              required
              minLength={3}
              autoComplete="username"
            />
          </div>

          {!isLoginMode && (
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-cyan-400 mb-1">
                Display Name (optional)
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                placeholder="How should we call you?"
                autoComplete="name"
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cyan-400 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-400"
              placeholder="Enter password"
              required
              minLength={6}
              autoComplete={isLoginMode ? 'current-password' : 'new-password'}
            />
          </div>

          {!isLoginMode && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyan-400 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                placeholder="Confirm your password"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 mt-6"
          >
            {isSubmitting ? 'Please wait...' : isLoginMode ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={toggleMode}
              className="ml-2 text-cyan-400 hover:text-cyan-300 font-medium underline"
            >
              {isLoginMode ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            Credentials are stored locally in your browser.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
