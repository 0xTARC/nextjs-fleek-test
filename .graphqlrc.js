/** @type {import('graphql-config').IGraphQLConfig} */
// Can even merge multiple schemas into one. See: https://the-guild.dev/graphql/codegen/docs/config-reference/schema-field#multiple-schemas-and-client-side-schema
module.exports = {
  schema:
    'https://api.goldsky.com/api/public/project_cl9gc21q105380hxuh8ks53k3/subgraphs/panoptic-subgraph-sepolia/beta7-prod/gn',
  documents: 'src/graphql/**/*.graphql',
  overwrite: true,
  generates: {
    'src/graphql/types.generated.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        avoidOptionals: {
          object: false,
          inputValue: false,
        },
        declarationKind: 'interface',
        scalars: {
          BigInt: 'string',
          BigDecimal: 'string',
        },
      },
    },
    'src/graphql/sdk.generated.ts': {
      preset: 'import-types',
      presetConfig: {
        typesPath: './types.generated',
      },
      plugins: ['typescript-graphql-request'],
      config: {
        avoidOptionals: false,
      },
    },
  },
}
