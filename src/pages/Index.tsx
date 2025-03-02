
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Package, User, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  // Add scroll-to-top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-5 bg-sage-50">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start">
              <span className="badge bg-sage-100 text-sage-700 fw-medium mb-4 animate-fade-in">
                Reducing Waste. Fighting Hunger.
              </span>
              <h1 className="fw-bold mb-4 animate-fade-up">
                Connect Surplus Food with <span className="text-sage-500">Those in Need</span>
              </h1>
              <p className="lead text-muted mb-5 animate-slide-in">
                Our platform connects food donors with orphanages to reduce food waste and 
                ensure no child goes hungry. Simple, efficient, and impactful.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start animate-fade-up">
                <Link to="/auth" className="btn btn-sage px-4 py-2">
                  Get Started
                </Link>
                <Link to="/how-it-works" className="btn btn-outline-sage px-4 py-2">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-lg-6 animate-fade-in">
              <div className="position-relative">
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-sage-200 opacity-50 rounded translate-x-n10 translate-y-n10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1541802645635-11f2286a7482?q=80&w=2070&auto=format&fit=crop" 
                  alt="Food donation" 
                  className="img-fluid rounded shadow w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="badge bg-light text-dark fw-medium mb-3">
              Simple Process
            </span>
            <h2 className="fw-bold mb-3">How It Works</h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: "700px"}}>
              Our platform makes it easy to connect surplus food with orphanages in need.
              Just three simple steps to make a difference.
            </p>
          </div>
          
          <div className="row g-4">
            {/* Step 1 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-sage-100 d-flex align-items-center justify-content-center mx-auto mb-4" style={{width: "64px", height: "64px"}}>
                    <Package className="text-sage-500" size={32} />
                  </div>
                  <h3 className="h4 fw-bold mb-3">List Your Donation</h3>
                  <p className="text-muted">
                    Food donors can easily create listings for surplus food, 
                    including details like quantity, pickup time, and expiration date.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-sage-100 d-flex align-items-center justify-content-center mx-auto mb-4" style={{width: "64px", height: "64px"}}>
                    <User className="text-sage-500" size={32} />
                  </div>
                  <h3 className="h4 fw-bold mb-3">Reserve Food</h3>
                  <p className="text-muted">
                    Orphanages can browse available donations and reserve the ones that meet 
                    their needs with just a few clicks.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle bg-sage-100 d-flex align-items-center justify-content-center mx-auto mb-4" style={{width: "64px", height: "64px"}}>
                    <Calendar className="text-sage-500" size={32} />
                  </div>
                  <h3 className="h4 fw-bold mb-3">Coordinate Pickup</h3>
                  <p className="text-muted">
                    Once reserved, both parties can coordinate the food pickup process 
                    through our platform, ensuring a smooth handover.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5">
            <Link to="/how-it-works" className="btn btn-outline-sage px-4">
              Learn More About the Process
            </Link>
          </div>
        </div>
      </section>
      
      {/* Impact Stats */}
      <section className="py-5 bg-sage-50">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="badge bg-sage-100 text-sage-700 fw-medium mb-3">
              Our Impact
            </span>
            <h2 className="fw-bold mb-3">Making a Difference Together</h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: "700px"}}>
              Together with our community of donors and recipients, we've created a meaningful impact 
              in reducing food waste and fighting hunger.
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100">
                <h3 className="display-5 fw-bold text-sage-500 mb-2">1,240+</h3>
                <p className="text-muted">Successful Donations</p>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100">
                <h3 className="display-5 fw-bold text-sage-500 mb-2">85+</h3>
                <p className="text-muted">Orphanages Served</p>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100">
                <h3 className="display-5 fw-bold text-sage-500 mb-2">7,500+</h3>
                <p className="text-muted">Meals Provided</p>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100">
                <h3 className="display-5 fw-bold text-sage-500 mb-2">4.2T</h3>
                <p className="text-muted">Food Waste Reduced</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="bg-sage-500 rounded overflow-hidden shadow">
            <div className="row g-0">
              <div className="col-lg-6 p-5 text-white">
                <h2 className="display-6 fw-bold mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="lead mb-4 opacity-90">
                  Join our community today and help us connect surplus food with those who need it most.
                  Every donation counts.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3">
                  <Link to="/auth" className="btn btn-light text-sage-500 px-4 py-2 fw-medium">
                    Sign Up Now
                  </Link>
                  <Link to="/donations" className="btn btn-outline-light px-4 py-2 fw-medium">
                    Browse Donations
                  </Link>
                </div>
              </div>
              
              <div className="col-lg-6 d-none d-lg-block position-relative" style={{minHeight: "300px"}}>
                <img 
                  src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=2071&auto=format&fit=crop" 
                  alt="Happy children" 
                  className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
