import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="bg-white py-10 rounded-xl border border-border shadow-sm p-12 animate-fade-up">
            <h1 className="text-9xl font-bold text-sage-500 mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors mt-4 mx-auto"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'fit-content' }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NotFound;
