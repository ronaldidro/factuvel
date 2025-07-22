import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RoleForm } from '@/types/roles';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface RoleFormProps {
  roleData: RoleForm;
  permissions: string[];
}

const togglePermission = (permissions: string[], permission: string, checked: boolean) =>
  checked ? [...permissions, permission] : permissions.filter((name) => name !== permission);

const RoleForm = ({ roleData, permissions }: RoleFormProps) => {
  const { data, setData, processing, errors, post, put } = useForm<Required<RoleForm>>(roleData);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (data.id) put(route('roles.update', data.id));
    else post(route('roles.store'));
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
        <InputError message={errors.name} />
      </div>
      <div className="grid gap-2">
        <Label>Permissions</Label>
        {permissions.map((permission) => (
          <Label key={permission} htmlFor={permission}>
            <Checkbox
              id={permission}
              name={permission}
              checked={data.permissions.includes(permission)}
              onCheckedChange={(checked: boolean) => setData('permissions', togglePermission(data.permissions, permission, checked))}
              className="mr-2"
            />
            <span className="capitalize">{permission}</span>
          </Label>
        ))}
        <InputError message={errors.permissions} />
      </div>
      <Button type="submit" disabled={processing}>
        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
        Save
      </Button>
    </form>
  );
};

export default RoleForm;
