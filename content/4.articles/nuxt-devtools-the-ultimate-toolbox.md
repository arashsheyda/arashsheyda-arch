---
layout: post
title: "Nuxt DevTools: The Ultimate Toolbox"
image: /uploads/images/blog/devtools/devtools.png
description: Nuxt DevTools is a Nuxt Module that provides a rich set of debugging and development tools ...
date: 2023-09-21
published: true
links:
  - title: Slides
    icon: https://d33wubrfki0l68.cloudfront.net/273aa82ec83b3e4357492a201fb68048af1c3e6a/8f657/logo.svg
    url: http://vuetoronto23.arashsheyda.me/1
  - title: Sponsor
    icon: logos:github-icon
    url: https://github.com/arashsheyda
---

::arch-alert
  note: this was prepared for VueConf Toronto 2023.
::

Hi everyone! Today, we'll explore the power and versatility of Nuxt DevTools and how it can enhance your Nuxt Development Experience.

## What is Nuxt DevTools?

Nuxt DevTools is a Nuxt Module that provides a rich set of debugging and development tools. It's designed to simplify and optimize the development process, making it easier to build strong and performant Nuxt applications. It is built by [Anthony Fu](https://github.com/antfu), and it's [open-sourced](http://github.com/nuxt/DevTools) under [Nuxt](https://github.com/nuxt) repositories.

The purpose of it is simple, to speed up the development process and make it easier to debug and optimize our Nuxt projects. It provides a rich set of tools that we will explore in a bit.

### Instalation

Nuxt DevTools comes pre-enabled when you initialize a new Nuxt project, so you don't need to worry about that. However, if you have a project without DevTools, you can simply use the wizard 🧙
```bash [terminal]
npx nuxi devtools enable
```

## Features of Nuxt DevTools

Let's dive into a project and see Nuxt DevTools in action!

::arch-alert{type="warning"}
  the video will be uploaded shortly! mean while you can explore Nuxt DevTools yourself!
::

So, now that we know what Nuxt DevTools looks like, what's your favorite tab?

## Custom Module: CRUD Generator


Okay, Time to get our hands dirty :) Run the below command to generate the module's project.

```bash [terminal]
npx nuxi init my-module -t module-devtools
```

### Module Structure

so if you go to `my-module` directory, you can see that we have 3 main directories:
  - client: this directory is responsible for the module's UI.
  - playground: a plain nuxt project to test your module.
  - src: the module's code

### RPC

Now that we've set up the structure for our module, it's time to dive into one of the most exciting parts...

#### What is RPC?

RPC stands for Remote Procedure Call, a powerful concept that enables communication between different parts of your application. With RPC, you can trigger functions or actions on the server-side (module's code - src) from the client-side (module's UI - client). This opens up a world of possibilities for creating dynamic and interactive modules.

### Coding Time

First of all, we need to define some types for our RPC. let's create a file: `~/src/types.ts`

```ts [types.ts]
import type { Nuxt } from 'nuxt/schema'
import type { WebSocketServer } from 'vite'
import type { ModuleOptions } from './module'

export interface ServerFunctions {
  getModulesOptions(): ModuleOptions
  generateApiCRUD(): Promise
}

export interface ClientFunctions {}

export interface DevtoolsServerContext {
  nuxt: Nuxt
  options: ModuleOptions
  wsServer: Promise<WebSocketServer>
}
```

<!-- description of up file -->

Now it's time to initialize our module's RPC. Begin by creating a file under `~/src/rpc.ts` in your module's directory. This file will contain the functions that you can call from your module's UI to perform various actions on the server-side.

```ts [rpc.ts]
import type { DevtoolsServerContext, ServerFunctions } from './types'

export function setupRPC(ctx: DevtoolsServerContext): ServerFunctions {
  return {
    getModulesOptions() {
      return ctx.options
    },
    generateApiCRUD() {
      // Add logic to generate CRUD files in the project's `/server/api/` directory.
    },
  }
}
```

In this example, we've created an main function to setup the RPC in out module which has 2 simple functions that we can call:
- the `getModulesOptions` will simply pass the options of our module.
- the `generateApiCRUD` will create CRUD(create, read, update, delete) files in projects `/server/api/` directory.

Once you've defined your RPC functions, you can call them from your module's UI, creating dynamic interactions that enhance the user experience; but before that we have to add `setupRPC` to `devtools.ts`

```ts [devtools.ts]
import { Nuxt } from 'nuxt/schema'
import { existsSync } from 'fs'
import { Resolver } from '@nuxt/kit'

// import required files
import { extendServerRpc, onDevToolsInitialized } from '@nuxt/devtools-kit'
import type { ClientFunctions, ServerFunctions } from './types'
import type { ModuleOptions } from './module'
import { useViteWebSocket } from './utils'
import { setupRPC } from './rpc'

const DEVTOOLS_UI_ROUTE = '/__my-module'
const DEVTOOLS_UI_LOCAL_PORT = 3300

// add RPC_NAMESPACE
const RPC_NAMESPACE = 'devtools:rpc:my-module'

export function setupDevToolsUI(nuxt: Nuxt, resolver: Resolver) {
  const clientPath = resolver.resolve('./client')
  const isProductionBuild =  existsSync(clientPath)

  // Serve production-built client (used when package is published)
  if (isProductionBuild) {
    nuxt.hook('vite:serverCreated', async (server) => {
      const sirv = await import('sirv').then((r) => r.default || r)
      server.middlewares.use(
        DEVTOOLS_UI_ROUTE,
        sirv(clientPath, { dev: true, single: true }),
      )
    })
  }
  // In local development, start a separate Nuxt Server and proxy to serve the client
  else {
    nuxt.hook('vite:extendConfig', (config) => {
      config.server = config.server || {}
      config.server.proxy = config.server.proxy || {}
      config.server.proxy[DEVTOOLS_UI_ROUTE] = {
        target: 'http://localhost:' + DEVTOOLS_UI_LOCAL_PORT + DEVTOOLS_UI_ROUTE,
        changeOrigin: true,
        followRedirects: true,
        rewrite: (path) => path.replace(DEVTOOLS_UI_ROUTE, ''),
      }
    })
  }

  // @ts-expect-error
  nuxt.hook('devtools:customTabs', (tabs) => {
    tabs.push({
      // unique identifier
      name: 'my-module',
      // title to display in the tab
      title: 'My Module',
      // any icon from Iconify, or a URL to an image
      icon: 'carbon:apps',
      // iframe view
      view: {
        type: 'iframe',
        src: DEVTOOLS_UI_ROUTE,
      },
    })
  })

  // setup RPC
  const wsServer = useViteWebSocket(nuxt)
  onDevToolsInitialized(async () => {
    const rpcFunctions = setupRPC({ options, wsServer, nuxt })

    extendServerRpc<ClientFunctions, ServerFunctions>(RPC_NAMESPACE, rpcFunctions)
  })
}
```

now let's create the util function `useViteWebSocket`

```ts [utils.ts]
import type { WebSocketServer } from 'vite'
import type { Nuxt } from 'nuxt/schema'

export function useViteWebSocket(nuxt: Nuxt) {
  return new Promise<WebSocketServer>((_resolve) => {
    nuxt.hooks.hook('vite:serverCreated', (viteServer) => {
      _resolve(viteServer.ws)
    })
  })
}
```

now the module side is done. let's go to client side. we need a RPC composable so we can call the module's RPC's. create a file at `~/client/composables/rpc.ts`

```ts [rpc.ts]
import { onDevtoolsClientConnected } from '@nuxt/devtools-kit/iframe-client'
import type { BirpcReturn } from 'birpc'
import { ref } from 'vue'
import type { NuxtDevtoolsClient } from '@nuxt/devtools-kit/dist/types'
import type { ClientFunctions, ServerFunctions } from '../../src/types'

const RPC_NAMESPACE = 'devtools:rpc:my-module'

export const devtools = ref<NuxtDevtoolsClient>()
export const devtoolsRpc = ref<NuxtDevtoolsClient['rpc']>()
export const rpc = ref<BirpcReturn<ServerFunctions, ClientFunctions>>()

onDevtoolsClientConnected(async (client) => {
  devtoolsRpc.value = client.devtools.rpc
  devtools.value = client.devtools

  rpc.value = client.devtools.extendClientRpc<ServerFunctions, ClientFunctions>(RPC_NAMESPACE, {
    // define your client functionts here.
  })
})
```

::arch-alert{type="warning"}
make sure to use the same `RPC_NAMESPACE`
::

so now we can simply call rpc in our client side and call a server rpc (e.g. `getModulesOptions`): `~/client/pages/index.vue`

```vue [index.vue]
<script setup lang="ts">
import { rpc } from '../composables/rpc'

async function generateCRUD() {
  await rpc.value?.generateApiCRUD()
}
</script>

<template>
  <div>
    <!-- Add your UI components here -->
  </div>
</template>
```

## Finished Project

::arch-alert
***And voilà! we're done.*** tried to keep this as simple as possible, [you can find the source code of the finished project with a better architecture at github](http://github.com/arashsheyda/nuxt-devtools-crud-generator).
::

also there is a [starter-project for DevTools module with RPC structure here](http://github.com/arashsheyda/nuxt-devtools-rpc-starter).

*you can learn more about [Nuxt DevTools in it documentation](https://devtools.nuxt.com/)*

## Real World Examples

Here are some real-world examples that demonstrate the versatility and power of Nuxt DevTools:

::arch-section{:cols="3"}
---
padding: true
is: arch-portfolio-item
items:
  - name: UnoCss Inspector
    favicon: //unocss.dev/logo.svg
    color: "#4d4d4d"
    images:
      - /uploads/images/blog/devtools/unocss.png
  - name: Nuxt Vitest Runner
    favicon: https://vitest.dev/logo-shadow.svg
    color: "#6da13f" 
    images:
        - /uploads/images/blog/devtools/vueuse.png
  - name: Nuxt OG Image
    favicon: //unocss.dev/logo.svg 
    images:
      - /uploads/images/blog/devtools/vueuse.png
  - name: Nuxt Mongoose
    favicon: https://nuxt-mongoose.nuxt.space/mongoose-icon.svg 
    color: "#10AA50"
    images:
      - /uploads/images/blog/devtools/vueuse.png
  - name: Built-in Vs Code
    favicon: "logos:visual-studio-code" 
    color : "#0078d7"
    images:
      - /uploads/images/blog/devtools/vueuse.png
  - name: Vueuse Docs
    favicon: https://vueuse.org/favicon.svg
    color: "#55da9e" 
    images:
      - /uploads/images/blog/devtools/vueuse.png
  - name: Icones
    favicon: https://icones.js.org/favicon.svg
    images:
      - /uploads/images/blog/devtools/icones.png
  - name: Tailwind
    favicon: https://tailwindui.com/favicon.ico
    color: "#38bdf8" 
    images:
      - /uploads/images/blog/devtools/vueuse.png
  - name: Vue Email
    favicon: //unocss.dev/logo.svg 
    images:
      - /uploads/images/blog/devtools/vueuse.png
  - name: "[Your] Module"
    favicon: logos:nuxt-icon 
    images:
      - /uploads/images/blog/devtools/vueuse.png
---
::

<!-- ## Contribution -->

## Q&A

Feel free to ask me any question! you can DM me on [:icon{name="uil:twitter"}](https://twitter.com/arash_sheyda) or [:icon{name="carbon:logo-discord"}](https://discordapp.com/users/arashsheyda)
