
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      
      <section className="py-5 my-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card border-0 shadow-sm p-5 text-center animate-fade-up">
                <h1 className="display-1 fw-bold text-sage-500 mb-3">404</h1>
                <h2 className="fw-bold mb-3">Page Not Found</h2>
                <p className="text-muted mb-4">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn btn-sage d-inline-flex align-items-center mx-auto">
                  <ArrowLeft size={16} className="me-2" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NotFound;
