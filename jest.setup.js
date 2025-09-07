import '@testing-library/jest-dom'

import { assertableTranslationKeys } from './src/test/utils/translations'

jest.mock('react-i18next', () => {
  return {
    ...jest.requireActual('react-i18next'),
    Trans: jest.fn(({ i18nKey, components }) => {
      return (
        <>
          {i18nKey}
          {Object.values(components || {})}
        </>
      )
    }),
    useTranslation: (_, { keyPrefix } = {}) => ({
      t: assertableTranslationKeys(keyPrefix ?? ''),
      i18n: {
        language: 'en',
        changeLanguage: jest.fn(),
      },
    }),
  }
})
