@php
    $value = $value ?? ($slot ?? null);
    $text = $value ?? '-';

    $bg = '#e5e7eb';
    $fg = '#374151';

    if ($text === 'aberto') {
        $bg = '#dbeafe';
        $fg = '#1e40af';
    } elseif ($text === 'em_andamento') {
        $bg = '#fef3c7';
        $fg = '#92400e';
    } elseif ($text === 'finalizado') {
        $bg = '#fee2e2';
        $fg = '#991b1b';
    }
@endphp

<span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:12px;background:{{ $bg }};color:{{ $fg }};">
    {{ $text }}
</span>
