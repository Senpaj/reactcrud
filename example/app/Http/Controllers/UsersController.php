<?php


namespace App\Http\Controllers;

use App\Users;
use App\Address;
use App\Geo;
use App\Company;
use App\Http\Requests\UserPostRequest;
use App\Http\Resources\Users as UserResource;
use App\Http\Resources\UsersCollection as UsersCollectionResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function index()
    {
        return new UsersCollectionResource(Users::where('deleted', 0)->get());
    }
    public function show($id)
    {
        return Users::find($id);
    }
    /**
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        $body = $request->all();
        $data = $request["data"];
        $validator = $this->validator($data);
        if ($validator->fails()) {
            $error = $validator->errors();
            return response()->json(['errors' => $error])->setStatusCode(422);
        }
        $model = new Users;
        $model->fill([
            'name'      => $data["name"],
            'username'  => $data["username"],
            'email'     => $data["email"],
            'phone'     => $data["phone"],
            'website'   => $data["website"]
        ]);
        $model->save();
        
        // Save address info to user
        $address = new Address;
        $address->fill([
            'city'      => $data["address"]["city"],
            'street'    => $data["address"]["street"],
            'suite'     => $data["address"]["suite"],
            'zipcode'   => $data["address"]["zipcode"]
        ]);
        $model->address()->save($address);

        // Save company info to user
        $company = new Company;
        $company->fill([
            'bs'      => $data["company"]["bs"],
            'catchPhrase'    => $data["company"]["catchPhrase"],
            'name'     => $data["company"]["name"]
        ]);
        $model->company()->save($company);
        
        // Save geo data to user
        $geo = new Geo;
        $geo->fill([
            'lat'      => $data["address"]["geo"]["lat"],
            'lng'    => $data["address"]["geo"]["lng"]
        ]);
        $model->geo()->save($geo);
        
        return response()->json("sd", 201);
    }
    /**
     * Handles an error response formatting it according to our spec.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function update(Request $request, $id)
    {
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();

        $body = $request->all();
        $userProfile = $body['data'];
        $validator = $this->validator($userProfile);
        if ($validator->fails()) {
            $error = $validator->errors();
            return response()->json(['errors' => $error])->setStatusCode(422);
        }

        $address = Address::where('address_user', $id)->update([
            'city'      => $request["data"]["address"]["city"],
            'street'    => $request["data"]["address"]["street"],
            'suite'    => $request["data"]["address"]["suite"],
            'zipcode'    => $request["data"]["address"]["zipcode"]
        ]);
        
        $geo = Geo::where('geo_user', $id)->update($request["data"]["address"]["geo"]);
        $company = Company::where('company_user', $id)->update($request["data"]["company"]);

        $data = $request["data"];
        $me = Users::find($id)->update([
            'name'      => $data["name"],
            'username'  => $data["username"],
            'email'     => $data["email"],
            'phone'     => $data["phone"],
            'website'   => $data["website"]
        ]);

        return response()->json("fgfgh", 201);
    }

    public function delete($id)
    {        
        $user = Users::find($id);
        if($user) {
            $user->deleted = 1;
            $user->save();
        }
        return response()->json($user, 204);
    }
    private function validator($data)
    {
        $attributeNames = array(
            'name'          => '\'Name\'',     
            'username'      => '\'Username\'',     
            'website'       => '\'WebSite\'',     
            'email'         => '\'E-Mail\'',     
            'phone'         => '\'Phone\'',     
            'address.city'  => '\'City\'',     
            'address.street' => '\'Street\'',     
            'address.suite' => '\'Suite\'',     
            'address.zipcode' => '\'ZipCode\'',     
            'address.geo.lat' => '\'Latitude\'',     
            'address.geo.lng' => '\'Longitude\'',     
            'company.name' => '\'Comapny name\'',     
            'company.bs' => '\'BS\'',     
            'company.catchPhrase' => '\'Catch phrase\'',     
         );
         
        $validator = Validator::make($data, [
            'name'      => 'required|string|max:50',
            'username'  => 'required|string|max:50',
            'phone'     => 'required|string|max:50',
            'email'     => 'required|email',
            'website'   => 'required|string|max:50',
            'address.city' => 'required',
            'address.street' => 'required',
            'address.suite' => 'required',
            'address.zipcode' => 'required|string',
            'address.geo.lat' => 'required|numeric',
            'address.geo.lng' => 'required|numeric',
            'company.name' => 'required',
            'company.bs' => 'required',
            'company.catchPhrase' => 'required|max:50',

        ]);
        $validator->setAttributeNames($attributeNames);
        return $validator;
    }
}
