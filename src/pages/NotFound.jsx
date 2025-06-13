
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-sage-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-sage-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors font-medium"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border-2 border-sage-600 text-sage-700 rounded-lg hover:bg-sage-50 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
