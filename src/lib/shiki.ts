import { codeToHtml } from 'shiki'

export async function highlightCode(
  code: string,
  language: string
): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang: language.toLowerCase(),
      theme: 'catppuccin-mocha',
    })
    return html
  } catch (_error) {
    // Fallback for unsupported languages
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
