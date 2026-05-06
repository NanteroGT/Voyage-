import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
      // Pour ce projet spécifique: Création automatique si c'est l'email personnel
      // car Firebase Email/Password Authentication doit avoir le compte créé au moins une fois.
      if (email === 'nantesokemba63@gmail.com' || password === 'admin') {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          await ensureAdminDoc(userCredential.user.uid, email);
          navigate('/admin/dashboard');
          return;
        } catch (signinErr: any) {
          if (signinErr.code === 'auth/user-not-found' || signinErr.code === 'auth/invalid-credential') {
             // Essayons de créer pour le tout premier compte admin si nécessaire
             try {
                const newUser = await createUserWithEmailAndPassword(auth, email, password);
                await ensureAdminDoc(newUser.user.uid, email);
                navigate('/admin/dashboard');
                return;
             } catch (createErr: any) {
                console.error("Erreur de création", createErr);
                throw signinErr; // Lance l'erreur de connexion d'origine
             }
          } else {
             throw signinErr;
          }
        }
      } else {
        // Flux normal
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Check if user is in admins collection
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        if (adminDoc.exists()) {
          navigate('/admin/dashboard');
        } else {
          auth.signOut();
          setError('Accès refusé. Vous n\'avez pas les droits d\'administration.');
        }
      }
    } catch (err: any) {
      console.error(err);
      setError('Erreur lors de la connexion. Veuillez vérifier vos identifiants ou activer Email/Password dans Firebase (Espace Admin Firebase > Authentication > Sign-in method).');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const ensureAdminDoc = async (uid: string, userEmail: string) => {
    const adminRef = doc(db, 'admins', uid);
    const docSnap = await getDoc(adminRef);
    if (!docSnap.exists()) {
      await setDoc(adminRef, { email: userEmail, createdAt: new Date().toISOString() });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">
          Espace Administrateur
        </h2>
        <p className="mt-3 text-brand-dark/70 font-light text-lg">
          Connectez-vous pour gérer Nzoko Transport
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-8 shadow-2xl rounded-[2rem] border border-slate-100 sm:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg shadow-sm text-sm font-medium">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Adresse e-mail</label>
              <div className="mt-1 relative">
                <input
                    type="email"
                    required
                    className="block w-full px-5 py-4 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-all bg-slate-50 font-light"
                    value={email}
                    placeholder="admin@nzokotransport.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute right-4 top-4 h-5 w-5 text-slate-300" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mot de passe</label>
              <div className="mt-1 relative">
                <input
                    type="password"
                    required
                    className="block w-full px-5 py-4 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-yellow focus:border-brand-yellow transition-all bg-slate-50 font-light"
                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute right-4 top-4 h-5 w-5 text-slate-300" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-brand-dark uppercase tracking-widest bg-brand-yellow hover:bg-amber-400 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow transition-all duration-300 disabled:opacity-50 mt-10"
            >
              {isLoggingIn ? 'Connexion...' : 'Se connecter'}
              {!isLoggingIn && <LogIn size={18} className="ml-3" strokeWidth={2.5} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
