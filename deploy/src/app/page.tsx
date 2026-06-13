import Navbar from '@/components/Navbar';
import {
  HeroSection,
  ProblemSection,
  WhatIsSection,
  AudienceSection,
  BigProblemSection,
  TurnSection,
} from '@/components/Sections1to7';
import {
  ModulesSection,
  DiffSection,
  ResultsSection,
  ConceptSection,
  AuthoritySection,
  PromiseSection,
  OfferSection,
  FinalCTASection,
  Footer,
} from '@/components/Sections8to13';
import {
  StickyCTA,
  FAQSection,
  MiniQuiz,
} from '@/components/Conversion';

export default function Home() {
  return (
    <>
      <StickyCTA />
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <WhatIsSection />
      <AudienceSection />
      <BigProblemSection />
      <TurnSection />
      <MiniQuiz />
      <ModulesSection />
      <DiffSection />
      <ResultsSection />
      <ConceptSection />
      <AuthoritySection />
      <PromiseSection />
      <OfferSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </>
  );
}
