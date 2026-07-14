<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NA3IMA-numberONE — المأكولات المغربية الأصيلة</title>
    <meta name="description" content="أكلات مغربية تقليدية أصيلة — وصفات من قلب المغرب، بطعم لا يقاوم">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="relative bg-naima-cream text-naima-ink antialiased">

    {{-- Header flottant sur le hero (comme la maquette originale) --}}
    <header class="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-sm">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8">
            <a href="#home" class="flex shrink-0 items-center gap-2.5">
                <img src="{{ asset('images/logo-mark.png') }}" alt="" class="h-10 w-10 object-contain" width="40" height="40">
                <span class="text-base font-extrabold tracking-wide text-naima-gold sm:text-xl">NA3IMA-numberONE</span>
            </a>

            <nav class="hidden items-center gap-5 text-sm font-medium text-white lg:flex xl:gap-7">
                <a href="#home" class="text-naima-gold">الرئيسية</a>
                <a href="#menu" class="transition hover:text-naima-gold">قائمة الطعام</a>
                <a href="#about" class="transition hover:text-naima-gold">من نحن</a>
                <a href="#services" class="transition hover:text-naima-gold">خدماتنا</a>
                <a href="#reviews" class="transition hover:text-naima-gold">آراء الزبناء</a>
                <a href="#contact" class="transition hover:text-naima-gold">اتصل بنا</a>
            </nav>

            <div class="flex items-center gap-3">
                <a href="#menu" class="btn-gold hidden px-4 py-2.5 text-sm sm:inline-flex">اطلب الآن</a>
                <button type="button" id="mobile-menu-btn" class="rounded-lg p-2 text-white lg:hidden" aria-label="القائمة">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="hidden border-t border-white/10 bg-black/80 px-4 py-4 lg:hidden">
            <nav class="flex flex-col gap-3 text-sm font-medium text-white">
                <a href="#home">الرئيسية</a>
                <a href="#menu">قائمة الطعام</a>
                <a href="#about">من نحن</a>
                <a href="#services">خدماتنا</a>
                <a href="#reviews">آراء الزبناء</a>
                <a href="#contact">اتصل بنا</a>
            </nav>
        </div>
    </header>

    <main>
        {{-- HERO original (composition exacte) --}}
        <section id="home" class="relative overflow-hidden bg-[#0c0c0c]">
            {{-- Ratio fixe = image entière visible (évite de couper les boutons) --}}
            <div class="hero-banner relative w-full">
                <picture>
                    <source srcset="{{ asset('images/hero-full.webp') }}?v=23" type="image/webp">
                    <img
                        src="{{ asset('images/hero-full.jpg') }}?v=23"
                        alt="أكلات مغربية تقليدية أصيلة — نعيمة"
                        class="absolute inset-0 h-full w-full object-cover object-center"
                        width="2048"
                        height="944"
                        fetchpriority="high"
                    >
                </picture>
                <div class="hero-card-cover" aria-hidden="true"></div>
                <div class="sr-only">
                    <h1>أكلات مغربية تقليدية أصيلة</h1>
                    <p>وصفات من قلب المغرب، بطعم لا يقاوم</p>
                </div>
            </div>
        </section>

        {{-- FEATURES — textes longs de la maquette originale --}}
        <section id="services" class="bg-[#162d2a]">
            <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:px-8 lg:py-9">
                @foreach ([
                    ['الجودة مضمونة أو راسك راجع عليك', 'shield'],
                    ['توصيل سريع فين ما كنتي', 'truck'],
                    ['طبخ تقليدي على أصوله', 'chef'],
                    ['مكونات طبيعية طازجة و صحية', 'leaf'],
                ] as [$label, $icon])
                    <div class="flex flex-col items-center gap-2.5 px-2 text-center">
                        <span class="text-naima-gold">
                            @if ($icon === 'shield')
                                <svg class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                            @elseif ($icon === 'truck')
                                <svg class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
                            @elseif ($icon === 'chef')
                                <svg class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 17h14v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 17c0-2 .8-3.5 2-4.5C6.5 11.5 5.5 9.5 6 7c1.5-.5 3 .5 4 1.5C10.5 6 12 4.5 12 4.5S13.5 6 14 8.5c1-1 2.5-2 4-1.5.5 2.5-.5 4.5-2 5.5 1.2 1 2 2.5 2 4.5H6z"/></svg>
                            @else
                                <svg class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 017.107 10.223C19.088 16.5 15.75 21 12 21s-7.088-4.5-7.5-7.777A7.5 7.5 0 0111.607 3c.13 0 .261 0 .393 0z"/></svg>
                            @endif
                        </span>
                        <span class="max-w-[13rem] text-sm font-semibold leading-snug text-naima-gold">{{ $label }}</span>
                    </div>
                @endforeach
            </div>
        </section>

        {{-- CATEGORIES --}}
        <section id="about" class="bg-naima-cream px-4 py-12 lg:px-8 lg:py-14">
            <div class="mx-auto max-w-7xl">
                <h2 class="section-ornament text-center text-xl font-bold text-[#162d2a] sm:text-2xl">
                    تشكيلة متنوعة من المأكولات المغربية
                </h2>

                @php
                    // Ordre RTL: à droite → شوربات … à gauche → كل الأصناف
                    $categories = [
                        ['name' => 'شوربات', 'icon' => 'soup'],
                        ['name' => 'مقليات', 'icon' => 'pan'],
                        ['name' => 'طاجين', 'icon' => 'tagine'],
                        ['name' => 'كسكس', 'icon' => 'couscous'],
                        ['name' => 'مشروبات', 'icon' => 'drink'],
                        ['name' => 'حلويات مغربية', 'icon' => 'sweet'],
                        ['name' => 'كل الأصناف', 'icon' => 'grid', 'active' => true],
                    ];
                @endphp

                <div class="mt-10 flex flex-wrap justify-center gap-5 sm:gap-7">
                    @foreach ($categories as $cat)
                        <button type="button" class="cat-btn {{ !empty($cat['active']) ? 'is-active' : '' }}">
                            <span class="cat-icon">
                                @if ($cat['icon'] === 'grid')
                                    <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>
                                @elseif ($cat['icon'] === 'sweet')
                                    <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5"/></svg>
                                @elseif ($cat['icon'] === 'drink')
                                    <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.696a3.75 3.75 0 01-.355 1.603L7.5 14.25h9l-1.895-3.847a3.75 3.75 0 01-.355-1.603V3.104M12 18.75v2.25m-3.75 0h7.5"/></svg>
                                @elseif ($cat['icon'] === 'couscous')
                                    <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21c4.5 0 7.5-3.5 7.5-7.5S16.5 6 12 6 4.5 9.5 4.5 13.5 7.5 21 12 21z"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 13.5h8"/></svg>
                                @elseif ($cat['icon'] === 'tagine')
                                    <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4l5 5H7l5-5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 14h14v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2z"/><path stroke-linecap="round" stroke-linejoin="round" d="M7 9h10v5H7V9z"/></svg>
                                @elseif ($cat['icon'] === 'pan')
                                    <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 14h13a3 3 0 000-6H4v6z"/><path stroke-linecap="round" stroke-linejoin="round" d="M17 11h4"/></svg>
                                @else
                                    <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 12c0 4 2.5 7 6 7s6-3 6-7M8 8c0-2 1.5-3.5 4-3.5S16 6 16 8"/></svg>
                                @endif
                            </span>
                            <span class="text-xs font-semibold text-[#162d2a] sm:text-sm">{{ $cat['name'] }}</span>
                        </button>
                    @endforeach
                </div>
            </div>
        </section>

        {{-- PRODUCTS — ordre RTL: حريرة à droite --}}
        <section id="menu" class="bg-naima-cream px-4 pb-14 lg:px-8">
            <div class="mx-auto max-w-7xl">
                @php
                    $products = [
                        [
                            'name' => 'حريرة مغربية',
                            'desc' => 'شوربة تقليدية غنية بالعدس والحمص والطماطم',
                            'price' => '35.00',
                            'image' => 'dish-harira.png',
                        ],
                        [
                            'name' => 'بسطيلة بالدجاج',
                            'desc' => 'عجين مقرمش محشو بالدجاج واللوز والقرفة',
                            'price' => '85.00',
                            'image' => 'dish-bastilla.png',
                        ],
                        [
                            'name' => 'كسكس بالدجاج والخضر',
                            'desc' => 'كسكس مغربي أصيل مع دجاج وخضار موسمية',
                            'price' => '75.00',
                            'image' => 'dish-couscous.png',
                        ],
                        [
                            'name' => 'طاجين اللحم بالبرقوق',
                            'desc' => 'لحم طري مطهو على نار هادئة مع البرقوق واللوز',
                            'price' => '95.00',
                            'image' => 'dish-tagine.png',
                        ],
                    ];
                @endphp

                <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    @foreach ($products as $product)
                        <article class="product-card">
                            <div class="aspect-[4/3] overflow-hidden bg-[#eee]">
                                <img src="{{ asset('images/' . $product['image']) }}?v=8" alt="{{ $product['name'] }}" class="h-full w-full object-cover transition duration-500 hover:scale-105" width="640" height="480" loading="lazy">
                            </div>
                            <div class="flex flex-1 flex-col p-4">
                                <h3 class="text-base font-bold text-naima-ink sm:text-lg">{{ $product['name'] }}</h3>
                                <p class="mt-1 line-clamp-2 text-sm text-naima-muted">{{ $product['desc'] }}</p>
                                <p class="mt-3 text-lg font-extrabold text-naima-gold">{{ $product['price'] }} د.م</p>
                                <button type="button" class="btn-gold mt-4 inline-flex w-full items-center justify-center gap-2 py-2.5 text-sm">
                                    <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.121-5.4 0-7.7H6.106"/></svg>
                                    أضف للسلة
                                </button>
                            </div>
                        </article>
                    @endforeach
                </div>

                <div class="mt-10 flex justify-center">
                    <a href="#menu" class="btn-green inline-flex items-center gap-2 px-8 py-3 text-sm">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>
                        عرض المزيد
                    </a>
                </div>
            </div>
        </section>

        {{-- BANNER THÉ + TEXTE + CONTACT (layout original) --}}
        <section id="contact" class="bg-naima-cream px-4 pb-14 lg:px-8">
            <div class="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
                {{-- Thé --}}
                <div class="relative min-h-[260px] overflow-hidden rounded-xl">
                    <img id="tea-img" src="{{ asset('images/tea-banner.jpg') }}?v=7" alt="شاي مغربي أصيل" class="absolute inset-0 h-full w-full object-cover" width="942" height="447" loading="lazy">
                </div>

                {{-- Texte clair --}}
                <div class="flex flex-col justify-center rounded-xl bg-[#f0eee8] px-6 py-8 sm:px-8">
                    <h3 class="text-2xl font-extrabold text-[#162d2a] sm:text-3xl">
                        نكهة المغرب <span class="text-naima-gold">في كل طبق</span>
                    </h3>
                    <p class="mt-3 text-sm leading-relaxed text-naima-muted">
                        وصفات أصيلة محضّرة بعناية، من قلب المطبخ المغربي إلى باب دارك، بطعم يخلي اللذة مضمونة فين ما كنتي.
                    </p>
                    <a href="#menu" class="btn-gold mt-6 inline-flex w-fit items-center gap-2 px-5 py-2.5 text-sm">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
                        اطلب الآن
                    </a>
                </div>

                {{-- Contact --}}
                <div class="flex flex-col justify-between rounded-xl bg-[#162d2a] p-7 text-white sm:p-8">
                    <div>
                        <h3 class="text-2xl font-extrabold text-naima-gold">تواصل معنا</h3>
                        <ul class="mt-6 space-y-4 text-sm">
                            <li class="flex items-center gap-3">
                                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-naima-gold/15 text-naima-gold">
                                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                                </span>
                                <a href="tel:+212600000000" class="hover:text-naima-gold" dir="ltr">+212 6 00 00 00 00</a>
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-naima-gold/15 text-naima-gold">
                                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                                </span>
                                <a href="mailto:contact@na3ima-numberone.ma" class="break-all hover:text-naima-gold" dir="ltr">contact@na3ima-numberone.ma</a>
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-naima-gold/15 text-naima-gold">
                                    <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                                </span>
                                <span>الدار البيضاء، المغرب</span>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-8 flex gap-3">
                        <a href="#" class="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white" aria-label="Facebook"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg></a>
                        <a href="#" class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] text-white" aria-label="Instagram"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
                        <a href="#" class="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white" aria-label="WhatsApp"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    {{-- FOOTER original --}}
    <footer id="reviews" class="bg-[#0c0c0c] text-white">
        <div class="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-6 lg:px-8">
            <div class="flex flex-col items-center gap-1 text-center">
                <span class="text-lg font-extrabold text-naima-gold">NA3IMA-numberONE</span>
                <p class="text-sm text-white/70">© 2024 NA3IMA-numberONE. جميع الحقوق محفوظة</p>
            </div>
            <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                @foreach ([
                    ['خدمة عملاء 7/7 مناجين', 'phone'],
                    ['دفع آمن 100%', 'lock'],
                    ['اللذة مضمونة أو راسك راجع عليك', 'shield'],
                    ['توصيل سريع فين ما كنتي', 'truck'],
                ] as [$label, $icon])
                    <div class="flex items-center justify-center gap-2 text-center text-xs text-naima-gold sm:text-sm">
                        @if ($icon === 'phone')
                            <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                        @elseif ($icon === 'lock')
                            <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
                        @elseif ($icon === 'shield')
                            <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                        @else
                            <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
                        @endif
                        <span>{{ $label }}</span>
                    </div>
                @endforeach
            </div>
        </div>
    </footer>

    <script>
        document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
            document.getElementById('mobile-menu')?.classList.toggle('hidden');
        });
        document.querySelectorAll('#mobile-menu a').forEach((link) => {
            link.addEventListener('click', () => document.getElementById('mobile-menu')?.classList.add('hidden'));
        });
        document.querySelectorAll('.cat-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.cat-btn').forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
            });
        });
    </script>
</body>
</html>
