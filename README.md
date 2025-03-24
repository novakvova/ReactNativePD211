Run PowerShell admin
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Run powershell admin
```
choco install -y nodejs-lts microsoft-openjdk17
```

Android Studio install app 
```
Android SDK Platform 35
Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image
```

Configure the ANDROID_HOME environment variable

```
Open the Windows Control Panel.
Click on User Accounts, then click User Accounts again
Click on Change my environment variables
Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK:
My path C:\Users\hp\AppData\Local\Android\Sdk
```

The default location for this folder is:
```
C:\Users\hp\AppData\Local\Android\Sdk\platform-tools
```

Create project 
```
npx create-expo-app@latest my-crot
```

To run your project, navigate to the directory and run one of the following npm commands.
```
- cd my-crot
- npm run android
- npm run ios # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac
- npm run web
```