#!/bin/bash

# Установка зависимостей
pip3 install -r requirements.txt

# Применение миграций для приложения users
python3 manage.py makemigrations users

# Применение миграций для приложения schedule
python3 manage.py makemigrations schedule

# Применение остальных миграций
python3 manage.py makemigrations

# Сбор статических файлов
python3 manage.py collectstatic

# Применение миграций базы данных
python3 manage.py migrate
