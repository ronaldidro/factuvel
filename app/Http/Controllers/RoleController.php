<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $per_page = $request->input('per_page', 10);
        $search = $request->input('search');
        $sort = $request->input('sort', 'latest');

        $roles = Role::query()
            ->with('permissions:name')
            ->when(
                $search,
                fn($query) => $query->where('name', 'like', "%{$search}%")
            )
            ->when(
                $sort === 'oldest',
                fn($q) => $q->oldest(),
                fn($q) => $q->latest()
            )
            ->paginate($per_page)
            ->withQueryString();

        return Inertia::render("roles/index", ['roles' => RoleResource::collection($roles),]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("roles/create", [
            "permissions" => Permission::pluck("name")
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:20', 'unique:roles,name'],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        $role = Role::create(['name' => $validated['name']]);
        $role->syncPermissions($validated['permissions']);

        return to_route("roles.index")->with("success", "Role added successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        return Inertia::render(
            "roles/edit",
            [
                "role" => $role,
                "permissions" => $role->permissions()->pluck('name'),
                "allPermissions" => Permission::pluck("name")
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:20'],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        $role->update($validated);
        $role->syncPermissions($validated['permissions']);

        return to_route("roles.index")->with("success", "Role updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        try {
            $role->delete();
            return to_route("roles.index")->with("success", "Role deleted successfully");
        } catch (\Exception $e) {
            return to_route("roles.index")->with('error', $e->getMessage());
        }
    }
}
