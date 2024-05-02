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
        Schema::create('mst_tbl_uom', function (Blueprint $table) {
            $table->id('tbl_uom_id');
            $table->string('unit_name', 255)->unique();
            $table->unsignedBigInteger('add_by')->nullable();
            $table->foreign('add_by')->references('tbl_user_id')->on('mst_tbl_users');
            $table->date('add_date');
            $table->time('add_time');
            $table->unsignedBigInteger('deleted_by')->nullable();
            $table->foreign('deleted_by')->references('tbl_user_id')->on('mst_tbl_users');
            $table->date('deleted_date')->nullable();
            $table->time('deleted_time')->nullable();
            $table->string('flag', 7)->default('show');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_tbl_uom');
    }
};
