import Heading from '@/components/heading';
import UserForm from '@/components/users/user-form';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, User } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Users', href: '/users' },
  { title: 'Edit', href: '' },
];

export default function EditUserPage({ user, role, roles }: { user: User; role: string; roles: string[] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit User" />
      <div className="p-4">
        <Heading title="Edit user" description="Update a user account" />
        <UserForm
          userData={{
            id: user.id ?? null,
            name: user.name ?? '',
            email: user.email ?? '',
            password: '',
            password_confirmation: '',
            role: role ?? '',
          }}
          roles={roles}
        />
      </div>
    </AppLayout>
  );
}
