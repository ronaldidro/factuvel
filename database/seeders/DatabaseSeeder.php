<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([PermissionSeeder::class]);

        $permissions = Permission::all();
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions($permissions);

        $adminUser = User::firstOrCreate([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'username' => 'admin',
            'password' => Hash::make('admin123')
        ]);

        $adminUser->assignRole($adminRole);
    }
}
