<?php

namespace App\Http\Controllers;

use App\Filters\UserFilters;
use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\UserCollection;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

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

        return to_route("users.index")->with("success", "User added successfully");
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
    public function edit(User $user)
    {
        return Inertia::render("users/edit", [
            "user" => $user->only(['id', 'name', 'username']),
            "role" => $user->getRoleNames()?->last(),
            "roles" => Role::pluck("name")
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $data = $request->validated();

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);
        $user->syncRoles($data['role']);

        return to_route('users.index')->with("success", "User updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return to_route("users.index")->with("success", "User deleted successfully");
    }

    public function toggle_status(User $user)
    {
        $user->active = !$user->active;
        $user->save();
        return back()->with("success", "User status updated successfully");
    }
}
