# LicGen
![Node Version](https://img.shields.io/node/v/licgen)
![Downloads](https://img.shields.io/npm/dt/licgen)
![License](https://img.shields.io/github/license/b3u/licgen)

Generate a license for your project. All from the command line.

If you enjoy this project, check [Frank Abgrall's readme generator](https://github.com/kefranabg/readme-md-generator)

## Install
```sh
npm install -g licgen
```
_Or_
```sh
yarn add -g licgen
```

## Use
```sh
licgen [--type=mit]
```
If you have a license listed in your `package.json`, it will choose that license for you. If you don't, it will prompt you to choose a license.

Alternatively, choose your *own* license with the `type` argument.

**Supported Licenses**
  * MIT
  * GNU GPL v3
  * Apache 2.0
  * BSD 3-Clause
  * _Your favorite license via PR..._ :grinning:

## Contribute
To add a license, add the necessary information in [list.json](https://github.com/b3u/licgen/blob/master/list.json) using the following format:
```js
{
  "list": [
    {
      "name": "Full name of the license",
      "aliases": ["Other names for the license that a user might type"],
      "txt": "The license itself. Newlines escaped with `\n` and any items to be filled-in enclosed by [brackets].",
      "notice": "If the license recommends one, a notice which should be attached to the readme"
    }
  ]
}
```

## License
Copyright © 2019 [Binyamin Green](https://b3u.netlify.com)\
This project uses the [MIT License](https://github.com/b3u/licgen/blob/master/LICENSE.md)