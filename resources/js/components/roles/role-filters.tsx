import { SearchField } from '@/components/search-field';
import { SelectField } from '@/components/select-field';
import type { RolesPageProps } from '@/types/roles';

interface RoleFiltersProps extends Omit<RolesPageProps, 'roles'> {
  onFilterChange: (key: string, value: string) => void;
}

export const RoleFilters = ({ filters, onFilterChange }: RoleFiltersProps) => {
  return (
    <>
      <div className="md:flex-1">
        <SearchField placeholder="Search users by name" value={filters.search} onChange={(e) => onFilterChange('search', e.target.value)} />
      </div>
      <div className="md:flex-1">
        <SelectField
          placeholder="Sort by"
          value={filters.sort}
          onChange={(value) => onFilterChange('sort', value)}
          items={[
            { value: 'latest', label: 'Latest' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </div>
    </>
  );
};
