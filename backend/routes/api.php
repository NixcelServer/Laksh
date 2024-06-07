<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\KeywordController;
use App\Http\Controllers\UOMController;
use App\Http\Controllers\CompanyRegistrationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PostController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function () {
    $data = [
        'message' => 'Welcome to our API!',
        'status' => 'success'
    ];

    return response()->json($data);
});

//admin login 
Route::post('/login',[AuthController::class,'login']);

//user registrtion
Route::post('/register',[AuthController::class,'register']);

//user login
Route::post('/logsin',[AuthController::class,'uLogin']);

Route::post('/send-otp',[AuthController::class,'sendOtp']);
Route::post('/verify-otp',[AuthController::class,'verifyOtp']);

//admin dashboard contents
Route::get('/dashcontents',[AdminController::class,'adminDashboardContents']);

//adding landing page images
Route::post('/add-landing-pg-img',[AdminController::class,'addLandingPageImgs']);

//get the images uploaded by admin
Route::get('/get-lp-imgs', [AdminController::class, 'getLpImages']);

//delete landing page image
Route::delete('/landing-pg-imgs/delete/{encLpImgId}/{encUserId}', [AdminController::class, 'deleteLpImage']);


//get the pending adv images
Route::get('/get-pending-adv-imgs',[AdminController::class,'getPendingAdv']);

Route::get('/approve-advertisement/{id}',[AdminController::class,'approveAdv']);

Route::get('/reject-advertisement/{id}',[AdminController::class,'rejectAdv']);



Route::post('selected-lp-images',[AdminController::class,'selectedImg']);




//check for existing mail id
//Route::get('/check-existing-email', [AuthController::class,'checkExistingEmail']);

//create uom
Route::post('/unit-of-measurements',[UOMController::class,'createUOM']);
Route::post('/unit-of-measurements',[UOMController::class,'createUOM']);

Route::get('/unit-of-measurements',[UOMController::class,'showUOM']);
Route::get('/unit-of-measurements',[UOMController::class,'showUOM']);

Route::delete('/unit-of-measurements/{id}',[UOMController::class,'deleteUOM']);
Route::delete('/unit-of-measurements/{id}',[UOMController::class,'deleteUOM']);

//create category
Route::post('/categories',[CategoryController::class,'createCategory']);

//update category
Route::post('/categories/update',[CategoryController::class,'updateCategory']);

//view categories
Route::get('/categories',[CategoryController::class,'viewCategories']);

//delete categories
Route::delete('/categories/{id}',[CategoryController::class,'deleteCategory']);

//create sub category
Route::post('/sub-categories',[CategoryController::class,'createSubCategory']);

//view sub categories
Route::get('/sub-categories',[CategoryController::class,'viewSubCategories']);

//delete sub categories
Route::delete('/sub-categories/{id}',[CategoryController::class,'deleteSubCategory']);


//create keywords
Route::post('/keywords',[KeywordController::class,'createKeyword']);

//show keywords
Route::get('/keywords',[KeywordController::class,'showKeywords']);

//delete Keywords
Route::delete('/keywords/{id}',[KeywordController::class,'deleteKeywords']);

//Register your company
Route::post('/registeryourcompany',[CompanyRegistrationController::class,'registerCompany']);

Route::get('/companydetails/{id}',[CompanyRegistrationController::class,'getCompany']);

// validations for company registration
Route::post('/check-cin-no/{id}',[CompanyRegistrationController::class,'checkCINNO']);
Route::post('/check-company-name/{id}',[CompanyRegistrationController::class,'checkCompanyName']);
Route::post('/check-tan-no/{id}',[CompanyRegistrationController::class,'checkTANNO']);
Route::post('/check-iec-no/{id}',[CompanyRegistrationController::class,'checkIECNO']);
Route::post('/check-mobile-no/{id}',[CompanyRegistrationController::class,'checkMOBNO']);
Route::post('/check-alt-mobile-no/{id}',[CompanyRegistrationController::class,'checkALTMOBNO']);
Route::post('/check-landline-no/{id}',[CompanyRegistrationController::class,'checkLANDLINENO']);
Route::post('/check-alt-landline-no/{id}',[CompanyRegistrationController::class,'checkALTLANDLINENO']);
Route::post('/check-acc-no/{id}',[CompanyRegistrationController::class,'checkACCNO']);
//Register Products
Route::post('/registerProduct',[ProductController::class,'registerProduct']);

//get all admin
Route::get('/getall',[AdminController::class,'getAllAdmin']);

Route::post('/product/store',[ProductController::class,'storeProduct']);

Route::delete('/product/{id}',[ProductController::class,'deleteProducts']);

Route::post('/product/update-product',[ProductController::class,'updateProduct']);


//get products 
Route::get('/getproducts/{id}',[ProductController::class,'getProducts']);


Route::get('/limited-products/{id}', [ProductController::class, 'limitedProducts']);

// check product name
Route::post('/check-product-name/{id}',[ProductController::class,'checkProductName']);


// check product name
Route::post('/check-product-name/{id}',[ProductController::class,'checkProductName']);


//submit requirements routes
Route::post('/submit-requirement',[PostController::class,'submitRequirement']);

Route::get('/my-orders/{id}',[PostController::class,'myOrders']);

Route::get('/buyleads/{id}',[PostController::class,'getBuyleads']);

Route::post('/update-order',[PostController::class,'updateOrder']);

Route::delete('/delete-order/{id}',[PostController::class,'deleteOrder']);

Route::post('/submit-requirement-email',[PostController::class,'submitRequirementEmail']);



Route::post('/add-adv-img',[UserController::class,'addAdvImages']);

// Route for fetching uploaded advertisement images
Route::get('get-adv-img', [UserController::class, 'getAdvImages']);

Route::get('/display-adv-images',[UserController::class,'advertismentImgs']);

Route::post('selected-u-images-adv',[UserController::class,'selectedImg']);

Route::delete("/adv-imgs/delete/{id}", [UserController::class, "deleteImg"]);

Route::post('/update-subs-status',[UserController::class,"updateSubStatus"]);

Route::get('/set-lp-imgs',[UserController::class,'setLpImgs']);

Route::middleware(['preventBackHistory'])->group(function () {



});





