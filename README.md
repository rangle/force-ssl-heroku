force-ssl-heroku
================

An express middleware that redirects unencrypted HTTP requests to HTTPS on Heroku instances.

Heroku does SSL termination at its load balancer.  However, the
internal nodeJS app can tell if the original request was made with
HTTP by inspecting headers inserted by Heroku.  We can use this
to redirect to the HTTPS Heroku url.

Installation
============

```
npm install force-ssl-heroku --save
```

Usage
=====

It's designed for use with [express](https://www.npmjs.com/package/express):

```js
var express = require('express');
var forceSsl = require('force-ssl-heroku');

var app = express();
app.use(forceSsl);

// Example:
app.get('/ping', pingHandler); // I'll now redirect to HTTPS.

// ... configure the rest of your routes.

app.listen(3000, 'localhost');
```

Caveat
======

It works because Heroku exposes your app through a reverse proxy which is used for load-balancing and other things.  This reverse proxy does SSL termination and forwards to your app which __should only accept connections from localhost__.  The middleware detects this situation by inspecting headers inserted by Heroku's reverse proxy;  __since headers can be spoofed, you should not use this middleware anywhere that's not behind such a proxy__!
