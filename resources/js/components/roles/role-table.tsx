import { ConfirmDialog } from '@/components/confirm-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from '@/components/ui/sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Role } from '@/types/roles';
import { Link, router } from '@inertiajs/react';
import { SquarePen, Trash2 } from 'lucide-react';

export const RoleTable = ({ roles, canEdit, canDelete }: { roles: Role[]; canEdit: boolean; canDelete: boolean }) => {
  const handleConfirmButton = (id: number) => {
    router.delete(route('roles.destroy', id), {
      onSuccess: () => toast.success('Role deleted successfully'),
      onError: (errors) => toast.error(errors.message ?? 'Failed to delete role'),
    });
  };

  return (
    <div className="rounded-md border">
      <Toaster richColors closeButton position="top-right" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.id}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <Badge key={permission}>{permission}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{role.created_at}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  {canEdit && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={route('roles.edit', role.id)}>
                        <SquarePen />
                        Edit
                      </Link>
                    </Button>
                  )}
                  {canDelete && (
                    <ConfirmDialog
                      title="Are you absolutely sure?"
                      description="This action cannot be undone. This will permanently delete this role and remove its data."
                      onConfirm={() => handleConfirmButton(role.id)}
                    >
                      <Button variant="destructive" size="sm" className="cursor-pointer">
                        <Trash2 />
                        Delete
                      </Button>
                    </ConfirmDialog>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
