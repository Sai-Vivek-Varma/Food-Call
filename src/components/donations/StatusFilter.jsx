
import { Filter } from 'lucide-react';

const StatusFilter = ({ value, onChange }) => {
  return (
    <div className="w-full md:w-48">
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 rounded-md border border-input appearance-none focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
        </select>
        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
};

export default StatusFilter;
