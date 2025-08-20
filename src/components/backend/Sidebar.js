const Sidebar = () => {
  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col min-h-screen py-8">
      {/* Logo */}
      <div className="px-8 pb-8 mb-8 border-b border-gray-200">
        <h1 className="text-xl font-bold text-yellow-800 mb-1">Coffee Cottage</h1>
        <p className="text-gray-500 text-sm">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center  py-3 text-gray-900 font-medium rounded-r-md bg-gray-100"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Manage Menu
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-0 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-r-md transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Manage Orders
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-0 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-r-md transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Custom Orders
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-0 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-r-md transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              Customers
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-0 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-r-md transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              Analytics
            </a>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-0 mt-auto pt-4 border-t border-gray-200">
        <a
          href="#"
          className="flex items-center px-6 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-r-md transition-colors"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
