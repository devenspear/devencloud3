import Head from 'next/head';
import Image from 'next/image';

const links = [
  { href: 'mailto:deven@overabove.com', label: 'Email', icon: 'fa-solid fa-envelope' },
  { href: 'https://www.linkedin.com/in/devenspear/', label: 'LinkedIn', icon: 'fa-brands fa-linkedin' },
  { href: 'https://twitter.com/devenspear', label: 'Twitter/X', icon: 'fa-brands fa-x-twitter' },
  { href: 'https://www.facebook.com/devenspear', label: 'Facebook', icon: 'fa-brands fa-facebook' },
  { href: 'https://www.youtube.com/@deven_spear/videos', label: 'YouTube', icon: 'fa-brands fa-youtube' },
  { href: 'https://popl.co/card/hnmlBzR1/4/preview', label: 'Popl Card', icon: 'fa-solid fa-id-badge' },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Deven Spear | Polymath Entrepreneur</title>
        <meta name="description" content="Polymath entrepreneur with 30+ years' experience. Founded 6 startups in real estate, software, and tech. Excels at spotting opportunities and creating solutions. Thought leader in innovative problem-solving across physical and digital realms." />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-[#1d2330] via-[#0f172a] to-[#1d2330] flex flex-col items-center justify-center px-4">
        <div className="max-w-lg w-full flex flex-col items-center bg-black/70 rounded-3xl shadow-2xl p-8 mt-16 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400 mb-6 shadow-lg">
            <Image src="/DevenHead2025.jpg" alt="Deven Spear" width={256} height={256} className="object-cover w-full h-full" />
          </div>
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">Deven Spear</h1>
          <h2 className="text-lg text-cyan-300 font-semibold mb-4 text-center">Polymath Entrepreneur & Chief Innovation Officer</h2>
          <p className="text-gray-300 text-center mb-4">
            30+ years, 6 startups, real estate, software, tech. Excels at spotting opportunities and creating solutions. Thought leader in innovative problem-solving across physical and digital realms.
          </p>
          <div className="flex flex-wrap justify-center gap-4 my-4">
            {links.map(link => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="text-cyan-300 hover:text-white transition text-2xl">
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
        <footer className="text-xs text-gray-400 mt-auto mb-6 text-center">
          &copy; {new Date().getFullYear()} Deven Spear. All rights reserved.
        </footer>
      </main>
    </>
  );
}
