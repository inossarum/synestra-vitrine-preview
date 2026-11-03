@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"
where python >nul 2>&1
if not errorlevel 1 (
  python -c "import sys; assert sys.version_info.major == 3" >nul 2>&1
  if not errorlevel 1 (
    python launch_sphere.py
    exit /b !errorlevel!
  )
)
where py >nul 2>&1
if not errorlevel 1 (
  py -3 launch_sphere.py
  exit /b !errorlevel!
)
echo Python 3 introuvable. Ouvrez index.html avec Chrome ou Edge.
exit /b 3
