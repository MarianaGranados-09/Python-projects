from turtle import title
from flask import render_template
from app import app
#decorators
@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'Miguel'}
    #dict posts
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Great day in Portland!'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The Avengers movie was so coool.'
        }
    ]
    return render_template('index.html', title='Home', user=user, posts=posts)