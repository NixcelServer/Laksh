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
        Schema::create('tbl_gst_info', function (Blueprint $table) {
            $table->id('tbl_gst_id');
            $table->unsignedBigInteger('tbl_company_id');
            $table->foreign('tbl_company_id')->references('tbl_company_id')->on('mst_tbl_companies')->onDelete('cascade');
            $table->string('gst_no', 15)->unique();
            $table->string('gst_status', 25)->default('Not Verified');
            $table->date('verified_date')->nullable();
            $table->time('verified_time')->nullable();
            $table->date('add_date');
            $table->time('add_time');
            $table->date('updated_date')->nullable();
            $table->time('updated_time')->nullable();
            $table->string('flag', 7)->default('show');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_gst_info');
    }
};
