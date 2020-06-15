# Unrelate

This library is used to transform relative paths into absolute paths. Should work with TS projects, tested in Angular.

## Usage {#usage}

### Installation {#installation}

You can install it as a global npm package.

`npm install -g unrelate`

### Configure {#configure}

Before you use the tool, you need to configure base-url and add absolute path references relative to the base-url. Make sure you run these commands from the directory containing your `tsconfig.json` file.

#### Configuring base-url {#configure-base-url}

Use the following command to configure your base-url.

`unrelate configure base-url <your value here>`

In most cases, you might want to set your base-url to the current directory. You can do that as so.

`unrelate configure base-url ./`

#### Configuring paths {#configure-path}

You can add paths using the following command.

`unrelate configure add-path <your path here>`

For example, if you want to create an absolute path for `./src/app/components`, you can use the following command.

`unrelate configure add-path ./src/app/components`

### Cleanup {#cleanup}

To cleanup a file with relative imports to use the configured absolute imports, use the following command.

`unrelate cleanup /path/fo/file.ts`

For example, if you wan to cleanup `./src/app/components/component.ts`, use the following command.

`unrelate cleanup ./src/app/components/component.ts`
