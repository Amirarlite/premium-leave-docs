import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Download, Printer, Plus, Trash2 } from "lucide-react";

interface LeaveBalance {
  type: string;
  entitlement: number;
  used: number;
  remaining: number;
}

interface LeaveHistory {
  id: string;
  dateRange: string;
  type: string;
  status: string;
  daysApproved: number;
  notes: string;
}

interface TrackerData {
  employeeName: string;
  employeeId: string;
  department: string;
  balances: LeaveBalance[];
  history: LeaveHistory[];
  totalUsed: number;
  totalRemaining: number;
}

export default function LeaveStatusTracker() {
  const [formData, setFormData] = useState<TrackerData>({
    employeeName: "",
    employeeId: "",
    department: "",
    balances: [
      { type: "Annual Leave", entitlement: 20, used: 5, remaining: 15 },
      { type: "Sick Leave", entitlement: 10, used: 2, remaining: 8 },
      { type: "Casual Leave", entitlement: 5, used: 1, remaining: 4 },
    ],
    history: [
      {
        id: "1",
        dateRange: "2024-01-15 to 2024-01-19",
        type: "Annual Leave",
        status: "Approved",
        daysApproved: 5,
        notes: "Vacation",
      },
      {
        id: "2",
        dateRange: "2024-02-10 to 2024-02-10",
        type: "Sick Leave",
        status: "Approved",
        daysApproved: 1,
        notes: "Medical appointment",
      },
    ],
    totalUsed: 8,
    totalRemaining: 27,
  });

  const [newBalance, setNewBalance] = useState({
    type: "",
    entitlement: 0,
    used: 0,
    remaining: 0,
  });

  const [newHistory, setNewHistory] = useState({
    dateRange: "",
    type: "",
    status: "Approved",
    daysApproved: 0,
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBalance = () => {
    if (newBalance.type) {
      setFormData((prev) => ({
        ...prev,
        balances: [...prev.balances, newBalance],
      }));
      setNewBalance({ type: "", entitlement: 0, used: 0, remaining: 0 });
    }
  };

  const handleRemoveBalance = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      balances: prev.balances.filter((_, i) => i !== index),
    }));
  };

  const handleAddHistory = () => {
    if (newHistory.dateRange && newHistory.type) {
      setFormData((prev) => ({
        ...prev,
        history: [
          ...prev.history,
          { ...newHistory, id: Date.now().toString() },
        ],
      }));
      setNewHistory({
        dateRange: "",
        type: "",
        status: "Approved",
        daysApproved: 0,
        notes: "",
      });
    }
  };

  const handleRemoveHistory = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      history: prev.history.filter((item) => item.id !== id),
    }));
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
    element.setAttribute("download", "leave-status-tracker.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "status-approved";
      case "Pending":
        return "status-pending";
      default:
        return "status-rejected";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="doc-header mb-8 rounded-t-lg">
          <div className="doc-header-title">LEAVE STATUS TRACKER</div>
          <div className="doc-header-subtitle">
            Employee Leave Balance and History Dashboard
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

        {/* Tracker Card */}
        <Card className="p-8 rounded-b-lg shadow-lg">
          {/* Employee Summary */}
          <div className="doc-section">
            <h2>Employee Summary</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <Label className="text-xs">Employee Name</Label>
                <p className="text-sm font-semibold text-primary">
                  {formData.employeeName || "—"}
                </p>
              </div>
              <div>
                <Label className="text-xs">Employee ID</Label>
                <p className="text-sm font-semibold text-primary">
                  {formData.employeeId || "—"}
                </p>
              </div>
              <div>
                <Label className="text-xs">Department</Label>
                <p className="text-sm font-semibold text-primary">
                  {formData.department || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Leave Balance Table */}
          <div className="doc-section">
            <h2>Leave Balance Summary</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="border border-primary px-4 py-2 text-left">
                      Leave Type
                    </th>
                    <th className="border border-primary px-4 py-2 text-center">
                      Total Entitlement
                    </th>
                    <th className="border border-primary px-4 py-2 text-center">
                      Days Used
                    </th>
                    <th className="border border-primary px-4 py-2 text-center">
                      Days Remaining
                    </th>
                    <th className="border border-primary px-4 py-2 text-center">
                      % Used
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.balances.map((balance, index) => (
                    <tr key={index} className="hover:bg-input">
                      <td className="border border-border px-4 py-2">
                        {balance.type}
                      </td>
                      <td className="border border-border px-4 py-2 text-center font-semibold">
                        {balance.entitlement}
                      </td>
                      <td className="border border-border px-4 py-2 text-center font-semibold text-orange-600">
                        {balance.used}
                      </td>
                      <td className="border border-border px-4 py-2 text-center font-semibold text-green-600">
                        {balance.remaining}
                      </td>
                      <td className="border border-border px-4 py-2 text-center">
                        {balance.entitlement > 0
                          ? (
                              ((balance.used / balance.entitlement) * 100).toFixed(
                                0
                              ) + "%"
                            )
                          : "0%"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Year-to-Date Summary */}
          <div className="doc-section">
            <h2>Year-to-Date Summary</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-orange-50 p-4 rounded border border-orange-200">
                <p className="text-xs font-bold text-secondary uppercase">
                  Total Days Used
                </p>
                <p className="text-2xl font-bold text-orange-600 mt-2">
                  {formData.totalUsed}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <p className="text-xs font-bold text-secondary uppercase">
                  Total Days Remaining
                </p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {formData.totalRemaining}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <p className="text-xs font-bold text-secondary uppercase">
                  Total Entitlement
                </p>
                <p className="text-2xl font-bold text-primary mt-2">
                  {formData.totalUsed + formData.totalRemaining}
                </p>
              </div>
            </div>
          </div>

          {/* Leave History Table */}
          <div className="doc-section">
            <h2>Leave History</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="border border-primary px-4 py-2 text-left">
                      Date Range
                    </th>
                    <th className="border border-primary px-4 py-2 text-left">
                      Leave Type
                    </th>
                    <th className="border border-primary px-4 py-2 text-center">
                      Status
                    </th>
                    <th className="border border-primary px-4 py-2 text-center">
                      Days Approved
                    </th>
                    <th className="border border-primary px-4 py-2 text-left">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.history.map((item) => (
                    <tr key={item.id} className="hover:bg-input">
                      <td className="border border-border px-4 py-2 text-xs">
                        {item.dateRange}
                      </td>
                      <td className="border border-border px-4 py-2">
                        {item.type}
                      </td>
                      <td className="border border-border px-4 py-2 text-center">
                        <span className={`status-badge ${getStatusBadgeClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="border border-border px-4 py-2 text-center font-semibold">
                        {item.daysApproved}
                      </td>
                      <td className="border border-border px-4 py-2 text-xs">
                        {item.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-4 mt-8 text-center text-xs text-muted-foreground">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            <p className="mt-2">
              For questions regarding leave balance, contact HR Department
            </p>
          </div>

          {/* Editable Section (Hidden in Print) */}
          <div className="no-print mt-8 pt-8 border-t border-border">
            <h3 className="text-lg font-bold text-primary mb-4">
              Edit Tracker Details
            </h3>

            {/* Employee Info */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="employeeName">Employee Name</Label>
                <Input
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="EMP-2024-001"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Department"
                />
              </div>
            </div>

            {/* Add Balance */}
            <div className="bg-input p-4 rounded border border-border mb-6">
              <h4 className="font-bold text-primary mb-3">Add Leave Balance</h4>
              <div className="grid grid-cols-5 gap-3">
                <Input
                  placeholder="Leave Type"
                  value={newBalance.type}
                  onChange={(e) =>
                    setNewBalance({ ...newBalance, type: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Entitlement"
                  value={newBalance.entitlement}
                  onChange={(e) =>
                    setNewBalance({
                      ...newBalance,
                      entitlement: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Used"
                  value={newBalance.used}
                  onChange={(e) =>
                    setNewBalance({
                      ...newBalance,
                      used: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Remaining"
                  value={newBalance.remaining}
                  onChange={(e) =>
                    setNewBalance({
                      ...newBalance,
                      remaining: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <Button
                  size="sm"
                  onClick={handleAddBalance}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add History */}
            <div className="bg-input p-4 rounded border border-border">
              <h4 className="font-bold text-primary mb-3">Add Leave History</h4>
              <div className="grid grid-cols-5 gap-3">
                <Input
                  placeholder="Date Range"
                  value={newHistory.dateRange}
                  onChange={(e) =>
                    setNewHistory({ ...newHistory, dateRange: e.target.value })
                  }
                />
                <Input
                  placeholder="Leave Type"
                  value={newHistory.type}
                  onChange={(e) =>
                    setNewHistory({ ...newHistory, type: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Days"
                  value={newHistory.daysApproved}
                  onChange={(e) =>
                    setNewHistory({
                      ...newHistory,
                      daysApproved: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <Input
                  placeholder="Notes"
                  value={newHistory.notes}
                  onChange={(e) =>
                    setNewHistory({ ...newHistory, notes: e.target.value })
                  }
                />
                <Button
                  size="sm"
                  onClick={handleAddHistory}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 mt-6">
              <Button className="bg-primary hover:bg-primary/90">
                Update Tracker
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
