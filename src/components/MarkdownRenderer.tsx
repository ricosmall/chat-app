import React from 'react';
import markdownit from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

interface Props {
  content: string;
}

const md: any = markdownit({
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        );
      } catch (__) {}
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
  },
});

export const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />;
};
