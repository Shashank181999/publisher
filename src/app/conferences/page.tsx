import Link from "next/link";
import { conferences } from "@/data/journals";

export const metadata = {
  title: "Conferences & Events | Great Britain Publishers",
  description: "Join our scientific conferences, seminars, webinars, and workshops. Connect with researchers and practitioners worldwide.",
};

export default function ConferencesPage() {
  const upcomingEvents = conferences.filter(e => e.status === 'upcoming');
  const eventTypes = ['all', 'conference', 'seminar', 'webinar', 'workshop'];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-purple-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Conferences & Events</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Conferences & Events
              </h1>
              <p className="text-purple-100 text-lg mb-8">
                Join leading researchers, clinicians, and practitioners at our scientific conferences,
                seminars, webinars, and workshops. Network, learn, and share your expertise.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#upcoming"
                  className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
                >
                  View Upcoming Events
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Propose an Event
                </Link>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">10+</div>
                <div className="text-purple-200">Events Annually</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-purple-200">Participants</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">20+</div>
                <div className="text-purple-200">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-purple-200">Expert Speakers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/conferences/seminars" className="group">
              <div className="bg-purple-50 rounded-xl p-6 hover:bg-purple-100 transition text-center">
                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Seminars</h3>
                <p className="text-gray-600 text-sm">In-depth academic discussions</p>
              </div>
            </Link>

            <Link href="/conferences/webinars" className="group">
              <div className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition text-center">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Webinars</h3>
                <p className="text-gray-600 text-sm">Online live sessions</p>
              </div>
            </Link>

            <Link href="/conferences/workshops" className="group">
              <div className="bg-green-50 rounded-xl p-6 hover:bg-green-100 transition text-center">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Workshops</h3>
                <p className="text-gray-600 text-sm">Hands-on training sessions</p>
              </div>
            </Link>

            <Link href="/conferences/upcoming" className="group">
              <div className="bg-orange-50 rounded-xl p-6 hover:bg-orange-100 transition text-center">
                <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Upcoming</h3>
                <p className="text-gray-600 text-sm">All scheduled events</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-600">Don&apos;t miss our upcoming conferences, seminars, and workshops</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conferences.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition border border-gray-200 overflow-hidden"
              >
                <div className={`px-4 py-3 text-white font-medium flex items-center justify-between ${
                  event.type === 'conference' ? 'bg-purple-600' :
                  event.type === 'webinar' ? 'bg-blue-600' :
                  event.type === 'seminar' ? 'bg-green-600' : 'bg-orange-600'
                }`}>
                  <span className="capitalize">{event.type}</span>
                  {event.isVirtual && (
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Virtual</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                      {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long'
                      })}`}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>

                  <button className={`w-full py-2.5 rounded-lg font-medium transition ${
                    event.type === 'conference' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                    event.type === 'webinar' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                    event.type === 'seminar' ? 'bg-green-600 hover:bg-green-700 text-white' :
                    'bg-orange-600 hover:bg-orange-700 text-white'
                  }`}>
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Our Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">About Our Events</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scientific Conferences</h3>
              <p className="text-gray-600 mb-4">
                Our international conferences bring together leading researchers, clinicians, and practitioners
                from around the world. Present your research, network with peers, and stay updated on the
                latest developments in your field.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Keynote presentations by experts
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Oral and poster presentations
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Networking opportunities
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Publication opportunities
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Awards & Recognition</h3>
              <p className="text-gray-600 mb-4">
                We recognize outstanding contributions to research and practice through our awards program.
              </p>
              <div className="space-y-4">
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <h4 className="font-semibold text-gray-900 mb-1">Best Paper Award</h4>
                  <p className="text-sm text-gray-600">Recognizing exceptional research presentations</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-1">Young Researcher Award</h4>
                  <p className="text-sm text-gray-600">Supporting early-career researchers</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-1">Excellence in Practice Award</h4>
                  <p className="text-sm text-gray-600">Honoring outstanding practitioners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sponsors & Exhibitors</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Partner with us to showcase your products and services to a global audience of researchers and practitioners.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Become a Sponsor
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-purple-100 mb-8">
            Subscribe to receive notifications about upcoming events and early bird registration offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
