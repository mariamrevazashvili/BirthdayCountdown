from flask import Flask, render_template, request
from datetime import datetime, date, time, timedelta

app = Flask(__name__)

def parse_target(date_string):
    """თარიღის გარდაქმნა datetime ობიექტად"""
    try:
        return datetime.fromisoformat(date_string)
    except ValueError:
        try:
            d = datetime.strptime(date_string, '%Y-%m-%d')
            return datetime.combine(d, time(0, 0))
        except ValueError:
            return None

@app.route('/')
def index():
    # ვიღებთ GET პარამეტრებს (მაგ: ?name=Mariam&date=2025-08-12T00:00:00)
    name = request.args.get('name', 'Friend')
    date_param = request.args.get('date')

    if date_param:
        target_dt = parse_target(date_param)
    else:
        # თუ თარიღი არ არის მითითებული, დეფოლტად ხვალ 00:00-ს აყენებს
        tomorrow = date.today() + timedelta(days=1)
        target_dt = datetime.combine(tomorrow, time(0, 0))

    # თუ parsing ვერ მოხერხდა, fallback — ხვალ 00:00
    if target_dt is None:
        tomorrow = date.today() + timedelta(days=1)
        target_dt = datetime.combine(tomorrow, time(0, 0))

    return render_template(
        'index.html',
        name=name,
        target_year=target_dt.year,
        target_month_index=target_dt.month - 1,  # JS-ში თვე 0-დან იწყება
        target_day=target_dt.day,
        target_hour=target_dt.hour,
        target_minute=target_dt.minute,
        target_second=target_dt.second
    )

if __name__ == '__main__':
    app.run(debug=True)
