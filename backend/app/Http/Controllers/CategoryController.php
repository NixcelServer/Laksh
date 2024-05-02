<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\SubCategory;

use Illuminate\Support\Facades\Date;
use App\Helpers\EncDecHelper;

class CategoryController extends Controller
{
    //
    public function createCategory(Request $request)
    {
        
        try {
            $validatedData = $request->validate([
                'categoryName' => [
                    'required',
                    'unique_category_based_on_flag', // Custom validation rule
                ],
            ]);
        } catch (\Exception $e) {
                return response()->json(['error' => "Category '{$request->categoryName}' already exists"], 422);
        }
        
        $category = new Category;
        $category->cat_name = $request->categoryName;
        $category->add_by = EncDecHelper::encDecId($request->encUserId,'decrypt');
        //$category->add_by = '2';
        $category->add_date = Date::now()->toDateString();
        $category->add_time = Date::now()->toTimeString();
        $category->save();

        return response()->json(['message' => 'Category created successfully'], 200);
    }

    public function viewCategories()
    {
        //get all the categories from the db
        $categories = Category::where('flag','show')->get();

        //iterate over categories
        foreach($categories as $category)
        {
            // Encrypt the Category ID using the EncDecHelper class
            $category->encCatId = EncDecHelper::encDecId($category->tbl_cat_id,'encrypt');

            // Unset the non-encrypted ID
            unset($category->tbl_cat_id,$category->add_by);
        }

        // Return a JSON response containing the encrypted UOM IDs
        return response()->json($categories);
    }

    public function deleteCategory(Request $request, $id)
    {
        //decrypt the id 
        $decCatId = EncDecHelper::encDecId($id,'decrypt');

        // Find the Category record by its ID
        $cat = Category::findOrFail($decCatId);

        //set the flag to delete
        $cat->flag ='deleted';
        $cat->deleted_by = EncDecHelper::encDecId($request->encUserId,'decrypt');
        $cat->deleted_date = Date::now()->toDateString();
        $cat->deleted_time = Date::now()->toTimeString();

        $cat->save();

        //return a json response
        return response()->json(['message'=>'Category deleted successfully']);
    }


    public function createSubCategory(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'subCategoryName' => [
                    'required',
                    'unique_sub_category_based_on_flag', // Custom validation rule
                ],
            ]);
        } catch (\Exception $e) {
                return response()->json(['error' => "Sub-Category '{$request->subCategoryName}' already exists"], 422);
        }

        $decCatId = EncDecHelper::encDecId($request->encCatId,'decrypt');
        $subCategory = new SubCategory;
        $subCategory->tbl_cat_id = $decCatId;
        $subCategory->sub_cat_name = $request->subCategoryName;
        
        $subCategory->add_by = EncDecHelper::encDecId($request->encUserId,'decrypt');
        $subCategory->add_date = Date::now()->toDateString();
        $subCategory->add_time = Date::now()->toTimeString();
        $subCategory->save();

        return response()->json(['message' => 'Sub-Category created successfully'], 200);

    }

    public function viewSubCategories()
    {
        //get all the sub categories from the db
        $subCats = SubCategory::where('flag','show')->get();

        //iterate over sub categories
        foreach($subCats as $subCat)
        {
            // Encrypt the sub Category ID using the EncDecHelper class
            $subCat->encSubCatId = EncDecHelper::encDecId($subCat->tbl_sub_cat_id,'encrypt');

            //encrypt the category id
            $subCat->encCatId = EncDecHelper::encDecId($subCat->tbl_cat_id,'encrypt');

            // Unset the non-encrypted ID
            unset($subCat->tbl_cat_id,$subCat->tbl_sub_cat_id,$subCat->add_by);
        }

        // Return a JSON response containing the encrypted UOM IDs
        return response()->json($subCats);
    }

    public function deleteSubCategory(Request $request, $id)
    {
        //decrypt the id 
        $decSubCatId = EncDecHelper::encDecId($id,'decrypt');

        // Find the Category record by its ID
        $subCat = SubCategory::findOrFail($decSubCatId);

        //set the flag to delete
        $subCat->flag ='deleted';
        //$subCat->deleted_by = $userDetails('user');
        $subCat->deleted_by = EncDecHelper::encDecId($request->encUserId,'decrypt');
        $subCat->deleted_date = Date::now()->toDateString();
        $subCat->deleted_time = Date::now()->toTimeString();

        $subCat->save();

        //return a json response
        return response()->json(['message'=>'Sub-Category deleted successfully']);
    }
}
