import { DeleteAlertDialog } from '@/components/delete-alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Role } from '@/types/roles';
import { Link, router } from '@inertiajs/react';
import { SquarePen } from 'lucide-react';

export const RoleTable = ({ roles, canEdit, canDelete }: { roles: Role[]; canEdit: boolean; canDelete: boolean }) => {
  return (
    <div className="rounded-md border">
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
                    <DeleteAlertDialog
                      title="Are you absolutely sure?"
                      description="This action cannot be undone. This will permanently delete this role and remove its data."
                      onConfirm={() => router.delete(route('roles.destroy', role.id))}
                    />
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
