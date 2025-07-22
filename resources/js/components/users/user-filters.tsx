import { SearchField } from '@/components/search-field';
import { SelectField } from '@/components/select-field';
import type { UsersPageProps } from '@/types/users';

interface UserFiltersProps extends Omit<UsersPageProps, 'users'> {
  onFilterChange: (key: string, value: string) => void;
}

const optionAll = { value: 'all', label: 'All roles' };

export const UserFilters = ({ filters, roles, onFilterChange }: UserFiltersProps) => {
  const rolesToItems = roles.map((role) => ({ value: role.id.toString(), label: role.name }));

  return (
    <>
      <div className="md:flex-1">
        <SearchField placeholder="Search users by name" value={filters.search} onChange={(e) => onFilterChange('search', e.target.value)} />
      </div>
      <div className="md:flex-1">
        <SelectField
          placeholder="Select a role"
          value={filters.role}
          onChange={(value) => onFilterChange('role', value)}
          items={[optionAll, ...rolesToItems]}
        />
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
