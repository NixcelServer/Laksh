<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_products', function (Blueprint $table) {
            $table->id('tbl_prod_id');
            $table->unsignedBigInteger('tbl_company_id');
            $table->string('prod_name', 255);
            $table->text('prod_description')->nullable();
            $table->string('prod_img_path', 255)->nullable();
            $table->unsignedBigInteger('tbl_cat_id');
            $table->unsignedBigInteger('tbl_sub_cat_id');
            $table->decimal('prod_price', 8, 2);
            $table->unsignedBigInteger('tbl_uom_id')->nullable();
            $table->string('prod_min_order_qty')->nullable();
            $table->date('add_date')->nullable();
            $table->time('add_time')->nullable();
            $table->date('updated_date')->nullable();
            $table->time('updated_time')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();
            $table->date('deleted_date')->nullable();
            $table->time('deleted_time')->nullable();
            $table->string('flag', 7)->default('show');
            

            $table->foreign('tbl_company_id')->references('tbl_company_id')->on('mst_tbl_companies');
            $table->foreign('tbl_cat_id')->references('tbl_cat_id')->on('mst_tbl_categories');
            $table->foreign('tbl_sub_cat_id')->references('tbl_sub_cat_id')->on('tbl_sub_categories');
            $table->foreign('tbl_uom_id')->references('tbl_uom_id')->on('mst_tbl_uom');
            $table->foreign('deleted_by')->references('tbl_user_id')->on('mst_tbl_users');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_products');
    }
};
