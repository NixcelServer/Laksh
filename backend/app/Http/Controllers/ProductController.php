<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
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
        return response()->json($prod);

        
        

        // $directory = $decCompanyId . '/products' ; 
        // $prod->prod_img_path = $request->file('file')->storeAs($directory, $request->file('file')->getClientOriginalName());
        // return response()->json("success");

    }
}
