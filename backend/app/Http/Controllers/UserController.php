<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserAdvertisement;
use Illuminate\Support\Facades\Date;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
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
        $images = UserAdvertisement::where('display','yes')->where('flag','show')->get();
        
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
}
