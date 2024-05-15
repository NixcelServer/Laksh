<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Date;

class PostController extends Controller
{
    //submit requirement
    public static function submitRequirement(Request $request)
    {
        $post = new Post;
        $post->tbl_company_id = EncDecHelper::encDecId($request->encCompanyId,'decrypt');
        $post->prod_name = $request->productName;
        $post->prod_qty = $request->productQty;
        $post->tbl_uom_id = EncDecHelper::encDecId($request->encUomId,'decrypt');
        $post->prod_des = $request->productDes;
        $post->tbl_cat_id = EncDecHelper::encDecId($request->encCatId,'decrypt');
        $post->tbl_sub_cat_id = EncDecHelper::encDecId($request->encSubCatId,'decrypt');
        //$post->supplier_loc = $request->supplierLoc;
        $post->add_date = Date::now()->toDateString();
        $post->add_time = Date::now()->toTimeString();
        $post->save();

        return response()->json(['message' => 'Requirement posted successfully'], 200);



    }
}
