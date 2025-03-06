
import { Package } from 'lucide-react';

const EmptyState = ({ searchTerm, onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-border shadow-sm p-16">
      <Package className="w-16 h-16 text-sage-200 mb-4" />
      <h3 className="text-xl font-medium mb-2">No Donations Found</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {searchTerm 
          ? `No donations matching "${searchTerm}" were found.` 
          : 'There are no donations available with the selected filters.'}
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 py-2 bg-sage-500 text-white rounded-md hover:bg-sage-600 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default EmptyState;
