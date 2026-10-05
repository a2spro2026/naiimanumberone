<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    public const ROLE_ADMIN = 'admin';

    public const ROLE_GERANT = 'gerant';

    /**
     * Statuts attribuables depuis Configuration > Utilisateurs (le statut admin n'en fait pas partie).
     *
     * @var array<string, string>
     */
    public const ASSIGNABLE_ROLES = [
        'gerant' => 'Gérant',
        'chef' => 'Chef de cuisine',
        'employe' => 'Employé',
        'livreur' => 'Livreur',
    ];

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'contact',
        'role',
        'login',
        'email',
        'password',
    ];

    /**
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isGerant(): bool
    {
        return $this->role === self::ROLE_GERANT;
    }

    /**
     * @param  Builder<User>  $query
     */
    public function scopeManageable(Builder $query): void
    {
        $query->where('role', '!=', self::ROLE_ADMIN);
    }
}
