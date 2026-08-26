@echo off
echo ==================================================
echo Generating ColorVaults Ultra Detailed Prompts...
echo ==================================================
cd /d "c:\Users\Gebruiker\Desktop\Hetzner website"
python write_prompts.py
echo ==================================================
echo Generation Complete!
echo Prompts written to:
echo - C:\Users\Gebruiker\Desktop\Aangevulde_Prompts.txt
echo - C:\Users\Gebruiker\Desktop\Hetzner website\flux-prompts.txt
echo - C:\Users\Gebruiker\Desktop\colorvaults\output\flux-prompts.txt
echo ==================================================
pause
