# grunt-more-css

> Minify CSS using more-css.

[More-css](https://github.com/army8735/more) currently dominates [minification benchmarks](https://github.com/GoalSmashers/css-minification-benchmark) ([results](http://goalsmashers.github.io/css-minification-benchmark/)). This plugin makes it available for Grunt users.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-more-css --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-more-css');
```

## The "more_css" task

### Overview
In your project's Gruntfile, add a section named `more_css` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  more_css: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### radical
Type: `Boolean`
Default value: `true`

A boolean value indicating whether "radical compression" is enabled. See [more-css documentation](https://github.com/army8735/more) and Caveats (below).

#### report
Choices: `'min'`, `'gzip'`  
Default: `'min'`

Either report only minification result or report minification and gzip results.
This is useful to see exactly how well clean-css is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).

### Usage Examples

#### Default Options
In this example, `src/style1.css` and `src/style2.css` are minified to a single file called `dest/style.min.css`.

```js
grunt.initConfig({
  more_css: {
    my_target: {
      files: {
        'dest/style.min.css': ['src/style1.css', 'src/style2.css'],
      },
    },
  },
});
```

#### Custom Options
In this example, radical compression is disabled and both minified and min+gzipped size is reported.

```js
grunt.initConfig({
  more_css: {
    options: {
      radical: false,
      report: 'gzip',
    },
    my_target: {
      files: {
        'dest/style.min.css': ['src/style1.css', 'src/style2.css'],
      },
    },
  },
});
```

## Caveats

The author doesn't understand the [more-css documentation](https://github.com/army8735/more). The "radical compression" option is probably dangerous and will break your CSS in some corner cases.

To get a rough idea what the compression tricks might be, see [this blog post by Colt McAnlis](http://mainroach.blogspot.fi/2013/07/css-compression-minifier-roulette.html).

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2015-02-13 v0.1.0 initial release
