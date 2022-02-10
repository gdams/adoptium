export default function asciidocFormatter() {
  const tables = document.querySelectorAll('table')
  tables.forEach(table => {
    table.className = 'table table-hover py-2'  
  })

  // Hack to get fontawesome to render correctly
  const spans = document.querySelectorAll('span')
  spans.forEach(span => {
    if (span.className === "icon") {
      let iconName = span.innerHTML.substring(1, span.innerHTML.length-1);
      let archiveTypeIcon = document.createElement('i');
      archiveTypeIcon.className = `fa fa-${iconName}`;
      archiveTypeIcon.ariaHidden = true;
      span.replaceWith(archiveTypeIcon)
    }
  })
  const tds = document.querySelectorAll('td')
  tds.forEach(td => {
    if (td.className === "icon") {
      let archiveTypeIcon = document.createElement('i');
      archiveTypeIcon.className = 'fa fa-circle-info fa-xl';
      archiveTypeIcon.ariaHidden = true;
      td.appendChild(archiveTypeIcon)
    }
  })
}
