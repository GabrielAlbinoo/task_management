<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Alice',
            'email' => 'alice@example.com',
            'password' => Hash::make('password123'),
        ]);
        User::create([
            'name' => 'Bob',
            'email' => 'bob@example.com',
            'password' => Hash::make('password123'),
        ]);
        User::create([
            'name' => 'Charlie',
            'email' => 'charlie@example.com',
            'password' => Hash::make('password123'),
        ]);
    }
}
