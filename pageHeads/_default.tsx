import { DefaultSeo } from "next-seo";

function DefaultSEOHead() {
  return (
    <DefaultSeo
      title="Capter AI | Home"
      description="Capter AI is the official shop for all things worn by Rome XVIII. Shop the latest merch, music, and more."
      openGraph={{
        type: "website",
        locale: "en_gb",
        url: "https://romerelated.nz",
        site_name: "Capter AI",
        title: "Capter AI: Luxury thrift store by Rome XVIII",
        description:
          "Capter AI is the official shop for all things worn by Rome XVIII. Shop the latest merch, music, and more.",
        images: [
          {
            url: "https://res.cloudinary.com/romexviii/image/upload/v1704484702/rome-related/rr-seo-banner-sm_jhzn1u.webp",
            width: 1200,
            height: 630,
            alt: "Capter AI - Luxury thrift store by Rome XVIII",
          },
        ],
      }}
      additionalLinkTags={[
        {
          rel: "icon",
          href: "./favicon.ico",
          type: "image/x-icon",
        },
        {
          rel: "apple-touch-icon",
          href: "./apple-touch-icon-iphone-60x60.png",
          sizes: "60x60",
        },
        {
          rel: "apple-touch-icon",
          href: "./apple-touch-icon-ipad-76x76.png",
          sizes: "76x76",
        },
        {
          rel: "apple-touch-icon",
          href: "./apple-touch-icon-iphone-retina-120x120.png",
          sizes: "120x120",
        },
        {
          rel: "apple-touch-icon",
          href: "./apple-touch-icon-ipad-retina-152x152.png",
          sizes: "152x152",
        },
      ]}
      additionalMetaTags={[
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "keywords",
          content: "Capter AI,Rome XVIII, Luxury, thrift, store, Rom",
        },
        {
          httpEquiv: "x-ua-compatible",
          content: "IE=edge; chrome=1",
        },
        {
          name: "theme-color",
          content: "#FFFFFF",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ]}
    />
  );
}

{
  /* <script type='application/ld+json'> 
{
  "@context": "http://www.schema.org",
  "@type": "WebSite",
  "name": "Capter AI",
  "alternateName": "Dog breeding",
  "url": "rollover.co.nzz"
}
 </script> */
}

export { DefaultSEOHead };
