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
        $company->c_name = $request->c_name;
        $company->c_cin_no = $request->c_cin_no;
        $company->c_tan_no = $request->c_tan_no;
        $company->c_iec = $request->c_iec;
        $company->c_annual_to = $request->c_annual_to;
        $company->no_of_emps = $request->no_of_emps;
        $company->c_mobile_no = $request->c_mobile_no;
        $company->c_alt_mobile_no = $request->c_alt_mobile_no;
        $company->c_landline_no = $request->c_landline_no;
        $company->c_alt_landline_no = $request->c_alt_landline_no;
        if ($request->hasFile('file')) {
        $directory = $company->tbl_company_id . '/company-logo' ; 
        $company->c_logo_path = $request->file('file')->storeAs($directory, $request->file('file')->getClientOriginalName());
        }
        $company->add_date = Date::now()->toDateString();
        $company->add_time = Date::now()->toTimeString();
        $company->flag = 'show';
       
        $company->save();

        //insert entry into tbl_company_address
        $companyId = $company->tbl_company_id;
        
        $companyAddress = CompanyAddress::where('tbl_company_id',$companyId)->where('flag','show')->first();
        $companyAddress->pincode = $request->pincode;
        $companyAddress->city = $request->city;
        $companyAddress->state = $request->state;
        $companyAddress->country = $request->country;
        $companyAddress->house_no = $request->house_no;
        $companyAddress->area = $request->area;
        $companyAddress->locality = $request->locality;
        $companyAddress->landmark = $request->landmark;
        $companyAddress->add_date = Date::now()->toDateString(); 
        $companyAddress->add_time = Date::now()->toTimeString();
                

        //insert data into tbl_gst_info
        $gstInfo = GstInfo::where('tbl_company_id',$companyId)->where('flag','show')->first();
        $gstInfo->gst_no = $request->gst_no;
        $gstInfo->gst_status = 'Not Verified';
        $gstInfo->add_date = Date::now()->toDateString();
        $gstInfo->add_time = Date::now()->toTimeString();
       // 

        //insert data into tbl_pan_info
        $panInfo = PanInfo::where('tbl_company_id',$companyId)->where('flag','show')->first();
        $panInfo->pan_no = $request->pan_no;
        $panInfo->pan_status = 'Not Verified';
        $panInfo->add_date = Date::now()->toDateString();
        $panInfo->add_time = Date::now()->toTimeString();
        //

        //insert data into tbl_bank_details
        $bankDetails = BankDetails::where('tbl_company_id',$companyId)->where('flag','show')->first();
        $bankDetails->acc_no = $request->acc_no;
        $bankDetails->acc_name = $request->acc_name;
        $bankDetails->ifsc = $request->ifsc;
        $bankDetails->branch_name = $request->branch_name;
        $bankDetails->bank_name = $request->bank_name;
        $bankDetails->add_date = Date::now()->toDateString();
        $bankDetails->add_time = Date::now()->toTimeString();
       // 

        //insert data into tbl_companies_social_info

        $csi = SocialInfo::where('tbl_company_id',$companyId)->where('flag','show')->first();
        $csi->website_url = $request->website_url;
        $csi->instagram_url = $request->instagram_url;
        $csi->facebook_url = $request->facebook_url;
        
        $csi->add_date = Date::now()->toDateString();
        $csi->add_time = Date::now()->toTimeString();
       // 

        // try {
            $companyAddress->save();
            $gstInfo->save();
            $panInfo->save();
            $bankDetails->save();
            $csi->save();

            Storage::disk()->makeDirectory($companyId);
            return response()->json($company);
           return  response()->json(['message' => 'Company Registered successfully'], 200);
        // } catch (\Exception $e) {
       // Handle the exception
           return response()->json(['error' => 'An error occurred while saving data.'], 500);
        // }

    }

    public function getCompany($id)
    {
        $companies = collect();
        $decCompanyId = EncDecHelper::encDecId($id,'decrypt');
        $company  = Company::where('tbl_company_id',$decCompanyId)->where('flag','show')->first();
        unset($company->tbl_company_id,$company->tbl_user_id);
        $companyAddress  = CompanyAddress::where('tbl_company_id',$decCompanyId)->where('flag','show')->first();
        unset($companyAddress->tbl_c_add_id,$companyAddress->tbl_company_id);
        $gstInfo  = GstInfo::where('tbl_company_id',$decCompanyId)->where('flag','show')->first();
        unset($gstInfo->tbl_gst_id,$gstInfo->tbl_company_id);
        $panInfo  = PanInfo::where('tbl_company_id',$decCompanyId)->where('flag','show')->first();
        unset($panInfo->tbl_pan_id,$panInfo->tbl_company_id);
        $bankDetails  = BankDetails::where('tbl_company_id',$decCompanyId)->where('flag','show')->first();
        unset($bankDetails->tbl_bank_detail_id,$bankDetails->tbl_company_id);
        $csi  = SocialInfo::where('tbl_company_id',$decCompanyId)->where('flag','show')->first();
        unset($csi->tbl_csi_id,$csi->tbl_company_id);

        $companies = $companies
         ->merge($company)
        ->merge($companyAddress)
        ->merge($gstInfo)
        ->merge($panInfo)
        ->merge( $bankDetails)
        ->merge($csi);
       // $companies =$companyAddress->merge($panInfo);

        // foreach($companies as $company){
        //     $company->encCompanyId = EncDecHelper::encDecId($company->tbl_company_id,'encrypt');
        //     unset($company->tbl_company_id,$companyAddress->tbl_c_add_id,);
        // }
        return response()->json($companies);

    }
    
    public function checkCINNO(Request $request, $id)
    {
        $decCompanyId = EncDecHelper::encDecId($id,'decrypt');
        $cinNoExists = Company::where('c_cin_no',$request->c_cin_no) ->where('tbl_company_id', '!=', $decCompanyId)->exists();
        return response()->json($cinNoExists);
    }

    public function checkCompanyName(Request $request,$id)
    {
        $decCompanyId = EncDecHelper::encDecId($id,'decrypt');
        $CompanyNameExists = Company::where('c_name',$request->c_name) ->where('tbl_company_id', '!=', $decCompanyId)->exists();
        return response()->json($CompanyNameExists);
    }
   
    public function checkTANNO(Request $request,$id)
    {
        $decCompanyId = EncDecHelper::encDecId($id,'decrypt');
        $tanNoExists = Company::where('c_tan_no',$request->c_tan_no) ->where('tbl_company_id', '!=', $decCompanyId)->exists();
        return response()->json($tanNoExists);
    }

    public function checkIECNO(Request $request,$id)
    {
        $decCompanyId = EncDecHelper::encDecId($id,'decrypt');
        $iecNoExists = Company::where('c_iec',$request->c_iec)->where('tbl_company_id', '!=', $decCompanyId)->exists();
        return response()->json($iecNoExists);
    }

    public function checkMOBNO(Request $request,$id)
    {
        $decCompanyId = EncDecHelper::encDecId($id,'decrypt');
        $mobnoExists = Company::where('c_mobile_no',$request->c_mobile_no)->where('tbl_company_id', '!=', $decCompanyId)->exists();
        return response()->json($mobnoExists);
    }

    public function checkALTMOBNO(Request $request,$id)
    {
        $decCompanyId = EncDecHelper::encDecId($id,'decrypt');
        $altmobnoExists = Company::where('c_alt_mobile_no',$request->c_alt_mobile_no)->where('tbl_company_id', '!=', $decCompanyId)->exists();
        return response()->json($altmobnoExists);
    }

    public function checkLANDLINENO(Request $request,$id)
    {
        $decCompanyId = EncDecHelper::encDecId($id,'decrypt');
        $landlnenoExists = Company::where('c_landline_no',$request->c_landline_no)->where('tbl_company_id', '!=', $decCompanyId)->exists();
        return response()->json($landlnenoExists);
    }

    public function checkALTLANDLINENO(Request $request,$id)
    {
        $decCompanyId = EncDecHelper::encDecId($id,'decrypt');
        $altlandlnenoExists = Company::where('c_alt_landline_no',$request->c_alt_landline_no)->where('tbl_company_id', '!=', $decCompanyId)->exists();
        return response()->json($altlandlnenoExists);
    }

    public function checkACCNO(Request $request,$id)
    {
        $decCompanyId = EncDecHelper::encDecId($id,'decrypt');
        $accnoExists = BankDetails::where('acc_no',$request->acc_no)->where('tbl_company_id', '!=', $decCompanyId)->exists();
        return response()->json($accnoExists);
    }
}
