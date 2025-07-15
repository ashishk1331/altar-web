import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import HR from "@/components/ui/HR";

export default function Home() {
	return (
		<>
			<Navbar />
			<Hero />
			<Features />
			<About />
			<HR />
			<Footer />
		</>
	);
}
