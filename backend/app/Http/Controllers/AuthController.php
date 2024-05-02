<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;

use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Date;


class AuthController extends Controller
{
    //
    public function login(Request $request)
    {
        //find the user from email id
        $user = User::where('u_email',$request->email)->where('u_designation','admin')->first();
        
        //check email is invalid return invalid error msg
        if (!$user) {
            return response()->json(['error' => 'Invalid email. Please enter a valid email.'], 400);
        }
       //return response()->json($request);
        //enc the pass recived from the request
        $encPass = EncDecHelper::encryptData($request->password);
       
        //if user exists validate password and redirect to respective page
        if (strcmp($user->u_password, $encPass) === 0) {
            $user->encUserId = EncDecHelper::encDecId($user->tbl_user_id,'encrypt');

            
            
            //unset some data while sending to the user
            unset($user->tbl_user_id,$user->u_password,$user->add_date,$user->add_time,$user->update_date,
                    $user->update_time,$user->verified_by,$user->verified_date,
                    $user->verified_time,$user->flag);
                    
            return response()->json(['user' => $user], 200);
                }else {
            // Password does not match, return error response
            return response()->json(['error' => 'Invalid password. Please enter a valid password.'], 400);
        }

    }

   
   

    public function register(Request $request)
    {
         
        $validator = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:mst_tbl_users,u_email',
            'mobile'=> 'required|numeric|digits:10|unique:mst_tbl_users,u_mob_no',
            'password' => ['required', 'min:8', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/'],
        ], [
            'email.unique' => 'This email address is already in use.',
            'password.regex' => 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'mobile.unique' => 'This mobile no is already registered.',
            'mobile.digits' => 'Invalid mobile number. Please provide a 10-digit mobile number.'
        ]);
    
        if ($validator instanceof Validator && $validator->fails()) {
            return response()->json(['error' => $validator->errors()], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
       // return response()->json($request);
        $encPass = EncDecHelper::encryptData($request->password);

        $user = new User;
        $user->u_name = $request->name;
        $user->u_email = $request->email;
        $user->u_mob_no = $request->mobile;
        $user->u_designation = 'Buyer';
        $user->u_password = $encPass;
        $user->add_date = Date::now()->toDateString();
        $user->add_time = Date::now()->toTimeString();
        $user->save();

        //insert entry into mst_tbl_companies
        $userId = $user->tbl_user_id;
        $company = new Company;
        $company->tbl_user_id = $userId;
        $company->save();



        //insert entry into mst_tbl_companies
        // $userId = $user->tbl_user_id;
        // $company = new Company;
        // $company->tbl_user_id = $userId;
        // $company->save();



        return response()->json(['message' => 'Registration Successfull'], 200);
    }

    public function uLogin(Request $request)
    {
        
        $encPass = EncDecHelper::encryptData($request->password);

        //find the user from email id
        $user = User::where('u_email', $request->email)
            ->whereNotIn('u_designation', ['admin'])
            ->first();

        
        
        //check email is invalid return invalid error msg
        if (!$user) {
            return response()->json(['error' => 'Invalid email. Please enter a valid email.'], 400);
        }

        //if user exists validate password and redirect to respective page
        if (strcmp($user->u_password, $encPass) === 0) {
            $user->encUserId = EncDecHelper::encDecId($user->tbl_user_id,'encrypt');

            $companyId = Company::where('tbl_user_id',$user->tbl_user_id)->value('tbl_company_id');
            $encCompanyId = EncDecHelper::encDecId($companyId,'encrypt');
            $user->encCompanyId = $encCompanyId;
            // Unset the non-encrypted ID
            unset($user->tbl_user_id,$user->u_password,$user->add_date,$user->add_time,$user->update_date,
                    $user->update_time,$user->verified_by,$user->verified_date,
                    $user->verified_time,$user->flag);
           // unset($user->tbl_user_id,$user->u_password);
            return response()->json(['user' => $user], 200);
        }else {
            // Password does not match, return error response
            return response()->json(['error' => 'Invalid password. Please enter a valid password.'], 400);
        }

    }

    // public function checkExistingEmail($email)
    // {
    //     //$email = $request->query('email');
    //     return response()->json($email);
    // }



    


}
