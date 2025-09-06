/// <reference types="@testing-library/jest-dom" />
/// <reference types="react" />

declare module '*.svg' {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}

interface Window {
  isUnderTest?: boolean
}
