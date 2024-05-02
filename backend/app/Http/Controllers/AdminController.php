<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UnitOfMeasurement;
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
}
