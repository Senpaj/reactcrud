<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Users extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'user_id'   => $this->user_id,
            'name'      => $this->name,
            'username'  => $this->username,
            'email'     => $this->email,
            'phone'     => $this->phone,
            'website'   => $this->website,
            'address'   => [
                'street'    => $this->address->street,
                'suite'     => $this->address->suite,
                'city'      => $this->address->city,
                'zipcode'   => $this->address->zipcode,
                'geo'       => [
                    'lat'   => $this->geo->lat,
                    'lng'   => $this->geo->lng,
                ],
            ],
            'company'       => [
                'name'      => $this->company->name,
                'catchPhrase' => $this->company->catchPhrase,
                'bs'        => $this->company->bs 
            ]
        ];
    }
}