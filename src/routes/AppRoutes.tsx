import { Route, Routes, Navigate } from 'react-router-dom';
import { SiteLayout } from '@/layouts/SiteLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import PracticeAreas from '@/pages/PracticeAreas';
import OurTeam from '@/pages/OurTeam';
import Experience from '@/pages/Experience';
import Gallery from '@/pages/Gallery';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

export const aliases: Record<string, string> = {
  '/home': '/', '/practice': '/practice-areas', '/services': '/practice-areas', '/our-practice': '/practice-areas',
  '/attorneys': '/our-team', '/team': '/our-team', '/lawyers': '/our-team', '/clients': '/experience',
  '/our-experience': '/experience', '/insights': '/blog', '/blogs': '/blog', '/contacts': '/contact',
};
export function AppRoutes() {
  return <Routes><Route element={<SiteLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="practice-areas" element={<PracticeAreas />} />
    <Route path="our-team" element={<OurTeam />} />
    <Route path="experience" element={<Experience />} />
    <Route path="gallery" element={<Gallery />} />
    <Route path="blog" element={<Blog />} />
    <Route path="blog/:slug" element={<BlogPost />} />
    <Route path="contact" element={<Contact />} />
    {Object.entries(aliases).map(([from, to]) => <Route key={from} path={from} element={<Navigate to={to} replace />} />)}
    <Route path="*" element={<NotFound />} />
  </Route></Routes>;
}
