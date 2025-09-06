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

declare module '*.png' {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}

declare module '*.jpg' {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}

declare module '*.jpeg' {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}

declare module '*.webp' {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}

declare module '*.avif' {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}

declare module '*.gif' {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}

declare module '*.ico' {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}

declare module '*.bmp' {
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
