
# {{name}}

{{desc}}

## Inputs

- `key-id`: AccessKeyId

## Outputs

- `url`: 输出 URL

## Usage

```yaml
- name: {{name}}
  id: {{pkgName}}
  uses: tvrcgo/{{pkgName}}@v0.1.0
  with:
    key-id: ${{ secrets.KEY_ID }}
```
