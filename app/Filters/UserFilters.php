<?php

namespace App\Filters;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class UserFilters
{
  public function __construct(protected Request $request) {}

  public function __invoke(Builder $query): Builder
  {
    return $query
      ->whereNotIn('id', [Auth::id()])
      ->when(
        $this->request->search,
        fn($q, $search) => $q->where('name', 'like', "%{$search}%")
      )
      ->when(
        $this->request->filled('role') && $this->request->role !== 'all',
        fn($q) => $q->whereHas(
          'roles',
          fn($roleQuery) => $roleQuery->where('id', $this->request->role)
        )
      )
      ->when(
        $this->request->sort === 'oldest',
        fn($q) => $q->oldest(),
        fn($q) => $q->latest()
      );
  }
}
