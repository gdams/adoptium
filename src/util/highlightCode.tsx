import Prism from 'prismjs'

// Load specific languages as needed from Prism's components directory
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-powershell'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-batch'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markup'

export default function highlightCode() {
  const codeBlocks = document.querySelectorAll('pre code')
  codeBlocks.forEach(codeBlock => {
    // skip all pre tags with class no-highlight
    if (codeBlock.parentElement?.classList.contains('no-highlight')) {
      return
    }
    if (typeof codeBlock === 'object') {
      Prism.highlightElement(codeBlock)
    }
  })
}
