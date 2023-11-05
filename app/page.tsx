import AppContent from '@/components/AppContent'
import AppHeader from '@/components/AppHeader'
import AppNavbar from '@/components/AppNavbar';
import Image from 'next/image'
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <>
      <AppNavbar></AppNavbar>
      <main className="w-[90%] max-w-[1200px] mx-auto">
        <h1 className="inline-block w-full text-4xl font-bold uppercase text-center mx-auto mt-8 mb-6 text-black md:text-5xl">
          Github issue tracker
        </h1>
        <div className="max-w-[750px] w-full mx-auto">
          <AppHeader />
          <AppContent />
        </div>
      </main>
    </>
  )
}
