import type { Report, Job } from '~/composables/use-api'

export const usePdfExport = () => {
  const generateReportPdf = async (
    report: Report,
    jobs: Job[],
    vulnerabilities: any[],
    reportSummaryElement: HTMLElement | null,
    vulnerabilitiesElement: HTMLElement | null
  ) => {
    if (!report) return
    if (!import.meta.client) return

    // Dynamic imports to avoid SSR issues
    const jsPdfModule = await import('jspdf')
    const Html2CanvasModule = await import('html2canvas')

    const JsPdfCtor = (jsPdfModule as any).jsPDF || (jsPdfModule as any).default
    const html2canvas = (Html2CanvasModule as any).default || (Html2CanvasModule as any)

    const pdf = new JsPdfCtor('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    const contentWidth = pageWidth - (margin * 2)
    let yPosition = margin

    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize: number, isBold = false, color = '#000000') => {
      pdf.setFontSize(fontSize)
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal')
      pdf.setTextColor(color)
      
      const lines = pdf.splitTextToSize(text, contentWidth)
      const lineHeight = fontSize * 0.4
      
      for (const line of lines) {
        if (yPosition + lineHeight > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }
        pdf.text(line, margin, yPosition)
        yPosition += lineHeight
      }
      yPosition += 5
    }

    // Helper function to add a section header
    const addSectionHeader = (title: string) => {
      yPosition += 10
      addText(title, 16, true, '#2563eb')
      yPosition += 5
    }

    // Helper function to add a separator line
    const addSeparator = () => {
      yPosition += 5
      pdf.setDrawColor(200, 200, 200)
      pdf.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 10
    }

    // Title and Header
    pdf.setFillColor(15, 23, 42)
    pdf.rect(0, 0, pageWidth, 30, 'F')
    
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(255, 255, 255)
    pdf.text('SECURITY ASSESSMENT REPORT', margin, 20)
    
    yPosition = 50

    // Report Information
    addSectionHeader('Report Information')
    addText(`Report Name: ${report.name}`, 12, true)
    addText(`Report ID: ${report.id}`, 12)
    addText(`Description: ${report.description || 'No description provided'}`, 12)
    addText(`Generated: ${report.created_at ? new Date(report.created_at).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'Unknown'}`, 12)
    
    addSeparator()

    // Summary Statistics
    addSectionHeader('Summary Statistics')
    const stats = report.results.metadata
    addText(`Total Jobs Merged: ${stats.total_jobs}`, 12, true)
    addText(`Total Findings: ${stats.total_findings}`, 12, true)
    
    const vulnerabilityCount = vulnerabilities.filter(v => 
      ['low', 'medium', 'high', 'critical'].includes(v.severity)
    ).length
    addText(`Vulnerabilities Found: ${vulnerabilityCount}`, 12, true, '#dc2626')
    
    addSeparator()

    // Jobs List
    addSectionHeader('Associated Jobs')
    const reportJobs = jobs.filter(job => 
      report.results.metadata.jobs_ids.includes(job.id)
    )
    
    if (reportJobs.length > 0) {
      reportJobs.forEach((job, index) => {
        addText(`${index + 1}. ${job.name}`, 12, true)
        addText(`   Job ID: ${job.id}`, 10)
        addText(`   Status: ${job.status}`, 10)
        addText(`   Agent ID: ${job.agent_id}`, 10)
        if (job.created_at) {
          addText(`   Created: ${new Date(job.created_at).toLocaleDateString('fr-FR')}`, 10)
        }
        yPosition += 3
      })
    } else {
      addText('No jobs found for this report.', 12)
    }
    
    addSeparator()

    // Report Summary (from component)
    if (reportSummaryElement) {
      addSectionHeader('Detailed Summary')
      try {
        const canvas = await html2canvas(reportSummaryElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff'
        })
        
        const imgData = canvas.toDataURL('image/png')
        const imgWidth = contentWidth
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        
        if (yPosition + imgHeight > pageHeight - margin) {
          pdf.addPage()
          yPosition = margin
        }
        
        pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight)
        yPosition += imgHeight + 10
      } catch (error) {
        console.error('Error capturing report summary:', error)
        addText('Error capturing report summary section.', 12)
      }
    }

    // Vulnerabilities
    if (vulnerabilities.length > 0) {
      addSectionHeader('Vulnerabilities Found')
      
      vulnerabilities.forEach((vuln, index) => {
        if (yPosition > pageHeight - 100) {
          pdf.addPage()
          yPosition = margin
        }
        
        addText(`${index + 1}. ${vuln.title}`, 12, true)
        addText(`   Severity: ${vuln.severity.toUpperCase()}`, 10, false, 
          vuln.severity === 'critical' ? '#dc2626' : 
          vuln.severity === 'high' ? '#ea580c' :
          vuln.severity === 'medium' ? '#d97706' :
          vuln.severity === 'low' ? '#ca8a04' : '#2563eb'
        )
        addText(`   Target: ${vuln.target}`, 10)
        addText(`   ID: ${vuln.id}`, 10)
        addText(`   Description: ${vuln.description}`, 10)
        yPosition += 5
      })
    } else {
      addText('No vulnerabilities found.', 12)
    }

    // Footer
    const totalPages = pdf.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i)
      pdf.setFontSize(8)
      pdf.setTextColor(128, 128, 128)
      pdf.text(
        `Page ${i} of ${totalPages} - Generated on ${new Date().toLocaleDateString('fr-FR')}`,
        margin,
        pageHeight - 10
      )
    }

    // Download the PDF
    const fileName = `security-report-${report.name.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(fileName)
  }

  return {
    generateReportPdf
  }
}
