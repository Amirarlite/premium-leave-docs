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
import { useState, useMemo } from "react";
import { Download, Printer } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="doc-header mb-8 rounded-t-lg">
          <div className="doc-header-title">LEAVE REQUEST FORM</div>
          <div className="doc-header-subtitle">
            Department Leave Management System
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

          {/* Form Actions */}
          <div className="flex gap-4 mt-8 no-print">
            <Button className="bg-primary hover:bg-primary/90">
              Submit Request
            </Button>
            <Button
              variant="outline"
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
        </Card>
      </div>
    </div>
  );
}
