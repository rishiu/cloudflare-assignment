var link_one = {'name': 'Cloudflare', 'url': 'https://www.cloudflare.com'}
var link_two = {'name': 'This Website', 'url': 'https://github.com/rishiu/cloudflare-assignment'}
var link_three = {'name': 'They\'re Made out of Meat', 'url': 'https://www.mit.edu/people/dpolicar/writing/prose/text/thinkingMeat.html'}
var links = [link_one, link_two, link_three]

let linked_in = {'logo': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn icon</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>', 'url': 'https://www.linkedin.com/in/rishi-upadhyay/'}
let git_hub = {'logo': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>', 'url': 'https://github.com/rishiu'}
let face_book = {'logo': '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook icon</title><path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"/></svg>', 'url': 'https://www.facebook.com/profile.php?id=100013406432027'}
let social_links = [linked_in, git_hub, face_book]

class LinkHandler{
  constructor(links){
    this.links = links
  }

  async element(element){
    for(let i = 0; i < this.links.length;i++){
      let link = this.links[i]
      let link_tag = '<a href=\''+link['url']+'\'>'+link['name']+'</a>\n'
      element.append(link_tag, {html: true})
    }
  }
}

class ProfileHandler{
  async element(element){
    element.removeAttribute('style')
  }
}

class ImgHandler{
  async element(element){
    element.setAttribute('src', 'https://i.ibb.co/3NhVBK7/id-pic.png')
  }
}

class UsernameHandler{
  async element(element){
    element.setInnerContent('Rishi Upadhyay')
  }
}

class TitleHandler{
  async element(element){
    element.setInnerContent('Rishi Upadhyay')
  }
}

class BodyHandler{
  async element(element){
    element.setAttribute('class', 'bg-pink-400')
  }
}

class SocialHandler{
  constructor(social_links){
    this.social_links = social_links
  }


  async element(element){
    element.removeAttribute('style')
    for(let i = 0; i < this.social_links.length;i++){
      let social_link = this.social_links[i]
      let link_tag = '<a href=\''+social_link['url']+'\'>'+social_link['logo']+'</a>\n'
      element.append(link_tag, {html: true})
    }
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if(request.url.endsWith('/links')){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return new Response(JSON.stringify(links, null, 2), {headers: headers})
  }
  let response = await fetch('https://static-links-page.signalnerve.workers.dev')
  let rewriter = new HTMLRewriter()
                  .on('div#links', new LinkHandler(links))
                  .on('div#profile', new ProfileHandler())
                  .on('img#avatar', new ImgHandler())
                  .on('h1#name', new UsernameHandler())
                  .on('div#social', new SocialHandler(social_links))
                  .on('title', new TitleHandler())
                  .on('body', new BodyHandler())
  return rewriter.transform(response)
}
