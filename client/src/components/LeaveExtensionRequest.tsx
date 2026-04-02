import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useMemo } from "react";
import { Download, Printer } from "lucide-react";

interface ExtensionData {
  employeeName: string;
  employeeId: string;
  department: string;
  originalRequestId: string;
  originalStartDate: string;
  originalEndDate: string;
  newEndDate: string;
  extensionReason: string;
  supervisorApproval: boolean;
  hrApproval: boolean;
  extensionRequestDate: string;
  approvalDate: string;
}

export default function LeaveExtensionRequest() {
  const [formData, setFormData] = useState<ExtensionData>({
    employeeName: "",
    employeeId: "",
    department: "",
    originalRequestId: "",
    originalStartDate: "",
    originalEndDate: "",
    newEndDate: "",
    extensionReason: "",
    supervisorApproval: false,
    hrApproval: false,
    extensionRequestDate: new Date().toISOString().split("T")[0],
    approvalDate: "",
  });

  const additionalDays = useMemo(() => {
    if (!formData.originalEndDate || !formData.newEndDate) return 0;
    const original = new Date(formData.originalEndDate);
    const newEnd = new Date(formData.newEndDate);
    const diffTime = Math.abs(newEnd.getTime() - original.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [formData.originalEndDate, formData.newEndDate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = JSON.stringify(formData, null, 2);
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    );
    element.setAttribute("download", "leave-extension-request.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="doc-header mb-8 rounded-t-lg">
          <div className="doc-header-title">LEAVE EXTENSION REQUEST</div>
          <div className="doc-header-subtitle">
            Request to Extend Approved Leave Period
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 no-print justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>

        {/* Form Card */}
        <Card className="p-8 rounded-b-lg shadow-lg">
          {/* Employee Information Section */}
          <div className="doc-section">
            <h2>Employee Information</h2>
            <div className="form-grid mt-4">
              <div>
                <Label htmlFor="employeeName">Full Name *</Label>
                <Input
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="e.g., EMP-2024-001"
                  required
                />
              </div>
              <div className="form-grid-full">
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Human Resources"
                  required
                />
              </div>
            </div>
          </div>

          {/* Reference Information Section */}
          <div className="doc-section">
            <h2>Reference Information</h2>
            <div className="bg-input p-4 rounded border border-border mb-4">
              <p className="text-xs font-bold text-secondary uppercase mb-3">
                Original Leave Details
              </p>
              <div className="form-grid">
                <div>
                  <Label htmlFor="originalRequestId">
                    Original Request ID *
                  </Label>
                  <Input
                    id="originalRequestId"
                    name="originalRequestId"
                    value={formData.originalRequestId}
                    onChange={handleInputChange}
                    placeholder="e.g., REQ-2024-001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="originalStartDate">
                    Original Leave Start Date *
                  </Label>
                  <Input
                    id="originalStartDate"
                    name="originalStartDate"
                    type="date"
                    value={formData.originalStartDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-grid-full">
                  <Label htmlFor="originalEndDate">
                    Original Leave End Date *
                  </Label>
                  <Input
                    id="originalEndDate"
                    name="originalEndDate"
                    type="date"
                    value={formData.originalEndDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Extension Details Section */}
          <div className="doc-section">
            <h2>Extension Details</h2>
            <div className="form-grid mt-4">
              <div>
                <Label htmlFor="newEndDate">New End Date *</Label>
                <Input
                  id="newEndDate"
                  name="newEndDate"
                  type="date"
                  value={formData.newEndDate}
                  onChange={handleInputChange}
                  placeholder="Extended end date"
                  required
                />
              </div>
              <div>
                <Label>Additional Days Required</Label>
                <div className="bg-input px-3 py-2 rounded border border-border text-sm font-semibold text-primary">
                  {additionalDays} days
                </div>
              </div>
              <div className="form-grid-full">
                <Label htmlFor="extensionReason">
                  Reason for Extension *
                </Label>
                <Textarea
                  id="extensionReason"
                  name="extensionReason"
                  value={formData.extensionReason}
                  onChange={handleInputChange}
                  placeholder="Please provide details about why you need to extend your leave..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Approvals Section */}
          <div className="doc-section">
            <h2>Approvals</h2>
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3 p-3 bg-input rounded border border-border">
                <Checkbox
                  id="supervisorApproval"
                  checked={formData.supervisorApproval}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("supervisorApproval", checked as boolean)
                  }
                />
                <div className="flex-1">
                  <Label
                    htmlFor="supervisorApproval"
                    className="mb-0 cursor-pointer font-semibold"
                  >
                    Supervisor Approval
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    My immediate supervisor has reviewed and approved this
                    extension request.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-input rounded border border-border">
                <Checkbox
                  id="hrApproval"
                  checked={formData.hrApproval}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("hrApproval", checked as boolean)
                  }
                />
                <div className="flex-1">
                  <Label
                    htmlFor="hrApproval"
                    className="mb-0 cursor-pointer font-semibold"
                  >
                    HR Approval
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    I understand that HR must approve this extension before it
                    becomes effective.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Section */}
          <div className="doc-section">
            <h2>Submission Information</h2>
            <div className="text-sm text-muted-foreground mt-4">
              <p>
                <strong>Extension Request Date:</strong>{" "}
                {new Date(formData.extensionRequestDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <p className="mt-3">
                <strong>Processing Status:</strong> Pending Review
              </p>
              <p className="mt-3 text-xs">
                Extension requests are typically processed within 2-3 business
                days. You will be notified of the approval status via email.
              </p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-6 mb-6">
            <p className="text-xs font-bold text-blue-800 uppercase">
              Important Information
            </p>
            <p className="text-xs text-blue-900 mt-2">
              Extension requests must be submitted before your original leave end
              date. Early submission increases the likelihood of approval. Ensure
              that your leave balance is sufficient for the extension.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 mt-8 no-print">
            <Button className="bg-primary hover:bg-primary/90">
              Submit Extension Request
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setFormData({
                  employeeName: "",
                  employeeId: "",
                  department: "",
                  originalRequestId: "",
                  originalStartDate: "",
                  originalEndDate: "",
                  newEndDate: "",
                  extensionReason: "",
                  supervisorApproval: false,
                  hrApproval: false,
                  extensionRequestDate: new Date()
                    .toISOString()
                    .split("T")[0],
                  approvalDate: "",
                })
              }
            >
              Clear Form
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
