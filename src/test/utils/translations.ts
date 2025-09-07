export const assertableTranslationKeys =
  (prefix?: string) => (key: string, params?: { [key: string]: string }) => {
    const translation = prefix ? `${prefix}.${key}` : key

    return params
      ? `${translation} ${varsToKeyValueString(params)}`
      : translation
  }

export const varsToKeyValueString = (vars: { [key: string]: string }) =>
  Object.entries(vars)
    .map(([k, v]) => (v ? `${k}=${v}` : undefined))
    .filter(Boolean)
    .join(' ')
