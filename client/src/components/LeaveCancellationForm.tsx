import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Download, Printer } from "lucide-react";

interface CancellationData {
  employeeName: string;
  employeeId: string;
  department: string;
  originalRequestDate: string;
  originalStartDate: string;
  originalEndDate: string;
  originalApprovalDate: string;
  cancellationReason: string;
  requestedCancellationDate: string;
  effectiveDate: string;
  supervisorAcknowledgment: boolean;
  hrAcknowledgment: boolean;
  cancellationRequestDate: string;
}

export default function LeaveCancellationForm() {
  const [formData, setFormData] = useState<CancellationData>({
    employeeName: "",
    employeeId: "",
    department: "",
    originalRequestDate: "",
    originalStartDate: "",
    originalEndDate: "",
    originalApprovalDate: "",
    cancellationReason: "",
    requestedCancellationDate: "",
    effectiveDate: "",
    supervisorAcknowledgment: false,
    hrAcknowledgment: false,
    cancellationRequestDate: new Date().toISOString().split("T")[0],
  });

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
    element.setAttribute("download", "leave-cancellation-form.json");
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
          <div className="doc-header-title">LEAVE CANCELLATION FORM</div>
          <div className="doc-header-subtitle">
            Formal Leave Cancellation Request
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

          {/* Original Leave Details Section */}
          <div className="doc-section">
            <h2>Original Leave Details</h2>
            <div className="bg-input p-4 rounded border border-border mb-4">
              <p className="text-xs font-bold text-secondary uppercase mb-3">
                Reference Information
              </p>
              <div className="form-grid">
                <div>
                  <Label htmlFor="originalRequestDate">
                    Original Request Date *
                  </Label>
                  <Input
                    id="originalRequestDate"
                    name="originalRequestDate"
                    type="date"
                    value={formData.originalRequestDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="originalApprovalDate">
                    Original Approval Date *
                  </Label>
                  <Input
                    id="originalApprovalDate"
                    name="originalApprovalDate"
                    type="date"
                    value={formData.originalApprovalDate}
                    onChange={handleInputChange}
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
                <div>
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

          {/* Cancellation Details Section */}
          <div className="doc-section">
            <h2>Cancellation Details</h2>
            <div className="form-grid mt-4">
              <div className="form-grid-full">
                <Label htmlFor="cancellationReason">
                  Reason for Cancellation *
                </Label>
                <Textarea
                  id="cancellationReason"
                  name="cancellationReason"
                  value={formData.cancellationReason}
                  onChange={handleInputChange}
                  placeholder="Please provide details about the cancellation..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="requestedCancellationDate">
                  Requested Cancellation Date *
                </Label>
                <Input
                  id="requestedCancellationDate"
                  name="requestedCancellationDate"
                  type="date"
                  value={formData.requestedCancellationDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="effectiveDate">Effective Date *</Label>
                <Input
                  id="effectiveDate"
                  name="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={handleInputChange}
                  placeholder="When the cancellation becomes effective"
                  required
                />
              </div>
            </div>
          </div>

          {/* Approvals Section */}
          <div className="doc-section">
            <h2>Acknowledgments</h2>
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-3 p-3 bg-input rounded border border-border">
                <Checkbox
                  id="supervisorAcknowledgment"
                  checked={formData.supervisorAcknowledgment}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "supervisorAcknowledgment",
                      checked as boolean
                    )
                  }
                />
                <div className="flex-1">
                  <Label
                    htmlFor="supervisorAcknowledgment"
                    className="mb-0 cursor-pointer font-semibold"
                  >
                    Supervisor Acknowledgment
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    I acknowledge that my supervisor has been informed of this
                    cancellation request.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-input rounded border border-border">
                <Checkbox
                  id="hrAcknowledgment"
                  checked={formData.hrAcknowledgment}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("hrAcknowledgment", checked as boolean)
                  }
                />
                <div className="flex-1">
                  <Label
                    htmlFor="hrAcknowledgment"
                    className="mb-0 cursor-pointer font-semibold"
                  >
                    HR Acknowledgment
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    I understand that HR will process this cancellation and
                    update my leave balance accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Section */}
          <div className="doc-section">
            <h2>Processing Information</h2>
            <div className="text-sm text-muted-foreground mt-4">
              <p>
                <strong>Cancellation Request Date:</strong>{" "}
                {new Date(formData.cancellationRequestDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <p className="mt-3">
                <strong>Processing Status:</strong> Pending HR Review
              </p>
              <p className="mt-3 text-xs">
                This cancellation request will be processed within 2-3 business
                days. You will receive confirmation once the cancellation has been
                approved and processed.
              </p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mt-6 mb-6">
            <p className="text-xs font-bold text-yellow-800 uppercase">
              Important Notice
            </p>
            <p className="text-xs text-yellow-900 mt-2">
              Cancellation of approved leave may have implications on project
              timelines and team schedules. Please ensure that all stakeholders
              have been informed before submitting this request.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 mt-8 no-print">
            <Button className="bg-primary hover:bg-primary/90">
              Submit Cancellation Request
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setFormData({
                  employeeName: "",
                  employeeId: "",
                  department: "",
                  originalRequestDate: "",
                  originalStartDate: "",
                  originalEndDate: "",
                  originalApprovalDate: "",
                  cancellationReason: "",
                  requestedCancellationDate: "",
                  effectiveDate: "",
                  supervisorAcknowledgment: false,
                  hrAcknowledgment: false,
                  cancellationRequestDate: new Date()
                    .toISOString()
                    .split("T")[0],
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
