<?php

namespace App\Http\Services;


use App\Models\User;

class Services
{
    public static function getData($data)
    {
        if(!empty($data['filer']) && !empty($data['filterBy'])){
            return User::withTrashed()->orderBy($data['filer'], $data['filterBy'])->paginate(
                 $perPage = 10, $columns = ['*'], $pageName = 'page'
             );
         }
         return User::withTrashed()->paginate(
             $perPage = 10, $columns = ['*'], 'page'
         );
    }

    public static function softDeleteUser($id)
    {
        $user = User::withTrashed()->find($id);
        if ($user) {
            $user->delete();

            return $user->fresh();
        }
        return response()->json([
            'status' => 'error',
            'message' => 'User not found'
        ], 404);
    }
    public static function restoreUser($id)
    {
        $user = User::withTrashed()->find($id);
        if ($user) {
            if ($user->trashed()) {
                $user->restore();
                return $user->fresh();
            }
        }
        return response()->json([
            'status' => 'error',
            'message' => 'User not found'
        ], 404);
    }
    public static function deleteUser($id)
    {
        $user = User::withTrashed()->find($id);
        if ($user) {
            return $user->forceDelete();
        }
        return response()->json([
            'status' => 'error',
            'message' => 'User not found'
        ], 404);
    }
    public static function updateUser($data, $id)
    {
        $user = User::withTrashed()->find($id);
        if($user){
            $user->update($data);
            return $user;
        }

        return response()->json([
            'status' => 'error',
            'message' => 'User not found'
        ], 404);
    }

}
