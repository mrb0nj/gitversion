# GitVersion action

This action sets output variables for GitVersion

## Inputs

### `args`

any command line arguments for GitVersion

## Outputs

### `fullsemver`

The Full SemVer version number discovered by GitVersion

## Example usage

```yaml
uses: mrb0nj/gitversion@master
with:
  args: '-output buildserver'
```
