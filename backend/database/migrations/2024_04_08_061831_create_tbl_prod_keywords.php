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
        Schema::create('tbl_prod_keywords', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tbl_prod_id');
            $table->unsignedBigInteger('tbl_keyword_id');
            $table->date('add_date');
            $table->time('add_time');
            $table->date('updated_date')->nullable();
            $table->time('updated_time')->nullable();
            
            $table->string('flag', 45)->default('show');

            $table->foreign('tbl_prod_id')->references('id')->on('tbl_products')->onDelete('cascade');
            $table->foreign('tbl_keyword_id')->references('id')->on('mst_tbl_keywords')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_prod_keywords');
    }
};
