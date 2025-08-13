export class SEOMetadata {
  private static defaultKeywords = ['blog', 'zen', 'organized', 'articles'];

  static updateMetaTags({
    title,
    description,
    image = 'https://zen-organized-blog.vercel.app/og-image.jpg',
    url = 'https://zen-organized-blog.vercel.app',
    type = 'website',
    keywords = [],
  }: {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
    keywords?: string[];
  }) {
    if (typeof document === 'undefined') return;

    const allKeywords = [...this.defaultKeywords, ...keywords];

    // Update document title
    document.title = title;

    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update canonical link
    let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', url);

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', allKeywords.join(', '));
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('robots', 'index, follow');
  }
}
