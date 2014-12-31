heroku-force-ssl
================

An express middleware that redirects unencrypted HTTP requests to HTTPS.

Heroku does SSL termination at its load balancer.  However, the
internal nodeJS app can tell if the original request was made with
HTTP by inspecting headers inserted by Heroku.  We can use this
to redirect to the HTTPS heroku url.
