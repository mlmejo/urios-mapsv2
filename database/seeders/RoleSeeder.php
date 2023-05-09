<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roleNames = ['admin', 'business owner', 'regular user'];

        foreach ($roleNames as $roleName) {
            DB::table('roles')->insert(['name' => $roleName]);
        }
    }
}
