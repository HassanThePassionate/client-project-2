export default function Footer() {
  return (
    <footer className='bg-[#daedf5] py-8 px-4'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <div>
          <h3 className='font-medium text-gray-800 mb-4'>Estateguru</h3>
          <ul className='space-y-3'>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Our story
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Careers
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Knowledge hub
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                News & Press
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Annual Reports
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Statistics & Reports
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Links Column */}
        <div>
          <h3 className='font-medium text-gray-800 mb-4'>Useful Links</h3>
          <ul className='space-y-3'>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                How to invest
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                How to get funding
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Referral program
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Price list
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Press kit
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h3 className='font-medium text-gray-800 mb-4'>Legal</h3>
          <ul className='space-y-3'>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                User terms
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Privacy policy
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                General loan terms
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Conflicts of interest policy
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Investor Risk Statement
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Lemonway - Terms & Conditions
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Referral - Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Help Center Column */}
        <div>
          <h3 className='font-medium text-gray-800 mb-4'>Help Center</h3>
          <ul className='space-y-3'>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                FAQs
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Contact & Support
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                Complaints handling policy
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:underline'>
                File a complaint
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
