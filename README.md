Http | TechJS

The TypeScript REST framework build on the [TechJS core library](https://www.npmjs.com/package/@techjs/core).

## Installation

This is a [TypeScript](https://www.typescriptlang.org/) module available through [NPM](https://www.npmjs.com/package/@techjs/http).

```bash
$ npm install --save @techjs/http
```

### System Dependencies

- [NodeJS](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm)

## About

The TechJS framework aims to provide a structured input event listener pattern by enforcing the principle of separation of concerns. The result is a clearly defined routes, controllers, and services. Through the power of object oriented programming, the @techjs/core library can be extended to provide a familiar interface between HTTP events and other application-layer input protocols, like event bus messages.

## Getting Started

You wil need to start by setting up a basic TypeScript project. Initialize npm. Create a tsconfig.json file and configure it as you see fit. You will also need to install the following modules:

- @techjs/core
- @techjs/http
- @techjs/cors
- @types/express
- cors
- express
- tsnode-di
- typescript

Create this basic directory structure (UNIX)

```bash
$ mkdir -p src/{services,controllers}
```

Once the project is setup and the directory structure is build, continue by creating a ping service

```typescript
// src/services/ping-service.ts

export class PingService {
  public async ping(): Promise<string> {
    return "Pong";
  }
}
```

Now create a ping controller

```typescript
// src/controllers/ping.controller.ts

import { HttpController } from "@techjs/http";
import { Resolve } from "tsnode-di";
import { PingService } from "../services/ping-service";

export class PingController extends HttpController {
  @Resolve(PingService)
  private ping_service!: PingService;
  public async ping(): Promise<void> {
    try {
      const response: string = await this.ping_service.ping();
      this.res.send(response);
    } catch (e) {
      console.error(e);
      this.res.sendStatus(500);
    }
  }
}
```

Add a routes file with a `/ping` route

```typescript
// src/routes.ts

import { HttpRoute } from "@techjs/http";

// controllers

import { PingController } from "./controllers/ping.controller";

// routes

export const routes: Array<HttpRoute<any>> = [
  new HttpRoute("/ping", "get", PingController, "ping"),
];
```

And create an entry point

```typescript
import { HttpRouter } from '@techjs/http';
import * as express from 'express';
import * as cors from 'cors';
import { routes } from './routes';

// create an express app
const app = express();

// add your express middleware here
app.use(cors());

// initialize a TechJS HttpRouter instance
// with your routes and pass the express
// instance
const router = new HttpRouter(routes);
router.init(app);

// bind the express instance to a port
app.listen(3000);
```

Your project structure should look, at a minimum, like this

```bash
.
├── package.json
├── src
│   ├── controllers
│   │   └── ping.controller.ts
│   ├── index.ts
│   ├── routes.ts
│   └── services
│       └── ping-service.ts
└── tsconfig.json
```

Use TypeScript to transpile this into Node, and then run it. You should have an application running on port 3000 that responds to GET requests on the `/ping` route with a `"Pong"` response.