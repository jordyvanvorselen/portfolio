// Mock next/headers
jest.mock('next/headers', () => ({
  headers: jest.fn(() =>
    Promise.resolve({
      get: jest.fn((name: string) => {
        if (name === 'host') return 'localhost:3000'
        return null
      }),
    })
  ),
  cookies: jest.fn(() =>
    Promise.resolve({
      get: jest.fn((name: string) => {
        if (name === 'locale') return { value: 'en' }
        return null
      }),
    })
  ),
}))

// Mock getRequestConfig
jest.mock('next-intl/server', () => ({
  getRequestConfig: jest.fn(configFn => configFn),
}))

// Mock dynamic imports
jest.mock(
  '../i18n/locales/en.json',
  () => ({
    default: { test: 'Test message' },
  }),
  { virtual: true }
)

jest.mock(
  '../i18n/locales/nl.json',
  () => ({
    default: { test: 'Test bericht' },
  }),
  { virtual: true }
)

describe('i18n request config', () => {
  let mockHeaders: jest.Mock
  let mockCookies: jest.Mock

  beforeEach(async () => {
    jest.clearAllMocks()

    const { headers, cookies } = await import('next/headers')
    mockHeaders = headers as jest.Mock
    mockCookies = cookies as jest.Mock
  })

  it('should export a request config function', async () => {
    const { default: requestConfig } = await import('@/i18n/request')
    expect(typeof requestConfig).toBe('function')
  })

  it('should use cookie locale when available and valid', async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn((name: string) => {
        if (name === 'locale') return { value: 'nl' }
        return null
      }),
    })

    mockHeaders.mockResolvedValue({
      get: jest.fn((name: string) => {
        if (name === 'host') return 'example.com'
        return null
      }),
    })

    const { default: requestConfig } = await import('@/i18n/request')
    const config = await requestConfig({
      locale: 'en',
      requestLocale: Promise.resolve('en'),
    })

    expect(config.locale).toBe('nl')
  })

  it('should use hostname locale when no valid cookie', async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn(() => null),
    })

    mockHeaders.mockResolvedValue({
      get: jest.fn((name: string) => {
        if (name === 'host') return 'morethanbits.nl'
        return null
      }),
    })

    const { default: requestConfig } = await import('@/i18n/request')
    const config = await requestConfig({
      locale: 'en',
      requestLocale: Promise.resolve('en'),
    })

    expect(config.locale).toBe('nl')
  })

  it('should fallback to default locale for unknown hostname', async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn(() => null),
    })

    mockHeaders.mockResolvedValue({
      get: jest.fn((name: string) => {
        if (name === 'host') return 'unknown.com'
        return null
      }),
    })

    const { default: requestConfig } = await import('@/i18n/request')
    const config = await requestConfig({
      locale: 'en',
      requestLocale: Promise.resolve('en'),
    })

    expect(config.locale).toBe('en')
  })

  it('should ignore invalid cookie locale', async () => {
    mockCookies.mockResolvedValue({
      get: jest.fn((name: string) => {
        if (name === 'locale') return { value: 'invalid-locale' }
        return null
      }),
    })

    mockHeaders.mockResolvedValue({
      get: jest.fn((name: string) => {
        if (name === 'host') return 'morethanbits.nl'
        return null
      }),
    })

    const { default: requestConfig } = await import('@/i18n/request')
    const config = await requestConfig({
      locale: 'en',
      requestLocale: Promise.resolve('en'),
    })

    expect(config.locale).toBe('nl') // Should use hostname instead
  })

  it('should include messages in config', async () => {
    const { default: requestConfig } = await import('@/i18n/request')
    const config = await requestConfig({
      locale: 'en',
      requestLocale: Promise.resolve('en'),
    })

    expect(config).toHaveProperty('messages')
    expect(config.messages).toBeDefined()
  })
})
