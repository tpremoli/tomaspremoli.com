"""
Django settings for tomas_premoli project.

Generated by 'django-admin startproject' using Django 3.2.12.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [
    'www.tomaspremoli.com',
    'tomaspremoli.com',
]


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api.apps.ApiConfig',
    'rest_framework',
    'frontend.apps.FrontendConfig',
    'django_cleanup.apps.CleanupConfig',
    'tomas_premoli'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'tomas_premoli.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'tomas_premoli.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

if 'RDS_HOSTNAME' in os.environ:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': os.environ['RDS_DB_NAME'],
            'USER': os.environ['RDS_USERNAME'],
            'PASSWORD': os.environ['RDS_PASSWORD'],
            'HOST': os.environ['RDS_HOSTNAME'],
            'PORT': os.environ['RDS_PORT'],
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

DEFAULT_SUPERUSER_NAME = "myuser"
DEFAULT_SUPERUSER_EMAIL = "myuser@gmail.com"


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, "frontend/static")
STATIC_URL = '/static/'

if 'AWS_ACCESS_KEY_ID' in os.environ:
    # Use HTTPS in AWS
    SECURE_SSL_REDIRECT = True
    PREPEND_WWW = True
    BASE_URL = "https://www.tomaspremoli.com"

    # Use Amazon S3 for storage for uploaded media files
    # Keep them private by default
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    # Amazon S3 settings.
    AWS_ACCESS_KEY_ID = os.environ["AWS_ACCESS_KEY_ID"]
    AWS_SECRET_ACCESS_KEY = os.environ["AWS_SECRET_ACCESS_KEY"]
    AWS_STORAGE_BUCKET_NAME = os.environ["AWS_STORAGE_BUCKET_NAME"]
    AWS_S3_REGION_NAME = os.environ.get("AWS_S3_REGION_NAME", None)
    AWS_S3_SIGNATURE_VERSION = 's3v4'
    AWS_AUTO_CREATE_BUCKET = False
    AWS_HEADERS = {"Cache-Control": "public, max-age=604800"}
    AWS_S3_FILE_OVERWRITE = False
    AWS_DEFAULT_ACL = 'private'
    AWS_QUERYSTING_AUTH = True
    AWS_QUERYSTRING_EXPIRE = 600
    AWS_S3_SECURE_URLS = True
    AWS_REDUCED_REDUNDANCY = False
    AWS_IS_GZIPPED = False

    # Enables cloudfront
    AWS_S3_CUSTOM_DOMAIN = os.environ["CLOUDFRONT_DOMAIN"]

    MEDIA_ROOT = '/'
    MEDIA_URL = 'https://s3.{}.amazonaws.com/{}/'.format(
        AWS_S3_REGION_NAME, AWS_STORAGE_BUCKET_NAME)
    USING_AWS = True

    EMAIL_BACKEND = 'django_ses.SESBackend'
    SERVER_EMAIL = 'tpremoli-notif@tomaspremoli.com'
else:
    MEDIA_ROOT = os.path.join(BASE_DIR, 'api/media')
    MEDIA_URL = '/'
    USING_AWS = False

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# x-frame option

X_FRAME_OPTIONS = 'SAMEORIGIN'


# basic logging with file rotation ()
LOG_FILE = os.getenv('DJANGO_LOG_FILE_PATH')

log_level = os.getenv('LOG_LEVEL', 'INFO')
handlers = dict(file={'class': 'logging.handlers.TimedRotatingFileHandler',
                      'filename': LOG_FILE,
                      'when': 'midnight',
                      'interval': 1,
                      'backupCount': 1,
                      'encoding': 'utf-8'})
loggers = dict(django=dict(level=log_level, handlers=['file']),
               myapp=dict(level=log_level, handlers=['file']))
LOGGING = dict(version=1,
               disable_existing_loggers=False,
               handlers=handlers,
               loggers=loggers)
