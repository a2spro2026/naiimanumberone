<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::manageable()->orderBy('id')->get();

        return response()->json([
            'users' => $users->map(fn (User $user) => $this->present($user)),
            'roles' => collect(User::ASSIGNABLE_ROLES)
                ->map(fn (string $label, string $value) => ['value' => $value, 'label' => $label])
                ->values(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = User::create($this->validated($request));

        return response()->json(['user' => $this->present($user)], 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        abort_if($user->isAdmin(), 404);

        $data = $this->validated($request, $user);

        if (empty($data['password'])) {
            unset($data['password']);
        }

        $user->update($data);

        return response()->json(['user' => $this->present($user)]);
    }

    public function destroy(User $user): Response
    {
        abort_if($user->isAdmin(), 404);

        $user->delete();

        return response()->noContent();
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?User $user = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'contact' => ['nullable', 'string', 'max:50'],
            'role' => ['required', Rule::in(array_keys(User::ASSIGNABLE_ROLES))],
            'login' => [
                'required',
                'string',
                'min:3',
                'max:60',
                'regex:/^[A-Za-z0-9._-]+$/',
                Rule::unique('users', 'login')->ignore($user?->id),
            ],
            'password' => [$user ? 'nullable' : 'required', 'string', 'min:6', 'max:100'],
        ], [
            'name.required' => 'Le nom complet est obligatoire.',
            'role.required' => 'Choisissez un statut.',
            'role.in' => 'Statut invalide.',
            'login.required' => 'Le login est obligatoire.',
            'login.min' => 'Le login doit contenir au moins 3 caractères.',
            'login.regex' => 'Le login ne peut contenir que des lettres, chiffres, points, tirets ou _.',
            'login.unique' => 'Ce login est déjà utilisé.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères.',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function present(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'contact' => $user->contact,
            'role' => $user->role,
            'roleLabel' => User::ASSIGNABLE_ROLES[$user->role] ?? $user->role,
            'login' => $user->login,
        ];
    }
}
