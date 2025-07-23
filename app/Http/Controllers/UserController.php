<?php

namespace App\Http\Controllers;

use App\Filters\UserFilters;
use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $per_page = $request->input('per_page', 10);

        $users = User::query()
            ->with('roles')
            ->filter(new UserFilters($request))
            ->paginate($per_page)
            ->withQueryString();

        $roles = Role::select('id', 'name')->get();

        return Inertia::render("users/index", [
            "users" => new UserCollection($users),
            "roles" => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("users/create", ["roles" => Role::pluck("name")]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserStoreRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        $user->syncRoles($data['role']);

        return to_route("users.index");
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
    public function edit(string $id)
    {
        $user = User::find($id, ['id', 'name', 'username']);

        return Inertia::render("users/edit", [
            "user" => $user,
            "role" => $user->getRoleNames()?->last(),
            "roles" => Role::pluck("name")
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, string $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validated();

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);
        $user->syncRoles($data['role']);

        return to_route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return to_route("users.index");
    }
}
