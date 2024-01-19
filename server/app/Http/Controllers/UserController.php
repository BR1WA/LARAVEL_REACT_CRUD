<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(){
        $users=User::all();
        return response()->json([
            "success" => true,
            "message" => "users fetched successfully",
            "users" => $users
        ],200);
    }

    public function store(UserRequest $request){
        $user=$request->validated();
        $data=User::create($user);

        return response()->json([
            "success" => true,
            "message" => "User created successfully",
            "data" => $data
        ]);
    }

    public function update(UserRequest $request,$id){
        try{
            $updatedUser=$request->validated();
            // dd( $updatedUser);
            $user=User::findOrFail($id);

            $user->update($updatedUser);

            return response()->json([
                "success" => true,
                "message" => "User updated successfully",
                "data" => $updatedUser
            ],200);
        }catch(Exception $e){
            return response()->json([
                "success" => true,
                "message" => "User not updated",
                "data" => $e->getMessage()
            ],401);
        }
    }

    public function destroy($id){
        $user=User::findOrFail($id);
        $user->delete();
        
        return response()->json([
            "success" => true,
            "message" => "User deleted successfully",
        ],200);
    }
}
