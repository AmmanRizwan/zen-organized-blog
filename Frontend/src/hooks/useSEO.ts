import { useEffect } from 'react';
import { SEOMetadata } from '../lib/SEOMetadata';

interface UseSEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
}

export function useSEO({
  title,
  description,
  image,
  url,
  type,
  keywords,
}: UseSEOProps) {
  useEffect(() => {
    SEOMetadata.updateMetaTags({
      title,
      description,
      image,
      url,
      type,
      keywords,
    });
  }, [title, description, image, url, type, keywords]);
}
