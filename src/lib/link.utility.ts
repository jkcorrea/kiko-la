import Router from 'next/router'

interface LinkArgs {
  path: string
  params?: object
}

function link(args: LinkArgs) {
  let params = ''
  let query = ''

  for (const [key, val] of Object.entries(args.params)) {
    params += `/${val}`
    query += `&${key}=${val}`
  }

  const href = `${args.path}?${query}`
  const as = `${args.path}${params}`

  Router.push(href, as)
}

export default link
