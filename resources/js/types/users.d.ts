export interface UserForm {
  id: number | null;
  name: string;
  username: string;
  password: string;
  password_confirmation: string;
  role: string;
}

export interface UsersPageProps {
  users: PaginatedData<User>;
  roles: Role[];
  filters: { search: string; sort: string; role: string };
}
