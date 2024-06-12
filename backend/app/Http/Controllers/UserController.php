<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserAdvertisement;
use App\Models\AdvSubscription;
use App\Models\LandingPageImage;
use App\Models\Company;
use App\Helpers\EmailHelper;
use Illuminate\Support\Facades\Date;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{

    protected $postController;
    protected $productController;

    public function __construct(ProductController $productController, PostController $postController)
    {
        $this->productController = $productController;
        $this->postController = $postController;
    }

    //add advertisment 
    public function addAdvImages(Request $request)
    {   
        $decCompanyId = EncDecHelper::encDecId($request->encCompanyId,'decrypt');
        $img = new UserAdvertisement;
        $img->tbl_company_id = $decCompanyId;
        $directory = $decCompanyId . '/advertisement' ; 
        $img->adv_img_path = $request->file('image')->storeAs($directory, $request->file('image')->getClientOriginalName());
        $img->add_date = Date::now()->toDateString();
        $img->add_time = Date::now()->toTimeString();
        $img->save(); 

        $comapnyDetails = Company::where('tbl_company_id',$decCompanyId)->first();

        EmailHelper::sendEmail($emails=null,$comapnyDetails,$post=null);

        return response()->json(['message' => 'Advertisement image added successfully'], 200);
    }

    public function getAdvImages(Request $request)
    {
        $decCompanyId = EncDecHelper::encDecId($request->encCompanyId, 'decrypt');
       
        $images = UserAdvertisement::where('tbl_company_id',$decCompanyId)->where('flag','show')->get();

        foreach($images as $image){
            $image->encAdvImgId = EncDecHelper::encDecId($image->tbl_adv_img_id, 'encrypt');
            unset($image->tbl_adv_img_id);
        }

        return response()->json(['images' => $images], 200);
    }

    public function selectedImg(Request $request)
    {
        $encImageIds = $request->input('selectedImageIds'); // Retrieve the array of encrypted image IDs from the request

        foreach ($encImageIds as $encImageId) {
            $decImageId = EncDecHelper::encDecId($encImageId, 'decrypt'); // Decrypt the image ID

           // Find the record by the decrypted ID and update the flag to 'show'
            UserAdvertisement::where('tbl_adv_img_id', $decImageId)
                            ->update(['display' => 'yes']);
        }

    return response()->json(['message' => 'Selected images updated successfully'], 200);
    }

    public function advertismentImgs()
    {
        $images = UserAdvertisement::where('adv_status','approved')->where('flag','show')->get();
        
        foreach($images as $image)
        {
            $image->encImgId = EncDecHelper::encDecId($image->tbl_adv_img_id,'encrypt');
            unset($image->tbl_adv_img_id);
        }

        return response()->json($images,200);
    }

    public function deleteImg($id)
    {
        $image = UserAdvertisement::where('tbl_adv_img_id',EncDecHelper::encDecId($id,'decrypt'))->first();
        $image->flag = 'deleted';
        $image->display = 'no';
        $image->deleted_date = Date::now()->toDateString();
        $image->deleted_time = Date::now()->toTimeString();
        $image->save();
        return response()->json($id,200);
    }

    public function updateSubStatus(Request $request)
{
    // Get the selected plan from the request
    $selectedPlan = $request->input('selectedPlan');

    // Retrieve the subscription record
    $subs = AdvSubscription::where('tbl_user_id', EncDecHelper::encDecId($request->encUserId, 'decrypt'))->first();
    $subs->is_subscribed = true;

    if ($subs && $selectedPlan) {
        // Set subscription start date and time
        $subs->subs_start_date = now()->toDateString();
        $subs->subs_start_time = now()->toTimeString();

        // Calculate subscription end date and time based on the selected plan
        switch ($selectedPlan) {
            case 'Monthly':
                $subs->subs_end_date = now()->addDays(30)->toDateString();
                break;
            case 'Quarterly':
                $subs->subs_end_date = now()->addDays(120)->toDateString();
                break;
            case 'Annually':
                $subs->subs_end_date = now()->addDays(365)->toDateString();
                break;
            default:
                // Handle unknown plan types if needed
                break;
        }

        // Set subscription end time to current time
        $subs->subs_end_time = now()->toTimeString();

        // Save the changes to the subscription
        $subs->save();
    }

    // Return the updated subscription as JSON response
    return response()->json($subs);
}

public static function setLpImgs()
{
 
    $imgs = LandingPageImage::where('display','yes')->where('flag','show')->get();
    return response()->json($imgs,200);
}

public function userDashInfo($id)
{
     // Call the getBuyleads method from the PostController
     $buyLeadsResponse = $this->postController->getBuyleads($id);
    
     // Decode the JSON response to access the buy leads
     $buyLeads = json_decode($buyLeadsResponse->getContent());
 
     // Count the number of buy leads
     $buyLeadsCount = count($buyLeads);

     $products = $this->productController->getProducts($id);
     
    //  $products = json_decode($getProductsResponse->getContent());

      $productsCount = $products->count();
     // Return the count as a JSON response

     $response = [
        'buyLeadsCount' => $buyLeadsCount,
        'productsCount' => $productsCount
    ];
     return response()->json($response,200);


}

}
