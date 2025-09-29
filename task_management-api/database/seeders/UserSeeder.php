<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Alice',
                'email' => 'alice@example.com',
            ],
            [
                'name' => 'Bob',
                'email' => 'bob@example.com',
            ],
            [
                'name' => 'Charlie',
                'email' => 'charlie@example.com',
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make('password123'),
                ]
            );
        }
    }
}
