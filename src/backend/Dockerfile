FROM python:3.9
RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get install uwsgi-plugin-python3 gettext-base gettext libssl-dev swig python3-dev gcc -y && \
  apt-get autoremove -y && \
  apt-get autoclean -y && \
  apt-get clean -y

RUN mkdir /app
ADD requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

ADD src /app/src
WORKDIR /app/src

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]