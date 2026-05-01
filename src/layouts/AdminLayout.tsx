import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Bus, 
  Settings, 
  LogOut,
  Menu,
  X,
  Package,
  FileText,
  Image as ImageIcon,
  Star,
  HelpCircle,
  Users
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        // Verify admin status on every reload
        try {
          const adminDoc = await getDoc(doc(db, 'admins', user.uid));
          if (!adminDoc.exists()) {
            await signOut(auth);
            navigate('/admin/login');
          }
        } catch (err) {
          console.error("Auth verification failed", err);
          navigate('/admin/login');
        }
      }
      setIsAuthChecking(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (isAuthChecking) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
      </div>
    );
  }

  const navItems = [
    { name: 'Tableau de bord', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Destinations', path: '/admin/destinations', icon: Bus },
    { name: 'Agences', path: '/admin/agencies', icon: MapPin },
    { name: 'Colis', path: '/admin/tracking', icon: Package },
    { name: 'Actualités', path: '/admin/news', icon: FileText },
    { name: 'Galerie', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Avis', path: '/admin/testimonials', icon: Star },
    { name: 'FAQ', path: '/admin/faq', icon: HelpCircle },
    { name: 'Utilisateurs', path: '/admin/users', icon: Users },
    { name: 'Paramètres', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 font-sans">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-navy text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-20 flex items-center justify-center border-b border-white/10 px-4">
          <Link to="/" className="text-2xl font-bold tracking-widest text-gold text-center w-full">
            NZOKO <span className="text-sm block text-gray-400 font-normal mt-1 w-full text-center tracking-normal">Administration</span>
          </Link>
          <button 
             onClick={() => setIsSidebarOpen(false)}
             className="lg:hidden absolute right-4 text-gray-400 hover:text-white"
          >
             <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-2 flex-grow">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-gold/10 text-gold border-r-4 border-gold' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-gold' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white shadow-sm lg:hidden h-16 flex items-center px-4 justify-between border-b border-gray-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-navy p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold tracking-widest text-navy">NZOKO</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
