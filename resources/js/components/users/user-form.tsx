import InputError from '@/components/input-error';
import { SelectField } from '@/components/select-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UserForm } from '@/types/users';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface UserFormProps {
  userData: UserForm;
  roles: string[];
}

const UserForm = ({ userData, roles }: UserFormProps) => {
  const { data, setData, processing, errors, post, put } = useForm<Required<UserForm>>(userData);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (data.id) put(route('users.update', data.id));
    else post(route('users.store'));
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} autoFocus />
        <InputError message={errors.name} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" value={data.username} onChange={(e) => setData('username', e.target.value)} />
        <InputError message={errors.username} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
        <InputError message={errors.password} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password_confirmation">Confirm Password</Label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          value={data.password_confirmation}
          onChange={(e) => setData('password_confirmation', e.target.value)}
        />
        <InputError message={errors.password_confirmation} />
      </div>
      <div className="grid gap-2">
        <Label>Role</Label>
        <SelectField
          placeholder="Select a role"
          value={data.role}
          onChange={(value) => setData('role', value)}
          items={roles.map((role) => ({ value: role, label: role }))}
        />
        <InputError message={errors.role} />
      </div>
      <Button type="submit" disabled={processing} className="w-full">
        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
        Save
      </Button>
    </form>
  );
};

export default UserForm;
