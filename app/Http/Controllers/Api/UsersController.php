<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IndexRequest;
use App\Http\Requests\UpdateRequest;
use App\Models\User;
use App\Http\Services\Services;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        $data = $request->validated();

        return Services::getData($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return User::withTrashed()->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        $data = $request->validated();
        return Services::updateUser($data, $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Services::deleteUser($id);
    }

    /**
     * Destroy soft the specified resource from storage.
     */
    public function destroy_soft(string $id)
    {
        return Services::softDeleteUser($id);
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore(string $id)
    {
        return Services::restoreUser($id);
    }
}
