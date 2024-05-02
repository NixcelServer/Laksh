<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\CompanyAddress;
use App\Models\GstInfo;
use App\Models\PanInfo;
use App\Models\SocialInfo;
use App\Models\BankDetails;
use Illuminate\Support\Facades\Date;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Storage;

class CompanyRegistrationController extends Controller
{
    //
    public function registerCompany(Request $request)
    {
        $decUserId = EncDecHelper::encDecId($request->encUserId,'decrypt');
        
        $company = Company::where('tbl_user_id',$decUserId)->first();
        
        $company->c_name = $request->name;
        $company->c_cin_no = $request->cinNo;
        $company->c_tan_no = $request->tanNo;
        $company->c_iec = $request->iec;
        $company->c_annual_to = $request->annualTurnover;
        $company->no_of_emps = $request->noOfEmps;
        $company->c_mobile_no = $request->mobileNo;
        $company->c_alt_mobile_no = $request->altMobileNo;
        $company->c_landline_no = $request->landlineNo;
        $company->c_alt_landline_no = $request->altLandlineNo;
        $company->add_date = Date::now()->toDateString();
        $company->add_time = Date::now()->toTimeString();
        $company->flag = 'show';
        //return  response()->json($company);
        $company->save();

        //insert entry into tbl_company_address
        $companyId = $company->tbl_company_id;

        $companyAddress = new CompanyAddress;
        $companyAddress->tbl_company_id = $companyId;
        $companyAddress->pincode = $request->pincode;
        $companyAddress->city = $request->city;
        $companyAddress->state = $request->state;
        $companyAddress->country = $request->country;
        $companyAddress->house_no = $request->houseNo;
        $companyAddress->area = $request->area;
        $companyAddress->locality = $request->locality;
        $companyAddress->landmark = $request->landmark;
        $companyAddress->add_date = Date::now()->toDateString(); 
        $companyAddress->add_time = Date::now()->toTimeString();
        

        //insert data into tbl_gst_info
        $gstInfo = new GstInfo;
        $gstInfo->tbl_company_id = $companyId;
        $gstInfo->gst_no = $request->gstNo;
        $gstInfo->gst_status = 'Not Verified';
        $gstInfo->add_date = Date::now()->toDateString();
        $gstInfo->add_time = Date::now()->toTimeString();
       // 

        //insert data into tbl_pan_info
        $panInfo = new PanInfo;
        $panInfo->tbl_company_id = $companyId;
        $panInfo->pan_no = $request->panNo;
        $panInfo->pan_status = 'Not Verified';
        $panInfo->add_date = Date::now()->toDateString();
        $panInfo->add_time = Date::now()->toTimeString();
        //

        //insert data into tbl_bank_details
        $bankDetails = new BankDetails;
        $bankDetails->tbl_company_id = $companyId;
        $bankDetails->acc_no = $request->accountNo;
        $bankDetails->acc_name = $request->accountName;
        $bankDetails->ifsc = $request->ifsc;
        $bankDetails->branch_name = $request->branchName;
        $bankDetails->bank_name = $request->bankName;
        $bankDetails->add_date = Date::now()->toDateString();
        $bankDetails->add_time = Date::now()->toTimeString();
       // 

        //insert data into tbl_companies_social_info

        $csi = new SocialInfo;
        $csi->tbl_company_id = $companyId;
        $csi->website_url = $request->websiteUrl;
        $csi->instagram_url = $request->instagramUrl;
        $csi->facebook_url = $request->facebookUrl;
        $csi->add_date = Date::now()->toDateString();
        $csi->add_time = Date::now()->toTimeString();
       // 

        //try {
            // $companyAddress->save();
            // $gstInfo->save();
            // $panInfo->save();
            // $bankDetails->save();
            // $csi->save();

            Storage::disk()->makeDirectory($companyId);
            return response()->json("success");
          //  return  response()->json(['message' => 'Company Registered successfully'], 200);
        //} catch (\Exception $e) {
        // Handle the exception
         //   return response()->json(['error' => 'An error occurred while saving data.'], 500);
        //}

    }
}
