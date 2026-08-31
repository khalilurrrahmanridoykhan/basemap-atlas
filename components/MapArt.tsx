export function MapArt({ color, accent, variant = 0 }: { color:string; accent:string; variant?:number }) {
  const paths = [
    "M-20 120 C70 40 95 170 180 90 S290 80 390 20",
    "M20 -10 C90 70 35 125 125 200 M160 -20 C130 65 240 75 210 210",
    "M-10 45 C75 100 120 20 220 80 S300 150 410 100"
  ];
  return <svg className="map-art" viewBox="0 0 380 220" preserveAspectRatio="none" aria-hidden="true">
    <rect width="380" height="220" fill={color}/>
    <path d={paths[variant%3]} fill="none" stroke={accent} strokeWidth="5" opacity=".78"/>
    <path d="M-10 185 L70 135 L120 150 L190 72 L245 105 L330 30 L400 62" fill="none" stroke={accent} strokeWidth="2" opacity=".55"/>
    <path d="M25 0 L80 220 M250 0 L190 220 M0 105 L380 155" stroke={accent} strokeWidth="1" opacity=".25"/>
    <g fill={accent}>{[[70,135],[190,72],[245,105],[330,30]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===1?6:3}/>)}</g>
    <text x="28" y="38" fill={accent} opacity=".64" fontSize="10" letterSpacing="2">CITY CENTRE</text>
    <text x="252" y="184" fill={accent} opacity=".5" fontSize="9">RIVER DISTRICT</text>
  </svg>
}
