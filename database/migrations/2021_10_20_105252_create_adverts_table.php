<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdvertsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adverts', function (Blueprint $table) {
            $table->id();$table->string('title');
            $table->string('content');
            $table->string('image')->nullable();
            $table->integer('likes')->nullable();
            $table->integer('impressions')->nullable();
            $table->foreignId('graphic_id')->constrained('graphics')->cascadeOnDelete();
            $table->foreignId('budget_id')->constrained('budgets')->cascadeOnDelete();
            $table->integer('awareness')->nullable();
            $table->integer('target')->nullable();
            $table->integer('engagement')->nullable();
            $table->integer('conversions')->nullable();
            $table->integer('sales')->nullable();
            $table->integer('app_installs')->nullable();
            $table->integer('reach')->nullable();
            $table->string('gender');
            $table->string('phone');
            $table->string('area');
            $table->string('location');
            $table->string('ageRange');
            $table->string('start');
            $table->string('end');
            $table->string('demographics')->nullable();
            $table->string('interests')->nullable();
            $table->foreignId('createdBy')->constrained('users')->cascadeOnDelete();
            $table->integer('approved')->nullable();
            $table->integer('active')->nullable();
            $table->foreignId('assigned')->nullable()->constrained('admins')->cascadeOnDelete();
            $table->string('amount')->nullable();
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
        Schema::dropIfExists('adverts');
    }
}
