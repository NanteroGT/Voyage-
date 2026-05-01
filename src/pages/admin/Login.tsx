import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if user is in admins collection
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      
      if (adminDoc.exists()) {
        navigate('/admin/dashboard');
      } else {
        await auth.signOut();
        setError('Accès refusé. Vous n\'êtes pas autorisé à accéder à cet espace.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Erreur lors de la connexion. Veuillez vérifier vos identifiants ou activer l\'authentification e-mail/mot de passe dans la console Firebase.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative">
      <Link to="/" className="absolute top-8 left-8 text-navy hover:text-gold transition-colors flex items-center font-medium">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Retour au site
      </Link>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-navy">
          Espace<span className="text-gold ml-2">Admin</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Connectez-vous pour gérer Nzoko Transport
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
              <div className="mt-1 relative">
                <input
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <div className="mt-1 relative">
                <input
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy hover:bg-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-colors disabled:opacity-50"
            >
              {isLoggingIn ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
