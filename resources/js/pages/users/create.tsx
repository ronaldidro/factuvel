import Heading from '@/components/heading';
import UserForm from '@/components/users/user-form';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Users', href: '/users' },
  { title: 'Add', href: '' },
];

export default function CreateUserPage({ roles }: { roles: string[] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add User" />
      <div className="p-4">
        <Heading title="Add user" description="Create a new user account" />
        <UserForm
          userData={{
            id: null,
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            role: '',
          }}
          roles={roles}
        />
      </div>
    </AppLayout>
  );
}
