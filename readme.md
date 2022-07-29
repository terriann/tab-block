# Tab Group Block

Forked from: https://github.com/amalter/tab_block
Blog: https://www.amberalter.com/2021/11/20/building-a-gutenberg-block-for-tabbed-content/

## Description

WordPress Gutenberg block built with [@wordpress/create-block](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-create-block/) starter kit. Written with ESNext standard and JSX support – build step required.

Block displays a simple tab layout using parent block `[ 'tab-group/tabs' ]` and inner child blocks `[ 'tab-group/tab' ]`.

## Updating plugin code

1. Cd into `/plugins/tab-block` directory and run `npm install`
2. Inside `/plugins/tab-block` directory you can run the following commands during development and build:
   * `npm start`  Starts the build for development
   * `npm run build` Builds the code for production
   * `npm run format` Formats files
   * `npm run lint:css` Lints CSS files.
   * `npm run lint:js` Lints JavaScript files.
   * `npm run packages-update` Updates WordPress packages to the latest version.


## Changelog

= 1.0.0 =

* Fix typos
* Refactor tab layout
* **BREAKING CHANGE** - block attributes for tab layout changed with no deprecation steps. Blocks will need to be recovered and tab layout reset for any non default (left/side) tab groups
* **BREAKING CHANGE** - block name changes from `create-block/tabs` to `tab-group/tabs`

= 0.1.0 =
* Release
