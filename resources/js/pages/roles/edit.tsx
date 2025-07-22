import Heading from '@/components/heading';
import RoleForm from '@/components/roles/role-form';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Role } from '@/types/roles';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Roles', href: '/roles' },
  { title: 'Edit', href: '' },
];

export default function EditRolePage({ role, permissions, allPermissions }: { role: Role; permissions: string[]; allPermissions: string[] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Role" />
      <div className="p-4">
        <Heading title="Edit role" description="Update a user role" />
        <RoleForm roleData={{ id: role.id ?? null, name: role.name ?? '', permissions: permissions ?? [] }} permissions={allPermissions} />
      </div>
    </AppLayout>
  );
}
