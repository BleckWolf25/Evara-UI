import fs from 'fs'
import path from 'path'

const rootDir = process.cwd()

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f)
    const isDirectory = fs.statSync(dirPath).isDirectory()
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.output' && f !== 'dist' && f !== '.turbo' && f !== '.next' && f !== '.nuxt') {
        walkDir(dirPath, callback)
      }
    } else {
      callback(dirPath)
    }
  })
}

let count = 0
walkDir(rootDir, (filePath) => {
  const ext = path.extname(filePath)
  if (['.json', '.ts', '.tsx', '.vue', '.svelte', '.js', '.mjs', '.cjs', '.md', '.yml', '.yaml'].includes(ext)) {
    const content = fs.readFileSync(filePath, 'utf8')
    if (content.includes('@bleckwolf25')) {
      const updated = content.replaceAll('@bleckwolf25', '@bleckwolf25')
      fs.writeFileSync(filePath, updated, 'utf8')
      console.log(`Updated: ${path.relative(rootDir, filePath)}`)
      count++
    }
  }
})

console.log(`Finished updating ${count} files.`)
