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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo, useRef, useCallback } from "react";
import { Download, Printer, FileText, Shield, Upload, Image, Signature, Building, X, Eye, EyeOff } from "lucide-react";

interface FormData {
  employeeName: string;
  employeeId: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  supervisorName: string;
  supervisorApproval: boolean;
  departmentHeadName: string;
  departmentHeadApproval: boolean;
}

interface UploadedFiles {
  passportPhoto: string | null;
  signature: string | null;
  companyLogo: string | null;
  supportingDocument: string | null;
}

export default function LeaveRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    employeeName: "",
    employeeId: "",
    department: "",
    position: "",
    email: "",
    phone: "",
    leaveType: "annual",
    startDate: "",
    endDate: "",
    reason: "",
    supervisorName: "",
    supervisorApproval: false,
    departmentHeadName: "",
    departmentHeadApproval: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    passportPhoto: null,
    signature: null,
    companyLogo: null,
    supportingDocument: null,
  });

  const [showPreview, setShowPreview] = useState(true);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileUpload = useCallback((
    fileType: keyof UploadedFiles,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFiles(prev => ({
          ...prev,
          [fileType]: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const removeFile = useCallback((fileType: keyof UploadedFiles) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: null
    }));
    if (fileInputRefs.current[fileType]) {
      fileInputRefs.current[fileType]!.value = "";
    }
  }, []);

  const triggerFileInput = useCallback((fileType: keyof UploadedFiles) => {
    fileInputRefs.current[fileType]?.click();
  }, []);

  const totalDays = useMemo(() => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  }, [formData.startDate, formData.endDate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, leaveType: value }));
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
    element.setAttribute("download", "leave-request.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateReferenceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `LR-${year}-${month}-${random}`;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 relative">
      {/* Watermark */}
      <div className="doc-watermark no-print">DEPARTMENT LEAVE</div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Military-Grade Header with Logo */}
        <div className="doc-header mb-8 rounded-t-lg">
          <div className="doc-header-content">
            <div className="flex items-center gap-4">
              {uploadedFiles.companyLogo ? (
                <div className="doc-header-logo">
                  <img src={uploadedFiles.companyLogo} alt="Company Logo" className="w-16 h-16 object-contain" />
                </div>
              ) : (
                <div className="doc-header-seal">
                  <Shield className="w-10 h-10" />
                </div>
              )}
              <div>
                <div className="doc-header-title">LEAVE REQUEST FORM</div>
                <div className="doc-header-subtitle">
                  Department Leave Management System
                </div>
                <div className="doc-reference-number">
                  Ref: {generateReferenceNumber()}
                </div>
              </div>
            </div>
            <div className="doc-header-meta">
              <div>CLASSIFICATION: INTERNAL</div>
              <div className="mt-1">FORM LR-2024-A</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 no-print justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          <div className="flex gap-3">
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
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className={showPreview ? "" : "lg:col-span-2"}>
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
              <div>
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
              <div>
                <Label htmlFor="position">Position/Title *</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Manager"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="employee@company.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>
          </div>

          {/* Leave Details Section */}
          <div className="doc-section">
            <h2>Leave Details</h2>
            <div className="form-grid mt-4">
              <div>
                <Label htmlFor="leaveType">Leave Type *</Label>
                <Select value={formData.leaveType} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="casual">Casual Leave</SelectItem>
                    <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                    <SelectItem value="bereavement">Bereavement Leave</SelectItem>
                    <SelectItem value="maternity">Maternity Leave</SelectItem>
                    <SelectItem value="paternity">Paternity Leave</SelectItem>
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
                <Label>Total Days</Label>
                <div className="bg-input px-3 py-2 rounded border border-border text-sm font-semibold text-primary">
                  {totalDays} days
                </div>
              </div>
              <div className="form-grid-full">
                <Label htmlFor="reason">Reason for Leave *</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Please provide details about your leave request..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Approvals Section */}
          <div className="doc-section">
            <h2>Approvals</h2>
            <div className="form-grid mt-4">
              <div>
                <Label htmlFor="supervisorName">Immediate Supervisor Name *</Label>
                <Input
                  id="supervisorName"
                  name="supervisorName"
                  value={formData.supervisorName}
                  onChange={handleInputChange}
                  placeholder="Supervisor name"
                  required
                />
              </div>
              <div className="flex items-end gap-2">
                <Checkbox
                  id="supervisorApproval"
                  checked={formData.supervisorApproval}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("supervisorApproval", checked as boolean)
                  }
                />
                <Label htmlFor="supervisorApproval" className="mb-0 cursor-pointer">
                  Supervisor Approval
                </Label>
              </div>
              <div>
                <Label htmlFor="departmentHeadName">Department Head Name *</Label>
                <Input
                  id="departmentHeadName"
                  name="departmentHeadName"
                  value={formData.departmentHeadName}
                  onChange={handleInputChange}
                  placeholder="Department head name"
                  required
                />
              </div>
              <div className="flex items-end gap-2">
                <Checkbox
                  id="departmentHeadApproval"
                  checked={formData.departmentHeadApproval}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("departmentHeadApproval", checked as boolean)
                  }
                />
                <Label htmlFor="departmentHeadApproval" className="mb-0 cursor-pointer">
                  Department Head Approval
                </Label>
              </div>
            </div>
          </div>

          {/* Submission Section */}
          <div className="doc-section">
            <h2>Submission</h2>
            <div className="text-sm text-muted-foreground mt-4">
              <p>
                <strong>Submission Date:</strong>{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mt-2">
                By submitting this form, you certify that the information provided
                is accurate and complete.
              </p>
            </div>
          </div>

          {/* Document Uploads Section */}
          <div className="doc-section">
            <h2>Required Documents</h2>
            <div className="grid grid-cols-1 gap-4 mt-4">
              {/* Passport Photo Upload */}
              <div className="upload-card">
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Passport Photo
                  </Label>
                  {uploadedFiles.passportPhoto && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile("passportPhoto")}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <input
                  type="file"
                  ref={(el) => (fileInputRefs.current["passportPhoto"] = el)}
                  onChange={(e) => handleFileUpload("passportPhoto", e)}
                  accept="image/*"
                  className="hidden"
                />
                {uploadedFiles.passportPhoto ? (
                  <div className="uploaded-preview">
                    <img src={uploadedFiles.passportPhoto} alt="Passport" className="w-24 h-24 object-cover rounded border" />
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => triggerFileInput("passportPhoto")}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Passport Photo
                  </Button>
                )}
              </div>

              {/* Signature Upload */}
              <div className="upload-card">
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2">
                    <Signature className="w-4 h-4" />
                    Digital Signature
                  </Label>
                  {uploadedFiles.signature && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile("signature")}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <input
                  type="file"
                  ref={(el) => (fileInputRefs.current["signature"] = el)}
                  onChange={(e) => handleFileUpload("signature", e)}
                  accept="image/*"
                  className="hidden"
                />
                {uploadedFiles.signature ? (
                  <div className="uploaded-preview">
                    <img src={uploadedFiles.signature} alt="Signature" className="h-16 object-contain rounded border px-4 py-2 bg-white" />
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => triggerFileInput("signature")}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Signature
                  </Button>
                )}
              </div>

              {/* Company Logo Upload */}
              <div className="upload-card">
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Company Logo
                  </Label>
                  {uploadedFiles.companyLogo && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile("companyLogo")}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <input
                  type="file"
                  ref={(el) => (fileInputRefs.current["companyLogo"] = el)}
                  onChange={(e) => handleFileUpload("companyLogo", e)}
                  accept="image/*"
                  className="hidden"
                />
                {uploadedFiles.companyLogo ? (
                  <div className="uploaded-preview">
                    <img src={uploadedFiles.companyLogo} alt="Logo" className="h-16 object-contain rounded border px-4 py-2 bg-white" />
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => triggerFileInput("companyLogo")}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Company Logo
                  </Button>
                )}
              </div>

              {/* Supporting Document Upload */}
              <div className="upload-card">
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Supporting Document (Optional)
                  </Label>
                  {uploadedFiles.supportingDocument && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile("supportingDocument")}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <input
                  type="file"
                  ref={(el) => (fileInputRefs.current["supportingDocument"] = el)}
                  onChange={(e) => handleFileUpload("supportingDocument", e)}
                  accept="image/*,.pdf"
                  className="hidden"
                />
                {uploadedFiles.supportingDocument ? (
                  <div className="uploaded-preview flex items-center gap-2">
                    <FileText className="w-8 h-8 text-primary" />
                    <span className="text-sm">Document uploaded</span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => triggerFileInput("supportingDocument")}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Supporting Document
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 mt-8 no-print">
            <Button className="bg-primary hover:bg-primary/90" size="lg">
              Submit Request
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                setFormData({
                  employeeName: "",
                  employeeId: "",
                  department: "",
                  position: "",
                  email: "",
                  phone: "",
                  leaveType: "annual",
                  startDate: "",
                  endDate: "",
                  reason: "",
                  supervisorName: "",
                  supervisorApproval: false,
                  departmentHeadName: "",
                  departmentHeadApproval: false,
                })
              }
            >
              Clear Form
            </Button>
          </div>

          {/* Official Footer */}
          <div className="doc-footer mt-12">
            <p className="doc-footer-text">
              This document is an official record of the Department Leave Management System.
            </p>
            <p className="doc-footer-text mt-2">
              For inquiries, contact the Human Resources Department.
            </p>
            <div className="doc-page-number no-print">Page 1 of 1</div>
          </div>
        </Card>
          </div>

          {/* Live Preview Panel */}
          {showPreview && (
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4 shadow-lg preview-panel">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-primary">Live Preview</h3>
                  <Badge variant="outline" className="text-xs">Real-time</Badge>
                </div>
                
                {/* Preview Content */}
                <div className="preview-content space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  {/* Employee Info Preview */}
                  <div className="preview-section">
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Employee</h4>
                    <div className="text-sm">
                      <p className="font-semibold">{formData.employeeName || "—"}</p>
                      <p className="text-muted-foreground">{formData.employeeId || "—"}</p>
                      <p className="text-muted-foreground">{formData.department || "—"} • {formData.position || "—"}</p>
                    </div>
                  </div>

                  {/* Leave Details Preview */}
                  <div className="preview-section">
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Leave Details</h4>
                    <div className="text-sm">
                      <p><span className="text-muted-foreground">Type:</span> <span className="font-semibold capitalize">{formData.leaveType}</span></p>
                      <p><span className="text-muted-foreground">Duration:</span> <span className="font-semibold">{totalDays} days</span></p>
                      <p><span className="text-muted-foreground">From:</span> <span className="font-semibold">{formData.startDate || "—"}</span></p>
                      <p><span className="text-muted-foreground">To:</span> <span className="font-semibold">{formData.endDate || "—"}</span></p>
                    </div>
                  </div>

                  {/* Uploaded Files Preview */}
                  {(uploadedFiles.passportPhoto || uploadedFiles.signature || uploadedFiles.companyLogo) && (
                    <div className="preview-section">
                      <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Attachments</h4>
                      <div className="flex gap-2 flex-wrap">
                        {uploadedFiles.passportPhoto && (
                          <img src={uploadedFiles.passportPhoto} alt="Passport" className="w-12 h-12 object-cover rounded border" />
                        )}
                        {uploadedFiles.signature && (
                          <img src={uploadedFiles.signature} alt="Signature" className="h-8 object-contain rounded border bg-white px-2 py-1" />
                        )}
                        {uploadedFiles.companyLogo && (
                          <img src={uploadedFiles.companyLogo} alt="Logo" className="h-8 object-contain rounded border bg-white px-2 py-1" />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Status Summary */}
                  <div className="preview-section bg-input p-3 rounded border">
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Approval Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Checkbox checked={formData.supervisorApproval} disabled />
                        <span>Supervisor: {formData.supervisorName || "Not specified"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox checked={formData.departmentHeadApproval} disabled />
                        <span>Dept Head: {formData.departmentHeadName || "Not specified"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
