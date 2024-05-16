<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductKeyword;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Date;


class ProductController extends Controller
{
    //
    public function storeProduct(Request $request)
    {
        //
        $decCompanyId = EncDecHelper::encDecId($request->encCompanyId,'decrypt');
        $prod = new Product;
        $prod->tbl_company_id = $decCompanyId;
        $prod->prod_name = $request->prodName;
        $prod->prod_description = $request->prodDescription;
        $directory = $decCompanyId . '/products' ; 
        $prod->prod_img_path = $request->file('file')->storeAs($directory, $request->file('file')->getClientOriginalName());
        $prod->tbl_cat_id = EncDecHelper::encDecId($request->prodCat,'decrypt');
        $prod->tbl_sub_cat_id = EncDecHelper::encDecId($request->prodSubCat,'decrypt');
        $prod->prod_price = $request->prodPrice;
        $prod->tbl_uom_id = EncDecHelper::encDecId($request->prodUOM,'decrypt');
        $prod->prod_min_order_qty = $request->minOrderQty;
        
        $prod->add_date = Date::now()->toDateString();
        $prod->add_time = Date::now()->toTimeString();
        
        
        $prod->save();

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

        
        

        // $directory = $decCompanyId . '/products' ; 
        // $prod->prod_img_path = $request->file('file')->storeAs($directory, $request->file('file')->getClientOriginalName());
        // return response()->json("success");

    }

    public function getProducts($id)
    {
        $products = Product::where('tbl_company_id',EncDecHelper::encDecId($id,'decrypt'))->where('flag','show')->get();
        foreach($products as $product){
            $product->encProdId = EncDecHelper::encDecId($product->tbl_prod_id,'encrypt');
            $product->encCatId = EncDecHelper::encDecId($product->tbl_cat_id,'encrypt');
            $product->encSubCatId = EncDecHelper::encDecId($product->tbl_sub_cat_id,'encrypt');
            $product->encUomId = EncDecHelper::encDecId($product->tbl_uom_id,'encrypt');

            $product->encKeywords = $product->keywords->pluck('pivot.tbl_keyword_id')->map(function ($keywordId) {
                return EncDecHelper::encDecId($keywordId, 'encrypt');
            }) ->toArray();

            unset($product->tbl_prod_id,$product->tbl_company_id,$product->tbl_cat_id,$product->tbl_sub_cat_id,$product->tbl_uom_id,$product->keywords);
        }
        return $products;
    }

    public function limitedProducts($id)
    {
        
         $decCatId = EncDecHelper::encDecId($id,'decrypt');
         $products = Product::where('tbl_cat_id', $decCatId)->where('flag','show')
         ->latest('add_date')
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
        $decCompanyId = EncDecHelper::encDecId($request->encCompanyId,'decrypt');
        $decProdId = EncDecHelper::encDecId($request->prodId,'decrypt');
        $prod = Product::where('tbl_prod_id',$decProdId)->first();
        $prod->tbl_company_id = $decCompanyId;
        $prod->prod_name = $request->prodName;
        $prod->prod_description = $request->prodDescription;
        $directory = $decCompanyId . '/products' ; 
        if($request->hasFile('file')){
        $prod->prod_img_path = $request->file('file')->storeAs($directory, $request->file('file')->getClientOriginalName());
        }
        $prod->tbl_cat_id = EncDecHelper::encDecId($request->prodCat,'decrypt');
        $prod->tbl_sub_cat_id = EncDecHelper::encDecId($request->prodSubCat,'decrypt');
        $prod->prod_price = $request->prodPrice;
        $prod->tbl_uom_id = EncDecHelper::encDecId($request->prodUOM,'decrypt');
        $prod->prod_min_order_qty = $request->minOrderQty;
        
        $prod->add_date = Date::now()->toDateString();
        $prod->add_time = Date::now()->toTimeString();
        
        
        $prod->save();

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
}
