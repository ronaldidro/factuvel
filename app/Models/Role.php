<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
  use SoftDeletes;

  protected static function booted(): void
  {
    static::deleting(function (Role $role) {
      if ($role->users()->count() > 0) {
        throw new \Exception('Cannot delete a role that is assigned to users');
      }
    });
  }
}
