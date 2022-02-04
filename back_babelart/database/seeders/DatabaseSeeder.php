<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table("categories")->insert([
            ["name" => "Chaise","image" => "url/image"],
            ["name" =>"Table", "image" => "url/image"],
            ["name" =>"Bureau", "image" => "url/image"],
            ["name" =>"Armoire", "image" => "url/image"],
            ["name" =>"Meuble TV", "image" => "url/image"],
            ["name" =>"Luminaire", "image" => "url/image"],
            ["name" =>"Accessoires", "image" => "url/image"],
            ["name" =>"Fauteuil", "image" => "url/image"],
            ["name" =>"Sofa", "image" => "url/image"],

        ]);

        DB::table("roles")->insert([
            ["name" => "User"],
            ["name" => "Seller"],
            ["name" => "Buyer"],
            ["name" => "Admin"],

        ]);

        \App\Models\User::factory(20)->create();
        \App\Models\Product::factory(5)->create();
    //     \App\Models\Cart::factory(10)->create();
    //     \App\Models\Wishlist::factory(10)->create();
    }
}
