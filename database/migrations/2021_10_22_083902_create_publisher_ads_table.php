<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePublisherAdsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('publisher_ads', function (Blueprint $table) {
            $table->id();
            $table->string('script');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('banner_id')->constrained('banners')->cascadeOnDelete();
            $table->foreignId('publisher_id')->constrained('users')->cascadeOnDelete();
            $table->integer('impressions')->default(0);
            $table->integer('clicks')->default(0);
            $table->foreignId('advert_id')->constrained('adverts')->cascadeOnDelete();
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
        Schema::dropIfExists('publisher_ads');
    }
}
