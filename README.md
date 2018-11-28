## Lighthouse Runner: An Example

_This is just a simple proof-of-concept. It's ugly. You've been warned._

### Install

- clone this repo
- yarn install

### Use

```
yarn lighthouse [url] [options]
```

Example: repeatedly test localhost:3000

```
yarn lighthouse http://localhost:3000/ --loop
```

The output can easily be pasted into a spreadsheet.

#### Options

`--loop` - Runs the test repeatedly

### Known Issues

- `--loop` does not kill child process when quit
