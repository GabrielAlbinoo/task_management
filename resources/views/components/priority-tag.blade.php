@php
    $value = $value ?? ($slot ?? null);
    $text = $value ?? '-';

    $bg = '#e5e7eb';
    $fg = '#374151';

    if ($text === 'baixa') {
        $bg = '#e0f2fe';
        $fg = '#075985';
    } elseif ($text === 'media') {
        $bg = '#fef3c7';
        $fg = '#92400e';
    } elseif ($text === 'alta') {
        $bg = '#fee2e2';
        $fg = '#991b1b';
    }
@endphp

<span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:12px;background:{{ $bg }};color:{{ $fg }};">
    {{ $text }}
</span>

