import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localforage from 'localforage'

const fileCache = localforage.createInstance({
  name: 'filecache'
});

(async() => {
  await fileCache.setItem('colour', 'red')
  const colour = await fileCache.getItem('colour')
  console.log(colour)
}) ()

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args)
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a'}
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href
          }
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}` 
        }
      })
      
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args)

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import THREE from 'three.js';
              import React, { useState } from 'react@16.0.0';
              console.log(THREE, React, useState);
            `
          }
        } 
        const { data, request } = await axios.get(args.path)
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        }
      }) 
    }
  }
}