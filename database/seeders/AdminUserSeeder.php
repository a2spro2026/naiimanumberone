<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    /**
     * Crée ou met à jour le compte administrateur à partir de ADMIN_LOGIN / ADMIN_PASSWORD (.env).
     */
    public function run(): void
    {
        $login = env('ADMIN_LOGIN');
        $password = env('ADMIN_PASSWORD');

        if (! $login || ! $password) {
            throw new RuntimeException('Renseignez ADMIN_LOGIN et ADMIN_PASSWORD dans le fichier .env.');
        }

        User::updateOrCreate(
            ['login' => $login],
            [
                'name' => env('ADMIN_NAME', 'Administrateur'),
                'role' => User::ROLE_ADMIN,
                'password' => $password,
            ],
        );
    }
}
