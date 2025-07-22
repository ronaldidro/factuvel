export interface Role {
  id: number;
  name: string;
  permissions: string[];
  created_at: string;
}

export interface RoleForm {
  id: number | null;
  name: string;
  permissions: string[];
}

export interface RolesPageProps {
  roles: PaginatedData<Role>;
  filters: { search: string; sort: string };
}
