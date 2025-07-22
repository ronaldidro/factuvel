import { AppPagination } from '@/components/app-pagination';
import { RoleFilters } from '@/components/roles/role-filters';
import { RoleTable } from '@/components/roles/role-table';
import { Button } from '@/components/ui/button';
import { useCan } from '@/hooks/use-can';
import { useFilters } from '@/hooks/use-filters';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { RolesPageProps } from '@/types/roles';
import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Roles', href: '/roles' }];

export default function RolesPage({ roles = [], filters = { search: '', sort: 'latest' } }: RolesPageProps) {
  const { can } = useCan();
  const { filters: filterValues, updateFilter } = useFilters(filters, 'roles.index');

  const handlePageChange = (url: string | null) => {
    if (!url) return;
    router.get(url, filterValues, { preserveState: true, preserveScroll: true });
  };

  const handlePerPageChange = (per_page: string) => {
    router.get(route('roles.index'), { ...filterValues, per_page }, { preserveState: true, preserveScroll: true, replace: true });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <div className="grid gap-4 md:flex md:gap-8">
          <RoleFilters filters={filterValues} onFilterChange={updateFilter} />
          {can('roles.create') && (
            <Button asChild>
              <Link href={route('roles.create')}>
                Add
                <Plus />
              </Link>
            </Button>
          )}
        </div>
        <RoleTable roles={roles.data} canEdit={can('roles.edit')} canDelete={can('roles.delete')} />
        <AppPagination
          meta={roles.meta}
          links={roles.links}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          hide={roles.meta.total < roles.meta.per_page}
        />
      </div>
    </AppLayout>
  );
}
