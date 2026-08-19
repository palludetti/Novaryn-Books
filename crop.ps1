Add-Type -AssemblyName System.Drawing
$inputPath = 'C:\Users\lojad\.gemini\antigravity\brain\548f0881-1375-4ee1-96b3-e057e4c65a41\.user_uploaded\media_1785953427696.jpg'
$outputPath = 'C:\Users\lojad\.gemini\antigravity\scratch\maquina-de-lucro\public\book_cover.jpg'

$img = [System.Drawing.Image]::FromFile($inputPath)
$cropX = [int]($img.Width * 0.53)
$cropWidth = $img.Width - $cropX
$cropHeight = $img.Height

$rect = New-Object System.Drawing.Rectangle($cropX, 0, $cropWidth, $cropHeight)
$cropped = $img.Clone($rect, $img.PixelFormat)
$img.Dispose()

$cropped.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$cropped.Dispose()
Write-Host "Front cover cropped successfully!"
