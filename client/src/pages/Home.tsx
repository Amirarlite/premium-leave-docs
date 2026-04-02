import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import {
  FileText,
  CheckCircle,
  BarChart3,
  XCircle,
  ArrowRight,
} from "lucide-react";

interface DocumentCard {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  color: string;
  badge: string;
}

const documents: DocumentCard[] = [
  {
    title: "Leave Request Form",
    description:
      "Submit a new leave request with complete employee and leave details. Includes supervisor and department head approvals.",
    path: "/leave-request",
    icon: <FileText className="w-8 h-8" />,
    color: "bg-blue-50 border-blue-200",
    badge: "Primary",
  },
  {
    title: "Leave Approval Letter",
    description:
      "Official leave authorization document issued by HR. Print-ready with approval status and conditions.",
    path: "/leave-approval",
    icon: <CheckCircle className="w-8 h-8" />,
    color: "bg-green-50 border-green-200",
    badge: "Official",
  },
  {
    title: "Leave Status Tracker",
    description:
      "Dashboard showing leave balance, usage history, and year-to-date summary. Track all leave types.",
    path: "/leave-tracker",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "bg-purple-50 border-purple-200",
    badge: "Dashboard",
  },
  {
    title: "Leave Cancellation Form",
    description:
      "Formal request to cancel previously approved leave. Includes supervisor and HR acknowledgment.",
    path: "/leave-cancellation",
    icon: <XCircle className="w-8 h-8" />,
    color: "bg-orange-50 border-orange-200",
    badge: "Modification",
  },
  {
    title: "Leave Extension Request",
    description:
      "Request to extend an already-approved leave period. Includes reason and approval workflow.",
    path: "/leave-extension",
    icon: <ArrowRight className="w-8 h-8" />,
    color: "bg-amber-50 border-amber-200",
    badge: "Modification",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-50">
      {/* Header Section */}
      <div className="bg-primary text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Premium Department Leave Documents
          </h1>
          <p className="text-lg text-blue-100">
            Military-Grade Precision. Professional Excellence. Plug-and-Play Simplicity.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction Section */}
        <Card className="p-8 mb-12 shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Welcome to Your Leave Management Suite
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            This comprehensive suite provides professional-grade leave management documents designed for corporate environments. Each document is fully editable, print-ready, and follows military-grade precision standards for accuracy and clarity.
          </p>
          <p className="text-foreground leading-relaxed">
            All forms support real-time validation, auto-calculation of leave days, PDF export, and printing capabilities. Simply fill in the required fields, customize as needed, and generate professional documents instantly.
          </p>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-bold text-primary mb-2">✓ Fully Editable</h3>
            <p className="text-sm text-muted-foreground">
              All fields are completely customizable. Adapt forms to your organization's needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-bold text-primary mb-2">✓ Print Ready</h3>
            <p className="text-sm text-muted-foreground">
              Optimized for both screen and print. Export to PDF with a single click.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
            <h3 className="font-bold text-primary mb-2">✓ Professional Design</h3>
            <p className="text-sm text-muted-foreground">
              Premium aesthetics with military-grade precision and clean layout.
            </p>
          </div>
        </div>

        {/* Documents Grid */}
        <h2 className="text-2xl font-bold text-primary mb-8" style={{ fontFamily: "Georgia, serif" }}>
          Available Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Link key={doc.path} href={doc.path}>
              <Card
                className={`p-6 cursor-pointer transition-all hover:shadow-lg hover:border-primary border-2 ${doc.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-primary">{doc.icon}</div>
                  <span className="text-xs font-bold uppercase tracking-wide px-2 py-1 bg-primary text-white rounded">
                    {doc.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {doc.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {doc.description}
                </p>
                <div className="flex items-center text-primary font-semibold text-sm">
                  Open Form <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Usage Guide Section */}
        <Card className="p-8 mt-12 bg-slate-50 border-slate-200 shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-6" style={{ fontFamily: "Georgia, serif" }}>
            How to Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">1</div>
              <h4 className="font-bold text-primary mb-2">Select Document</h4>
              <p className="text-sm text-muted-foreground">
                Choose the document type you need from the available options above.
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">2</div>
              <h4 className="font-bold text-primary mb-2">Fill Details</h4>
              <p className="text-sm text-muted-foreground">
                Enter employee information and leave details. Fields validate in real-time.
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">3</div>
              <h4 className="font-bold text-primary mb-2">Review & Export</h4>
              <p className="text-sm text-muted-foreground">
                Review the completed form and export as PDF or print directly.
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">4</div>
              <h4 className="font-bold text-primary mb-2">Submit & Archive</h4>
              <p className="text-sm text-muted-foreground">
                Submit to HR or save for your records. All data is preserved locally.
              </p>
            </div>
          </div>
        </Card>

        {/* Key Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 shadow-lg">
            <h3 className="text-xl font-bold text-primary mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Professional Standards
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Military-grade precision in layout and alignment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Consistent branding with professional color palette</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Clear visual hierarchy and typography</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Optimized for accessibility and readability</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8 shadow-lg">
            <h3 className="text-xl font-bold text-primary mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Technical Capabilities
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Real-time field validation and error handling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Auto-calculation of leave days and balances</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>One-click PDF export and printing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">•</span>
                <span>Responsive design for all devices</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-primary text-white rounded-lg p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Ready to Get Started?
          </h2>
          <p className="mb-6 text-blue-100">
            Select a document from above to begin creating professional leave management forms.
          </p>
          <Link href="/leave-request">
            <Button className="bg-accent hover:bg-accent/90 text-primary font-bold">
              Create Your First Leave Request
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-100 border-t border-border mt-12 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Premium Department Leave Documents Suite • Military-Grade Precision • Professional Excellence
          </p>
          <p className="mt-2">
            All documents are fully customizable and optimized for print and digital use.
          </p>
        </div>
      </div>
    </div>
  );
}
