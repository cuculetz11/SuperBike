import Hero from '@/components/Hero';
import BrandStory from '@/components/BrandStory';
import BikeGallery from '@/components/BikeGallery';
import Services from '@/components/Services';
import BrandLogos from '@/components/BrandLogos';
import ContactFooter from '@/components/ContactFooter';

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen overflow-x-hidden">
      <Hero />
      <BrandStory />
      <BikeGallery />
      <Services />
      <BrandLogos />
      <ContactFooter />
    </main>
  );
}
