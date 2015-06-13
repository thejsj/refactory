# ReFactory

Automatically create factories tied to your RethinkDB tables, that are listening in realtime to changes in your data.

## Examples

**Simple Example**

Listen to changes in the `messages` table and the `users` table and create two factories for them.

Server Side:

There are two ways to use reFactory on your server: 1. Through a simple CLI, or 2. A Node.js application

CLI:

```
refactory --tables messages,users --port 8000
```

In your Node.js App, with Express.js:

```
var express = require('express');
var refactory = require('refactory');

var app = express();
app.use(refactory.expess({
  models: ['message', 'user']
}));

app.listen(8000);
```

Client Side:

```
<!-- Include a reference to the client-side javascript file -->
<script src="http://localhost:8000/refactory/client.js">
```

```javascript
angular.module('rethinkDBWorkshop.services', [])
  .factory('MessageFactory', function (refactory) {
      return refactoryFactory({
          model: 'message'
      });
  })
  .factory('UserFactory', function (refactory) {
      return refactoryFactory({
          model: 'user'
      });
  })
  .controller('MainController', function (MessageFactory) {
    var messages = MessageFactory.get();
    messages.forEach(function (row) {
      console.log(row);
    });
    setTimeout(function () {
      // The collection of messages will be saved to the database, and then
      // added to the collection in the client
      MessageFactory.add({
        'name': 'jorge',
        'age': 99
      });
    });
  });
```
