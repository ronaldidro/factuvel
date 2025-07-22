import { AppPagination } from '@/components/app-pagination';
import { Button } from '@/components/ui/button';
import { UserFilters } from '@/components/users/user-filters';
import { UserTable } from '@/components/users/user-table';
import { useCan } from '@/hooks/use-can';
import { useFilters } from '@/hooks/use-filters';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { UsersPageProps } from '@/types/users';
import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Users', href: '/users' }];

export default function UsersPage({ users = [], roles = [], filters = { search: '', sort: 'latest', role: 'all' } }: UsersPageProps) {
  const { can } = useCan();
  const { filters: filterValues, updateFilter } = useFilters(filters, 'users.index');

  const handlePageChange = (url: string | null) => {
    if (!url) return;
    router.get(url, filterValues, { preserveState: true, preserveScroll: true });
  };

  const handlePerPageChange = (per_page: string) => {
    router.get(route('users.index'), { ...filterValues, per_page }, { preserveState: true, preserveScroll: true, replace: true });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <div className="grid gap-4 md:flex md:gap-8">
          <UserFilters filters={filterValues} onFilterChange={updateFilter} roles={roles} />
          {can('users.create') && (
            <Button asChild>
              <Link href={route('users.create')}>
                Add
                <Plus />
              </Link>
            </Button>
          )}
        </div>
        <UserTable users={users.data} canEdit={can('users.edit')} canDelete={can('users.delete')} />
        <AppPagination
          meta={users.meta}
          links={users.links}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          hide={users.meta.total < users.meta.per_page}
        />
      </div>
    </AppLayout>
  );
}
