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
use App\Models\LandingPageImage;
use App\Models\UserAdvertisement;

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

    public function addLandingPageImgs(Request $request)
    {
        $decUserId = EncDecHelper::encDecId($request->encUserId,'decrypt');
        $img = new LandingPageImage;
        $directory = '/Admin' . '/Landing Page' ; 
        $img->lp_img_path = $request->file('image')->storeAs($directory, $request->file('image')->getClientOriginalName());
        $img->add_by = $decUserId;
        $img->add_date = Date::now()->toDateString();
        $img->add_time = Date::now()->toTimeString();
        $img->save(); 

        return response()->json(['message' => 'Advertisement image added successfully'], 200);
    }

    public function getLpImages(Request $request)
    {
        $decUserId = EncDecHelper::encDecId($request->encUserId, 'decrypt');
       
        $images = LandingPageImage::where('flag','show')->get();

        foreach($images as $image){
            $image->encLpImgId = EncDecHelper::encDecId($image->tbl_lp_img_id, 'encrypt');
            unset($image->tbl_lp_img_id);
        }

        return response()->json(['images' => $images], 200);
    }

    public function selectedImg(Request $request)
    {
       
        $encImageIds = $request->input('selectedImageIds'); // Retrieve the array of encrypted image IDs from the request

        foreach ($encImageIds as $encImageId) {
            $decImageId = EncDecHelper::encDecId($encImageId, 'decrypt'); // Decrypt the image ID

           // Find the record by the decrypted ID and update the flag to 'show'
            LandingPageImage::where('tbl_lp_img_id', $decImageId)
                            ->update(['display' => 'yes']);
        }

        return response()->json(['message' => 'Selected images updated successfully'], 200);
    }

    public function deleteLpImage($encLpImgId, $encUserId)
{
    // Decrypt the encAdvImgId and encUserId to get the actual IDs
    $lpImgId = EncDecHelper::encDecId($encLpImgId, 'decrypt');
    $userId = EncDecHelper::encDecId($encUserId, 'decrypt');

    $lpImg = LandingPageImage::where('tbl_lp_img_id',$lpImgId)->where('flag','show')->first();
    $lpImg->deleted_by = $userId;
    $lpImg->deleted_date = Date::now()->toDateString();
    $lpImg->deleted_time = Date::now()->toTimeString();
    $lpImg->flag = 'deleted';
    $lpImg->save();

    
    return response()->json(['message' => 'Selected images updated successfully'], 200);
}


    public function getPendingAdv()
    {
        $advs = UserAdvertisement::where('adv_status', 'pending')
        ->where('flag', 'show')
        ->with('company') // Eager loading the company details
        ->get();
        foreach($advs as $adv){
            $adv->encAdvImgId = EncDecHelper::encDecId($adv->tbl_adv_img_id,'encrypt');
           
            $adv->encCompanyId = EncDecHelper::encDecId($adv->tbl_company_id,'encrypt');
            unset($adv->tbl_adv_img_id,$adv->tbl_company_id,$adv->company->tbl_company_id,$adv->company->tbl_user_id);
        }
        return response()->json($advs);
    }

    public function approveAdv($id)
    {
        $adv = UserAdvertisement::where('tbl_adv_img_id',EncDecHelper::encDecId($id,'decrypt'))->first();
        $adv->adv_status = 'approved';
        $adv->save();
        return response()->json(['message' => 'Status updated successfully'], 200);
    }

    public function rejectAdv($id)
    {
        $adv = UserAdvertisement::where('tbl_adv_img_id',EncDecHelper::encDecId($id,'decrypt'))->first();
        $adv->adv_status = 'rejected';
        $adv->save();
        return response()->json(['message' => 'Status updated successfully'], 200);
    }

}
