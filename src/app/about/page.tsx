import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";

const editorialBoard = [
  {
    name: "Prof. Dr. Muhammad Ahmad",
    role: "Editor-in-Chief",
    affiliation: "University of Engineering, Lahore",
    image: "/images/logo.png",
  },
  {
    name: "Dr. Sarah Williams",
    role: "Associate Editor",
    affiliation: "Oxford University, UK",
    image: "/images/logo.png",
  },
  {
    name: "Prof. Li Wei",
    role: "Associate Editor",
    affiliation: "Tsinghua University, China",
    image: "/images/logo.png",
  },
  {
    name: "Dr. Fatima Hassan",
    role: "Managing Editor",
    affiliation: "LUMS, Pakistan",
    image: "/images/logo.png",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "About the Journal" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              About the Journal
            </h1>

            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                The <strong>Annual Methodological Archive Research Review</strong> is
                a peer-reviewed, open-access academic journal committed to
                publishing high-quality research across multiple disciplines. Our
                journal serves as a platform for researchers, academics, and
                practitioners to share their scholarly work with the global
                academic community.
              </p>

              <p className="mb-4">
                Founded in 2023, we have rapidly established ourselves as a
                reputable publication venue, receiving recognition from the Higher
                Education Commission (HEC) of Pakistan. Our rigorous double-blind
                peer review process ensures the quality and integrity of all
                published research.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Our Mission
              </h2>
              <p className="mb-4">
                To advance knowledge through the publication of original research
                that contributes to academic discourse and addresses real-world
                challenges across various disciplines.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Our Vision
              </h2>
              <p className="mb-4">
                To become a leading international journal recognized for
                publishing impactful, innovative, and methodologically rigorous
                research that shapes policy and practice.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Key Features
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Double-blind peer review process</li>
                <li>Open access publication model</li>
                <li>Rapid review and publication timeline</li>
                <li>HEC recognized (Category Y)</li>
                <li>DOI assignment for all articles</li>
                <li>Indexed in major academic databases</li>
                <li>Quarterly publication schedule</li>
              </ul>
            </div>
          </div>

          {/* Editorial Board */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Editorial Board
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editorialBoard.map((member) => (
                <div
                  key={member.name}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 text-sm">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.affiliation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
