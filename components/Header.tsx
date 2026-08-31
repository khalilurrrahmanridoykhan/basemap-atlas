import Link from "next/link";
import { Compass, Github, Search } from "lucide-react";

export function Header({ compact=false }: { compact?: boolean }) {
  return <header className={compact ? "header compact" : "header"}>
    <Link className="brand" href="/"><span className="brandmark"><Compass size={20}/></span><span>mapstack</span></Link>
    <nav><Link href="/#explore">Explore</Link><Link href="/#gis">GIS guide</Link><Link href="/#about">About</Link></nav>
    <div className="header-actions"><button className="icon-button" aria-label="Search"><Search size={18}/></button><a className="github" href="https://github.com" target="_blank" rel="noreferrer"><Github size={17}/> Open source</a></div>
  </header>
}
