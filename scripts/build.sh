#!/usr/bin/env bash

set -e # exit with nonzero exit code if anything fails

rm -rf dist

# run the angular/ng-packagr build
# TODO enable with v4
# ng build

# run the classic buld - TODO remove with v4/Carbon v11
gulp build
ngc -p tsconfig-aot.json
webpack --config webpack.build.js
rm -rf dist/src dist/waste demo/bundle/documentation
cp README.md package.json ./dist

# move/generate/update meta files into dist
gulp buildMeta

# generate ALL the documentation
mkdir dist/docs
npm run build-storybook
npm run docs:build && mv documentation dist/docs/
