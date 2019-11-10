# License-init
![Node Version](https://img.shields.io/node/v/license-init)
![NPM Version](https://img.shields.io/npm/v/license-init)
![License](https://img.shields.io/github/license/b3u/license-init)

Generate a license for your project. All from the command line.

If you enjoy this project, check [Frank Abgrall's readme generator](https://github.com/kefranabg/readme-md-generator)

## Install
```sh
npm install -g license-init
```
_Or_
```sh
yarn add license-init -g
```

## Use
```sh
license-init (--lic=<MIT>)
```

Detects license type from package.json. Or, set `lic` equal to requested license type. If you don't know, that's fine. Follow the prompts.

**Supported Licenses**
  * MIT
  * GNU GPL v3
  * Apache 2.0
  * _Your favorite license via PR..._ :grinning:

## Contribute
To add a license, add the information in the `list.json` using the following format:
```json
{
  "list": [
    {...},
    {
      "name": "Full name of the license",
      "aliases": ["Alternate names for the license that someone might use"],
      "txt": "The license itself. newlines escaped with `\n` and any items to be filled in enclosed in [brackets].",
      "notice": "If the license recommends it, the notice which should be attached to the readme"
    }
  ]
}
```

## License
Copyright © 2019 [Binyamin Green](https://b3u.netlify.com)\
This project uses the [MIT License](./license.md)