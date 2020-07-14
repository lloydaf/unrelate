# Unrelate

[![Build Status](https://travis-ci.org/lloydaf/unrelate.svg?branch=master)](https://travis-ci.org/lloydaf/unrelate)
![npm bundle size](https://img.shields.io/bundlephobia/min/unrelate)
![npm](https://img.shields.io/npm/v/unrelate)

This library is used to transform relative paths into absolute paths. You should have either a tsconfig.json or jsconfig.json file present in your project directory where you run this tool.

## Usage

### Installation

You can install it as a global npm package.

`npm install -g unrelate`

### Configure

Before you use the tool, you need to configure base-url and add absolute path references relative to the base-url. Make sure you run these commands from the directory containing your `tsconfig.json` file.

#### Configuring base-url

Use the following command to configure your base-url.

`unrelate configure base-url <your value here>`

In most cases, you might want to set your base-url to the current directory. You can do that as so.

`unrelate configure base-url ./`

#### Configuring paths

You can add paths using the following command.

`unrelate configure add-path <your path here>`

For example, if you want to create an absolute path for `./src/app/components`, you can use the following command.

`unrelate configure add-path ./src/app/components`

### Cleanup

To cleanup a file with relative imports to use the configured absolute imports, use the following command.

`unrelate cleanup /path/to/file.ts`

For example, if you want to cleanup `./src/app/components/component.ts`, use the following command.

`unrelate cleanup ./src/app/components/component.ts`

## Contributing

Please feel free to raise a PR if you want to contribute.
