# IT_Academy_Schedule

## Как поднять проект локально ?
### Последовательность действий
```.bash
    $ git clone
    Backend
    $ cd Backend/
    $ python -m venv venv
    $ Запуск виртуальной среды
    $ Установление переменных окружения (envs)
    $ pip install -r requirements.txt
    $ python manage.py collectstatic
    $ python manage.py migrate
    $ python manage.py runserver
    Frontend
    $ cd frontend/schedule-app
    $ npm install
    $ npm start
