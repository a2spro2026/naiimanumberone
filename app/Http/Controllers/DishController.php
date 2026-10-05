<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class DishController extends Controller
{
    public function index(): JsonResponse
    {
        $dishes = Dish::query()->orderBy('sort_order')->orderBy('id')->get();

        return response()->json([
            'dishes' => $dishes->map(fn (Dish $dish) => $dish->toPublicArray()),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request, creating: true);
        $data['image'] = $this->storeImage($request->file('image'));
        $data['sort_order'] = (int) Dish::query()->max('sort_order') + 1;

        $dish = Dish::create($data);

        return response()->json(['dish' => $dish->toPublicArray()], 201);
    }

    public function update(Request $request, Dish $dish): JsonResponse
    {
        $data = $this->validated($request, creating: false);

        if ($request->hasFile('image')) {
            $this->deleteImage($dish);
            $data['image'] = $this->storeImage($request->file('image'));
        } else {
            unset($data['image']);
        }

        $dish->update($data);

        return response()->json(['dish' => $dish->toPublicArray()]);
    }

    public function destroy(Dish $dish): Response
    {
        $this->deleteImage($dish);
        $dish->delete();

        return response()->noContent();
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, bool $creating): array
    {
        $price = ['required', 'numeric', 'min:0', 'max:99999.99'];
        // Le gérant ne lit ni n'écrit le français : les champs français restent facultatifs pour lui.
        $isGerant = (bool) $request->user()?->isGerant();
        $french = $isGerant ? 'nullable' : 'required';

        $data = $request->validate([
            'name' => [$french, 'string', 'max:120'],
            'name_ar' => ['required', 'string', 'max:120'],
            'description' => [$french, 'string', 'max:500'],
            'description_ar' => ['required', 'string', 'max:500'],
            'price_small' => $price,
            'price_medium' => $price,
            'price_large' => $price,
            'meals' => ['required', 'array', 'min:1'],
            'meals.*' => ['string', Rule::in(Dish::MEALS)],
            'image' => [$creating ? 'required' : 'nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ], $isGerant ? self::ARABIC_MESSAGES : self::FRENCH_MESSAGES);

        $data['name'] ??= '';
        $data['description'] ??= '';
        $data['meals'] = array_values(array_intersect(Dish::MEALS, $data['meals']));

        return $data;
    }

    private const ARABIC_MESSAGES = [
        'name_ar.required' => 'اسم الطبق إجباري.',
        'description_ar.required' => 'وصف الطبق إجباري.',
        'price_small.required' => 'ثمن الحجم الصغير إجباري.',
        'price_medium.required' => 'ثمن الحجم المتوسط إجباري.',
        'price_large.required' => 'ثمن الحجم الكبير إجباري.',
        'price_small.numeric' => 'الثمن غير صحيح.',
        'price_medium.numeric' => 'الثمن غير صحيح.',
        'price_large.numeric' => 'الثمن غير صحيح.',
        'meals.required' => 'اختر وجبة واحدة على الأقل.',
        'meals.min' => 'اختر وجبة واحدة على الأقل.',
        'meals.*.in' => 'وجبة غير صحيحة.',
        'image.required' => 'أضف صورة الطبق.',
        'image.image' => 'يجب أن يكون الملف صورة.',
        'image.mimes' => 'الصيغ المقبولة: JPG أو PNG أو WEBP.',
        'image.max' => 'يجب ألا تتجاوز الصورة 5 ميغا.',
    ];

    private const FRENCH_MESSAGES = [
        'name.required' => 'Le titre en français est obligatoire.',
        'name_ar.required' => 'Le titre en arabe est obligatoire.',
        'description.required' => 'La description en français est obligatoire.',
        'description_ar.required' => 'La description en arabe est obligatoire.',
        'price_small.required' => 'Le prix petit est obligatoire.',
        'price_medium.required' => 'Le prix moyen est obligatoire.',
        'price_large.required' => 'Le prix grand est obligatoire.',
        'price_small.numeric' => 'Prix invalide.',
        'price_medium.numeric' => 'Prix invalide.',
        'price_large.numeric' => 'Prix invalide.',
        'meals.required' => 'Choisissez au moins un repas.',
        'meals.min' => 'Choisissez au moins un repas.',
        'meals.*.in' => 'Repas invalide.',
        'image.required' => 'Importez une photo du plat.',
        'image.image' => 'Le fichier doit être une image.',
        'image.mimes' => 'Formats acceptés : JPG, PNG ou WEBP.',
        'image.max' => 'La photo ne doit pas dépasser 5 Mo.',
    ];

    private function storeImage(UploadedFile $file): string
    {
        $name = Str::uuid().'.'.($file->extension() ?: 'jpg');
        $file->move(public_path(Dish::UPLOAD_DIR), $name);

        return '/'.Dish::UPLOAD_DIR.'/'.$name;
    }

    private function deleteImage(Dish $dish): void
    {
        if ($dish->hasUploadedImage()) {
            File::delete(public_path(ltrim($dish->image, '/')));
        }
    }
}
