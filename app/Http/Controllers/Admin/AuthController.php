<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    private const MAX_ATTEMPTS = 5;

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'login' => ['required', 'string', 'max:60'],
            'password' => ['required', 'string', 'max:100'],
        ]);

        $throttleKey = Str::lower($credentials['login']).'|'.$request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, self::MAX_ATTEMPTS)) {
            $seconds = RateLimiter::availableIn($throttleKey);

            return response()->json([
                'message' => "Trop de tentatives. Réessayez dans {$seconds} secondes.",
            ], 429);
        }

        if (! Auth::attempt(['login' => $credentials['login'], 'password' => $credentials['password']])) {
            RateLimiter::hit($throttleKey, 60);

            return response()->json(['message' => 'Identifiants incorrects.'], 422);
        }

        RateLimiter::clear($throttleKey);
        $request->session()->regenerate();

        return response()->json(['user' => $this->present($request->user())]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['user' => null], 401);
        }

        return response()->json(['user' => $this->present($user)]);
    }

    public function logout(Request $request): Response
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent();
    }

    /**
     * @return array<string, mixed>
     */
    private function present(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'role' => $user->role,
            'isAdmin' => $user->isAdmin(),
        ];
    }
}
