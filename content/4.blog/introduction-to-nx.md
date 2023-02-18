---
layout: post
title: Introduction to NX for monorepos
image: /public/uploads/images/blog/introduction-to-nx.jpg
description: Nx is a smart, fast and extensible build system with first class monorepo support and powerful integrations
date: 2021-04-18
tags: ['logos:nx']
published: true
---

## Introduction
Nx is a smart, fast and extensible build system with first class monorepo support and powerful integrations. It has set of extensible dev tools that helps you to build your project at any scale, test, and lint your code, and automate many development tasks.

### What is Monorepo

## Why NX?
Nx has two main goals:

- Speed up your existing workflow with minimum effort.
- Provide a first-rate developer experience no matter the size of the repo.

It achieves speed that via computation caching, by only run tasks affected by a given change and by being able to distribute your task execution across multiple agents in CI.

High quality DX is implemented via code generators, IDE extensions and by helping you keep your codebase evergreen.

### How does Nx compare to other tools?
If you know other tools in the monorepo space, here is how Nx compares:

- [Monorepo.tools](https://monorepo.tools/)
- [Nx and Turborepo](https://nx.dev/blog/nx-and-turborepo)

## Usage

```zsh
npx create-nx-workspace@latest
```