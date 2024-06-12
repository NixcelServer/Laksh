<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductKeyword;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Date;
use App\Models\ProductImages;
use App\Models\Category;
use App\Models\SubCategory;


class ProductController extends Controller
{
    //
    public function storeProduct(Request $request)
    {
        $decCompanyId = EncDecHelper::encDecId($request->encCompanyId, 'decrypt');
        $prod = new Product;
        $prod->tbl_company_id = $decCompanyId;
        $prod->prod_name = $request->prodName;
        $prod->prod_description = $request->prodDescription;
        $prod->tbl_cat_id = EncDecHelper::encDecId($request->prodCat, 'decrypt');
        $prod->tbl_sub_cat_id = EncDecHelper::encDecId($request->prodSubCat, 'decrypt');
        $prod->prod_price = $request->prodPrice;
        $prod->tbl_uom_id = EncDecHelper::encDecId($request->prodUOM, 'decrypt');
        $prod->prod_min_order_qty = $request->minOrderQty;
        $prod->add_date = Date::now()->toDateString();
        $prod->add_time = Date::now()->toTimeString();
        $prod->display_price = $request->input('display_price', 'yes');

        // Assuming $request->file('files') returns an array of files
        $files = $request->file('files');

        if ($files && count($files) > 0) {
            // Get the original filename of the first file
            $firstFile = $files[0];
            $firstFileName = $firstFile->getClientOriginalName();

            // Store the first file in the specified directory with the original file name
            $directory = $decCompanyId . '/products';
            $firstFilePath = $firstFile->storeAs($directory, $firstFileName);

            // Store the first image path in prod_img_path
            $prod->prod_img_path = $firstFilePath;
        }

        $prod->save();

        // Save each image in the ProductImages table
        if ($files) {
            foreach ($files as $file) {
                // Get the original filename
                $fileName = $file->getClientOriginalName();

                // Store the file in the specified directory with the original file name
                $filePath = $file->storeAs($directory, $fileName);

                // Create a new record in tbl_prod_img table for each file
                $prodimg = new ProductImages();
                $prodimg->tbl_prod_id = $prod->tbl_prod_id;
                $prodimg->tbl_company_id = $decCompanyId;
                $prodimg->prod_img_path = $filePath;
                $prodimg->add_date = Date::now()->toDateString();
                $prodimg->add_time = Date::now()->toTimeString();
                $prodimg->save();
            }
        }

        foreach ($request->keywords as $encKeywordId) {
            // Decrypt the keyword ID
            $decKeywordId = EncDecHelper::encDecId($encKeywordId, 'decrypt');
            
            // Create a new record in tbl_prod_keywords using the ProductKeywords model
            $productKeyword = new ProductKeyword();
            $productKeyword->tbl_prod_id = $prod->tbl_prod_id; // Assuming you have stored the product already and it has an ID
            $productKeyword->tbl_keyword_id = $decKeywordId;
            $productKeyword->add_date = Date::now()->toDateString();
            $productKeyword->add_time = Date::now()->toTimeString();
            $productKeyword->save();
        }

        return response()->json($prod);
    }


    public function getProducts($id)
    {
        $products = Product::where('tbl_company_id',EncDecHelper::encDecId($id,'decrypt'))->where('flag','show')->with('images')->get();
        foreach($products as $product){
            $product->encProdId = EncDecHelper::encDecId($product->tbl_prod_id,'encrypt');
            $product->encCatId = EncDecHelper::encDecId($product->tbl_cat_id,'encrypt');
            $product->encSubCatId = EncDecHelper::encDecId($product->tbl_sub_cat_id,'encrypt');
            $product->encUomId = EncDecHelper::encDecId($product->tbl_uom_id,'encrypt');

            $product->encKeywords = $product->keywords->pluck('pivot.tbl_keyword_id')->map(function ($keywordId) {
                return EncDecHelper::encDecId($keywordId, 'encrypt');
            }) ->toArray();

            // Add images paths to the product
            $product->image_paths = $product->images->pluck('prod_img_path');

            unset($product->tbl_prod_id,$product->tbl_company_id,$product->tbl_cat_id,$product->tbl_sub_cat_id,$product->tbl_uom_id,$product->keywords);
        }
        return $products;
        // $prodimgs = ProductImages::where('tbl_company_id',EncDecHelper::encDecId($id,'decrypt'))->where('flag','show')->get();
        // foreach($prodimgs as $prodimg){
        //     $prodimg->
        // }
    }

    public function limitedProducts($id)
    {
        
         $decCatId = EncDecHelper::encDecId($id,'decrypt');
         $products = Product::where('tbl_cat_id', $decCatId)
    ->where('flag', 'show')
    ->whereNotNull('prod_img_path') // Ensures products have a non-null prod_img_path
    ->inRandomOrder()
    ->take(9)
    ->get();

         foreach($products as $product)
         {
            $product->encProdId = EncDecHelper::encDecId($product->tbl_prod_id,'encrypt');
            $product->encCatId = EncDecHelper::encDecId($product->tbl_cat_id,'encrypt');
            $product->encSubCatId = EncDecHelper::encDecId($product->tbl_sub_cat_id,'encrypt');
            unset($product->tbl_prod_id,$product->tbl_company_id,$product->tbl_cat_id,$product->tbl_sub_cat_id);

         }
        return response()->json($products);
        // return response()->json("hi");
    }

    public function deleteProducts(Request $request, $id)
    {
        //decrypt the id 
        $decProdId = EncDecHelper::encDecId($id,'decrypt');

        // Find the Category record by its ID
        $prod = Product::findOrFail($decProdId);

        //set the flag to delete
        $prod->flag ='deleted';
        $prod->deleted_by = EncDecHelper::encDecId($request->encUserId,'decrypt');
        $prod->deleted_date = Date::now()->toDateString();
        $prod->deleted_time = Date::now()->toTimeString();

        $prod->save();

        //return a json response
        return response()->json(['message'=>'Product deleted successfully']);
    }
  
    public function updateProduct(Request $request)
    {
        // return response()->json($request);
        $decCompanyId = EncDecHelper::encDecId($request->encCompanyId,'decrypt');
        $decProdId = EncDecHelper::encDecId($request->prodId,'decrypt');
        $prod = Product::where('tbl_prod_id',$decProdId)->first();
        $prod->tbl_company_id = $decCompanyId;
        $prod->prod_name = $request->prodName;
        $prod->prod_description = $request->prodDescription;
        $directory = $decCompanyId . '/products' ; 
        // if($request->hasFile('file')){
        // $prod->prod_img_path = $request->file('file')->storeAs($directory, $request->file('file')->getClientOriginalName());
        // }
        $prod->tbl_cat_id = EncDecHelper::encDecId($request->prodCat,'decrypt');
        $prod->tbl_sub_cat_id = EncDecHelper::encDecId($request->prodSubCat,'decrypt');
        $prod->prod_price = $request->prodPrice;
        $prod->tbl_uom_id = EncDecHelper::encDecId($request->prodUOM,'decrypt');
        $prod->prod_min_order_qty = $request->minOrderQty;
        
        $prod->add_date = Date::now()->toDateString();
        $prod->add_time = Date::now()->toTimeString();
        
         // Save the pricing status
       $prod->display_price = $request->input('display_price', 'yes');

        $prod->save();

        $directory = $decCompanyId . '/products';
        // Assuming $request->file('files') returns an array of files
        $files = $request->file('files');

        if ($files && is_array($files)) {
    foreach ($files as $file) {
        // Get the original filename
        $fileName = $file->getClientOriginalName();

        // Store the file in the specified directory with the original file name
        $filePath = $file->storeAs($directory, $fileName);

        // Create a new record in tbl_prod_img table for each file
        $prodimg = new ProductImages();
        $prodimg->tbl_prod_id = $prod->tbl_prod_id;
        $prodimg->tbl_company_id = $decCompanyId;
        $prodimg->prod_img_path = $filePath;
        $prodimg->add_date = Date::now()->toDateString();
        $prodimg->add_time = Date::now()->toTimeString();
        $prodimg->save();
    }
}


        // Delete existing keywords associated with the product
        $prod->keywords()->detach();

        foreach ($request->keywords as $encKeywordId) {
            // Decrypt the keyword ID
            $decKeywordId = EncDecHelper::encDecId($encKeywordId, 'decrypt');
            
            // Create a new record in tbl_prod_keywords using the ProductKeywords model
            $productKeyword = new ProductKeyword();
            $productKeyword->tbl_prod_id = $prod->tbl_prod_id; // Assuming you have stored the product already and it has an ID
            $productKeyword->tbl_keyword_id = $decKeywordId;
            $productKeyword->add_date = Date::now()->toDateString();
            $productKeyword->add_time = Date::now()->toTimeString();
            $productKeyword->save();
        }

        return response()->json($prod);
    }

    public function checkProductName(Request $request,$id)
    {
       
        $decCompanyId = EncDecHelper::encDecId($id,'decrypt');
        
        $ProductNameExists = Product::where('prod_name',$request->prod_name) ->where('tbl_company_id', $decCompanyId)->where('flag','show')->exists();
        // return response($ProductNameExists);
        return response()->json($ProductNameExists);
    }

    public function productByCategory($id)
    { 
        // Decrypt category ID
        $decCatId = EncDecHelper::encDecId($id, 'decrypt');
        
        // Find the category
        $category = Category::find($decCatId);
    
        // Check if category exists
        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }
    
        // Initialize array to store subcategories and their products
        $response = [
            'cat_name' => $category->cat_name, // Include category details
            'subCategories' => [],
        ];
    
        // Get subcategories of the main category
        $subCategories = SubCategory::where('tbl_cat_id', $decCatId)->where('flag', 'show')->get(); // Assuming 'hasMany' relationship
        
        // Loop through subcategories
        foreach ($subCategories as $subcategory) {
            // Encrypt subcategory ID
            $subcategory->encSubCatId=EncDecHelper::encDecId( $subcategory->tbl_sub_cat_id, 'encrypt');
             unset($subcategory->tbl_cat_id);
            
            // Get products for the subcategory
            $subProducts = Product::where('tbl_sub_cat_id', $subcategory->tbl_sub_cat_id)
                                  ->where('flag', 'show')
                                  ->get()
                                  ->map(function ($product) {
            // Encrypt relevant fields
               $product->encProdId = EncDecHelper::encDecId($product->tbl_prod_id,'encrypt');
               $product->encCatId = EncDecHelper::encDecId($product->tbl_cat_id,'encrypt');
               $product->encSubCatId = EncDecHelper::encDecId($product->tbl_sub_cat_id, 'encrypt');
               $product->image_paths = $product->images->pluck('prod_img_path');
           
            $product->encUomId = EncDecHelper::encDecId($product->tbl_uom_id,'encrypt');
            unset($product->tbl_prod_id,$product->tbl_company_id,$product->tbl_cat_id,$product->tbl_sub_cat_id,$product->tbl_uom_id);
            return $product;
            });

            
            
            // Add subcategory and its products to the response
            $response['subCategories'][] = [
                 'subcategory' =>$subcategory ,
                'products' => $subProducts
            ];
            unset($subcategory->tbl_sub_cat_id);
        }
        $category->encCatId = $id;
        unset($category->tbl_cat_id);

        return response()->json($response);
    }

}
