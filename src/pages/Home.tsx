import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import DealsGrid from '../components/DealsGrid';
import EndingSoon from '../components/EndingSoon';
import PromotionBanner from '../components/PromotionBanner';
import StaffPicks from '../components/StaffPicks';
import AIStack from '../components/AIStack';
import FinalCTA from '../components/FinalCTA';

const Home = () => {
    return (
        <div className="pt-16">
            <HeroSection />
            <TrustBar />
            <DealsGrid />
            <EndingSoon />
            <PromotionBanner />
            <StaffPicks />
            <AIStack />
            <FinalCTA />
        </div>
    );
};

export default Home;
