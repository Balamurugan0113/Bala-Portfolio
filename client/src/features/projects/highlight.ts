/**
 * Dependency-free syntax highlighting tokenizer.
 * Produces per-line token arrays for the code inspector.
 */

export type TokenKind = 'plain' | 'comment' | 'string' | 'keyword' | 'number' | 'fn' | 'decorator' | 'heading' | 'key' | 'bool' | 'tag';

export interface Token {
  text: string;
  kind: TokenKind;
}

const PY_KEYWORDS = new Set([
  'def', 'class', 'import', 'from', 'return', 'if', 'elif', 'else', 'for', 'while',
  'try', 'except', 'finally', 'with', 'as', 'lambda', 'None', 'True', 'False',
  'async', 'await', 'raise', 'pass', 'break', 'continue', 'in', 'not', 'and',
  'or', 'is', 'global', 'nonlocal', 'yield', 'assert', 'del', 'self', 'print',
]);

const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
  'CREATE', 'TABLE', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'NOT', 'NULL',
  'UNIQUE', 'DEFAULT', 'INDEX', 'ON', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'GROUP',
  'ORDER', 'BY', 'LIMIT', 'AND', 'OR', 'AS', 'INTEGER', 'TEXT', 'REAL', 'BLOB',
  'DATETIME', 'CHECK', 'AUTOINCREMENT', 'CONSTRAINT', 'CASCADE', 'EXISTS',
]);

const JS_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'class', 'extends', 'new', 'import', 'export', 'default', 'from', 'async',
  'await', 'try', 'catch', 'throw', 'typeof', 'instanceof', 'null', 'undefined',
  'true', 'false', 'this', 'switch', 'case', 'break', 'continue', 'of', 'in',
]);

function tokenizeLine(line: string, lang: string): Token[] {
  if (lang === 'markdown') return tokenizeMarkdown(line);

  const keywords = lang === 'sql' ? null : lang === 'javascript' ? JS_KEYWORDS : PY_KEYWORDS;
  const tokens: Token[] = [];
  let rest = line;

  // Comment prefixes
  const commentPrefix = lang === 'sql' ? '--' : '#';

  while (rest.length > 0) {
    // comment (to end of line)
    if (rest.startsWith(commentPrefix)) {
      tokens.push({ text: rest, kind: 'comment' });
      return tokens;
    }
    // triple / single-line strings
    const strMatch = rest.match(/^("""|'''|"|'|`)/);
    if (strMatch) {
      const quote = strMatch[1];
      let end = rest.indexOf(quote, quote.length);
      if (end === -1) {
        tokens.push({ text: rest, kind: 'string' });
        return tokens;
      }
      end += quote.length;
      tokens.push({ text: rest.slice(0, end), kind: 'string' });
      rest = rest.slice(end);
      continue;
    }
    // numbers
    const numMatch = rest.match(/^\d[\d._]*(e[+-]?\d+)?/i);
    if (numMatch) {
      tokens.push({ text: numMatch[0], kind: 'number' });
      rest = rest.slice(numMatch[0].length);
      continue;
    }
    // words (identifiers / keywords / calls)
    const wordMatch = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (wordMatch) {
      const word = wordMatch[0];
      const isCall = /^\s*\(/.test(rest.slice(word.length));
      let kind: TokenKind = 'plain';
      if (lang === 'sql' && SQL_KEYWORDS.has(word.toUpperCase())) kind = 'keyword';
      else if (keywords?.has(word)) kind = word === 'True' || word === 'False' || word === 'None' || word === 'true' || word === 'false' || word === 'null' ? 'bool' : 'keyword';
      else if (isCall) kind = 'fn';
      tokens.push({ text: word, kind });
      rest = rest.slice(word.length);
      continue;
    }
    // decorator
    const decMatch = rest.match(/^@\w+/);
    if (decMatch) {
      tokens.push({ text: decMatch[0], kind: 'decorator' });
      rest = rest.slice(decMatch[0].length);
      continue;
    }
    // json key: "..." followed by :
    if (lang === 'json') {
      // handled by string branch; keys detected below via lookahead isn't trivial — keep strings
    }
    // consume one symbol char
    tokens.push({ text: rest[0], kind: 'plain' });
    rest = rest.slice(1);
  }
  return tokens;
}

function tokenizeMarkdown(line: string): Token[] {
  if (/^#{1,6}\s/.test(line)) return [{ text: line, kind: 'heading' }];
  if (/^\s*(-{3,}|={3,}|\|)/.test(line)) return [{ text: line, kind: 'tag' }];
  if (/^\s*```/.test(line)) return [{ text: line, kind: 'keyword' }];
  if (/^\s*[-*]\s/.test(line)) return [{ text: line, kind: 'plain' }];

  // inline: `code` and **bold**
  const tokens: Token[] = [];
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) tokens.push({ text: line.slice(last, m.index), kind: 'plain' });
    tokens.push({ text: m[0], kind: m[0].startsWith('`') ? 'string' : 'keyword' });
    last = m.index + m[0].length;
  }
  if (last < line.length) tokens.push({ text: line.slice(last), kind: 'plain' });
  return tokens;
}

export function highlight(code: string, lang: string): Token[][] {
  return code.split('\n').map((line) => tokenizeLine(line, lang));
}
