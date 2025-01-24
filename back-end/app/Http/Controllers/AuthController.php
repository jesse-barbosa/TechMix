<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validação dos dados recebidos
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Verificar se o usuário existe e as credenciais estão corretas
        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {

            return response()->json([
                'message' => 'Login bem-sucedido!',
                'user' => $user,
            ]);
        }        

        return response()->json(['message' => 'Credenciais inválidas'], 401);
    }

    public function register(Request $request)
    {
    // Validação dos dados recebidos
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8',
    ]);

    // Criação do novo usuário
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    return response()->json([
        'message' => 'Usuário registrado com sucesso!',
        'user' => $user,
    ]);
}
}

