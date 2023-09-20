export default function asciidocFormatter (t /* 't' from useI18next to retrieve translations */) {
  const tables = document.querySelectorAll('table')
  tables.forEach(table => {
    table.className = 'table table-hover py-2'
  })
  const theads = document.querySelectorAll('thead')
  theads.forEach(thead => {
    thead.className = 'table-dark'
  })
  // Mark external links appropriately
  const asciidocContent = document.getElementById('asciidoc-container')
  const links = asciidocContent.querySelectorAll('a')
  links.forEach(link => {
    if (!link.href.includes(location.host) && !link.className.includes('btn') && !link.className.includes('author-icon')) {
      const anchorIcon = document.createElement('i')
      anchorIcon.className = 'fa fa-external-link fa-xs p-1'
      link.target = '_blank'
      link.append(anchorIcon)
    }
  })
  // Look for i class="fa fa-docker" and replace with fab fa-docker
  const icons = asciidocContent.querySelectorAll('i')
  icons.forEach(icon => {
    if (icon.className.includes('fa-docker')) {
      icon.className = icon.className.replace('fa', 'fab')
    }
  })
  const tds = document.querySelectorAll('td')
  tds.forEach(td => {
    if (td.className === 'icon') {
      const archiveTypeIcon = document.createElement('i')
      archiveTypeIcon.className = 'fa fa-circle-info fa-xl'
      archiveTypeIcon.ariaHidden = true
      td.appendChild(archiveTypeIcon)
    }
  })
  const divs = document.querySelectorAll('div')
  divs.forEach(div => {
    if (div.className === 'toc') {
      const tocDetails = document.createElement('details')
      tocDetails.className = 'p-3 my-3 bg-grey'
      const tocSummary = document.createElement('summary')
      tocSummary.innerHTML = t('asciidoc.table.of.contents', 'Table of Contents')
      tocSummary.className = 'lead'
      tocDetails.appendChild(tocSummary)
      const tocList = div.getElementsByClassName('sectlevel1')[0]
      tocDetails.appendChild(tocList)
      div.replaceWith(tocDetails)
    }
  })
}
