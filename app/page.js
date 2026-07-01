import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header />
      <main>
        <Hero content={content.hero} contact={content.contact} />
        <Services services={content.services} />
        <Gallery items={content.gallery} />
        <About content={content.about} />
        <Contact contact={content.contact} />
      </main>
      <Footer />
      <WhatsAppButton contact={content.contact} />
    </>
  );
}
