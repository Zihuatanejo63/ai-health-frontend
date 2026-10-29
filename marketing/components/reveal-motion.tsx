"use client";
import {useEffect} from 'react';

// Content remains visible without JS, IntersectionObserver, or when reduced motion is requested.
export function RevealMotion(){
 useEffect(()=>{
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const elements=Array.from(document.querySelectorAll<HTMLElement>('.hm-editorial section, .hm-editorial .hm-design-stats'));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('hm-in-view');entry.target.classList.remove('hm-reveal-pending');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.documentElement.classList.add('hm-motion-ready');
  elements.forEach(element=>{if(element.getBoundingClientRect().top>window.innerHeight+32)element.classList.add('hm-reveal-pending');observer.observe(element)});
  return ()=>{observer.disconnect();document.documentElement.classList.remove('hm-motion-ready');elements.forEach(el=>el.classList.remove('hm-reveal-pending','hm-in-view'))};
 },[]);
 return null;
}
