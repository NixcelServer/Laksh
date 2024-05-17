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

    public static function myOrders($id)
    {
        $posts = Post::where('tbl_company_id',EncDecHelper::encDecId($id,'decrypt'))->where('flag','show')->get();

        foreach($posts as $post){
        $post->encPostId = EncDecHelper::encDecId($post->tbl_post_id,'encrypt');
        $post->encCompanyId = EncDecHelper::encDecId($post->tbl_company_id,'encrypt');
        $post->encCatId = EncDecHelper::encDecId($post->tbl_cat_id,'encrypt');
        $post->encSubCatId = EncDecHelper::encDecId($post->tbl_sub_cat_id,'encrypt');
        $post->encUomId = EncDecHelper::encDecId($post->tbl_uom_id,'encrypt');
        unset($post->tbl_post_id,$post->tbl_company_id,$post->tbl_cat_id,$post->tbl_sub_cat_id,$post->tbl_uom_id);
        }
        return response()->json($posts);
    }

    public static function deleteOrder($id)
    {
        $decPostId = EncDecHelper::encDecId($id, 'decrypt');
        
        $order = Post::where('tbl_post_id',$decPostId)->where('flag','show')->first();
       
        
        $order->flag = 'deleted';
        $order->save();
        

        return response()->json(['message' => 'Order deleted successfully'], 200);
    }   
    
    public static function updateOrder(Request $request)
    {
        $decPostId = EncDecHelper::encDecId($request->encPostId, 'decrypt');
        $post = Post::where('tbl_post_id',$decPostId)->where('flag','show')->first();
        $post->prod_name = $request->prod_name;
        $post->prod_qty = $request->prod_qty;
        $post->tbl_uom_id = EncDecHelper::encDecId($request->encUomId,'decrypt');
        $post->prod_des = $request->prod_des;
        $post->tbl_cat_id = EncDecHelper::encDecId($request->encCatId,'decrypt');
        $post->tbl_sub_cat_id = EncDecHelper::encDecId($request->encSubCatId,'decrypt');
        //$post->supplier_loc = $request->supplierLoc;
        $post->add_date = Date::now()->toDateString();
        $post->add_time = Date::now()->toTimeString();
        $post->save();

        return response()->json(['message' => 'Requirement update successfully'], 200);
    }
}
