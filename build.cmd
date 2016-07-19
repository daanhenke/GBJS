FOR /D %%p IN ("javascript\es5") DO rmdir "%%p" /s /q
babel javascript/es6 -d javascript/es5