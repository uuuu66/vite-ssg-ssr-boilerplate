import { useRef } from "react";
import Header from "../components/Header";
import FAQSection from "../sections/FAQSection";
import HomeSection from "../sections/HomeSection";
import ProcessSection from "../sections/ProcessSection";
import ProductSection from "../sections/ProductSection";
import TeamSection from "../sections/TeamSection";

interface Props {}

const Home: React.FC<Props> = () => {
  const sectionRefs = useRef<{
    home: HTMLDivElement | null;
    team: HTMLDivElement | null;
    process: HTMLDivElement | null;
    product: HTMLDivElement | null;
    faq: HTMLDivElement | null;
  }>({
    home: null,
    team: null,
    process: null,
    product: null,
    faq: null,
  });
  return (
    <div className="bg-black text-white">
      <HomeSection
        ref={(ref) => {
          return (sectionRefs.current.home = ref);
        }}
      />
      <TeamSection ref={(ref) => (sectionRefs.current.team = ref)} />
      <ProcessSection ref={(ref) => (sectionRefs.current.process = ref)} />
      <ProductSection ref={(ref) => (sectionRefs.current.product = ref)} />
      <FAQSection ref={(ref) => (sectionRefs.current.faq = ref)} />
    </div>
  );
};

export default Home;
