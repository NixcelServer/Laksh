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
        Schema::create('mst_tbl_users', function (Blueprint $table) {
            $table->id('tbl_user_id');
            $table->string('u_name')->required();
            $table->string('u_email')->required();
		$table->string('u_alt_email')->nullable();
            $table->string('u_password')->required();
		$table->integer('u_mob_no')->nullable();
            $table->integer('u_alt_mob_no')->nullable();
            $table->string('u_designation')->nullable();
            $table->string('u_status')->default('Not Verified');
            $table->string('auth_status')->nullable();
            $table->date('add_date')->required();
            $table->time('add_time')->required();
            
            $table->date('update_date')->nullable();
            $table->time('update_time')->nullable();
		$table->integer('verified_by')->nullable();
		
            $table->date('verified_date')->nullable();
            $table->time('verified_time')->nullable();

            $table->string('flag')->default('show');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_tbl_users');
    }

};
