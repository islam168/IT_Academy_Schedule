@echo off

REM Установка зависимостей
pip install -r requirements.txt

REM Применение миграций для приложения users
python manage.py makemigrations users

REM Применение миграций для приложения schedule
python manage.py makemigrations schedule

REM Применение остальных миграций
python manage.py makemigrations

REM Сбор статических файлов
python manage.py collectstatic

REM Применение миграций базы данных
python manage.py migrate
