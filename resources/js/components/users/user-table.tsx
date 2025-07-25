import { ConfirmDialog } from '@/components/confirm-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { callTypes, cn } from '@/lib/utils';
import type { User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { SquarePen, Trash2 } from 'lucide-react';

export const UserTable = ({ users, canEdit, canDelete }: { users: User[]; canEdit: boolean; canDelete: boolean }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                <Badge key={user.role}>{user.role}</Badge>
              </TableCell>
              <TableCell>
                <ConfirmDialog
                  title="Are you sure you want to change the status?"
                  description="Changing the user's status may affect their access to the system."
                  onConfirm={() => router.patch(route('users.toggle-status', user.id))}
                >
                  <Badge variant="outline" className={cn('cursor-pointer capitalize', callTypes.get(user.status))}>
                    {user.status}
                  </Badge>
                </ConfirmDialog>
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
                  <ConfirmDialog
                    title="Are you absolutely sure?"
                    description="This action cannot be undone. This will permanently delete this account and remove its data."
                    onConfirm={() => router.delete(route('users.destroy', user.id))}
                  >
                    <Button variant="destructive" size="sm" className="cursor-pointer">
                      <Trash2 />
                      Delete
                    </Button>
                  </ConfirmDialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
