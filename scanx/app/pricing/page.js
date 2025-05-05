import PricingPanel from 'app/dashboard/upgrade/page'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function pricing() {
  return (
    <div>
      <PricingPanel/>
      <nav className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
              <div className="bg-black bg-opacity-75 rounded-3xl px-8 py-3 shadow-2xl">
                <div className="flex items-center space-x-20">
                  <Link href="/features" className="text-white hover:text-gray-300">
                    Features
                  </Link>
                  <Link href="/solution" className="text-white hover:text-gray-300">
                    Solution
                  </Link>
                  <Link href="/">
                  <Image src={"/scanx-logo.png"} alt="ScanX Logo" width={60} height={60} />
                  </Link>
                  <Link href="/pricing" className="text-white hover:text-gray-300">
                    Pricing
                  </Link>
                  <Link href="/about" className="text-white hover:text-gray-300">
                    About
                  </Link>
                </div>
              </div>
            </nav>
            
    </div>
  )
}

export default pricing
