export default function asciidocFormatter() {
  const tables = document.querySelectorAll('table')
  tables.forEach(table => {
    table.className = 'table table-hover py-2'  
  })
}
