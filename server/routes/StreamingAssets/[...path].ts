import { createReadStream } from 'node:fs'
import { promises as fsp } from 'node:fs'
import { join, resolve, extname, posix as pathPosix } from 'node:path'
import { defineEventHandler, sendStream, setHeader, createError } from 'h3'

const streamingAssetsRoot = resolve(
  process.cwd(),
  'public/unity/campus/StreamingAssets'
)

const findFileRecursive = async (
  root: string,
  fileName: string
): Promise<string | null> => {
  const queue = [root]
  while (queue.length) {
    const current = queue.shift()!
    let dirEntries
    try {
      dirEntries = await fsp.readdir(current, { withFileTypes: true })
    } catch {
      continue
    }
    for (const entry of dirEntries) {
      const absPath = resolve(current, entry.name)
      if (entry.isDirectory()) {
        queue.push(absPath)
        continue
      }
      if (entry.isFile() && entry.name === fileName) {
        return absPath
      }
    }
  }
  return null
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

  const requestedPath = pathPosix.join(...segments)
  const absolutePath = resolve(streamingAssetsRoot, requestedPath)

  if (!absolutePath.startsWith(streamingAssetsRoot)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const candidatePaths: string[] = []
  const hasExtension = extname(requestedPath) !== ''

  const pushCandidate = (relative: string) => {
    const resolved = resolve(streamingAssetsRoot, relative)
    if (!resolved.startsWith(streamingAssetsRoot)) {
      return
    }
    candidatePaths.push(resolved)
    if (!hasExtension) {
      const resolvedWithExt = resolve(streamingAssetsRoot, `${relative}.json`)
      if (resolvedWithExt.startsWith(streamingAssetsRoot)) {
        candidatePaths.push(resolvedWithExt)
      }
    }
  }

  pushCandidate(requestedPath)

  if (!requestedPath.startsWith('talk/')) {
    pushCandidate(join('talk', requestedPath))
  }

  let resolvedFile: string | null = null
  for (const candidate of candidatePaths) {
    try {
      await fsp.access(candidate)
      resolvedFile = candidate
      break
    } catch {
      // continue trying others
    }
  }

  if (!resolvedFile) {
    const lastSegment = segments[segments.length - 1]
    const targetFileName = hasExtension ? lastSegment : `${lastSegment}.json`
    resolvedFile = await findFileRecursive(
      resolve(streamingAssetsRoot, 'talk'),
      targetFileName
    )
  }

  if (!resolvedFile) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  const mime =
    {
      '.json': 'application/json; charset=utf-8',
      '.txt': 'text/plain; charset=utf-8'
    }[extname(resolvedFile).toLowerCase()] ?? 'application/octet-stream'
  setHeader(event, 'Content-Type', mime)

  return sendStream(event, createReadStream(resolvedFile))
})
