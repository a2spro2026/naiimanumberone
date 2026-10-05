<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    public const UPLOAD_DIR = 'uploads/dishes';

    public const MEALS = ['breakfast', 'lunch', 'dinner'];

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'name_ar',
        'description',
        'description_ar',
        'image',
        'price_small',
        'price_medium',
        'price_large',
        'rating',
        'prep_time',
        'popular',
        'meals',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price_small' => 'float',
            'price_medium' => 'float',
            'price_large' => 'float',
            'rating' => 'float',
            'popular' => 'boolean',
            'meals' => 'array',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function toPublicArray(): array
    {
        return [
            'id' => (string) $this->id,
            'name' => $this->name,
            'nameAr' => $this->name_ar,
            'description' => $this->description,
            'descriptionAr' => $this->description_ar,
            'image' => $this->image,
            'prices' => [
                'small' => $this->price_small,
                'medium' => $this->price_medium,
                'large' => $this->price_large,
            ],
            'rating' => $this->rating,
            'prepTime' => $this->prep_time,
            'popular' => $this->popular,
            'meals' => array_values(array_intersect(self::MEALS, $this->meals ?? [])),
        ];
    }

    public function hasUploadedImage(): bool
    {
        return str_starts_with($this->image, '/'.self::UPLOAD_DIR.'/');
    }
}
