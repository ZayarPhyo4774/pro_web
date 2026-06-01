from rest_framework.throttling import AnonRateThrottle


class InquiryRateThrottle(AnonRateThrottle):
    scope = 'inquiry'


class NewsletterRateThrottle(AnonRateThrottle):
    scope = 'newsletter'


class AuthRateThrottle(AnonRateThrottle):
    scope = 'auth'
