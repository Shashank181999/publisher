import Link from "next/link";
import { notFound } from "next/navigation";
import { authorServices } from "@/data/journals";

export async function generateStaticParams() {
  return authorServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = authorServices.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.name} | Great Britain Publishers`,
    description: service.description,
  };
}

export default async function AuthorServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = authorServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const otherServices = authorServices.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/author-services" className="hover:text-white transition-colors">Author Services</Link>
            <span>/</span>
            <span className="text-white font-medium">{service.name}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.name}</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>

                <div className="space-y-4 mb-8">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Service?</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Team</h3>
                    <p className="text-gray-600 text-sm">Our team consists of experienced professionals with academic backgrounds in various fields.</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
                    <p className="text-gray-600 text-sm">Every project undergoes rigorous quality checks to ensure the highest standards.</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
                    <p className="text-gray-600 text-sm">We understand deadlines and deliver your work promptly without compromising quality.</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">Confidential</h3>
                    <p className="text-gray-600 text-sm">Your research and manuscripts are handled with complete confidentiality.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
                  <p className="text-blue-100 mb-4">Contact us today to discuss your requirements and get a quote.</p>
                  <Link
                    href="/contact"
                    className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Contact</h3>
                <div className="space-y-3 text-sm">
                  <a href="mailto:services@greatbritainpublishers.co.uk" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    services@greatbritainpublishers.co.uk
                  </a>
                </div>
              </div>

              {/* Other Services */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Other Services</h3>
                <div className="space-y-3">
                  {otherServices.map((s) => (
                    <Link
                      key={s.id}
                      href={`/author-services/${s.slug}`}
                      className="block p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition"
                    >
                      <h4 className="font-medium text-gray-900 text-sm">{s.name}</h4>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-1">{s.description}</p>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/author-services"
                  className="text-blue-600 text-sm font-medium hover:underline mt-4 block"
                >
                  View All Services →
                </Link>
              </div>

              {/* Submit Manuscript */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Submit Your Manuscript</h3>
                <p className="text-green-100 text-sm mb-4">Ready to publish? Submit your research to our journals.</p>
                <Link
                  href="/submissions"
                  className="block w-full bg-white text-green-600 text-center py-3 rounded-lg font-medium hover:bg-green-50 transition"
                >
                  Submit Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
