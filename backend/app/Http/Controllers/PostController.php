<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Product;
use App\Models\User;
use App\Models\Company;
use App\Models\CompanyAddress;
use App\Models\GstInfo;
use App\Models\PanInfo;
use App\Models\BankDetails;
use App\Models\SocialInfo;
use App\Models\AdvSubscription;
use App\Helpers\EncDecHelper;
use App\Helpers\EmailHelper;

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
        $post->packing_details = $request->packingDetails;
        $post->other_specifications = $request->otherSpecifications;
        //$post->supplier_loc = $request->supplierLoc;
        $post->add_date = Date::now()->toDateString();
        $post->add_time = Date::now()->toTimeString();
        $post->save();

        $companyDetails = Company::where('tbl_company_id',$post->tbl_company_id)->first();

        // Assuming you have saved the product already as $post
        $categoryId = $post->tbl_cat_id;


        // Fetch companies that have products in the same category
        $companies = Company::whereHas('products', function ($query) use ($categoryId) {
            $query->where('tbl_cat_id', $categoryId)
                ->where('flag', 'show');
        })->get();

       // Collect the emails from the related users
        $emails = $companies->pluck('user.u_email')->toArray();
    

        EmailHelper::sendEmail($emails,$companyDetails,$post);


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
        $post->packing_details = $request->packing_details;
        $post->other_specifications = $request->other_specifications;
        //$post->supplier_loc = $request->supplierLoc;
        $post->add_date = Date::now()->toDateString();
        $post->add_time = Date::now()->toTimeString();
        $post->save();

        return response()->json(['message' => 'Requirement update successfully'], 200);
    }

    public static function deleteOrder($id)
    {
        $decPostId = EncDecHelper::encDecId($id, 'decrypt');
        
        $order = Post::where('tbl_post_id',$decPostId)->where('flag','show')->first();
       
        
        $order->flag = 'deleted';
        $order->save();
        
        return response()->json(['message' => 'Order deleted successfully'], 200);
    }   

    public function getBuyleads($id)
    {
       // Step 1: Retrieve all tbl_cat_id values from the products
        $tbl_cat_ids = Product::where('tbl_company_id', EncDecHelper::encDecId($id, 'decrypt'))
        ->where('flag', 'show')
        ->pluck('tbl_cat_id')
        ->toArray();

        // if (empty($tbl_cat_ids)) {
        //     return response()->json(['message' => 'No matching products found', 'tbl_cat_ids' => $tbl_cat_ids], 200);
        // }
      
        // Step 2: Use the retrieved tbl_cat_id values to get the posts
        $posts = Post::whereIn('tbl_cat_id', $tbl_cat_ids)->get();

        foreach($posts as $post){
            $company = Company::where('tbl_company_id',$post->tbl_company_id)->first();
            
            $post->buyerName = $company->c_name;
            $user = User::where('tbl_user_id',$company->tbl_user_id)->first();
            $post->buyerEmail = $user->u_email;
            $post->buyerContactNo = $user->u_mob_no;
            $post->encPostId = EncDecHelper::encDecId($post->tbl_post_id,'encrypt');
            $post->encCompanyId = EncDecHelper::encDecId($post->tbl_company_id,'encrypt');
            $post->encUomId = EncDecHelper::encDecId($post->tbl_uom_id,'encrypt');
            $post->encCatId = EncDecHelper::encDecId($post->tbl_cat_id,'encrypt');
            $post->encSubCatId = EncDecHelper::encDecId($post->tbl_sub_cat_id,'encrypt');

            unset($post->tbl_post_id,$post->tbl_company_id,$post->tbl_uom_id,$post->tbl_cat_id,$post->tbl_sub_cat_id);
        }

        return response()->json($posts);
        
    }

    public static function submitRequirementEmail(Request $request)
    {
            // Check if a user with the given email exists
        $existingUser = User::where('u_email', $request->emailId)->where('flag','show')->first();

        if ($existingUser) {
            // If user exists, get the company ID
            $userId = $existingUser->tbl_user_id;
            $company = Company::where('tbl_user_id', $userId)->first();
        } else {
            // If user does not exist, create a new user
            $user = new User;
            $user->u_email = $request->emailId;
            $user->u_designation = 'Buyer';
            $user->add_date = Date::now()->toDateString();
            $user->add_time = Date::now()->toTimeString();
            $user->save();

            $userId = $user->tbl_user_id;
            $company = new Company;
            $company->tbl_user_id = $userId;
            $company->save();

            $companyAddress = new CompanyAddress;
            $companyAddress->tbl_company_id = $company->tbl_company_id;
            $companyAddress->save();

            $gstInfo = new GstInfo;
            $gstInfo->tbl_company_id = $company->tbl_company_id;
            $gstInfo->save();

            $panInfo = new PanInfo;
            $panInfo->tbl_company_id = $company->tbl_company_id;
            $panInfo->save();

            $bankDetails = new BankDetails;
            $bankDetails->tbl_company_id = $company->tbl_company_id;
            $bankDetails->save();

            $csi = new SocialInfo;
            $csi->tbl_company_id = $company->tbl_company_id;
            $csi->save();

            $advSubs =  new AdvSubscription;
            $advSubs->tbl_user_id = $userId;
            $advSubs->save();

        }

        $post = new Post;
        $post->tbl_company_id = $company->tbl_company_id;
        $post->prod_name = $request->productName;
        $post->prod_qty = $request->productQty;
        $post->tbl_uom_id = EncDecHelper::encDecId($request->encUomId,'decrypt');
        $post->prod_des = $request->productDes;
        $post->tbl_cat_id = EncDecHelper::encDecId($request->encCatId,'decrypt');
        $post->tbl_sub_cat_id = EncDecHelper::encDecId($request->encSubCatId,'decrypt');
        //$post->supplier_loc = $request->supplierLoc;
        $post->packing_details = $request->packingDetails;
        $post->other_specifications = $request->otherSpecifications;
        $post->add_date = Date::now()->toDateString();
        $post->add_time = Date::now()->toTimeString();
        $post->save();

        $companyDetails = Company::where('tbl_company_id',$post->tbl_company_id)->first();

        // Assuming you have saved the product already as $post
        $categoryId = $post->tbl_cat_id;


        // Fetch companies that have products in the same category
        $companies = Company::whereHas('products', function ($query) use ($categoryId) {
            $query->where('tbl_cat_id', $categoryId)
                ->where('flag', 'show');
        })->get();

       // Collect the emails from the related users
        $emails = $companies->pluck('user.u_email')->toArray();
    

        EmailHelper::sendEmail($emails,$companyDetails,$post);


        return response()->json(['message' => 'Requirement posted successfully'], 200);
    }
}
