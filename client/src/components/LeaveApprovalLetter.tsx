import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Download, Printer, Shield, FileCheck } from "lucide-react";

interface ApprovalData {
  employeeName: string;
  employeeId: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: string;
  approvalStatus: string;
  conditions: string;
  hrManagerName: string;
  approvalDate: string;
  companyName: string;
  companyPhone: string;
  companyEmail: string;
}

export default function LeaveApprovalLetter() {
  const [formData, setFormData] = useState<ApprovalData>({
    employeeName: "",
    employeeId: "",
    department: "",
    leaveType: "annual",
    startDate: "",
    endDate: "",
    totalDays: "",
    approvalStatus: "approved",
    conditions: "",
    hrManagerName: "",
    approvalDate: new Date().toISOString().split("T")[0],
    companyName: "Your Company Name",
    companyPhone: "+1 (555) 123-4567",
    companyEmail: "hr@company.com",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    element.setAttribute("download", "leave-approval-letter.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateApprovalNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `APV-${year}-${month}-${random}`;
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "status-approved";
      case "pending":
        return "status-pending";
      case "conditional":
        return "status-conditional";
      default:
        return "status-rejected";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative">
      {/* Watermark */}
      <div className="doc-watermark no-print">APPROVAL LETTER</div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Enhanced Military-Grade Header */}
        <div className="doc-header mb-8 rounded-t-lg">
          <div className="doc-header-content">
            <div className="flex items-center gap-4">
              <div className="doc-header-seal">
                <FileCheck className="w-10 h-10" />
              </div>
              <div>
                <div className="doc-header-title">LEAVE APPROVAL LETTER</div>
                <div className="doc-header-subtitle">
                  Official Leave Authorization Document
                </div>
                <div className="doc-reference-number">
                  Ref: {generateApprovalNumber()}
                </div>
              </div>
            </div>
            <div className="doc-header-meta">
              <div>CLASSIFICATION: CONFIDENTIAL</div>
              <div className="mt-1">FORM APV-2024-A</div>
            </div>
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

        {/* Letter Card */}
        <Card className="p-8 rounded-b-lg shadow-lg">
          {/* Company Header */}
          <div className="doc-section border-b-2 border-accent pb-4">
            <h3 className="text-primary font-bold text-lg">
              {formData.companyName}
            </h3>
            <p className="text-xs text-muted-foreground">
              {formData.companyPhone} | {formData.companyEmail}
            </p>
          </div>

          {/* Letter Date */}
          <div className="text-right text-sm text-muted-foreground mt-6 mb-8">
            <p>
              <strong>Date:</strong>{" "}
              {new Date(formData.approvalDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Recipient */}
          <div className="mb-8">
            <p className="text-sm">
              <strong>{formData.employeeName}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Employee ID: {formData.employeeId}
            </p>
            <p className="text-sm text-muted-foreground">
              Department: {formData.department}
            </p>
          </div>

          {/* Salutation */}
          <div className="mb-6">
            <p className="text-sm">Dear {formData.employeeName},</p>
          </div>

          {/* Body */}
          <div className="doc-section mb-6">
            <p className="text-sm leading-relaxed mb-4">
              This letter confirms that your leave request has been reviewed and
              processed by the Human Resources Department. The details of your
              approved leave are outlined below.
            </p>

            {/* Leave Details */}
            <div className="bg-input p-4 rounded border border-border my-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-bold text-secondary uppercase">
                    Leave Type
                  </p>
                  <p className="font-semibold text-primary">
                    {formData.leaveType.charAt(0).toUpperCase() +
                      formData.leaveType.slice(1)}{" "}
                    Leave
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary uppercase">
                    Total Days
                  </p>
                  <p className="font-semibold text-primary">
                    {formData.totalDays} days
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary uppercase">
                    Start Date
                  </p>
                  <p className="font-semibold text-primary">
                    {new Date(formData.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary uppercase">
                    End Date
                  </p>
                  <p className="font-semibold text-primary">
                    {new Date(formData.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="my-4">
              <p className="text-xs font-bold text-secondary uppercase mb-2">
                Approval Status
              </p>
              <div className={`status-badge ${getStatusBadgeClass(formData.approvalStatus)}`}>
                {formData.approvalStatus.toUpperCase()}
              </div>
            </div>

            {/* Conditions */}
            {formData.conditions && (
              <div className="my-4">
                <p className="text-xs font-bold text-secondary uppercase mb-2">
                  Conditions / Notes
                </p>
                <p className="text-sm text-foreground bg-yellow-50 p-3 rounded border border-yellow-200">
                  {formData.conditions}
                </p>
              </div>
            )}

            {/* Closing */}
            <p className="text-sm leading-relaxed mt-6 mb-4">
              Please ensure that all pending work is properly handed over to your
              team before your leave commences. If you have any questions regarding
              this approval, please contact the Human Resources Department.
            </p>

            <p className="text-sm leading-relaxed">
              We wish you a restful leave. Safe travels!
            </p>
          </div>

          {/* Closing */}
          <div className="doc-section">
            <p className="text-sm">Sincerely,</p>

            {/* Signature Line */}
            <div className="mt-8">
              <div className="signature-line w-48">
                {formData.hrManagerName}
              </div>
              <p className="text-xs text-secondary uppercase tracking-wide mt-1">
                HR Manager / HR Department
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-4 mt-8 text-center text-xs text-muted-foreground">
            <p>This is an official document. Please retain a copy for your records.</p>
            <p className="mt-2">
              {formData.companyName} | Human Resources Department
            </p>
          </div>

          {/* Editable Fields Section (Hidden in Print) */}
          <div className="no-print mt-8 pt-8 border-t border-border">
            <h3 className="text-lg font-bold text-primary mb-4">Edit Letter Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employeeName">Employee Name *</Label>
                <Input
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  placeholder="Full name"
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
                  placeholder="EMP-2024-001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Department"
                  required
                />
              </div>
              <div>
                <Label htmlFor="leaveType">Leave Type *</Label>
                <Select
                  value={formData.leaveType}
                  onValueChange={(value) =>
                    handleSelectChange("leaveType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="casual">Casual Leave</SelectItem>
                    <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                    <SelectItem value="bereavement">Bereavement Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="totalDays">Total Days *</Label>
                <Input
                  id="totalDays"
                  name="totalDays"
                  value={formData.totalDays}
                  onChange={handleInputChange}
                  placeholder="Number of days"
                  required
                />
              </div>
              <div>
                <Label htmlFor="approvalStatus">Status *</Label>
                <Select
                  value={formData.approvalStatus}
                  onValueChange={(value) =>
                    handleSelectChange("approvalStatus", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="conditional">Conditional</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="conditions">Conditions / Notes</Label>
                <Textarea
                  id="conditions"
                  name="conditions"
                  value={formData.conditions}
                  onChange={handleInputChange}
                  placeholder="Any special conditions or notes..."
                />
              </div>
              <div>
                <Label htmlFor="hrManagerName">HR Manager Name *</Label>
                <Input
                  id="hrManagerName"
                  name="hrManagerName"
                  value={formData.hrManagerName}
                  onChange={handleInputChange}
                  placeholder="Manager name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="approvalDate">Approval Date *</Label>
                <Input
                  id="approvalDate"
                  name="approvalDate"
                  type="date"
                  value={formData.approvalDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 mt-6">
              <Button className="bg-primary hover:bg-primary/90" size="lg">
                Update Letter
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  setFormData({
                    employeeName: "",
                    employeeId: "",
                    department: "",
                    leaveType: "annual",
                    startDate: "",
                    endDate: "",
                    totalDays: "",
                    approvalStatus: "approved",
                    conditions: "",
                    hrManagerName: "",
                    approvalDate: new Date().toISOString().split("T")[0],
                    companyName: "Your Company Name",
                    companyPhone: "+1 (555) 123-4567",
                    companyEmail: "hr@company.com",
                  })
                }
              >
                Clear Form
              </Button>
            </div>

            {/* Official Footer */}
            <div className="doc-footer mt-12">
              <p className="doc-footer-text">
                This is an official authorization document issued by the Human Resources Department.
              </p>
              <p className="doc-footer-text mt-2">
                Retain this document for your personnel records.
              </p>
              <div className="doc-page-number no-print">Page 1 of 1</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
