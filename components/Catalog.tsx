"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal, Star } from "lucide-react";
import { Basemap, categories } from "@/lib/data";
import { MapArt } from "./MapArt";

export function Catalog({ basemaps }: { basemaps: Basemap[] }) {
  const [query,setQuery]=useState(""); const [category,setCategory]=useState("All maps"); const [price,setPrice]=useState("All");
  const maps=useMemo(()=>basemaps.filter(m=>(category==="All maps"||m.category===category)&&(price==="All"||m.pricing===price)&&(`${m.name} ${m.provider} ${m.category} ${m.gis.join(" ")}`.toLowerCase().includes(query.toLowerCase()))),[query,category,price]);
  return <section className="catalog" id="explore">
    <div className="section-title"><div><span className="eyebrow">CURATED COLLECTION</span><h2>Explore the atlas</h2></div><p>Exceptional basemaps, selected for clarity,<br/>coverage, and craft.</p></div>
    <div className="toolbar"><label className="search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search maps, providers, or GIS tools…"/><kbd>⌘ K</kbd></label><div className="select-wrap"><SlidersHorizontal size={17}/><select value={price} onChange={e=>setPrice(e.target.value)}><option>All</option><option>Free</option><option>Freemium</option><option>Paid</option></select></div></div>
    <div className="chips">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?"active":""}>{c}</button>)}</div>
    <div className="results-line"><span>{maps.length} basemaps</span><span>Sorted by <b>Editor’s choice</b></span></div>
    <div className="grid">{maps.map((m,i)=><Link href={`/maps/${m.slug}`} className="card" key={m.slug}>
      <div className="thumb"><MapArt color={m.color} accent={m.accent} variant={i}/><span className={`price ${m.pricing.toLowerCase()}`}>{m.pricing}</span><span className="open"><ArrowUpRight size={17}/></span></div>
      <div className="card-body"><div className="provider">{m.provider}</div><h3>{m.name}</h3><p>{m.description}</p><div className="meta"><span><Star size={14} fill="currentColor"/> {m.rating}</span><span>{m.category}</span><span>{m.formats[0]}</span></div></div>
    </Link>)}</div>
    {!maps.length&&<div className="empty"><h3>No maps found</h3><p>Try a different search or filter.</p></div>}
  </section>
}
