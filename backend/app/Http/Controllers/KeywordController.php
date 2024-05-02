<?php

namespace App\Http\Controllers;
use App\Models\Keyword;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Date;

use Illuminate\Http\Request;

class KeywordController extends Controller
{
    //create a keyword
    public function createKeyword(Request $request)
    {
        
        try {
            $validatedData = $request->validate([
                'keywordName' => [
                    'required',
                    'unique_keyword_based_on_flag', // Custom validation rule
                ],
            ]);
        } catch (\Exception $e) {
                return response()->json(['error' => "Keyword '{$request->keywordName}' already exists"], 422);
        }
        

        // try
        // {
            $keyword = new Keyword;
            $keyword->keyword_name = $request->keywordName;
            $keyword->add_by = EncDecHelper::encDecId($request->encUserId,'decrypt');
           // $keyword->add_by = '2';
            $keyword->add_date = Date::now()->toDateString();
            $keyword->add_time = Date::now()->toTimeString();
            $keyword->save();

            return response()->json(['message' => 'Keyword Registered Succesfully'], 200);   
       // }
        // catch(\Exception $e)
        // {
        //     return response()->json(['error' => 'An error occurred while registering the keyword'], 500);
        // }
        

    }

    public function showKeywords()
    {
        $keywords = Keyword::where('flag','show')->get();

        foreach($keywords as $keyword)
        {
            $keyword->encKeywordId = EncDecHelper::encDecId($keyword->tbl_keyword_id,'encrypt');

            // Unset the non-encrypted ID
            unset($keyword->tbl_keyword_id,$keyword->add_by);
        }

        // Return a JSON response containing the encrypted UOM IDs
        return response()->json($keywords);
    }

    public function deleteKeywords(Request $request, $id)
    {
        $decKeywordId = EncDecHelper::encDecId($id,'decrypt');
    

        $keyword = Keyword::findOrFail($decKeywordId);

        //set the flag to be deleted
        $keyword->flag = 'deleted';
        $keyword->deleted_by = EncDecHelper::encDecId($request->encUserId,'decrypt');
        $keyword->deleted_date = Date::now()->toDateString();
        $keyword->deleted_time = Date::now()->toTimeString();

        $keyword->save();

        //return a json response
        return response()->json(['message'=>'Keyword deleted successfully']);
    }
}
