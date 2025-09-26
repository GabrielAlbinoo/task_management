<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/docs', function () {
    $path = base_path('resources/swagger/openapi.json');
    if (!File::exists($path)) {
        abort(404);
    }
    $spec = File::get($path);
    return view('swagger', ['openapi' => $spec]);
});
