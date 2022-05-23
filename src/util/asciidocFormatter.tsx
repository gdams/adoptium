export default function asciidocFormatter () {
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
    if (!link.href.includes(location.host) && !link.className.includes('btn')) {
      const anchorIcon = document.createElement('i')
      anchorIcon.className = 'fa fa-external-link fa-xs p-1'
      link.target = '_blank'
      link.append(anchorIcon)
    }
  })
  // Hack to get fontawesome to render correctly
  const spans = document.querySelectorAll('span')
  spans.forEach(span => {
    if (span.className === 'icon') {
      const iconName = span.innerHTML.substring(1, span.innerHTML.length - 1)
      let iconClass = 'fa'
      if (iconName === 'docker') {
        iconClass = 'fab'
      }
      const archiveTypeIcon = document.createElement('i')
      archiveTypeIcon.className = `${iconClass} fa-${iconName}`
      archiveTypeIcon.ariaHidden = true
      span.replaceWith(archiveTypeIcon)
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
}
