import Breadcrumb from "@/components/Breadcrumb";
import Sidebar from "@/components/Sidebar";
import { categories } from "@/data/articles";

export default function AimsScopePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Aims & Scope" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Aims & Scope
            </h1>

            <div className="prose max-w-none text-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">
                Aims
              </h2>
              <p className="mb-4">
                The Annual Methodological Archive Research Review aims to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  Publish original research that advances knowledge in diverse
                  academic disciplines
                </li>
                <li>
                  Provide a platform for researchers from developing countries to
                  share their work with the international academic community
                </li>
                <li>
                  Promote interdisciplinary research and collaboration across
                  fields
                </li>
                <li>
                  Maintain high standards of academic rigor through a robust
                  peer-review process
                </li>
                <li>
                  Ensure open access to quality research for scholars worldwide
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Scope
              </h2>
              <p className="mb-4">
                The journal welcomes submissions across a wide range of
                disciplines including, but not limited to:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {categories.map((category) => (
                  <div
                    key={category.slug}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <h3 className="font-semibold text-blue-800">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {getCategoryDescription(category.slug)}
                    </p>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Types of Submissions
              </h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Original Research Articles:</strong> Full-length
                  empirical studies presenting new findings
                </li>
                <li>
                  <strong>Review Articles:</strong> Comprehensive analyses of
                  existing literature on specific topics
                </li>
                <li>
                  <strong>Case Studies:</strong> In-depth analyses of specific
                  cases or scenarios
                </li>
                <li>
                  <strong>Short Communications:</strong> Brief reports on
                  preliminary findings or novel observations
                </li>
                <li>
                  <strong>Perspectives:</strong> Expert opinions on current
                  issues and emerging trends
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Review Process
              </h2>
              <p className="mb-4">
                All submissions undergo a rigorous double-blind peer review
                process:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li>Initial screening by the editorial team</li>
                <li>Assignment to subject-matter experts</li>
                <li>Double-blind review by at least two reviewers</li>
                <li>Decision by the handling editor</li>
                <li>Revisions (if required)</li>
                <li>Final decision and publication</li>
              </ol>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Publication Ethics
              </h2>
              <p className="mb-4">
                The journal adheres to the highest standards of publication
                ethics, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Compliance with COPE (Committee on Publication Ethics) guidelines</li>
                <li>Plagiarism detection using iThenticate/Turnitin</li>
                <li>Transparent conflict of interest policies</li>
                <li>Clear authorship criteria</li>
                <li>Data availability and reproducibility requirements</li>
              </ul>
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

function getCategoryDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    "social-sciences":
      "Sociology, Psychology, Anthropology, Political Science, and related fields",
    "applied-sciences":
      "Physics, Chemistry, Biology, Medical Sciences, and Engineering applications",
    "computer-science":
      "AI, Machine Learning, Software Engineering, Data Science, and Cybersecurity",
    "management-sciences":
      "Business Administration, Marketing, Finance, HRM, and Operations Management",
    english:
      "Linguistics, Literature, Language Education, and Communication Studies",
    law: "Constitutional Law, International Law, Criminal Justice, and Legal Studies",
    agriculture:
      "Crop Science, Soil Science, Agricultural Economics, and Sustainable Farming",
    archaeology:
      "Archaeological Methods, Cultural Heritage, Historical Studies, and Anthropology",
  };
  return descriptions[slug] || "Research in this discipline";
}
