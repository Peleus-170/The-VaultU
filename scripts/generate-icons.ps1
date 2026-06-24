# Generates VaultU PNG app icons from the SVG source (requires Inkscape or falls back to branded solid icons).
# Run: powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$assets = Join-Path $root "assets"
$svg = Join-Path $assets "vaultu-icon.svg"

function New-BrandedIcon {
    param([string]$Path, [int]$Size)

    Add-Type -AssemblyName System.Drawing
    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

    $rect = New-Object System.Drawing.Rectangle 0, 0, $Size, $Size
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        $rect,
        [System.Drawing.Color]::FromArgb(255, 15, 74, 44),
        [System.Drawing.Color]::FromArgb(255, 45, 185, 112),
        135
    )
    $g.FillRectangle($brush, $rect)

    $pad = [int]($Size * 0.18)
    $inner = New-Object System.Drawing.Rectangle $pad, $pad, ($Size - 2 * $pad), ($Size - 2 * $pad)
    $innerBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(38, 255, 255, 255))
    $g.FillEllipse($innerBrush, $inner)

    $shield = [System.Drawing.Color]::FromArgb(242, 255, 255, 255)
    $shieldBrush = New-Object System.Drawing.SolidBrush $shield
    $cx = $Size / 2
    $top = $Size * 0.28
    $points = @(
        [System.Drawing.Point]::new([int]($cx), [int]$top),
        [System.Drawing.Point]::new([int]($cx + $Size * 0.22), [int]($top + $Size * 0.12)),
        [System.Drawing.Point]::new([int]($cx + $Size * 0.22), [int]($top + $Size * 0.38)),
        [System.Drawing.Point]::new([int]$cx, [int]($top + $Size * 0.48)),
        [System.Drawing.Point]::new([int]($cx - $Size * 0.22), [int]($top + $Size * 0.38)),
        [System.Drawing.Point]::new([int]($cx - $Size * 0.22), [int]($top + $Size * 0.12))
    )
    $g.FillPolygon($shieldBrush, $points)

    $mint = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 127, 255, 196))
    $lockSize = [int]($Size * 0.08)
    $g.FillEllipse($mint, [int]($cx - $lockSize), [int]($top + $Size * 0.22), $lockSize * 2, $lockSize * 2)

    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

New-Item -ItemType Directory -Force -Path $assets | Out-Null
foreach ($name in @("icon.png", "splash-icon.png", "adaptive-icon.png", "favicon.png")) {
    New-BrandedIcon -Path (Join-Path $assets $name) -Size 1024
    Write-Host "Created $name"
}
