import { FileText, AlertCircle, CheckCircle } from 'lucide-react'

export default function ContractSummary({ projectId }) {
  // This would normally fetch real data
  const contractDetails = {
    status: 'Analyzed',
    totalClauses: 24,
    potentialIssues: 3,
    lastUpdated: '3 days ago'
  }

  return (
    <div className="bg-white border border-surface-100 rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50">
            <FileText className="h-5 w-5 text-violet-500" />
          </div>
          <h3 className="text-lg font-medium text-surface-900">Contract Analysis</h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-100">
          {contractDetails.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        <div className="border border-surface-100 rounded-lg p-4">
          <p className="text-sm text-surface-500 mb-1">Total Clauses</p>
          <p className="text-xl font-semibold text-surface-900">{contractDetails.totalClauses}</p>
        </div>
        
        <div className="border border-surface-100 rounded-lg p-4">
          <p className="text-sm text-surface-500 mb-1">Potential Issues</p>
          <p className="text-xl font-semibold text-red-600">{contractDetails.potentialIssues}</p>
        </div>
        
        <div className="border border-surface-100 rounded-lg p-4">
          <p className="text-sm text-surface-500 mb-1">Last Updated</p>
          <p className="text-xl font-semibold text-surface-900">{contractDetails.lastUpdated}</p>
        </div>
      </div>
      
      <div className="border-t border-surface-100 pt-5">
        <div className="flex items-start gap-3 mb-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 mt-0.5">
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </span>
          <div>
            <p className="text-sm font-medium text-surface-900">Payment terms may cause cash flow issues</p>
            <p className="text-xs text-surface-500 mt-0.5">Section 4.2 - Payment schedule has 45-day terms</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 mb-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 mt-0.5">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </span>
          <div>
            <p className="text-sm font-medium text-surface-900">Scope creep risk identified</p>
            <p className="text-xs text-surface-500 mt-0.5">Section 2.3 - Deliverables defined ambiguously</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 mt-0.5">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </span>
          <div>
            <p className="text-sm font-medium text-surface-900">IP protection clause is strong</p>
            <p className="text-xs text-surface-500 mt-0.5">Section 7.1 - Intellectual Property Rights</p>
          </div>
        </div>
      </div>
    </div>
  )
}