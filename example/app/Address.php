<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'address';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'address_user', 'street', 'suite', 'city', 'zipcode'
    ];

    public function user()
    {
        return $this->belongsTo('App\Users');
    }
}
