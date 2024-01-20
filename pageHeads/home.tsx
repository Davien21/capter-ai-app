import { NextSeo, WebPageJsonLd, OrganizationJsonLd } from "next-seo";

const HomePageHead = () => {
  return (
    <>
      <NextSeo
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
      />
      <OrganizationJsonLd
        url="https://romerelated.nz"
        name="Capter AI"
        logo="https://res.cloudinary.com/romexviii/image/upload/v1704423204/rome-related/favicon_b0xp2f_tuzlvq.png" // Replace with your actual logo URL
        sameAs={[
          "https://www.instagram.com/rome_related?igsh=eTk2MDB4ejg3dDg0&utm_source=qr", // Replace with your actual social media URLs
          "https://youtube.com/@Walker_Sound?si=u2t2J-id-pswXRCb",
          "https://open.spotify.com/artist/2RuUeXFEH42dW1Epiuggu9?si=jnAFRC0zRMGrJIj-CMJshw",
          // ... other social profiles
        ]}
      />
    </>
  );
};

export { HomePageHead };
