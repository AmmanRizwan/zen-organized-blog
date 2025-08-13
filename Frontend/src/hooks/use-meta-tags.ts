import { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
}

export function useMetaTags({
  title,
  description,
  keywords = [],
  image,
  type = 'website'
}: MetaTagsProps) {
  const updateMetaTags = () => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update meta tags
    const metaTags = {
      description,
      keywords: keywords.join(', '),
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:type': type,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    };

    // Update existing meta tags or create new ones
    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;

      // Try to find existing meta tag
      let meta = document.querySelector(`meta[name="${name}"]`) ||
                 document.querySelector(`meta[property="${name}"]`);

      if (meta) {
        // Update existing tag
        meta.setAttribute('content', content);
      } else {
        // Create new tag
        meta = document.createElement('meta');
        if (name.startsWith('og:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });
  };

  // Update meta tags when component mounts or props change
  useEffect(() => {
    updateMetaTags();
  }, [title, description, keywords.join(','), image, type]);
}
