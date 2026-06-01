from .settings import *  # noqa: F403

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'echelon_db',
        'USER': 'postgres',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        'PORT': '5432',
    },
}

PASSWORD_HASHERS = ['django.contrib.auth.hashers.MD5PasswordHasher']
