<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Geo extends Model
{
    protected $table = 'geo';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'geo_user', 'lat', 'lng',
    ];

    public function user()
    {
        return $this->belongsTo('App\Users');
    }
}
