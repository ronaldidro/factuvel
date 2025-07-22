import Heading from '@/components/heading';
import RoleForm from '@/components/roles/role-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Roles', href: '/roles' },
  { title: 'Add', href: '' },
];

export default function CreateRolePage({ permissions }: { permissions: string[] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Role" />
      <div className="p-4">
        <Heading title="Add role" description="Create a new user role" />
        <RoleForm roleData={{ id: null, name: '', permissions: [] }} permissions={permissions} />
      </div>
    </AppLayout>
  );
}
