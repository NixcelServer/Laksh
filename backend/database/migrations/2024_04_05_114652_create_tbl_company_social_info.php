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
        Schema::create('tbl_companies_social_info', function (Blueprint $table) {
            $table->id('tbl_csi_id');
            $table->unsignedBigInteger('tbl_company_id');
            $table->foreign('tbl_company_id')->references('tbl_company_id')->on('mst_tbl_companies')->onDelete('cascade');
            $table->text('website_url')->nullable();
            $table->text('instagram_url')->nullable();
            $table->text('facebook_url')->nullable();
            $table->text('google_url')->nullable();
            $table->date('add_date');
            $table->time('add_time');
            $table->date('updated_date')->nullable();
            $table->time('updated_time')->nullable();
            $table->string('flag', 45)->default('show');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_companies_social_info');
    }
};
