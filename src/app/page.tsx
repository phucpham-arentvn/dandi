import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#how-it-works">How It Works</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              />
            </svg>
            Dandi
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link href="/dashboard" className="btn btn-primary">
            Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/1223/posts/107068/image-upload/01_dashboard_ui_concept.jpeg"
            width={600}
            height={400}
            alt="Dashboard Preview"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Dandi Github Analyzer</h1>
            <p className="py-6">
              Get powerful insights into any GitHub repository. Summaries, star
              trends, cool facts, important pull requests, and version updates -
              all in one place.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Link href="/signup" className="btn btn-primary">
                Get Started - It&apos;s Free
              </Link>
              <Link href="#demo" className="btn btn-outline">
                See Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Powerful GitHub Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-200 shadow-xl">
              <figure className="px-10 pt-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">Repository Summaries</h3>
                <p>
                  Get concise, AI-generated summaries of any repository to
                  understand its purpose and structure quickly.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <figure className="px-10 pt-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">Star Trends</h3>
                <p>
                  Track star history and growth patterns to understand a
                  project&apos;s popularity and momentum.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <figure className="px-10 pt-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">Activity Insights</h3>
                <p>
                  Monitor commit frequency, contributor growth, and development
                  velocity to gauge project health.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <figure className="px-10 pt-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">PR Analysis</h3>
                <p>
                  Stay updated on important pull requests and understand their
                  impact on the project.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <figure className="px-10 pt-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">Version Tracking</h3>
                <p>
                  Get notified about new releases and understand what changed
                  between versions.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <figure className="px-10 pt-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">Cool Facts</h3>
                <p>
                  Discover interesting facts and statistics about repositories
                  that you wouldn&apos;t find at first glance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <ul className="steps steps-vertical md:steps-horizontal w-full">
                <li className="step step-primary">Enter repo URL</li>
                <li className="step step-primary">Analyze data</li>
                <li className="step step-primary">Get insights</li>
                <li className="step step-primary">Track changes</li>
              </ul>

              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Simple and Powerful</h3>
                <p className="mb-4">
                  Just paste any GitHub repository URL, and Dandi will
                  automatically analyze it, providing you with valuable insights
                  in seconds.
                </p>
                <p>
                  Set up tracking for your favorite repositories to receive
                  regular updates and notifications about important changes.
                </p>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="mockup-browser border bg-base-300">
                <div className="mockup-browser-toolbar">
                  <div className="input">https://github.com/vercel/next.js</div>
                </div>
                <div className="px-4 py-8 bg-base-200">
                  <div className="flex flex-col gap-4">
                    <div className="stats shadow">
                      <div className="stat">
                        <div className="stat-title">Stars</div>
                        <div className="stat-value">112.5K</div>
                        <div className="stat-desc">↗︎ 2,345 (30d)</div>
                      </div>

                      <div className="stat">
                        <div className="stat-title">Contributors</div>
                        <div className="stat-value">2,842</div>
                        <div className="stat-desc">↗︎ 14% (30d)</div>
                      </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                      <div className="card-body">
                        <h3 className="card-title">Repository Summary</h3>
                        <p>
                          Next.js is a React framework for production that
                          enables server-side rendering, static site generation,
                          and more.
                        </p>
                      </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                      <div className="card-body">
                        <h3 className="card-title">Latest Version: v13.4.1</h3>
                        <p>
                          Released 3 days ago with 5 bug fixes and 2 new
                          features
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto">
            Start for free and upgrade as your needs grow. No credit card
            required for the free plan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl justify-center">Free</h3>
                <div className="text-center my-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-sm">/month</span>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    5 repositories
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Basic insights
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Weekly updates
                  </li>
                  <li className="flex items-center text-base-content/70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-base-content/70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    API access
                  </li>
                </ul>

                <div className="card-actions justify-center mt-6">
                  <Link href="/signup" className="btn btn-primary btn-block">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="card bg-primary text-primary-content shadow-xl">
              <div className="card-body">
                <div className="badge badge-secondary mx-auto mb-2">
                  Popular
                </div>
                <h3 className="card-title text-2xl justify-center">Pro</h3>
                <div className="text-center my-4">
                  <span className="text-4xl font-bold">$12</span>
                  <span className="text-sm">/month</span>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    25 repositories
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Advanced insights
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Daily updates
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-primary-content/70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    API access
                  </li>
                </ul>

                <div className="card-actions justify-center mt-6">
                  <Link href="/signup" className="btn btn-secondary btn-block">
                    Choose Pro
                  </Link>
                </div>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl justify-center">
                  Enterprise
                </h3>
                <div className="text-center my-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-sm">/month</span>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited repositories
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Premium insights
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Real-time updates
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    API access
                  </li>
                </ul>

                <div className="card-actions justify-center mt-6">
                  <Link href="/contact" className="btn btn-outline btn-block">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Developers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <Image
                        src="https://github.com/shadcn.png"
                        width={100}
                        height={100}
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Sarah Chen</h3>
                    <p className="text-sm opacity-70">
                      Senior Developer @ TechCorp
                    </p>
                  </div>
                </div>
                <p>
                  Dandi has completely changed how I keep track of open source
                  projects. The insights are incredibly valuable and save me
                  hours of manual research
                </p>
                <div className="mt-4 flex">
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <Image
                        src="https://github.com/shadcn.png"
                        width={100}
                        height={100}
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Marcus Johnson</h3>
                    <p className="text-sm opacity-70">
                      Open Source Contributor
                    </p>
                  </div>
                </div>
                <p>
                  The PR analysis feature is a game-changer. I can quickly see
                  which pull requests are most important and understand their
                  impact without digging through commit logs
                </p>
                <div className="mt-4 flex">
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <Image
                        src="https://github.com/shadcn.png"
                        width={100}
                        height={100}
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Aisha Patel</h3>
                    <p className="text-sm opacity-70">CTO @ DevStartup</p>
                  </div>
                </div>
                <p>
                  We use Dandi to keep our team informed about the dependencies
                  we rely on. The version tracking and release notes summaries
                  are incredibly helpful for our planning
                </p>
                <div className="mt-4 flex">
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-3"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-3"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-3"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-3"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-3"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="card bg-primary text-primary-content max-w-4xl mx-auto">
            <div className="card-body text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="mb-6">
                Join thousands of developers who are already using Dandi to get
                insights into their favorite GitHub repositories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup" className="btn btn-secondary">
                  Start For Free
                </Link>
                <Link href="/demo" className="btn btn-outline btn-secondary">
                  See Live Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer flex flex-row p-10 bg-neutral text-neutral-content">
        <div className="flex flex-col flex-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            />
          </svg>
          <p>
            Dandi GitHub Analyzer
            <br />
            Powerful insights for open source projects
          </p>
        </div>
        <div className="flex flex-col flex-1">
          <span className="footer-title ">Services</span>
          <Link href="/features" className="link link-hover">
            Features
          </Link>
          <Link href="/pricing" className="link link-hover">
            Pricing
          </Link>
          <Link href="/enterprise" className="link link-hover">
            Enterprise
          </Link>
          <Link href="/api" className="link link-hover">
            API
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <span className="footer-title">Company</span>
          <Link href="/about" className="link link-hover">
            About us
          </Link>
          <Link href="/contact" className="link link-hover">
            Contact
          </Link>
          <Link href="/jobs" className="link link-hover">
            Jobs
          </Link>
          <Link href="/press" className="link link-hover">
            Press kit
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <span className="footer-title">Legal</span>
          <Link href="/terms" className="link link-hover">
            Terms of use
          </Link>
          <Link href="/privacy" className="link link-hover">
            Privacy policy
          </Link>
          <Link href="/cookies" className="link link-hover">
            Cookie policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
