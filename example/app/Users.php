<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table = 'users';

    protected $primaryKey = 'user_id';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'username', 'email', 'phone', 'website', 'deleted'
    ];
    public function address()
    {
        return $this->hasOne('App\Address', 'address_user', 'user_id');
    }
    public function company()
    {
        return $this->hasOne('App\Company', 'company_user', 'user_id');
    }
    public function geo()
    {
        return $this->hasOne('App\Geo', 'geo_user', 'user_id');
    }

}
