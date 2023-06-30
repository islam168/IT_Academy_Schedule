def week_days(obj, week_days):
    days = []
    if any(day.name == 'Понедельник' for day in week_days):
        days.append(1)
    if any(day.name == 'Вторник' for day in week_days):
        days.append(2)
    if any(day.name == 'Среда' for day in week_days):
        days.append(3)
    if any(day.name == 'Четверг' for day in week_days):
        days.append(4)
    if any(day.name == 'Пятница' for day in week_days):
        days.append(5)
    if any(day.name == 'Суббота' for day in week_days):
        days.append(6)
    if any(day.name == 'Воскресенье' for day in week_days):
        days.append(0)
    return days