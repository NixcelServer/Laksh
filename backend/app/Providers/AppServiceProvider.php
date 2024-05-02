<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //keyword validation
        // Validator::extend('unique_keyword_based_on_flag', function ($attribute, $value, $parameters, $validator) {
        
        //     $existingKeyword = \App\Models\Keyword::where('keyword_name', $value)
        //         ->where('flag', 'show')
        //         ->exists();
    
        //     // If the keyword with the same name and flag 'show' exists, return false
        //     if ($existingKeyword) {
        //         return false;
        //     } else {
        //         // If the keyword doesn't exist or if it doesn't have the flag 'show', return true
        //         return true;
        //     }
        // });

        Validator::extend('unique_keyword_based_on_flag', function ($attribute, $value, $parameters, $validator) {
            $existingKeyword = \App\Models\Keyword::where('keyword_name', $value)
                ->where('flag', 'show')
                ->exists();
    
            return !$existingKeyword; // Return true if the keyword is unique
        });

        Validator::extend('unique_uom_based_on_flag', function ($attribute, $value, $parameters, $validator) {
            $existingUOM = \App\Models\UnitOfMeasurement::where('unit_name', $value)
                ->where('flag', 'show')
                ->exists();
    
            return !$existingUOM; // Return true if the keyword is unique
        });

        Validator::extend('unique_category_based_on_flag', function ($attribute, $value, $parameters, $validator) {
            $existingCat = \App\Models\Category::where('cat_name', $value)
                ->where('flag', 'show')
                ->exists();
    
            return !$existingCat; // Return true if the keyword is unique
        });

        Validator::extend('unique_sub_category_based_on_flag', function ($attribute, $value, $parameters, $validator) {
            $existingSubCat = \App\Models\SubCategory::where('sub_cat_name', $value)
                ->where('flag', 'show')
                ->exists();
    
            return !$existingSubCat; // Return true if the keyword is unique
        });

    }
}
