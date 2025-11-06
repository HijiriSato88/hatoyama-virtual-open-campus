import { createReadStream } from 'node:fs'
import { promises as fsp } from 'node:fs'
import { extname, resolve } from 'node:path'
import { createError, defineEventHandler, sendStream, setHeader } from 'h3'

const buildRoot = resolve(process.cwd(), 'public/unity/campus/Build')

const resolveContentType = (filePath: string) => {
  const isGzip = filePath.endsWith('.gz')
  const ext = isGzip
    ? extname(filePath.slice(0, -3)).toLowerCase()
    : extname(filePath).toLowerCase()

  switch (ext) {
    case '.js':
      return 'application/javascript; charset=utf-8'
    case '.wasm':
      return 'application/wasm'
    case '.data':
      return 'application/octet-stream'
    default:
      return 'application/octet-stream'
  }
}

export default defineEventHandler(async (event) => {
  const params = event.context.params?.path
  const segments = Array.isArray(params)
    ? params
    : typeof params === 'string'
      ? params.split('/')
      : []

  if (!segments.length) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  const absPath = resolve(buildRoot, ...segments)

  if (!absPath.startsWith(buildRoot)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  try {
    await fsp.access(absPath)
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  const contentType = resolveContentType(absPath)
  setHeader(event, 'Content-Type', contentType)

  if (absPath.endsWith('.gz')) {
    setHeader(event, 'Content-Encoding', 'gzip')
  }

  return sendStream(event, createReadStream(absPath))
})
