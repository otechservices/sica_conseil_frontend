import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private renderer: Renderer2;
  private isBrowser: boolean;

  constructor(
    private title: Title,
    private meta: Meta,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setPageMetadata(title: string, description: string) {
    if (this.isBrowser) {
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
    }
  }

  setJsonLd(schema: object) {
    if (this.isBrowser) {
      const script = this.renderer.createElement('script');
      this.renderer.setAttribute(script, 'type', 'application/ld+json');
      script.text = JSON.stringify(schema);
      this.renderer.appendChild(this.document.head, script);
    }
  }

  generateOrganizationSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SICA CONSEIL",
      "url": "https://www.sica-conseil.com", // Replace with actual URL
      "logo": "https://static.readdy.ai/image/2ce43ce334b232046883f79f4f3df46a/b61b027bf4d42918b4ae2ae5a241e2c2.jfif",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+33-X-XX-XX-XX-XX", // Replace with actual phone
        "contactType": "Customer Service"
      }
    };
    this.setJsonLd(schema);
  }

  generateWebPageSchema(name: string, description: string, url: string) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": name,
      "description": description,
      "url": `https://www.sica-conseil.com${url}` // Replace with actual base URL
    };
    this.setJsonLd(schema);
  }

  generateBreadcrumbSchema(items: { name: string, url: string }[]) {
    const itemListElement = items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.sica-conseil.com${item.url}` // Replace with actual base URL
    }));

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
    this.setJsonLd(schema);
  }

  generateCourseSchema(name: string, description: string, price: string, duration: string) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": name,
      "description": description,
      "provider": {
        "@type": "Organization",
        "name": "SICA CONSEIL"
      },
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": "EUR"
      },
      "timeRequired": duration
    };
    this.setJsonLd(schema);
  }

  generateServiceSchema(name: string, description: string, price: string) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": name,
      "description": description,
      "provider": {
        "@type": "Organization",
        "name": "SICA CONSEIL"
      },
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": "EUR"
      }
    };
    this.setJsonLd(schema);
  }
}
