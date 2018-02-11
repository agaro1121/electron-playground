# icon
512x512
png
- use the following site(creates icons for all platforms):
  - https://iconverticons.com/
- OSX - .icns
- Windows - .ico
- Linux - .png

# Executable
- OSX - .app
- Windows - .exe
- Linux - no extension
- `npm install electron-packager rimraf -D`
    - rimraf - cross platform directory removal
- create convenience npm script
    - `rimraf Photobombth-* && electron-packager . --platform=darwin,win32,linux --arch=x64 --icon=app_icon`  
- run the script - `npm run build`  