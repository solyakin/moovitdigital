<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstName')->nullable();
            $table->string('lastName')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('image')->nullable();
            $table->string('phone')->nullable();
            $table->string('dob')->nullable();
            $table->string('country')->nullable();
            $table->string('company')->nullable();
            $table->string('business_type')->nullable();
            $table->string('other')->nullable();
            $table->string('turnover')->nullable();
            $table->string('business_size')->nullable();
            $table->string('business_bio')->nullable();
            $table->string('business_duration')->nullable();
            $table->enum('role', ['advertiser', 'publisher'])->nullable();
            $table->integer('agree')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
