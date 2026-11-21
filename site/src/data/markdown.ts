// A small, safe text formatter for short pieces of text edited on /admin, such as the sections of a
// news post. It turns the basic formatting the editor's toolbar writes into HTML, and nothing else:
//   - paragraphs (a blank line between them) and line breaks (a line ending in two spaces or "\")
//   - bullet lists (lines starting "- " or "* ") and numbered lists ("1. ")
//   - **bold**, *italic* or _italic_, and [links](address)
// Everything else is shown as typed: any HTML is escaped, so text can't break the page, and links
// may only go to web addresses, pages on this site, email, phone or text-message addresses.

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const safeHref = (url: string) => (/^(https?:\/\/|\/|#|mailto:|tel:|sms:)/i.test(url.trim()) ? url.trim() : null);

/** Bold, italics, links and line breaks within one paragraph or list item (already-escaped text). */
function inline(text: string): string {
  let out = escape(text);
  // Links first, so the formatting inside link text still applies.
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (whole, label: string, url: string) => {
    const href = safeHref(url.replace(/&amp;/g, '&'));
    return href ? `<a href="${escape(href)}">${label}</a>` : whole;
  });
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/__(.+?)__/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*\w])\*(?!\s)(.+?)\*(?!\w)/g, '$1<em>$2</em>').replace(/(^|[^_\w])_(?!\s)(.+?)_(?!\w)/g, '$1<em>$2</em>');
  // Hard line breaks: two spaces or a backslash at the end of a line; other single line breaks join up.
  out = out.replace(/( {2,}|\\)\n/g, '<br>').replace(/\n/g, ' ');
  return out;
}

/** The text as HTML: paragraphs and lists. */
export function renderText(text?: string | null): string {
  if (!text?.trim()) return '';
  const blocks = text.replace(/\r\n?/g, '\n').trim().split(/\n\s*\n/);
  return blocks
    .map((block) => {
      const lines = block.split('\n');
      const bullet = /^\s*[-*]\s+/;
      const numbered = /^\s*\d+[.)]\s+/;
      if (lines.every((l) => bullet.test(l))) return `<ul>${lines.map((l) => `<li>${inline(l.replace(bullet, ''))}</li>`).join('')}</ul>`;
      if (lines.every((l) => numbered.test(l))) return `<ol>${lines.map((l) => `<li>${inline(l.replace(numbered, ''))}</li>`).join('')}</ol>`;
      return `<p>${inline(block)}</p>`;
    })
    .join('\n');
}
