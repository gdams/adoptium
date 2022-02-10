import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/atom-one-dark.css'

import java from 'highlight.js/lib/languages/java'
import bash from 'highlight.js/lib/languages/bash'
import powershell from 'highlight.js/lib/languages/powershell'
import dos from 'highlight.js/lib/languages/dos'

hljs.registerLanguage('java', java)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('powershell', powershell)
hljs.registerLanguage('dos', dos)

export default function highlightCode () {
  const codeBlocks = document.querySelectorAll('pre > code')
  codeBlocks.forEach(codeBlock => {
    if (typeof codeBlock === 'object') {
      hljs.highlightElement(codeBlock)
    }
  })
}
