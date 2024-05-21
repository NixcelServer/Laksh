<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\UnitOfMeasurement;
use App\Models\Keyword;
use App\Models\Post;
use App\Models\Product;
use App\Models\Company;
use Illuminate\Support\Facades\Date;
use App\Helpers\EncDecHelper;

class AdminController extends Controller
{
    
    //get all admin
    public function getAllAdmin()
    {
        $users = User::where('u_designation','admin')->get();

        return response()->json($users);
    }

    public function adminDashboardContents()
    {
        $categories = Category::where('flag','show')->count();
        $subCategories = SubCategory::where('flag','show')->count();
        $uom = UnitOfMeasurement::where('flag','show')->count();
        $keywords = Keyword::where('flag','show')->count();
        $products = Product::where('flag','show')->count();
        $requirements = Post::where('flag','show')->count();
        $companies = Company::where('flag','show')->count();
   
        return response()->json([
        'categories' => $categories,
        'subCategories' => $subCategories,
        'uom' => $uom,
        'keywords' => $keywords,
        'products' => $products,
        'requirements' => $requirements,
        'companies' => $companies,
        ]);

    }
}
