import { DeleteAlertDialog } from '@/components/delete-alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { SquarePen } from 'lucide-react';

export const UserTable = ({ users, canEdit, canDelete }: { users: User[]; canEdit: boolean; canDelete: boolean }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {user.roles.map((role) => (
                    <Badge key={role.id}>{role.name}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{user.created_at}</TableCell>
              <TableCell className="flex gap-2">
                {canEdit && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={route('users.edit', user.id)}>
                      <SquarePen />
                      Edit
                    </Link>
                  </Button>
                )}
                {canDelete && (
                  <DeleteAlertDialog
                    title="Are you absolutely sure?"
                    description="This action cannot be undone. This will permanently delete this account and remove its data."
                    onConfirm={() => router.delete(route('users.destroy', user.id))}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
