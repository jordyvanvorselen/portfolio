export const assertableTranslationKeys =
  (prefix?: string) => (key: string, params?: { [key: string]: string }) => {
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

export const varsToKeyValueString = (vars: { [key: string]: string }) =>
  Object.entries(vars)
    .map(([k, v]) => (v ? `${k}=${v}` : undefined))
    .filter(Boolean)
    .join(' ')
