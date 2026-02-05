export const assertableTranslationKeys =
  (prefix?: string) =>
  (key: string, params?: { [key: string]: string | number }) => {
    const translation = prefix ? `${prefix}.${key}` : key

    // Return arrays for specific tag translation keys to test tag rendering logic
    // Only return arrays for known blog post keys, not all keys containing '.tags'
    if (translation === 'blog.posts.advancedTypeScript.tags') {
      return ['TypeScript', 'React', 'Testing', 'Node.js', 'GraphQL']
    }

    return params
      ? `${translation} ${varsToKeyValueString(params)}`
      : translation
  }

export const varsToKeyValueString = (vars: {
  [key: string]: string | number
}) =>
  Object.entries(vars)
    .map(([k, v]) => (v !== undefined && v !== null ? `${k}=${v}` : undefined))
    .filter(Boolean)
    .join(' ')
