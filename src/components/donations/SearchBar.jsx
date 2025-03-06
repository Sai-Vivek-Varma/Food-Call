
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search donations..."
        value={searchTerm}
        onChange={onSearch}
        className="w-full pl-10 pr-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
      />
    </div>
  );
};

export default SearchBar;
