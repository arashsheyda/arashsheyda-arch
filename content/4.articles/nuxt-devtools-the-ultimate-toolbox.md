---
layout: post
title: "Nuxt DevTools: The Ultimate Toolbox"
image: /uploads/images/blog/DevTools.png
description: Nuxt DevTools is a Nuxt Module that provides a rich set of debugging and development tools ...
date: 2023-09-21
published: false
links:
  - title: Slides
    icon: //d33wubrfki0l68.cloudfront.net/273aa82ec83b3e4357492a201fb68048af1c3e6a/8f657/logo.svg
    url: //vuue-toronto-talk-dev.vercel.app/
  - title: Github
    icon: logos:github-icon
    url: //github.com
---

::arch-alert
  note: this was prepared for VueConf Toronto 2023.
::

Hi everyone! Today, we'll explore the power and versatility of Nuxt DevTools and how it can enhance your Nuxt Development Experience.

## What is Nuxt DevTools?

Nuxt DevTools is a Nuxt Module that provides a rich set of debugging and development tools. It's designed to simplify and optimize the development process, making it easier to build strong and performant Nuxt applications. It is built by [Antony Fu](https://github.com/antfu), and it's [open-sourced](http://github.com/nuxt/DevTools).

The purpose of it is simple, to speed up the development process and make it easier to debug and optimize our Nuxt projects. It provides a rich set of tools that we will explore in a bit.

### Instalation

Nuxt DevTools comes pre-enabled when you initialize a new Nuxt project, so you don't need to worry about that. However, if you have a project without DevTools, you can simply use the wizard 🧙
```bash [terminal]
npx nuxi devtools enable
```

## Features of Nuxt DevTools

Let's dive into a project and see Nuxt DevTools in action!

[video]

*you can learn more about [Nuxt DevTools in it documentation](https://devtools.nuxt.com/)*

So, now that we know what Nuxt DevTools looks like, what's your favorite tab?

## Custom Module: SQLite Schema Visualizer


Okay, Time to get our hands dirty :) Run the below command to generate the module's project.

```bash [terminal]
npx nuxi init my-module -t module-devtools
```

### Module Structure

so if you go to `my-module` directory, you can see that we have 3 main directories:
  - client: this directory is responsible for the module's UI.
  - playground: a plain nuxt project to test your module.
  - src: the module's logic, think it as an backend

### RPC

#### What is RPC?

RPC definitation

### Coding Time

so lets add some RPC's to our project! create a file under `~/src/rpc/index.ts`

## Real World Examples
::arch-section{:cols="3"}
---
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
        - https://vuue-toronto-talk-dev.vercel.app/assets/unocss-6f96632d.png
  - name: Nuxt OG Image
    favicon: //unocss.dev/logo.svg 
    images:
      - https://vuue-toronto-talk-dev.vercel.app/assets/unocss-6f96632d.png
  - name: Nuxt Mongoose
    favicon: https://nuxt-mongoose.nuxt.space/mongoose-icon.svg 
    color: "#10AA50"
    images:
      - https://vuue-toronto-talk-dev.vercel.app/assets/unocss-6f96632d.png
  - name: Built-in Vs Code
    favicon: "logos:visual-studio-code" 
    color : "#0078d7"
    images:
      - https://vuue-toronto-talk-dev.vercel.app/assets/unocss-6f96632d.png
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
      - https://vuue-toronto-talk-dev.vercel.app/assets/unocss-6f96632d.png
  - name: Vue Email
    favicon: //unocss.dev/logo.svg 
    images:
      - https://vuue-toronto-talk-dev.vercel.app/assets/unocss-6f96632d.png
  - name: "[Your] Module"
    favicon: logos:nuxt-icon 
    images:
      - https://vuue-toronto-talk-dev.vercel.app/assets/unocss-6f96632d.png
---
::

<!-- ## Contribution -->

## Q&A

Feel free to ask me any question! you can DM me on [:icon{name="uil:twitter"}](https://twitter.com/arash_sheyda)
